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
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import useSWR from "swr";

interface PassFailData {
  pass: number;
  fail: number;
}

interface Props {
  token: string;
  schoolToken?: string;
}

const chartConfig = {
  pass: {
    label: "Pass",
    color: "#10b981",
  },
  fail: {
    label: "Fail",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export default function PassFailChart({ token, schoolToken }: Props) {
  const { data, error, isLoading } = useSWR<PassFailData>(
    "/analytics/pass-fail",
    async (url: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(schoolToken && { "X-School-Token": schoolToken }),
        },
      });
      if (!response.ok) throw new Error("Failed to fetch pass/fail data");
      return response.json();
    }
  );

  const chartData = useMemo(() => {
    if (!data) return [];
    return [
      { status: "pass", count: data.pass, fill: "var(--color-pass)" },
      { status: "fail", count: data.fail, fill: "var(--color-fail)" },
    ];
  }, [data]);

  const total = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pass / Fail Distribution</CardTitle>
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

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pass / Fail Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No performance data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pass / Fail Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-primary-content text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
