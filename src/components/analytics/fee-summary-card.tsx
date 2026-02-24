"use client";

import CardError from "@/components/common/card-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

interface FeeData {
  totalExpected: number;
  totalCollected: number;
  outstanding: number;
  collectionRate: number;
}

interface Props {
  token: string;
  schoolToken?: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function FeeSummaryCard({ token, schoolToken }: Props) {
  const { data, error, isLoading } = useSWR<FeeData>(
    "/analytics/fee-summary",
    async (url: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(schoolToken && { "X-School-Token": schoolToken }),
        },
      });
      if (!response.ok) throw new Error("Failed to fetch fee summary");
      return response.json();
    }
  );

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <CardError />;
  }

  const stats = [
    {
      title: "Total Expected",
      value: formatCurrency(data?.totalExpected ?? 0),
      color: "text-primary",
    },
    {
      title: "Total Collected",
      value: formatCurrency(data?.totalCollected ?? 0),
      color: "text-success",
    },
    {
      title: "Outstanding",
      value: formatCurrency(data?.outstanding ?? 0),
      color: "text-warning",
    },
    {
      title: "Collection Rate",
      value: `${(data?.collectionRate ?? 0).toFixed(1)}%`,
      color: "text-info",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
