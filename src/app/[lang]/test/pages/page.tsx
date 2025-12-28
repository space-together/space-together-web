"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";

function TestingPage() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 bg-base-200">
      <h1 className="text-2xl font-bold mb-6">Toast Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Success Toast */}
        <Button
          className="btn-success"
          onClick={() =>
            showToast({
              title: "Success!",
              description: "Your profile has been updated.",
              type: "success",
            })
          }
        >
          Success Toast
        </Button>

        {/* Error Toast */}
        <Button
          className="btn-error"
          onClick={() =>
            showToast({
              title: "Error occurred",
              description: "Unable to connect to the server.",
              type: "error",
            })
          }
        >
          Error Toast
        </Button>

        {/* Info Toast */}
        <Button
          className="btn-info"
          onClick={() =>
            showToast({
              title: "New Update",
              description: "Version 2.0 is now available.",
              type: "info",
            })
          }
        >
          Info Toast
        </Button>

        {/* Warning Toast */}
        <Button
          className="btn-warning"
          onClick={() =>
            showToast({
              title: "Warning",
              description: "Your subscription expires in 2 days.",
              type: "warning",
            })
          }
        >
          Warning Toast
        </Button>

        {/* Default Toast */}
        <Button
          className="btn-neutral "
          onClick={() =>
            showToast({
              title: "Notification",
              description: "This is a default toast message.",
              type: "default",
            })
          }
        >
          Default Toast
        </Button>

        {/* Toast with Action */}
        <Button
          variant="outline"
          onClick={() =>
            showToast({
              title: "Message Deleted",
              description: "You can still recover this item.",
              type: "default",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo clicked!"),
              },
            })
          }
        >
          Toast with Action
        </Button>
      </div>
    </div>
  );
}

export default TestingPage;
