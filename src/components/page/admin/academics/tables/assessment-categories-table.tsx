"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { AssessmentCategory } from "@/lib/schema/academics/assessment-category.schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { assessmentCategoryService } from "@/service/academics/assessment-category.service";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface AssessmentCategoriesTableProps {
  categories: AssessmentCategory[];
  isLoading: boolean;
  onEdit: (categoryId: string) => void;
  onRefresh: () => void;
  auth: AuthContext;
}

export default function AssessmentCategoriesTable({
  categories,
  isLoading,
  onEdit,
  onRefresh,
  auth,
}: AssessmentCategoriesTableProps) {
  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await assessmentCategoryService.deleteCategory(
        categoryId,
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Category deleted successfully");
      onRefresh();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No assessment categories found. Create your first category.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Weight (%)</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{category.code}</Badge>
              </TableCell>
              <TableCell>{category.weight_percentage}%</TableCell>
              <TableCell>{category.class_subject_id}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(category.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
