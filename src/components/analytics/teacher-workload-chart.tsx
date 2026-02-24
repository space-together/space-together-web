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
    ChartTooltip
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import useSWR from "swr";

interface TeacherWorkload {
  name: string;
  classes: number;
  subjects?: string[];
  totalStudents?: number;
}

interface Props {
  token: string;
  schoolToken?: string;
}

const chartConfig = {
  classes: {
    label: "Classes",
    color: "#0088ff",
  },
} satisfies ChartConfig;

export default function TeacherWorkloadChart({ token, schoolToken }: Props) {
  const { data, error, isLoading } = useSWR<TeacherWorkload[]>(
    "/analytics/teacher-workload",
    async (url: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(schoolToken && { "X-School-Token": schoolToken }),
        },
      });
      if (!response.ok) throw new Error("Failed to fetch teacher workload");
      return response.json();
    }
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Teacher Workload</CardTitle>
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
          <CardTitle>Teacher Workload</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No teacher workload data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teacher Workload</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
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
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as TeacherWorkload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm">Classes: {data.classes}</p>
                        {data.totalStudents && (
                          <p className="text-sm">
                            Students: {data.totalStudents}
                          </p>
                        )}
                        {data.subjects && data.subjects.length > 0 && (
                          <p className="text-sm">
                            Subjects: {data.subjects.join(", ")}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="classes"
                fill="var(--color-classes)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
