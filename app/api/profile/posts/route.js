import { NextResponse } from "next/server";
import prismadb from "../../../../utils/prismadb"


export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url)
      const query = searchParams.get("id") || ""
  
      const posts = await prismadb.post.findMany({
        where: {
          userId:{equals:query}
        },
        include: { user: true }
      })
  
      return NextResponse.json({ data: posts }, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ data: null, message: error.message }, { status: 500 })
    }
  }
  
  