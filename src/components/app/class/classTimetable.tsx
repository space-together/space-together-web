import { Separator } from "@/components/ui/separator";
import React from "react";
import ClassTimetableHeader from "./ClassTimetableHeader";

// Define the types for slots
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
  const endTime = new Date("2025-01-27T17:00:00"); // School ends at 17:00
  const lessonDuration = 40; // 40 minutes per lesson
  const firstBreakDuration = 20; // First break: 20 minutes
  const lunchDuration = 75; // Lunch: 75 minutes
  const secondBreakDuration = 15; // Second break: 15 minutes

  const slots: Slot[] = [];
  let currentDate = new Date(initialDate);

  // Helper to add slots
  const addSlot = (type: SlotType, duration: number): void => {
    const start = new Date(currentDate);
    const end = calculateTime(currentDate, duration);
    slots.push({ type, start, end });
    currentDate = new Date(end); // Update current date for the next slot
  };

  // Schedule layout
  // 1. Study 3 lessons
  for (let i = 0; i < 3; i++) addSlot("lesson", lessonDuration);

  // 2. First break (20 min)
  addSlot("break", firstBreakDuration);

  // 3. Study 2 lessons
  for (let i = 0; i < 2; i++) addSlot("lesson", lessonDuration);

  // 4. Lunch break (75 min)
  addSlot("lunch", lunchDuration);

  // 5. Study 3 lessons
  for (let i = 0; i < 3; i++) addSlot("lesson", lessonDuration);

  // 6. Second break (15 min)
  addSlot("break", secondBreakDuration);

  // 7. Study 2 lessons
  for (let i = 0; i < 2; i++) addSlot("lesson", lessonDuration);

  // Validation: Ensure no time goes beyond 17:00
  if (currentDate > endTime) {
    console.warn("Timetable exceeds the school's end time!");
  }

  return (
    <div className="happy-card h-80 p-0">
      <ClassTimetableHeader />
      <Separator />
      <div className="p-4">
        {/* Render Timetable */}
        <div className="flex justify-between border border-border">
          {/* {slots.map((slot, index) => (
            <div
              key={index}
              className="p-2 border-l flex justify-center items-center w-full flex-col"
            >
              <span>
                {slot.type === "lesson"
                  ? `Lesson ${Math.ceil((index + 1) / 2)}`
                  : slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
              </span>
              <div className="text-xs flex gap-1 flex-col">
                <span>{slot.start.toLocaleTimeString()}</span>-
                <span>{slot.end.toLocaleTimeString()}</span>
              </div>
            </div>
          ))} */}
          
        </div>
      </div>
    </div>
  );
};

export default ClassTimetable;
