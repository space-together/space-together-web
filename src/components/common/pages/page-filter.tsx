import { cn } from "@/lib/utils";

interface PageFilterProps {
  children: React.ReactNode;
  className?: string;
}

const PageFilter = ({ children, className }: PageFilterProps) => {
  return (
    <div className={cn("sticky backdrop-blur-md z-30 top-0 pt-2 ", className)}>
      {children}
    </div>
  );
};

export default PageFilter;
