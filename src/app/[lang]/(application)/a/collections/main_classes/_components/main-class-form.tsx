"use client";

import { useEffect, useState } from "react";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  type MainClassModel,
  mainClassSchema,
} from "@/lib/schema/admin/main-classes-schema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthContext;
  trade?: TradeModule; // parent trade (optional)
  mainClass?: MainClassModel; // edit mode
}

const MainClassForm = ({ auth, trade, mainClass }: Props) => {
  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        if (trade) return;

        const res = await apiRequest<any, Paginated<TradeModule>>(
          "get",
          "/trades",
          undefined,
          { token: auth.token },
        );

        if (res.data?.data) {
          setTrades(res.data.data.filter((t) => !t.disable));
        }
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchTrades();
  }, [auth.token, trade]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    MainClassModel,
    MainClassModel
  >({
    schema: mainClassSchema,

    formOptions: {
      defaultValues: {
        name: mainClass?.name ?? "",
        username: mainClass?.username ?? "",
        description: mainClass?.description ?? "",
        trade_id: mainClass?.trade_id ?? trade?._id ?? trade?.id ?? undefined,
        level: mainClass?.level ?? 1,
        disable: mainClass?.disable ?? false,
      },
    },

    request: {
      method: mainClass ? "put" : "post",
      url: `/main-classes${mainClass ? `/${mainClass._id}` : ""}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: mainClass
      ? "Main class updated successfully"
      : "Main class created successfully",

    toastOnError: true,

    onSuccess: () => {
      if (!mainClass) form.reset();
    },

    onError: (err, values) => {
      console.error("MainClass submit error:", err, values);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-row gap-4">
          {/* Left */}
          <div className="flex w-1/2 flex-col space-y-4">
            <CommonFormField
              control={form.control}
              name="name"
              label="Main class name"
              placeholder="e.g., Senior 1"
              required
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="username"
              label="Username"
              placeholder="e.g., senior-1"
              required
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="description"
              label="Description"
              fieldType="textarea"
              placeholder="Description..."
              className="min-h-24 resize-none"
              disabled={isPending}
            />
          </div>

          {/* Right */}
          <div className="flex w-1/2 flex-col space-y-4">
            {!trade && (
              <CommonFormField
                control={form.control}
                name="trade_id"
                label="Trade"
                fieldType="searchSelect"
                placeholder={
                  loadingOptions ? "Loading trades..." : "Select trade"
                }
                disabled={isPending || loadingOptions}
                selectOptions={trades.map((t) => ({
                  value: t._id || t.id || "",
                  label: t.name,
                }))}
              />
            )}

            <CommonFormField
              control={form.control}
              name="level"
              label="Level"
              type="number"
              placeholder="e.g., 1"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="disable"
              label="Disable"
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
          >
            {mainClass ? "Update Main Class" : "Add Main Class"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default MainClassForm;
