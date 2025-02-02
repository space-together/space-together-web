import { Separator } from "@/components/ui/separator";
import React from "react";
import ClassTimetableHeader from "./ClassTimetableHeader";

const timetable = {
  Monday: {
    Kinyarwanda: 2,
    English: 1,
    Math: 4,
    Kiswahili: 1,
    French: 0,
    "Social Studies": 1,
    Sport: 1,
    "Free Time": 1,
  },
  Tuesday: {
    Kinyarwanda: 1,
    English: 2,
    Math: 2,
    Kiswahili: 2,
    French: 1,
    "Social Studies": 1,
    Sport: 1,
    "Free Time": 1,
  },
  Wednesday: {
    Kinyarwanda: 2,
    English: 1,
    Math: 1,
    Kiswahili: 0,
    French: 3,
    "Social Studies": 2,
    Sport: 1,
    "Free Time": 1,
  },
  Thursday: {
    Kinyarwanda: 1,
    English: 3,
    Math: 2,
    Kiswahili: 1,
    French: 1,
    "Social Studies": 1,
    Sport: 1,
    "Free Time": 1,
  },
  Friday: {
    Kinyarwanda: 1,
    English: 2,
    Math: 2,
    Kiswahili: 1,
    French: 2,
    "Social Studies": 1,
    Sport: 2,
    "Free Time": 1,
  },
};

const ClassTimetable: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <ClassTimetableHeader />
      <Separator />
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Day</th>
              {Object.keys(timetable.Monday).map((subject) => (
                <th key={subject} className="border p-2">
                  {subject}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(timetable).map(([day, subjects]) => (
              <tr key={day} className="text-center">
                <td className="border p-2 font-bold bg-gray-100">{day}</td>
                {Object.values(subjects).map((hours, index) => (
                  <td key={index} className="border p-2">
                    {hours} hrs
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
