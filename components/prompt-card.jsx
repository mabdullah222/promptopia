'use client'
import React from "react";
import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const PromptCard = ({username,imageUrl,prompt,hashtags,userId}) => {
  const copyToClipboard =(text)=>{
    navigator.clipboard.writeText(text);
  }
  return (
    <div className="flex outline outline-1 outline-gray-800 flex-col space-y-3 p-4 rounded-md min-h-[200px] min-w-[400px] md:max-h-[200px] md:max-w-[400px] m-6">
      <div className="flex row space-x-3 items-center justify-between">
        <div className="flex justify-center items-center space-x-3">
          <Avatar>
          <AvatarImage src={imageUrl}/>
          <AvatarFallback>{username.substring(0,2)}</AvatarFallback>
        </Avatar>
          <Link href={`/profile?id=${userId}`} className="text-gray-100 text-xs font-satoshi">
            {username}
          </Link>
        </div>
        <button onClick={()=>{copyToClipboard(prompt)}}><Image src="assets/icons/copy.svg" width={20} height={20}></Image></button>
      </div>
      <div className="flex-1 md:overflow-hidden md:overflow-ellipsis text-sm text-gray-100">
        <p>
          {prompt}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-100">
          {hashtags.map((e,index)=>{
            return <span>{e}</span>
          })}
        </p>
      </div>
    </div>
  );
};

export default PromptCard;
