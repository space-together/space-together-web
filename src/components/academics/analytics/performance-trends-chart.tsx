"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePerformanceTrends } from "@/lib/hooks/academics/useAnalytics";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface PerformanceTrendsChartProps {
  auth: AuthContext;
}

export default function PerformanceTrendsChart({ auth }: PerformanceTrendsChartProps) {
  const { trends, isLoading } = usePerformanceTrends(
    auth.token,
    auth.schoolToken || undefined,
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading trends...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>School-wide performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis yAxisId="left" domain={[0, 4]} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="average_gpa"
              stroke="#8884d8"
              strokeWidth={2}
              name="Average GPA"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="pass_rate"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Pass Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
