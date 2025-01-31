import { Button } from '@/components/ui/button'
import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaSchool } from 'react-icons/fa6'
import { MdClass } from 'react-icons/md'

const MessagesAsideLeftNavbar = () => {
  return (
    <div className=' w-16 h-screen border-r border-r-border p-2 space-y-4'>
      <Button shape='square'>
        <FaSchool size={24}/>
      </Button>
      <Button shape='square'>
        <MdClass size={24}/>
      </Button>
      <Button shape='square'>
        <AiOutlineSetting size={24}/>
      </Button>
    </div>
  )
}

export default MessagesAsideLeftNavbar
