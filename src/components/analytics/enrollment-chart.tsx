"use client";

import CardError from "@/components/common/card-error";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import useSWR from "swr";

interface EnrollmentData {
  month: string;
  students: number;
}

interface Props {
  token: string;
  schoolToken?: string;
}

const chartConfig = {
  students: {
    label: "Students",
    color: "#0088ff",
  },
} satisfies ChartConfig;

export default function EnrollmentChart({ token, schoolToken }: Props) {
  const { data, error, isLoading } = useSWR<EnrollmentData[]>(
    "/analytics/enrollment-trends",
    async (url: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(schoolToken && { "X-School-Token": schoolToken }),
        },
      });
      if (!response.ok) throw new Error("Failed to fetch enrollment trends");
      return response.json();
    }
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <CardError />;
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No enrollment data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="students"
                stroke="var(--color-students)"
                strokeWidth={2}
                dot={{ fill: "var(--color-students)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
