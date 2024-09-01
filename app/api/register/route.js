import { NextResponse } from "next/server";
import prismadb from "../../../utils/prismadb"
import bcrypt from 'bcrypt'
export async function POST(request){
    try{
        const {name,email,password}= await request.json()
        const user=await prismadb.user.findUnique({where:{email:email}})
        if(user){
            return NextResponse.json(user,{status:200})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await prismadb.user.create({data:{name,email,password:hashedPassword}})
        if(!newUser){
            throw new Error("Error creating the user")
        }
        return NextResponse.json(newUser,{status:200})
    }
    catch(error){
        console.log(error.message)
        return NextResponse.json({message:error.message,data:[]},{status:500})
    }
}