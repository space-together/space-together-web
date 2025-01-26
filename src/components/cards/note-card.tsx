import React from 'react'
import { FaComment, FaReadme, FaRegBookmark, FaShare } from 'react-icons/fa6'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BsThreeDotsVertical } from 'react-icons/bs'

const NoteCard = () => {
  return (
    <div className=" happy-card p-0">
        <div className="flex justify-between items-center px-4 py-2">
          <div className=" flex items-center space-x-2">
            <Avatar className=" size-12">
              <AvatarImage src="/images/2.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h4 className=" font-medium">Iradukunda Mike</h4>
              <span className=" text-sm text-myGray">Teacher</span>
            </div>
          </div>
          <div className=" flex gap-2 items-center">
            <span className=" font-medium text-myGray">2h ago</span>
            <Button variant="ghost" size="sm" shape="circle">
              <BsThreeDotsVertical />
            </Button>
          </div>
        </div>
        <Separator />
        <div className=" px-4 pb-2">
          <div className=" space-x-2 text-sm text-myGray">
            <span>Kinyarwanda</span>
            <span className=" ">Notes</span>
          </div>
          <h3 className=" text-lg font-semibold text-center">Lesson 1</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            doloribus nobis totam nemo id provident tempora quos, sed modi.
            Commodi optio, nemo beatae tenetur repellat aspernatur asperiores
            delectus nihil accusamus...
          </p>
        </div>
        {/* <Separator />
        <div className=" flex justify-between px-4 py-2 ">
          <div className=" flex gap-2 items-center">
            <div className=" -space-x-1 flex items-center ">
              <MyImage src="/icons/like.png" className=" size-8" />
              <MyImage src="/icons/sad.png" className=" size-6" />
            </div>
            <span>15</span>
          </div>
          <div className=" flex items-center gap-2">
            <span>32</span> <FaComment size={28} />
          </div>
        </div> */}
        <Separator />
        <div className=" flex justify-between px-4 py-2 ">
          <div className=" flex gap-2 items-center">
            <Button variant="ghost" size="md">
              <FaReadme size={28} />
              <span>43</span>
            </Button>
            <Button variant="ghost" size="md">
              <FaComment size={28} />
              <span>32</span>
            </Button>
          </div>
          <div className=" flex gap-2 items-center">
            <Button variant="ghost" size="md" >
              <FaShare size={28} />
            </Button>
            <Button variant="ghost" size="md" >
              <FaRegBookmark size={28} />
            </Button>
          </div>
        </div>
      </div>
  )
}

export default NoteCard
