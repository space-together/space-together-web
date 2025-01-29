import React from 'react'
import CreateNewPostInSchool from './create-new-post-in-school'
import { FaSignsPost } from 'react-icons/fa6'
import PostCard from '@/components/cards/post-card'
import { Locale } from '@/i18n'

interface props {
    lang : Locale
}

const SchoolHomePosts = ({lang} : props) => {
  return (
    <div className=' w-1/2 space-y-2'>
      <CreateNewPostInSchool />
      <div>
      <div className=" space-y-2">
        <div className=" space-x-1 flex items-center">
          <FaSignsPost />
          <h2 className=" font-semibold">Posts</h2>
        </div>
        <div className=" grid grid-cols-1 w-full gap-4">
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="TEXT" />
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="TEXT" />
        </div>
        <div className=" happy-card justify-center items-center flex-row">
          <span className=" link">See More</span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SchoolHomePosts
