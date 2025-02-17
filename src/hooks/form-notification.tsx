import { Button } from "@/components/ui/button";
import { CircleCheck, X } from "lucide-react";
import { IoIosWarning } from "react-icons/io";
import { toast } from "sonner";
import { RiErrorWarningLine } from "react-icons/ri";
import UseTheme from "@/context/theme/use-theme";
// Reusable Toast Notification Component
export const CustomToast = ({ success, error,warning, onDismiss }: { success?: string; error?: string; warning ?: string, onDismiss: () => void }) => (
    <div data-theme={UseTheme()} className="w-[var(--width)] rounded-lg border border-base-300 bg-base-100 px-4 py-3">
      <div className="flex gap-2">
        <div className="flex grow gap-3">
          {success && <CircleCheck className="mt-0.5 shrink-0 text-emerald-500" size={16} strokeWidth={2} aria-hidden="true" />}
          {error && <IoIosWarning className="mt-0.5 shrink-0 text-error" size={16} strokeWidth={2} aria-hidden="true" />}
          {warning && <RiErrorWarningLine className="mt-0.5 shrink-0 text-warning" size={16} strokeWidth={2} aria-hidden="true"/>}
          <div className="flex grow justify-between gap-12">
            <p className="text-sm">{error? error : success ? success : warning}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          onClick={onDismiss}
          aria-label="Close banner"
        >
          <X size={16} strokeWidth={2} className="opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
  
  // Reusable Form Submission Handler
  export const handleFormSubmission = async (
    action: () => Promise<{ success?: string; error?: string , warning ?: string}>,
    startTransition: (callback: () => void) => void
  ) => {
    startTransition(async () => {
      const result = await action();
      toast.custom((t) => (
        <CustomToast success={result.success} error={result.error} warning={result.warning} onDismiss={() => toast.dismiss(t)} />
      ));
    });
  };