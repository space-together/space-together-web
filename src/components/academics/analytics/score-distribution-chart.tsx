"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScoreDistribution } from "@/lib/hooks/academics/useAnalytics";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ScoreDistributionChartProps {
  classId: string;
  examId: string;
  auth: AuthContext;
}

export default function ScoreDistributionChart({
  classId,
  examId,
  auth,
}: ScoreDistributionChartProps) {
  const { distribution, isLoading } = useScoreDistribution(
    classId,
    examId,
    auth.token,
    auth.schoolToken || undefined,
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading distribution...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score Distribution</CardTitle>
        <CardDescription>Distribution of scores across grade ranges</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Students" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
