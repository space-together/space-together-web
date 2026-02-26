import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FieldErrors } from "react-hook-form";

type FormErrorProps = {
  errors: FieldErrors<any>;
  className?: string;
};

export function FormGlobalError({ errors, className }: FormErrorProps) {
  const errorEntries = Object.entries(errors).filter(([key]) => key !== "root");

  if (!errorEntries.length && !errors.root) return null;

  return (
    <Card className={cn("bg-error/20 text-error border-error p-4", className)}>
      <ol>
        {errorEntries.map(([key, error], index) => (
          <li key={`${key}-${index}`}>
            <strong>
              {index + 1}. {key}:
            </strong>{" "}
            {String(
              typeof error === "object" && error?.message
                ? error.message
                : error,
            )}
          </li>
        ))}
      </ol>
    </Card>
  );
}
