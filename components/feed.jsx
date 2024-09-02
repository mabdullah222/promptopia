"use client"
import PromptCard from './prompt-card'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState("")

  const getPosts = async (query) => {
    try {
      const response = await axios.get(`api/posts?query=${query}`)
      if (response.status == 200) {
        setPosts(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  useEffect(() => {
    getPosts(query)
  }, [query])

  return (
    <div className='flex flex-col'>
      <div className='flex px-5 justify-center'>
        <input
          type="text"
          placeholder='Search Prompts'
          className='outline w-3/4 bg-slate-900 outline-1 p-2 rounded-md outline-gray-800 text-gray-100'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="grid p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {posts?.map((e, index) => (
          <PromptCard key={index} userId={e.user.id} prompt={e.prompt} hashtags={e.hashtags} username={e.user.name} />
        ))}
      </div>
    </div>
  )
}

export default Feed
