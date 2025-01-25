"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UseTheme from "@/context/theme/use-theme";
import { useState, useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { deleteTradeAPI } from "@/services/data/fetchDataFn";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TradeModelGet } from "@/types/tradeModel";

interface Props {
  trade: TradeModelGet;
}

const DeleteTradeDialog = ({ trade }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const deleteEducation = await deleteTradeAPI(id);

      if ("message" in deleteEducation) {
        setError(deleteEducation.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: deleteEducation.message,
          variant: "destructive",
        });
      } else {
        setSuccess("User role deleted successfully!");
        toast({
          title: "User role created successfully",
          description: (
            <p>
              You delete <strong>{deleteEducation.name}</strong> account which
              created on {deleteEducation.create_on} 😔
            </p>
          ),
        });
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="xs">
          Delete
          {isPending && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={12}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-theme={UseTheme()} className="happy-card">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete  trade
            <strong className=" capitalize">{trade.name}</strong> account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the
            trade account and the trade will no longer be able to access
            the system again. 😔 Please proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" mt-2">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(trade.id)}
            className="btn-error"
          >
            Delete {isPending && (
          <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTradeDialog;
