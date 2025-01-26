import React from 'react'
import { Separator } from '@/components/ui/separator'
import PostCardHeader from './post-card-header'
import PostCardFooter from './post-card-footer'

const NoteCard = () => {
  return (
    <div className=" happy-card p-0">
        <PostCardHeader />
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
        <Separator />
        <PostCardFooter postRole='NOTES'/>
      </div>
  )
}

export default NoteCard
