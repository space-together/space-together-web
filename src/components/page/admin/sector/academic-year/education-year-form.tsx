"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  EducationYearSchema,
  type EducationYear,
} from "@/lib/schema/admin/education-year-schema";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";
import { TermInput } from "./term-input";

interface EducationYearFormProps {
  year?: EducationYear;
  auth: AuthContext;
  sector?: SectorModel;
}

const EducationYearForm = ({ year, auth, sector }: EducationYearFormProps) => {
  const { showToast } = useToast();

  const [sectors, setSectors] = useState<SectorModel[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const [sectorsRes] = await Promise.all([
          apiRequest<void, SectorModel[]>("get", "/sectors", undefined, {
            token: auth.token,
          }),
        ]);

        if (sectorsRes.data) {
          setSectors(sectorsRes.data);
        }
      } catch (error) {
        showToast({
          title: "Error to get class or class subjects",
          description: `"Failed to fetch main classes:", ${error}`,
          type: "error",
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchSectors();
  }, [auth.token, showToast, sectors]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    EducationYear,
    EducationYear
  >({
    schema: EducationYearSchema,
    formOptions: {
      defaultValues: {
        label: year?.label || "",
        curriculum_id: year?.curriculum_id || "",
        start_date: year?.start_date || "",
        end_date: year?.end_date || "",
        terms: year?.terms || [],
      },
    },
    transform: (values) => ({
      ...values,
      curriculum_id: sector?._id ? sector._id : values?.curriculum_id || "",
      terms: values.terms.map((term) => ({
        ...term,
        order:
          typeof term.order === "string" ? parseInt(term.order) : term.order,
      })),
    }),
    request: {
      method: year ? "put" : "post",
      url: year
        ? `/education-years/${year._id || year.id}`
        : "/education-years",
      apiRequest: {
        token: auth.token,
      },
    },
    onSuccessMessage: year
      ? "Education year updated successfully"
      : "Education year created successfully",
    toastOnError: true,
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full flex flex-col gap-4"
      >
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className=" flex flex-col gap-4 lg:w-1/2">
            <CommonFormField
              label="Label"
              name="label"
              type="text"
              fieldType="input"
              placeholder="eg: 2025-2026"
              required
              control={form.control}
            />
            {!sector && (
              <div className=" w-fill">
                {loadingOptions ? (
                  <div className="skeleton h-12 rounded-md" />
                ) : (
                  <CommonFormField
                    label="Curriculum "
                    name="curriculum_id"
                    fieldType="searchSelect"
                    placeholder="Select classes"
                    control={form.control}
                    selectOptions={sectors.map((item) => ({
                      value: item._id || "",
                      label: `${item.name} `,
                      disable: item.disable,
                    }))}
                  />
                )}
              </div>
            )}

            <CommonFormField
              label="Start Date"
              name="start_date"
              type="date"
              fieldType="date"
              placeholder="Start Date"
              required
              control={form.control}
            />
            <CommonFormField
              label="End Date"
              name="end_date"
              type="date"
              fieldType="date"
              placeholder="End Date"
              required
              control={form.control}
            />
          </div>
          <div className=" flex flex-col gap-4 lg:w-1/2">
            <TermInput control={form.control} name="terms" />
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />

        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" library="daisy">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="info"
            disabled={isPending}
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
            library="daisy"
          >
            {year ? "Update education Year" : "Add education Year"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EducationYearForm;
