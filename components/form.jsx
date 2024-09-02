'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Form = () => {
  const [data,setData]=useState({prompt:"",hashtags:""})
  const [submit,setSubmit]=useState(false)
  const [open,setOpen]=useState(false)
  const handleSubmit=async ()=>{
    try{
    setSubmit(true)
    const hashtags=data.hashtags.split(",")
    const response=await axios.post("api/posts",{...data,hashtags:hashtags})
    if(response.status==200){
      
      console.log(response.data)
    }
    }
    catch(error){
      console.log(error.message)
    }finally{
      setData({prompt:"",hashtags:""})
      setSubmit(false)
      setOpen(false)
    }
  }
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={()=>{setOpen(!open)}}>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Make sure to fill the field.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Prompt
            </Label>
            <Input id="name" placeholder="Do something..." value={data.prompt} onChange={(e)=>setData({...data,'prompt':e.target.value})} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              hashtags
            </Label>
            <Input id="username" placeholder={"#coding,#hiking"} value={data.hashtags} onChange={(e)=>setData({...data,'hashtags':e.target.value})} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"><button onClick={handleSubmit}>Post</button></Button>
          <Button type="submit" variant="destructive"><button onClick={()=>setOpen(!open)}>Close</button></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default Form