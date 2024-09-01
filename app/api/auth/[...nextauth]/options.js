import Credentials from 'next-auth/providers/credentials';
import prismadb from "../../../../utils/prismadb"
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter';


const options={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID || '',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id:'credentials',
            name:'credentials',
            credentials:{
                email:{
                    label:'Email',
                    type:'text'
                },
                password:{
                    label:'Password',
                    type:'password'
                }
            },
            authorize:async(credentials)=>{
                try{
                    console.log(credentials)
                    if (!credentials?.email || !credentials?.password){
                        throw new Error('Email or Password Missing')
                    }
                    const user=await prismadb.user.findUnique({where:{email:credentials.email}})
                    if (!user){
                        throw new Error("Email Doesnot exist")
                    }
                    const isCorrectPassword=await bcrypt.compare(credentials.password,user.password)
                    if (!isCorrectPassword){
                        throw new Error("Incorrect Password")
                    }
                    return user;
                }
                catch(error){
                    console.log(error.message)
                    return null;
                }
        
                
            }
        })
    ],
    pages:{
        signIn:'/auth'   
    },
    debug: process.env.NODE_ENV=='development',
    adapter:PrismaAdapter(prismadb),
    session:{
        strategy:'jwt'
    },  
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET
    },
    secret:{
        secret:process.env.NEXTAUTH_SECRET
    }
}

export default options