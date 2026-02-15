import AppPageHeader from "@/components/page/common/app-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { authContext } from "@/lib/utils/auth-context";
import { parentService } from "@/service/parent/parent.service";
import { format } from "date-fns";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Student Finance",
    description: "View student fee and payment information",
  };
};

export default async function FinancePage(
  props: PageProps<"/[lang]/pr/finance/[studentId]">,
) {
  const params = await props.params;
  const { lang, studentId } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const finance = await parentService.getFinanceSummary(studentId, {
    token: auth.token,
    schoolToken: auth.schoolToken,
  });

  if (!finance) {
    return (
      <div className="container mx-auto p-6">
        <AppPageHeader
          title="Finance"
          description="Student fee and payment information"
        />
        <div className="mt-6">
          <p className="text-muted-foreground">
            Unable to load finance data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <AppPageHeader
        title={`Finance - ${finance.student_name}`}
        description="View fee balance and payment history"
      />

      <div className="mt-6 space-y-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finance.payment_history.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {format(new Date(payment.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{payment.payment_method || "-"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {payment.reference || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
