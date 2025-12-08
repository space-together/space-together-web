"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  useFieldArray,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface TermInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function TermInput<T extends FieldValues>({
  control,
  name,
}: TermInputProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as any,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Terms</h3>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              name: "",
              order: "",
              start_date: "",
              end_date: "",
            } as any)
          }
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Term
        </Button>
      </div>

      {/* All Terms */}
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <SingleTermItem
            key={field.id}
            control={control}
            name={`${name}.${index}` as FieldPath<T>}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface TermItemProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  onRemove: () => void;
}

function SingleTermItem<T extends FieldValues>({
  control,
  name,
  onRemove,
}: TermItemProps<T>) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-l rounded-l-none border-base-content/20 p-3 bg-base-200">
      {/* Collapsible Header */}
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-left"
          type="button"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}

          <span className="font-semibold">Term</span>
        </button>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Body */}
      {open && (
        <div className="mt-3 flex flex-col gap-3">
          <CommonFormField
            control={control}
            name={`${name}.order` as FieldPath<T>}
            label="Order"
            placeholder="1"
            type="number"
            fieldType="input"
          />

          <CommonFormField
            control={control}
            name={`${name}.name` as FieldPath<T>}
            label="Term Name"
            placeholder="Term 1"
            fieldType="input"
          />

          <CommonFormField
            control={control}
            name={`${name}.start_date` as FieldPath<T>}
            label="Start Date"
            type="date"
            fieldType="date"
          />

          <CommonFormField
            control={control}
            name={`${name}.end_date` as FieldPath<T>}
            label="End Date"
            type="date"
            fieldType="date"
          />
        </div>
      )}
    </div>
  );
}
