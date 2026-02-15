"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { usePromotionPreview } from "@/lib/hooks/academics/usePromotions";
import type { AuthContext } from "@/lib/utils/auth-context";
import { promotionService } from "@/service/academics/promotion.service";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PromotionPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  educationYearId: string;
  classId: string;
  auth: AuthContext;
}

export default function PromotionPreviewDialog({
  open,
  onClose,
  educationYearId,
  classId,
  auth,
}: PromotionPreviewDialogProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const { preview, isLoading } = usePromotionPreview(
    educationYearId,
    classId,
    auth.token,
    auth.schoolToken || undefined,
  );

  const handleExecute = async () => {
    if (!confirm("Are you sure you want to execute this promotion batch? This action cannot be undone.")) {
      return;
    }

    setIsExecuting(true);
    try {
      const batch = await promotionService.evaluatePromotions(
        educationYearId,
        auth.token!,
        auth.schoolToken || undefined,
      );

      if (batch) {
        await promotionService.executePromotion(
          batch.id,
          auth.token!,
          auth.schoolToken || undefined,
        );
        toast.success("Promotion executed successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to execute promotion");
    } finally {
      setIsExecuting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Promoted":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "Repeated":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Promoted":
        return "bg-green-500";
      case "Repeated":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const promotedCount = preview.filter((p) => p.promotion_status === "Promoted").length;
  const repeatedCount = preview.filter((p) => p.promotion_status === "Repeated").length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Promotion Preview</DialogTitle>
          <DialogDescription>
            Review promotion results before executing
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="text-center py-8">Loading preview...</div>
        ) : (
          <>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{preview.length}</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{promotedCount}</div>
                <div className="text-sm text-muted-foreground">Promoted</div>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{repeatedCount}</div>
                <div className="text-sm text-muted-foreground">Repeated</div>
              </div>
            </div>

            {/* Student List */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Current GPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preview.map((result) => (
                    <TableRow key={result.student_id}>
                      <TableCell className="font-medium">
                        {result.student_name}
                      </TableCell>
                      <TableCell>{result.current_gpa.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(result.promotion_status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(result.promotion_status)}
                            {result.promotion_status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {result.reason}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExecuting}>
            Cancel
          </Button>
          <Button onClick={handleExecute} disabled={isExecuting || isLoading}>
            {isExecuting ? "Executing..." : "Execute Promotion"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
