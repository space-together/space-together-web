import { Separator } from "@/components/ui/separator";
import React from "react";
import ClassTimetableHeader from "./ClassTimetableHeader";

// Define slot types
type SlotType = "lesson" | "break" | "lunch";

interface Slot {
  type: SlotType;
  start: Date;
  end: Date;
}

function calculateTime(date: Date, minutes: number): Date {
  const updatedDate = new Date(date); // Clone the original date
  updatedDate.setMinutes(updatedDate.getMinutes() + minutes);
  return updatedDate;
}

const ClassTimetable: React.FC = () => {
  const initialDate = new Date("2025-01-27T08:30:00"); // School starts at 08:30
  // const endTime = new Date("2025-01-27T17:00:00"); // School ends at 17:00
  const lessonDuration = 40; // 40 minutes per lesson
  const firstBreakDuration = 20; // 20-minute first break
  const lunchDuration = 75; // 75-minute lunch
  const secondBreakDuration = 15; // 15-minute second break

  const slots: Slot[] = [];
  let currentDate = new Date(initialDate);

  // Helper to add slots
  const addSlot = (type: SlotType, duration: number): void => {
    const start = new Date(currentDate);
    const end = calculateTime(currentDate, duration);
    slots.push({ type, start, end });
    currentDate = new Date(end); // Update current time for the next slot
  };

  // Generate the schedule:
  for (let i = 0; i < 3; i++) addSlot("lesson", lessonDuration); // 3 lessons
  addSlot("break", firstBreakDuration); // 20 min break
  for (let i = 0; i < 2; i++) addSlot("lesson", lessonDuration); // 2 lessons
  addSlot("lunch", lunchDuration); // 75 min lunch
  for (let i = 0; i < 3; i++) addSlot("lesson", lessonDuration); // 3 lessons
  addSlot("break", secondBreakDuration); // 15 min break
  for (let i = 0; i < 2; i++) addSlot("lesson", lessonDuration); // 2 lessons

  return (
    <div className="happy-card p-4">
      <ClassTimetableHeader />
      <Separator />
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          {/* <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Time</th>
              {slots.map((slot, index) => (
                <th key={index} className="border p-2 text-center">
                  <div
                    className={`border p-2 text-center ${
                      slot.type === "break"
                        ? "bg-yellow-200"
                        : slot.type === "lunch"
                        ? "bg-red-200"
                        : "bg-green-200"
                    }`}
                  >
                    {slot.type === "lesson"
                      ? `Lesson ${Math.ceil((index + 1) / 2)}`
                      : slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
                  </div>
                  {slot.start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <br />-
                  <br />
                  {slot.end.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </th>
              ))}
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <td className="border p-2 font-bold">Schedule</td>
              {/* BODY OF TABLE */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTimetable;
