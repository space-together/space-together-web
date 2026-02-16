import RoleDialog from "@/components/page/role/dialogs/role-dialog";
import { Card, CardContent } from "@/components/ui/card";
import type { AuthContext } from "@/lib/utils/auth-context";
import { ShieldAlert } from "lucide-react";

interface Props {
  auth: AuthContext;
}

export default function EmptyRoles({ auth }: Props) {
  const isAdmin = auth.user.role === "ADMIN";

  return (
    <Card>
      <CardContent className="flex min-h-[400px] flex-col items-center justify-center space-y-4 p-8">
        <div className="bg-muted rounded-full p-4">
          <ShieldAlert className="text-muted-foreground h-12 w-12" />
        </div>

        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold">No Roles Found</h3>
          <p className="text-muted-foreground max-w-md">
            {isAdmin
              ? "Get started by creating your first custom role to manage permissions."
              : "No roles are currently available. Contact your administrator."}
          </p>
        </div>

        {isAdmin && <RoleDialog auth={auth} />}
      </CardContent>
    </Card>
  );
}
