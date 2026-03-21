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
  type AssessmentCategory,
  type CreateAssessmentCategory,
} from "@/lib/schema/academics/assessment-category.schema";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Loader2 } from "lucide-react";
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
  const { form, onSubmit, isPending } = useZodFormSubmit<
    CreateAssessmentCategory,
    AssessmentCategory
  >({
    schema: CreateAssessmentCategorySchema,
    formOptions: {
      defaultValues: {
        class_subject_id: "",
        education_year_id: "",
        name: "",
        code: "",
        weight_percentage: 0,
        description: "",
      },
    },
    request: {
      method: "post",
      url: "/api/assessment-categories",
      apiRequest: {
        token: auth.token!,
        schoolToken: auth.schoolToken ?? undefined,
        revalidatePath: "/a/academics",
      },
    },
    onSuccessMessage: "Category created successfully",
    toastOnError: true,
    onSuccess: () => {
      toast.success("Category created successfully");
      onClose();
    },
  });

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
                      min={0}
                      max={100}
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Optional description" {...field} />
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
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} library="daisy">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
