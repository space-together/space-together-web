"use client";

import { Button } from "@/components/ui/button";
import { useAssessmentCategories } from "@/lib/hooks/academics/useAssessmentCategories";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Plus } from "lucide-react";
import { useState } from "react";
import AssessmentCategoryDialog from "../dialogs/assessment-category-dialog";
import AssessmentCategoriesTable from "../tables/assessment-categories-table";

interface AssessmentCategoriesTabProps {
  auth: AuthContext;
}

export default function AssessmentCategoriesTab({
  auth,
}: AssessmentCategoriesTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { categories, isLoading, mutate } = useAssessmentCategories(
    filters,
    auth.token,
    auth.schoolToken || undefined,
  );

  const handleEdit = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedCategory(undefined);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedCategory(undefined);
    mutate();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assessment Categories</h2>
          <p className="text-muted-foreground">
            Configure assessment categories and weights per subject
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Category
        </Button>
      </div>

      <AssessmentCategoriesTable
        categories={categories}
        isLoading={isLoading}
        onEdit={handleEdit}
        onRefresh={mutate}
        auth={auth}
      />

      <AssessmentCategoryDialog
        open={isDialogOpen}
        onClose={handleClose}
        categoryId={selectedCategory}
        auth={auth}
      />
    </div>
  );
}
