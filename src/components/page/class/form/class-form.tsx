"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";

import apiRequest from "@/service/api-client";

import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import {
  CreateClassSchema,
  type Class,
  type CreateClass,
} from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";

interface Props {
  auth: AuthContext;
  isSchool?: boolean;
  trade?: TradeModule;
  cls?: Class;
}

const ClassForm = ({ auth, trade, cls, isSchool }: Props) => {
  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingTrades, setLoadingTrades] = useState(true);

  // -------------------------------------
  // Fetch trades (only when needed)
  // -------------------------------------
  useEffect(() => {
    if (trade) {
      setLoadingTrades(false);
      return;
    }

    const loadTrades = async () => {
      try {
        const res = await apiRequest<void, TradeModule[]>(
          "get",
          "/trades",
          undefined,
          { token: auth.token },
        );

        setTrades(res.data?.filter((t) => !t.disable) ?? []);
      } finally {
        setLoadingTrades(false);
      }
    };

    loadTrades();
  }, [auth.token, trade]);

  // -------------------------------------
  // Form logic (same pattern as School & Student)
  // -------------------------------------
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    CreateClass,
    Class
  >({
    schema: CreateClassSchema,

    formOptions: {
      defaultValues: {
        name: cls?.name ?? "",
        username: cls?.username ?? "",
        description: cls?.description ?? "",
        is_active: cls?.is_active ?? true,
        type: cls?.type ?? "Private",
        capacity: cls?.capacity ?? 45,
        grade_level: cls?.grade_level ?? "",
        image: cls?.image ?? undefined,
        trade_id: cls?.trade_id,
        creator_id: cls?.creator_id ?? auth.user.id,
        school_id:
          cls?.school_id ??
          (isSchool && auth.school ? auth.school.id : undefined),
      },
    },

    request: {
      method: cls ? "put" : "post",
      url: cls
        ? isSchool
          ? `/school/classes/${cls._id || cls.id}`
          : `/classes/${cls._id || cls.id}`
        : isSchool
          ? "/school/classes"
          : "/classes",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: cls
      ? "Class updated successfully"
      : "Class created successfully",

    toastOnError: true,

    onSuccess: () => {
      if (!cls) form.reset();
    },
  });

  // -------------------------------------
  // Render
  // -------------------------------------
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="image"
              label="Class Profile Image"
              fieldType="avatar"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="name"
              label="Class Name"
              required
              placeholder="Class name"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="username"
              label="Username"
              required
              placeholder="Unique class username"
              disabled={isPending}
            />
          </div>

          {/* Right column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="capacity"
              label="Capacity"
              type="number"
              inputProps={{ min: 5, max: 80 }}
              placeholder="Number of students"
              disabled={isPending}
            />

            {!trade && (
              <CommonFormField
                control={form.control}
                name="trade_id"
                label="Trade"
                fieldType="searchSelect"
                placeholder={
                  loadingTrades ? "Loading trades..." : "Select trade"
                }
                disabled={isPending || loadingTrades}
                selectOptions={trades.map((t) => ({
                  value: String(t.id ?? t._id),
                  label: t.name,
                }))}
              />
            )}

            <CommonFormField
              control={form.control}
              name="grade_level"
              label="Grade Level"
              placeholder="Grade level"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="description"
              label="Description"
              fieldType="textarea"
              placeholder="Class description"
              className="min-h-24 resize-none"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="is_active"
              label="Active"
              fieldType="checkbox"
              disabled={isPending}
            />
          </div>
        </div>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" library="daisy">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="info"
            library="daisy"
            disabled={isPending}
            role={isPending ? "loading" : undefined}
          >
            {cls ? "Update Class" : "Add Class"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ClassForm;
