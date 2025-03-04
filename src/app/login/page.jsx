"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function LoginPage(){

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: "",
    });
     const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleLogin = async() => {
        
    } 

    // const handleLogin = async () => {
    //     // console.log(userCreds);
    //     // setIsClicked(true);
    //     try {
    //         const response = await axios.post("/api/users/signup", userCreds);
    //         console.log(response.data);
    //         toast.success(response.data.message);
    //         router.push("/login");
    //       } catch (error) {
    //        console.log(error);
    //        if(error.status == 400){
    //            toast.error("User already exists.")
    //        } else{
    //            toast.error("Internal server error.");  
    //        }
    //       }
    // }

    
    useEffect(() => {
        if(userCreds.email.length>0 && userCreds.password.length>0){
            setButtonDisabled(false);
        }
    }, [userCreds]);

    return(
        <div>
        <h1 className="m-2 p-2 text-4xl font-semibold text-center">Login</h1>
        <div className="flex flex-col gap-5 items-center">
        
        <div>
        <label className="text-lg text-left" htmlFor="email">Email</label>
        <input
         id="email"
         className="ml-2 px-2 py-1 border-solid border-black rounded-lg" 
         required
         type="text" 
         value={userCreds.email}
         onChange={(e) => setUserCreds({...userCreds, email: e.target.value})}
         
         />
        </div>
        <div>
        <label className="text-lg" htmlFor="password">Password</label>
        <input
         id="password"
         className="ml-2 px-2 py-1 border-solid border-black rounded-lg" 
         required
         type="password" 
         value={userCreds.password}
         onChange={(e) => setUserCreds({...userCreds, password: e.target.value})}
         />
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
            <button 
            type="submit"
            className={buttonDisabled ? "bg-gray-500 px-4 py-1 rounded-lg text-white cursor-not-allowed" : "bg-blue-600 px-4 py-1 rounded-lg text-white"}
            onSubmit={handleLogin}
            >Login</button>
            <Link href={"/signup"}>Signup</Link>
        </div>
        </div>
        </div>
    )
}