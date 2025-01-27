import PostCard from '@/components/cards/post-card'
import SearchNotesClass from '@/components/class/notes/search-notes-class'
import React from 'react'

const ClassNotesPage = () => {
  return (
    <div className=' p-4'>
      <SearchNotesClass />
      <div className=' mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <PostCard postRole='NOTES'/>
        <PostCard postRole='NOTES'/>
        <PostCard postRole='NOTES'/>
        <PostCard postRole='NOTES'/>
        <PostCard postRole='NOTES'/>
      </div>
      <div className=' h-screen'/>
    </div>
  )
}

export default ClassNotesPage
