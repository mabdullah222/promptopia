import { NextResponse } from "next/server";
import prismadb from "../../../utils/prismadb"
import options from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export async function POST(request){
    try{
        const session=await getServerSession(options)
        if(!session){
            throw new Error("Not Authenticated! Login to Post")
        }
        const email=session.user.email
        const {prompt,hashtags}=await request.json()
        const user=await prismadb.user.findUnique({where:{email:email}})
        const newPost=await prismadb.post.create({data:{prompt:prompt,hashtags:hashtags,userId:user.id}})
        if(!newPost){
            throw new Error("Error creating the post")
        }
        return NextResponse.json(newPost,{status:200})
    }
    catch(error){
        console.log(error.message)
        return NextResponse.json({data:null,message:error.message},{status:500})
    }
}



export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""

    const posts = await prismadb.post.findMany({
      where: {
        prompt:{contains:query,mode:'insensitive'}
      },
      include: { user: true }
    })

    return NextResponse.json({ data: posts }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ data: null, message: error.message }, { status: 500 })
  }
}

