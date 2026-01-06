"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TradeTypes } from "@/lib/const/common-details-const";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { type TradeModule, tradeSchema } from "@/lib/schema/admin/tradeSchema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";
import type z from "zod";

interface Props {
  auth: AuthContext;
  sector?: SectorModel;
  trade?: TradeModule;
}

const tradeBaseSchema = tradeSchema.pick({
  name: true,
  username: true,
  description: true,
  class_min: true,
  class_max: true,
  type: true,
  disable: true,
  sector_id: true,
  trade_id: true,
});

type TradeBase = z.infer<typeof tradeBaseSchema>;

const TradeForm = ({ trade, auth, sector }: Props) => {
  const [sectors, setSectors] = useState<SectorModel[]>([]);
  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Fetch options when component mounts
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [sectorsRes, tradesRes] = await Promise.all([
          sector
            ? { data: { data: [] } }
            : apiRequest<any, Paginated<SectorModel>>(
                "get",
                "/sectors",
                undefined,
                {
                  token: auth.token,
                },
              ),
          apiRequest<any, Paginated<TradeModule>>("get", "/trades", undefined, {
            token: auth.token,
          }),
        ]);

        if (sectorsRes.data?.data) {
          const activeSectors = sectorsRes.data.data.filter((s) => !s.disable);
          setSectors(activeSectors);
        }

        if (tradesRes.data?.data) {
          const activeTrades = tradesRes.data.data.filter((t) => !t.disable);
          setTrades(activeTrades);
        }
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth.token, sector]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    TradeBase,
    TradeModule
  >({
    schema: tradeBaseSchema,
    formOptions: {
      defaultValues: {
        name: trade?.name ?? "",
        username: trade?.username ?? "",
        description: trade?.description ?? "",
        class_min: trade?.class_min ?? 0,
        class_max: trade?.class_max ?? 0,
        type: trade?.type ?? undefined,
        disable: trade?.disable ?? false,
        sector_id: trade?.sector_id ?? sector?._id ?? undefined,
        trade_id: trade?.trade_id ?? undefined,
      },
    },

    request: {
      method: trade ? "put" : "post",
      url: `/trades${trade ? `/${trade._id}` : ""}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: trade
      ? "Trade updated successfully"
      : "Trade created successfully",

    toastOnError: true,

    onSuccess: () => {
      if (!trade) form.reset();
    },

    onError: (error, value) => {
      console.error("Failed to submit trade form:", error, value);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Left Side */}
        sectors= {sectors.length}
        <div className="flex flex-row gap-4">
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Name */}
            <CommonFormField
              control={form.control}
              name="name"
              label="Trade name"
              type="text"
              placeholder="e.g., Primary"
              disabled={isPending}
              required
            />

            <CommonFormField
              control={form.control}
              name="username"
              label="Username"
              type="text"
              placeholder="e.g., primary"
              required
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Description...."
              fieldType="textarea"
              className="min-h-24 resize-none"
              disabled={isPending}
            />
          </div>

          {/* Right Side */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Sector Select */}
            {!sector && (
              <CommonFormField
                control={form.control}
                name="sector_id"
                label="Sector"
                fieldType="searchSelect"
                placeholder={
                  loadingOptions ? "Loading sectors..." : "Select a sector"
                }
                disabled={isPending || loadingOptions}
                selectOptions={sectors.map((c) => ({
                  value: c._id,
                  label: c.name,
                }))}
              />
            )}
            {!sector && (
              <CommonFormField
                control={form.control}
                name="trade_id"
                label="Parent trade"
                fieldType="searchSelect"
                placeholder={
                  loadingOptions ? "Loading trades..." : "Select a trade"
                }
                disabled={isPending || loadingOptions}
                selectOptions={trades
                  .filter((t) => t._id || "")
                  .map((t) => ({
                    value: t._id || "",
                    label: t.name,
                  }))}
              />
            )}

            {/* Class Min/Max */}
            <div className="flex flex-row gap-2">
              <CommonFormField
                control={form.control}
                name="class_min"
                label="Class Min"
                placeholder="e.g., 1"
                fieldType="input"
                type="number"
                className="min-h-24 resize-none"
                disabled={isPending}
              />

              <CommonFormField
                control={form.control}
                name="class_max"
                label="Class max"
                placeholder="e.g., 1"
                fieldType="input"
                type="number"
                className="min-h-24 resize-none"
                disabled={isPending}
              />
            </div>
            <CommonFormField
              control={form.control}
              name="type"
              label="Trade type"
              placeholder="Select type"
              fieldType="select"
              selectOptions={TradeTypes.map((t) => ({
                label: t,
                value: t,
              }))}
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
            <Button library="daisy" type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="w-full sm:w-auto"
              library="daisy"
              role={isPending ? "loading" : undefined}
            >
              {trade ? "Update Trade" : "Add Trade"}
            </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TradeForm;
