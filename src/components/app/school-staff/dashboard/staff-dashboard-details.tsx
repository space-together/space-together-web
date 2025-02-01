import { Locale } from '@/i18n'
import React from 'react'
import StaffPeople from './staff-people'
import StaffClasses from './staff-classes'

interface props {
  lang : Locale
}

const StaffDashboardDetails = ({lang} : props) => {
  return (
    <div className=' flex space-x-4'>
      <StaffPeople lang={lang}/>
      <StaffClasses lang={lang}/>
      <StaffPeople lang={lang}/>
    </div>
  )
}

export default StaffDashboardDetails
