'use client';
import React from "react";
const Input=({label,id,onChange,value,type})=>{
    return (
        <div className="relative">
            <input type={type}
            value={value}
            name={id}
            onChange={onChange}
            id={id}
            className="block rounded-md px-5 pt-5 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
            placeholder=" "/>
            <label 
            className="
            absolute text-md text-zinc-400 duration-200 transition -translate-y-3 scale-75 left-2 top-3 z-10 origin-[0]
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:-translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
            "
            htmlFor={id}>{label}</label>
        </div>
        
    )
}

export default Input;