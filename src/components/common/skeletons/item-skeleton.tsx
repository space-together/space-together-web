import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ItemSkeletonProps {
  className?: string;
  showHeader?: boolean;
  showContent?: boolean;
  showFooter?: boolean;
}

export function ItemSkeleton({
  className,
  showHeader = true,
  showContent = true,
  showFooter = true,
}: ItemSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-4 gap-4 border border-base-content/50 rounded-md shadow-xs",
        className,
      )}
    >
      {/* Header */}
      {showHeader && (
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      )}

      {/* Media + Content */}
      {showContent && (
        <div className="flex gap-4 items-start">
          {/* Media */}
          <Skeleton className="size-10 rounded-md" />

          {/* Content */}
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      )}

      {/* Footer */}
      {showFooter && (
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      )}
    </div>
  );
}

export function ItemGroupSkeleton({
  count = 3,
  item,
  className,
}: {
  count?: number;
  className?: string;
  item?: ItemSkeletonProps;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ItemSkeleton {...item} key={i} />
      ))}
    </div>
  );
}
