"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGradingScales } from "@/lib/hooks/academics/useGradingScales";
import type { AuthContext } from "@/lib/utils/auth-context";
import { gradingScaleService } from "@/service/academics/grading-scale.service";
import { CheckCircle2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GradingScalesTabProps {
  auth: AuthContext;
}

export default function GradingScalesTab({ auth }: GradingScalesTabProps) {
  const [filters] = useState({
    page: 1,
    limit: 10,
  });

  const { scales, isLoading, mutate } = useGradingScales(
    filters,
    auth.token,
    auth.schoolToken || undefined,
  );

  const handleActivate = async (scaleId: string) => {
    try {
      await gradingScaleService.activateScale(
        scaleId,
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Grading scale activated");
      mutate();
    } catch (error) {
      toast.error("Failed to activate scale");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading grading scales...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Grading Scales</h2>
          <p className="text-muted-foreground">
            Configure grading scales and grade boundaries
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Scale
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {scales.map((scale) => (
          <Card key={scale.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {scale.name}
                  {scale.is_active && (
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  )}
                </CardTitle>
                <Badge variant="outline">{scale.grading_type}</Badge>
              </div>
              <CardDescription>
                {scale.grade_boundaries.length} grade boundaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scale.grade_boundaries.map((boundary, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium">{boundary.grade}</span>
                    <span className="text-muted-foreground">
                      {boundary.min_score} - {boundary.max_score}
                      {boundary.gpa_value && ` (GPA: ${boundary.gpa_value})`}
                    </span>
                  </div>
                ))}
              </div>
              {!scale.is_active && (
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={() => handleActivate(scale.id)}
                >
                  Activate Scale
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {scales.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No grading scales found. Create your first scale.
        </div>
      )}
    </div>
  );
}
