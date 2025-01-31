import { Button } from '@/components/ui/button'
import React from 'react'
import { LuMessageCircle } from 'react-icons/lu'

const MessagesPage = () => {
  return (
    <div className=' w-full h-screen grid place-content-center'>
      <Button variant='info'>
        <LuMessageCircle />
        Start conversation
      </Button>
    </div>
  )
}

export default MessagesPage
