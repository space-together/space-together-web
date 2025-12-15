import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DataDetailsCardSkeletonProps {
  className?: string;
}

export function DataDetailsCardSkeleton({
  className,
}: DataDetailsCardSkeletonProps) {
  return (
    <Card className="pb-0">
      <CardHeader className={cn("border-b-0", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2 w-full">
            {/* Title */}
            <Skeleton className="h-5 w-3/4" />
            {/* Size */}
            <Skeleton className="h-7 w-24" />
          </div>

          {/* Icon */}
          <Skeleton className="size-12 " />
        </div>

        {/* Items */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-1 items-center">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}

export function DataDetailsCardListSkeleton({
  count = 3,
  className,
  item,
}: {
  count?: number;
  className?: string;
  item?: DataDetailsCardSkeletonProps;
}) {
  return (
    <div className={cn("grid grid-cols-4 gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <DataDetailsCardSkeleton {...item} key={i} />
      ))}
    </div>
  );
}
