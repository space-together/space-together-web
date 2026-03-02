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
  action?: {
    label: string;
    onClick: () => void;
  };
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
  const showToast = useCallback(
    ({ title, description, type, duration, id, action }: ShowToastProps) => {
      const options = {
        id: id,
        duration: duration || DEFAULT_DURATION,
        description: description,
        action: action,
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

      {/* Optimized Sonner Toaster with DaisyUI Colors */}
      <Toaster
        position="top-right"
        expand={false}

        closeButton
        toastOptions={{
          className: "font-sans items-start",
          descriptionClassName: "!text-sm !text-base-content",
          classNames: {
            toast:
              "group !rounded-[var(--radius-box)] !shadow-2xl !border !bg-base-100  ",
            title: "text-base font-bold",
            description: "!text-sm !text-base-content",
            // Mapping DaisyUI semantic colors and their content counterparts
            success:
              "!bg-success/10 backdrop-blur-lg !border-success !text-success ",
            error: "!bg-error/10 backdrop-blur-lg !border-error !text-error",
            warning:
              "!bg-warning/10 backdrop-blur-lg !border-warning !text-warning",
            info: "!bg-info/10 backdrop-blur-lg !border-info !text-info",
            default: "!bg-base-100/10 backdrop-blur-lg !text-base-content ",
            actionButton: "!bg-info !text-info-content",
            cancelButton: "!bg-ghost",
            closeButton: "!bg-base-100 !text-base-content !border-base-300",
          },
        }}
      />

      {/* Progress Bar using DaisyUI Primary color variable */}
      <Next13ProgressBar
        height="3px"
        color="oklch(var(--p))"
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
