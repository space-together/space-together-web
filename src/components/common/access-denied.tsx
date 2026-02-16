import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  backHref?: string;
  backLabel?: string;
}

export default function AccessDenied({
  title = "Access Denied",
  message = "You don't have permission to access this resource.",
  backHref = "/",
  backLabel = "Go Back",
}: AccessDeniedProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <div className="bg-error/10 text-error rounded-full p-4">
            <ShieldAlert className="h-12 w-12" />
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>

          <Link href={backHref}>
            <Button variant="outline" library="daisy">
              {backLabel}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
