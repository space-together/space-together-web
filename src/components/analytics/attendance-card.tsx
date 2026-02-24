"use client";

import CardError from "@/components/common/card-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useSWR from "swr";

interface AttendanceData {
  rate: number;
}

interface Props {
  token: string;
  schoolToken?: string;
}

export default function AttendanceCard({ token, schoolToken }: Props) {
  const { data, error, isLoading } = useSWR<AttendanceData>(
    "/analytics/attendance-rate",
    async (url: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(schoolToken && { "X-School-Token": schoolToken }),
        },
      });
      if (!response.ok) throw new Error("Failed to fetch attendance rate");
      return response.json();
    }
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <CardError />;
  }

  const rate = data?.rate ?? 0;
  const color =
    rate >= 85 ? "text-success" : rate >= 70 ? "text-warning" : "text-error";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Rate</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <div className={cn("text-6xl font-bold", color)}>
          {rate.toFixed(1)}%
        </div>
        <p className="text-muted-foreground mt-2">Overall Attendance</p>
      </CardContent>
    </Card>
  );
}
