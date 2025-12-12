"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CheckboxInputSkeletonProps {
  className?: string;
}

export default function CheckboxInputSkeleton({
  className,
}: CheckboxInputSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-md border border-base-content/20 p-2 shadow-xs"
        >
          <div className="flex justify-between gap-2 items-start">
            {/* Content skeleton */}
            <div className="flex gap-4 w-full">
              {/* Image */}
              <Skeleton className="size-12 rounded-md" />

              {/* Texts */}
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-full rounded" />
              </div>
            </div>
            {/* Checkbox skeleton */}
            <Skeleton className="size-5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
