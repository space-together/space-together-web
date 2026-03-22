"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiselect";
import { AffiliationTypes } from "@/lib/const/common-details-const";
import { schoolEducationLevel } from "@/lib/context/school.context";
import type { Option } from "@/lib/schema/common-details-schema";
import {
  type AcademicDetailsDto,
  AcademicDetailsSchema,
} from "./schema/academic-details";

interface AcademicDetailsFormProps {
  initialData: AcademicDetailsDto;
}

const stringsToOptions = (items: string[] | null | undefined): Option[] => {
  if (!items) return [];
  return items.map((item) => ({ label: item, value: item }));
};

const optionsToStrings = (options: Option[] | null | undefined): string[] => {
  if (!options) return [];
  return options.map((option) => option.value);
};

export const AcademicDetailsForm = ({
  initialData,
}: AcademicDetailsFormProps) => {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useState(false);

  const form = useForm<AcademicDetailsDto>({
    resolver: zodResolver(AcademicDetailsSchema),
    defaultValues: {
      curriculum: initialData?.curriculum ?? [],
      educationLevel: initialData?.educationLevel ?? [],
      accreditationNumber: initialData?.accreditationNumber ?? undefined,
      affiliation: initialData?.affiliation ?? undefined,
    },
  });

  const handleSubmit = (values: AcademicDetailsDto) => {
    setError(null);
    startTransition(true);

    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
            Academic Details
          </h3>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CommonFormField
              control={form.control}
              name="educationLevel"
              label="Education Levels Offered"
              fieldType="custom"
              description="Select or add education levels provided."
              render={({ field, disabled }) => (
                <MultipleSelector
                  value={stringsToOptions(
                    Array.isArray(field.value) ? field.value : [],
                  )}
                  onChange={(options) =>
                    field.onChange(optionsToStrings(options))
                  }
                  defaultOptions={schoolEducationLevel}
                  placeholder="Select levels..."
                  creatable
                  hidePlaceholderWhenSelected
                  disabled={disabled}
                />
              )}
            />

            <CommonFormField
              control={form.control}
              name="accreditationNumber"
              label="Accreditation Number"
              placeholder="Optional accreditation number"
            />

            <CommonFormField
              control={form.control}
              name="affiliation"
              label="Affiliation"
              fieldType="select"
              placeholder="Select school affiliation"
              selectOptions={
                AffiliationTypes?.map((type) => ({
                  value: type,
                  label: type,
                })) ?? []
              }
            />
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
          {isPending ? "Saving..." : "Save Academic Details"}
        </Button>
      </form>
    </Form>
  );
};
