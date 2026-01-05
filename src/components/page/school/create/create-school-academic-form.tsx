"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import CheckboxInputSkeleton from "@/components/common/skeletons/checkbox-input-skeleton";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import {
  createSchoolAcademicSchema,
  type createSchoolAcademic,
} from "@/lib/schema/school/create-school-schema";
import type {
  School,
  schoolAcademicResponse,
} from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Props {
  auth: AuthContext;
  school: School;
  isDialog?: boolean;
}

const CreateSchoolAcademicForm = ({ auth, school, isDialog }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [sectors, setSectors] = useState<SectorModel[]>([]);
  const [sectorTrades, setSectorTrades] = useState<
    Record<string, TradeModule[]>
  >({});
  const [loadingOptions, setLoadingOptions] = useState(true);

  const router = useRouter();

  // 1. Load initial sector list
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const sectorRes = await apiRequest<any, SectorModel[]>(
          "get",
          "/sectors",
          undefined,
          { token: auth.token },
        );

        if (sectorRes.data) {
          const available = sectorRes.data.filter((s) => !s.disable);
          setSectors(available);
        }
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, [auth.token]);

  // 2. Form Setup
  const form = useForm<createSchoolAcademic>({
    resolver: zodResolver(createSchoolAcademicSchema),
    defaultValues: {
      sector_ids: [],
      trade_ids: [],
    },
    mode: "onChange",
  });

  // 3. Fetch trades per selected sector (GROUPED)
  useEffect(() => {
    const selected = form.watch("sector_ids");

    if (!selected || selected.length === 0) {
      setSectorTrades({});
      form.setValue("trade_ids", []);
      return;
    }

    const loadTrades = async () => {
      const groups: Record<string, TradeModule[]> = {};

      for (const sectorId of selected) {
        const res = await apiRequest<any, TradeModule[]>(
          "get",
          `/trades/match?field=sector_id&value=${sectorId}`,
          undefined,
          { token: auth.token },
        );

        groups[sectorId] = res.data ? res.data.filter((t) => !t.disable) : [];
      }

      setSectorTrades(groups);

      // Remove selected trade IDs that are not valid anymore
      const allTrades = Object.values(groups).flat();
      form.setValue(
        "trade_ids",
        (form.watch("trade_ids") || []).filter((id) =>
          allTrades.some((t) => t._id === id),
        ),
      );
    };

    loadTrades();
  }, [form.watch("sector_ids"), auth.token]);

  // 4. Sector UI Items
  const sectorItems = useMemo(() => {
    if (!sectors || sectors.length === 0) return {};

    return Object.fromEntries(
      sectors.map((item) => [
        item._id,
        {
          name: item.name,
          image: item.logo,
          description: item.description,
        },
      ]),
    );
  }, [sectors]);

  // 5. Submit handler
  const handleSubmit = (values: createSchoolAcademic) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await apiRequest<
          createSchoolAcademic,
          schoolAcademicResponse
        >("post", `/schools/${school._id || school.id}/academics`, values, {
          token: auth.token,
        });

        if (!response.data) {
          setError(response.message);
          showToast({
            title: "Error",
            description: response.message,
            type: "error",
          });
        } else {
          setSuccess("School academic created successfully!");

          showToast({
            title: "School academic has been created.",
            description: (
              <main className="flex gap-2">
                <div>
                  <span>Classes: </span>
                  <span className="font-medium">
                    {response.data.created_classes}
                  </span>
                </div>
                <div>
                  <span>Subjects: </span>
                  <span className="font-medium">
                    {response.data.created_subjects}
                  </span>
                </div>
              </main>
            ),
            type: "success",
          });

          form.reset();
          router.push(`/s-t/new/${school.username}/administration`);
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  // 6. COMPONENT UI
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* SELECT SECTORS */}
        {loadingOptions ? (
          <div className=" flex flex-col gap-2">
            <Label>Educations (Sectors)</Label>
            <CheckboxInputSkeleton className=" grid-cols-1" />
          </div>
        ) : (
          <CommonFormField
            control={form.control}
            name="sector_ids"
            label="Educations (Sectors)"
            fieldType="checkbox-input"
            items={sectorItems}
            className="grid-cols-1"
            checkboxInputProps={{
              showDescription: true,
              items: sectorItems,
              className: "items-starts",
            }}
          />
        )}

        {/* GROUPED TRADES PER SECTOR */}
        {(form.watch("sector_ids") ?? []).map((sectorId) => {
          const sector = sectors.find((s) => s._id === sectorId);
          const trades = sectorTrades[sectorId] || [];

          const tradeItems = Object.fromEntries(
            trades.map((trade) => [
              trade._id,
              { name: trade.name, description: trade.description },
            ]),
          );

          return (
            <div key={sectorId} className="mt-4">
              <h5 className="h5">Trades for {sector?.name}</h5>

              <CommonFormField
                control={form.control}
                name="trade_ids"
                label=""
                fieldType="checkbox-input"
                items={tradeItems}
                className="grid grid-cols-1"
                checkboxInputProps={{
                  showDescription: true,
                  items: tradeItems,
                  className: "items-starts",
                }}
              />
            </div>
          );
        })}

        <FormError message={error} />
        <FormSuccess message={success} />

        {/* SUBMIT */}
        {isDialog ? (
          <DialogFooter className="px-6 pb-6 sm:justify-end">
            <DialogClose asChild>
              <Button library="daisy" type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="primary"
                disabled={isPending}
                library="daisy"
                role={isPending ? "loading" : undefined}
              >
                Add Academic
              </Button>
            </DialogClose>
          </DialogFooter>
        ) : (
          <div>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              library="daisy"
              role={isPending ? "loading" : undefined}
            >
              Add Academic
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CreateSchoolAcademicForm;
