"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Transcript } from "@/lib/schema/academics/transcript.schema";
import { format } from "date-fns";
import { Download, Printer } from "lucide-react";

interface TranscriptViewerProps {
  transcript: Transcript;
}

export default function TranscriptViewer({ transcript }: TranscriptViewerProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header Actions - Hidden in print */}
      <div className="flex justify-end gap-2 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Transcript */}
      <Card className="print:shadow-none print:border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img src="/logo.png" alt="School Logo" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl">Academic Transcript</CardTitle>
          <div className="text-sm text-muted-foreground">
            Generated on {format(new Date(transcript.generated_at), "MMMM dd, yyyy")}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Student Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Student Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="font-medium">{transcript.student_info.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Registration Number</div>
                <div className="font-medium">{transcript.student_info.registration_number}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cumulative Performance */}
          <div className="text-center p-6 bg-primary/10 rounded-lg">
            <div className="text-4xl font-bold mb-2">{transcript.cumulative_gpa.toFixed(2)}</div>
            <div className="text-lg text-muted-foreground">Cumulative GPA</div>
            <Badge className="mt-2" variant="outline">
              {transcript.final_status}
            </Badge>
          </div>

          <Separator />

          {/* Academic Years */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Academic History</h3>
            <div className="space-y-6">
              {transcript.academic_years.map((year) => (
                <Card key={year.education_year_id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{year.year_label}</CardTitle>
                      <div className="text-right">
                        <div className="font-bold">{year.yearly_gpa.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Yearly GPA</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{year.class_name}</span>
                      <Badge variant="outline">{year.promotion_status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {year.term_results.map((term) => (
                        <div key={term.term_id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{term.term_name}</h4>
                            <div className="font-bold">GPA: {term.gpa.toFixed(2)}</div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {term.subjects.map((subject, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-sm p-2 bg-muted rounded"
                              >
                                <span>{subject.subject_name}</span>
                                <Badge variant="outline">{subject.final_grade}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
