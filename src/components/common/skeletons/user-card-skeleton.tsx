import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface UserSmCardSkeletonProps {
  showMessage?: boolean;
  showModify?: boolean;
  className?: string;
  onlyImage?: boolean;
  onlyName?: boolean;
}

export const UserSmCardSkeleton = ({
  showMessage,
  showModify,
  className,
  onlyImage,
  onlyName,
}: UserSmCardSkeletonProps) => {
  if (onlyImage) {
    return (
      <div className={cn(className)}>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  if (onlyName) {
    return (
      <div className={cn(className)}>
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  // Full card skeleton
  return (
    <div
      className={cn(
        showMessage && "flex flex-row justify-between items-center",
        className,
      )}
    >
      <div className="flex gap-2 items-center">
        {/* Avatar skeleton */}
        <Skeleton className="h-10 w-10 rounded-full" />

        <div className="flex flex-col gap-2">
          {/* Name and metadata row */}
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* Role and subjects row */}
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      {/* Action buttons skeleton */}
      {showMessage && (
        <div className="flex flex-row gap-2">
          {showModify && <Skeleton className="h-8 w-16" />}
          <Skeleton className="h-8 w-20" />
        </div>
      )}
    </div>
  );
};

export const UserCardSkeleton = () => {
  return (
    <Card className="p-0">
      {/* HEADER */}
      <CardHeader className="border-b-0">
        <div className="flex items-center gap-2">
          {/* Avatar skeleton */}
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="flex flex-col gap-2 flex-1">
            {/* Name skeleton */}
            <Skeleton className="h-5 w-40" />
            {/* Email skeleton */}
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* META */}
        <div className="mt-2 flex flex-wrap gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardHeader>

      {/* FOOTER */}
      <CardContent className="p-0 pb-4 flex flex-col justify-between">
        <CardFooter
          className={cn(
            "border-t border-base-content/50",
            "flex justify-end gap-2",
          )}
        >
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
        </CardFooter>
      </CardContent>
    </Card>
  );
};
