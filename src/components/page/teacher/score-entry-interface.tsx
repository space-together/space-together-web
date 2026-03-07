"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAssessmentCategories } from "@/lib/hooks/academics/useAssessmentCategories";
import { useExams } from "@/lib/hooks/academics/useExams";
import { useScores } from "@/lib/hooks/academics/useScores";
import type { AuthContext } from "@/lib/utils/auth-context";
import { scoreService } from "@/service/academics/score.service";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ScoreEntryInterfaceProps {
  classId: string;
  subjectId: string;
  auth: AuthContext;
}

interface ScoreEntry {
  student_id: string;
  student_name: string;
  score: number;
  max_score: number;
  remarks: string;
}

export default function ScoreEntryInterface({
  classId,
  subjectId,
  auth,
}: ScoreEntryInterfaceProps) {
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [scoreEntries, setScoreEntries] = useState<ScoreEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const { exams } = useExams(
    { class_id: classId, status: "Published" },
    auth.token,
    auth.schoolToken || undefined,
  );

  const { categories } = useAssessmentCategories(
    { class_subject_id: subjectId },
    auth.token,
    auth.schoolToken || undefined,
  );

  const { scores, mutate } = useScores(
    {
      class_subject_id: subjectId,
      exam_id: selectedExamId,
    },
    auth.token,
    auth.schoolToken || undefined,
  );

  // Mock students - in real app, fetch from API
  useEffect(() => {
    if (selectedExamId && selectedCategoryId) {
      // Initialize score entries for students
      const mockStudents = [
        { id: "1", name: "Student 1" },
        { id: "2", name: "Student 2" },
        { id: "3", name: "Student 3" },
      ];

      setScoreEntries(
        mockStudents.map((student) => ({
          student_id: student.id,
          student_name: student.name,
          score: 0,
          max_score: 100,
          remarks: "",
        })),
      );
    }
  }, [selectedExamId, selectedCategoryId]);

  const handleScoreChange = (studentId: string, field: string, value: any) => {
    setScoreEntries((prev) =>
      prev.map((entry) =>
        entry.student_id === studentId ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const handleSave = async () => {
    if (!selectedExamId || !selectedCategoryId) {
      toast.error("Please select exam and category");
      return;
    }

    setIsSaving(true);
    try {
      await scoreService.bulkCreateScores(
        {
          exam_id: selectedExamId,
          class_subject_id: subjectId,
          assessment_category_id: selectedCategoryId,
          education_year_id: "", // Should be fetched from context
          scores: scoreEntries.map((entry) => ({
            student_id: entry.student_id,
            score: entry.score,
            max_score: entry.max_score,
            remarks: entry.remarks,
          })),
        },
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Scores saved successfully");
      mutate();
    } catch (error) {
      toast.error("Failed to save scores");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Score Entry</h1>
        <p className="text-muted-foreground">
          Enter scores for students in this subject
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Exam and Category</CardTitle>
          <CardDescription>
            Choose the exam and assessment category to enter scores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Exam</label>
              <Select value={selectedExamId} onValueChange={setSelectedExamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  {exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Assessment Category</label>
              <Select
                value={selectedCategoryId}
                onValueChange={setSelectedCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.weight_percentage}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedExamId && selectedCategoryId && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Student Scores</CardTitle>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Scores"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Max Score</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoreEntries.map((entry) => (
                  <TableRow key={entry.student_id}>
                    <TableCell className="font-medium">
                      {entry.student_name}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={entry.max_score}
                        value={entry.score}
                        onChange={(e) =>
                          handleScoreChange(
                            entry.student_id,
                            "score",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={entry.max_score}
                        onChange={(e) =>
                          handleScoreChange(
                            entry.student_id,
                            "max_score",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      {((entry.score / entry.max_score) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.remarks}
                        onChange={(e) =>
                          handleScoreChange(
                            entry.student_id,
                            "remarks",
                            e.target.value,
                          )
                        }
                        placeholder="Optional remarks"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
