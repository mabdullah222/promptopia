import React from 'react'
import Image from 'next/image'
const loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <Image src={"assets/icons/loader.svg"} width={40} height={40}></Image>
    </div>
  )
}

export default loading