import ClassHead from "@/components/app/class/classHead"
import ClassTimetable from "@/components/app/class/classTimetable"

const StudentPage = () => {
  return (
    <div className=" px-4">
      <ClassHead />
      <div>
        <ClassTimetable />
      </div>
    </div>
  )
}

export default StudentPage
