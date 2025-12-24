"use client";

import { Next13ProgressBar } from "next13-progressbar";
import type React from "react";
import { createContext, useCallback, useContext, type ReactNode } from "react";
import { Toaster, toast } from "sonner";

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ShowToastProps {
  id?: string;
  type?: ToastType;
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
  action?: ReactNode;
}

interface ToastContextType {
  showToast: (props: ShowToastProps) => void;
  dismissToast: (id?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const DEFAULT_DURATION = 5000;

export const ToastManager: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Mapping our types to sonner's specific methods
  const showToast = useCallback(
    ({ title, description, type, duration, id, action }: ShowToastProps) => {
      const options = {
        id: id,
        duration: duration || DEFAULT_DURATION,
        description: description,
        action: action as any, // Sonner expects a specific action format, but this preserves your API
      };

      switch (type) {
        case "success":
          toast.success(title, options);
          break;
        case "error":
          toast.error(title, options);
          break;
        case "warning":
          toast.warning(title, options);
          break;
        case "info":
          toast.info(title, options);
          break;
        default:
          toast(title, options);
          break;
      }
    },
    [],
  );

  const dismissToast = useCallback((id?: string) => {
    if (id) {
      toast.dismiss(id);
    } else {
      toast.dismiss();
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      {/* Sonner Toaster component */}
      <Toaster position="top-right" expand={false} richColors closeButton />
      {/* Keeping your progress bar as requested */}
      <Next13ProgressBar
        height={"2px"}
        color="#29D"
        options={{ showSpinner: false }}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastManager");
  }
  return context;
};
