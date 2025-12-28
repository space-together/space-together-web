import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TimetableSlot {
  time: string
  subject?: string
  extra?: string
  isBreak?: boolean
  breakLabel?: string
}

const schedule: TimetableSlot[] = [
  { time: "9:00 - 9:40", subject: "L3 SOD", extra: "Kiny" },
  { time: "9:40 - 10:20", subject: "L3 SOD", extra: "Kiny" },
  { time: "10:20 - 11:00", subject: "L3 SOD", extra: "Kiny" },
  { time: "11:20 - 11:40", isBreak: true, breakLabel: "Morning Break" },
  { time: "11:40 - 12:20", subject: "L3 SOD", extra: "Kiny" },
  { time: "12:20 - 13:00", subject: "L3 SOD", extra: "Kiny" },
  { time: "13:00 - 14:00", isBreak: true, breakLabel: "Lunch time" },
  { time: "14:00 - 14:40", subject: "L3 SOD", extra: "Kiny" },
  { time: "14:40 - 15:20", subject: "L3 SOD", extra: "Kiny" },
  { time: "15:20 - 15:40", isBreak: true, breakLabel: "Break" },
  { time: "15:40 - 16:20", subject: "L3 SOD", extra: "Kiny" },
  { time: "16:20 - 17:00", subject: "L3 SOD", extra: "Kiny" },
]

const TeacherTimetable = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 ">
      <div className="flex items-center justify-between py-3">
        <h1 className="text-[20px] font-normal  ">Teacher timetable</h1>
        <div className="flex items-center gap-1 cursor-pointer">
          <Button size={"sm"} library="daisy" variant="info">Monday <ChevronDown className="h-4 w-4 stroke-[1.5]" /></Button>  
        </div>
      </div>


      <div className="grid grid-cols-6 ">
        {schedule.map((slot, index) => (
          <div
            key={index}
            className={cn(
              "h-[72px]    p-4 space-y-2 flex flex-col justify-between",
              slot.isBreak ? " bg-black   " : " ",
            )}
          >
            
            <div className="text-xl text-white font-normal leading-none">{slot.time}</div>

            
            {slot.isBreak ? (
              <div className="flex items-center justify-center flex-1 ">
                <div className="text-xl text-gray-300 font-normal">{slot.breakLabel}</div>
              </div>
            ) : (
              <div className="flex  items-end justify-between w-full">
                <div className="text-xl text-gray-300 font-normal">{slot.subject}</div>
                <div className="text-xl text-gray-300 font-normal">{slot.extra}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeacherTimetable;