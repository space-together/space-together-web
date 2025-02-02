import { Separator } from "@/components/ui/separator";
import React from "react";
import ClassTimetableHeader from "./ClassTimetableHeader";

type SlotType = "lesson" | "break" | "lunch";

interface Slot {
  type: SlotType;
  start: Date;
  end: Date;
  subject?: string;
}

function calculateTime(date: Date, minutes: number): Date {
  const updatedDate = new Date(date);
  updatedDate.setMinutes(updatedDate.getMinutes() + minutes);
  return updatedDate;
}

const ClassTimetable: React.FC = () => {
  const initialDate = new Date("2025-01-27T08:30:00");
  
  const lessonPlan: { [key in 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday']: string[] } = {
    Monday: ["Kinyarwanda", "English", "Math", "Break", "Math", "Lunch", "Science", "French", "Break", "Sport"],
    Tuesday: ["Math", "Physics", "Chemistry", "Break", "Biology", "Lunch", "English", "History", "Break", "Kiswahili"],
    Wednesday: ["French", "Math", "Break", "Kinyarwanda", "Lunch", "Social Studies", "Sports", "Break", "Geography", "ICT"],
    Thursday: ["Physics", "Kinyarwanda", "Break", "English", "Lunch", "Math", "Science", "Break", "History", "Sport"],
    Friday: ["Math", "English", "Break", "French", "Lunch", "Kinyarwanda", "Biology", "Break", "Chemistry", "ICT"],
  };

  const slots: { [key: string]: Slot[] } = {};

  Object.keys(lessonPlan).forEach((day) => {
    let currentDate = new Date(initialDate);
    slots[day as keyof typeof lessonPlan] = lessonPlan[day as keyof typeof lessonPlan].map((subject) => {
      const duration = subject === "Break" ? 20 : subject === "Lunch" ? 75 : 40;
      const slot = {
        type: subject === "Break" || subject === "Lunch" ? subject.toLowerCase() as SlotType : "lesson",
        start: new Date(currentDate),
        end: calculateTime(currentDate, duration),
        subject: subject !== "Break" && subject !== "Lunch" ? subject : undefined,
      };
      currentDate = new Date(slot.end);
      return slot;
    });
  });

  return (
    <div className="happy-card h-80 p-0">
      <ClassTimetableHeader />
      <Separator />
      <div className="p-4">
        <table className="border w-full">
          <thead>
            <tr>
              <th className="border p-2">Day</th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} className="border p-2">
                  Lesson {i + 1}
                  <br />
                  {slots[Object.keys(slots)[0]][i] &&
                    `${slots[Object.keys(slots)[0]][i].start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${slots[Object.keys(slots)[0]][i].end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(slots).map(([day, daySlots]) => (
              <tr key={day}>
                <td className="border p-2 font-bold">{day}</td>
                {daySlots.map((slot, index) => (
                  <td key={index} className="border p-2 text-center">
                    {slot.type === "lesson" ? slot.subject : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTimetable;
