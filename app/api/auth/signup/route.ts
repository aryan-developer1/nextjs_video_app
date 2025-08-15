import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { connectToDatabase } from "@/lib/db";


export async function POST(request:NextRequest){
    try {
           //get data from body
           const {email,password,name} = await request.json();

           //validation
           if(!email || !password || !name){
            return NextResponse.json({error:"All fields are required"}, {status:400})
           }

           //connect to db
           await connectToDatabase();

           //check if user already exists
           const user = await User.findOne({email});
           if(user){
            return NextResponse.json({error:"User already exists"}, {status:400})
           }

           //create user
           await User.create({email,password});

           //return response
           return NextResponse.json({message:"User created successfully"}, {status:201})
    } catch (error) {
        console.log("registration error",error);
        return NextResponse.json({error:"Internal Server Error"}, {status:500})
    }
}