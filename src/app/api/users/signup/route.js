import {initMongoose} from "../../../../lib/mongoose";
import User from "../../../../models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
initMongoose();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        // console.log(reqBody);
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists."}, {status: 400});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        
        return NextResponse.json({message: "User created successfully", success: true}, {status: 201});
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({error: error.message}, {status: 500});
    }
}