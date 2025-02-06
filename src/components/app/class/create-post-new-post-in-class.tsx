import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const CreateNewPostInClass = () => {
  const imageSrc = "/images/2.jpg";
  return (
    <div>
      <div className=" items-center space-x-2 happy-card flex flex-row">
        <Avatar className=" size-12">
          <AvatarImage src={ imageSrc ||"/images/2.jpg"} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className=" w-full flex flex-col">
          <div className=" bg-base-200 w-full p-2 rounded-full px-4">
            <p>Announce something in class...</p>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewPostInClass
