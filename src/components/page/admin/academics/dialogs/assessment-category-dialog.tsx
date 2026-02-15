"use client";

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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    CreateAssessmentCategorySchema,
    type CreateAssessmentCategory,
} from "@/lib/schema/academics/assessment-category.schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { assessmentCategoryService } from "@/service/academics/assessment-category.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AssessmentCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  categoryId?: string;
  auth: AuthContext;
}

export default function AssessmentCategoryDialog({
  open,
  onClose,
  auth,
}: AssessmentCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateAssessmentCategory>({
    resolver: zodResolver(CreateAssessmentCategorySchema),
    defaultValues: {
      class_subject_id: "",
      education_year_id: "",
      name: "",
      code: "",
      weight_percentage: 0,
      description: "",
    },
  });

  const onSubmit = async (data: CreateAssessmentCategory) => {
    setIsSubmitting(true);
    try {
      await assessmentCategoryService.createCategory(
        data,
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Category created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Assessment Category</DialogTitle>
          <DialogDescription>
            Add a new assessment category with weight percentage
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="CAT, Quiz, Final..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="CAT1, QUIZ1..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight_percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
