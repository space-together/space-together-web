"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinanceSummary } from "@/lib/schema/parent/parent-schema";

interface ParentFinanceSummaryProps {
  finance: FinanceSummary;
}

export default function ParentFinanceSummary({
  finance,
}: ParentFinanceSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Required</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            ${finance.total_required.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Amount Paid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            ${finance.amount_paid.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-600">
            ${finance.outstanding_balance.toFixed(2)}
          </div>
          <span
            className={`badge badge-sm mt-2 ${
              finance.status === "PAID"
                ? "badge-success"
                : finance.status === "PARTIAL"
                  ? "badge-warning"
                  : "badge-error"
            }`}
          >
            {finance.status}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
