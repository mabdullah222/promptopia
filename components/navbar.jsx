'use client'

import Link from 'next/link'
import Image from 'next/image'
import {signOut} from "next-auth/react"
import { useSession } from 'next-auth/react'
import Form from "@components/form";


const NavBar = () => {
  const {data:status,data}=useSession()
  const loggedIn=data?.user
  return (
    <nav className="bg-slate-900 flex flex-row items-center w-full pt-7 pb-10 px-14">
      <div className='flex flex-row justify-between w-full items-center'>
        <Link href="/" className="flex gap-2 items-center justify-center">
          <Image src={"/assets/images/logo.svg"} width={30} height={30} className='contain'>
            
          </Image>
          <p className="font-satoshi font-semibold text-white">
          promptopia
          </p>
        </Link>
      {
        loggedIn ? <div className="flex space-x-2">
          <Form></Form>
          <button onClick={()=>{signOut()}} className="font-semibold px-7 py-2 bg-red-500 text-gray-300 rounded-lg text-sm">Logout</button>
        </div> : <div className='flex space-x-2'>
        <Link href={"/auth"} className="px-7 py-2 outline outline-1 hover:bg-teal-700 outline-neutral-800 text-white rounded-lg text-sm">Login</Link>
        </div>
      }
      
      </div>
      
    </nav>
  )
}

export default NavBar