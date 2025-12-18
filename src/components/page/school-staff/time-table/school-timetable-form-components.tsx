"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useWatch, type Control } from "react-hook-form";
import type { SchoolTimetableFormType } from "./school-timetable-form";

export const TimeBlockList = ({
  control,
  dayIndex,
  name,
  label,
  namePrefix,
}: {
  control: Control<SchoolTimetableFormType>;
  dayIndex: number;
  name: "breaks" | "activities";
  label: string;
  namePrefix?: string;
}) => {
  const basePath = namePrefix
    ? `${namePrefix}.${dayIndex}.${name}`
    : `default_weekly_schedule.${dayIndex}.${name}`;
  const { fields, append, remove } = useFieldArray({
    control,
    name: basePath as any,
  });

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: "",
              start_time: "10:00",
              end_time: "10:30",
              description: "",
            })
          }
        >
          <Plus className="w-3 h-3 mr-1" /> Add {label}
        </Button>
      </div>

      {fields.map((field, index) => (
        <Card key={field.id} className="p-3 bg-muted/30">
          <div className="flex gap-4 items-start">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1">
              <div className="md:col-span-4">
                <CommonFormField
                  control={control}
                  name={`${basePath}.${index}.title` as any}
                  label="Title"
                  placeholder="e.g. Recess"
                  required
                />
              </div>
              <div className="md:col-span-3">
                <CommonFormField
                  control={control}
                  name={`${basePath}.${index}.start_time` as any}
                  label="Start"
                  fieldType="time"
                  required
                />
              </div>
              <div className="md:col-span-3">
                <CommonFormField
                  control={control}
                  name={`${basePath}.${index}.end_time` as any}
                  label="End"
                  fieldType="time"
                  required
                />
              </div>
              <div className="md:col-span-2">
                {/* Optional description if needed, or remove to save space */}
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-error mt-8"
              onClick={() => remove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
      {fields.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No {label.toLowerCase()} added.
        </p>
      )}
    </div>
  );
};

export const DailyScheduleCard = ({
  control,
  index,
  dayName,
  removeDay,
  namePrefix,
}: {
  control: Control<SchoolTimetableFormType>;
  index: number;
  dayName: string;
  removeDay?: (index: number) => void;
  namePrefix?: string;
}) => {
  const basePath = namePrefix
    ? `${namePrefix}.${index}`
    : `default_weekly_schedule.${index}`;
  // Watch is_school_day to conditional render fields
  const isSchoolDay = useWatch({
    control,
    name: `${basePath}.is_school_day` as any,
  });

  return (
    <AccordionItem value={dayName} className="border rounded-lg px-4 mb-2">
      <AccordionTrigger className="hover:no-underline py-3">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-semibold">{dayName}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              isSchoolDay
                ? "bg-success/10 text-success"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isSchoolDay ? "School Day" : "Day Off"}
          </span>
        </div>

        {/* Remove Day Button */}
        {removeDay && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-error"
            onClick={(e) => {
              e.stopPropagation(); // prevent accordion toggle
              removeDay(index);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </AccordionTrigger>

      <AccordionContent className="pt-2 pb-4 flex flex-col gap-6">
        {/* Day Configuration */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 pt-2">
            <CommonFormField
              control={control}
              name={`${basePath}.is_school_day` as any}
              label="Is School Day?"
              fieldType="checkbox"
            />
            <div className="mt-4">
              <CommonFormField
                control={control}
                name={`${basePath}.special_type` as any}
                label="Day Type"
                fieldType="select"
                selectOptions={[
                  { label: "Normal", value: "Normal" },
                  { label: "Half Day", value: "HalfDay" },
                  { label: "Holiday", value: "Holiday" },
                  { label: "Exam Day", value: "ExamDay" },
                ]}
              />
            </div>
          </div>

          {isSchoolDay && (
            <div className="w-full md:w-3/4 grid grid-cols-2 gap-4 border-l pl-0 md:pl-6">
              <CommonFormField
                control={control}
                name={`${basePath}.school_start_time` as any}
                label="School Starts"
                fieldType="time"
                required
              />
              <CommonFormField
                control={control}
                name={`${basePath}.school_end_time` as any}
                label="School Ends"
                fieldType="time"
                required
              />
              <CommonFormField
                control={control}
                name={`${basePath}.study_start_time` as any}
                label="Study Starts"
                fieldType="time"
              />
              <CommonFormField
                control={control}
                name={`${basePath}.study_end_time` as any}
                label="Study Ends"
                fieldType="time"
              />
            </div>
          )}
        </div>

        {isSchoolDay && (
          <>
            <Separator />
            {/* Lunch Section - Optional object in schema */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Lunch Break
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CommonFormField
                  control={control}
                  name={`${basePath}.lunch.title` as any}
                  label="Title"
                  placeholder="Lunch"
                />
                <CommonFormField
                  control={control}
                  name={`${basePath}.lunch.start_time` as any}
                  label="Start"
                  fieldType="time"
                />
                <CommonFormField
                  control={control}
                  name={`${basePath}.lunch.end_time` as any}
                  label="End"
                  fieldType="time"
                />
              </div>
            </div>

            <Separator />

            {/* Arrays */}
            <TimeBlockList
              control={control}
              dayIndex={index}
              name="breaks"
              label="Breaks"
              namePrefix={namePrefix}
            />
            <TimeBlockList
              control={control}
              dayIndex={index}
              name="activities"
              label="Activities"
              namePrefix={namePrefix}
            />
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
