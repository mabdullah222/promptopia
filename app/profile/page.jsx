
import PromptCard from '@components/prompt-card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ProfilePage = async ({searchParams}) => {
  const {id}=searchParams
  const response=await fetch(`http://localhost:3000/api/profile/posts?id=${id}`,{cache:'no-cache'})
  const data=await response.json()
  return (
    <div className='p-10 flex flex-col justify-center items-center overflow-hidden'>
      <div className="flex flex-col space-y-2 justify-center items-center">
        <Avatar className="w-[90px] h-[90px]">
        <AvatarImage src="https://github.com/shadcn.png"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
        <p className="text-lg font-satoshi font-semibold text-gray-200">{data.data[0].user.name}</p>
      </div>
      <div className="grid p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {data?.data?.map((e, index) => (
          <PromptCard key={index} userId={e.user.id} prompt={e.prompt} hashtags={e.hashtags} username={e.user.name} />
        ))}
      </div>
    </div>
    
  )
}

export default ProfilePage