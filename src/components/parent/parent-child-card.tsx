"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChildSummary } from "@/lib/schema/parent/parent-schema";
import Link from "next/link";

interface ParentChildCardProps {
  child: ChildSummary;
  lang: string;
}

export default function ParentChildCard({ child, lang }: ParentChildCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <MyAvatar
            src={child.student_image}
            alt={child.student_name}
            role={{ role: "STUDENT", gender: child.student_gender }}
            size="lg"
          />
          <div>
            <CardTitle>{child.student_name}</CardTitle>
            <p className="text-sm text-muted-foreground">{child.class_name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Attendance:</span>
            <span className="font-medium">{child.attendance_percentage}%</span>
          </div>
          {child.gpa !== null && child.gpa !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">GPA:</span>
              <span className="font-medium">{child.gpa.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Outstanding Fees:</span>
            <span className="font-medium">${child.outstanding_fees}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
              library="daisy"
            >
              <Link href={`/${lang}/pr/attendance/${child.student_id}`}>
                Attendance
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
              library="daisy"
            >
              <Link href={`/${lang}/pr/results/${child.student_id}`}>
                Results
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
              library="daisy"
            >
              <Link href={`/${lang}/pr/finance/${child.student_id}`}>
                Finance
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
