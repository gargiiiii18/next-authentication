import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { initMongoose } from "../../../../lib/mongoose";
import Users from "../../../../models/Users";

export const authOptions= {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
            await initMongoose();

            try {
                const user = await Users.findOne({
                    $or: [
                        {email: credentials.identifier.email},
                        {username: credentials.identifier.username},
                    ]
                })
                if(!user){
                    throw new Error("No user found for the credentials entered.");
                }
                if(!user.isVerified){
                    throw new Error("Please verify your account first.");
                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if(isPasswordValid){
                    return user;
                } else{
                    throw new Error("Please recheck your password");
                }
            } catch (error) {
                throw new Error(error);
            }
          
        },
    }
        )
    
    ],
    callbacks: {
        async jwt({ token, user}) {
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token
          },
        async session({ session, token}) {
            if(token){
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session
          },
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
}