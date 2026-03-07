import MyLink from "@/components/common/myLink";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Role } from "@/lib/schema/role/role-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import type { ColumnDef } from "@tanstack/react-table";
import DeleteRoleDialog from "../dialogs/delete-role-dialog";
import RoleDialog from "../dialogs/role-dialog";

export const RoleTableColumns = (
  auth: AuthContext,
  lang: string,
): ColumnDef<Role>[] => {
  const isAdmin = auth.user.role === "ADMIN";

  return [
    // Selection Column
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="-ms-1"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="-ms-1"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },

    // Role Name
    {
      header: "Role Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <MyLink
          href={`/${lang}/a/roles/${row.original._id || row.original.id}`}
          loading
          className="font-medium"
        >
          {row.original.name}
        </MyLink>
      ),
      meta: {
        filterVariant: "text",
      },
      enableSorting: true,
      size: 200,
    },

    // Description
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => (
        <div className="text-muted-foreground max-w-md truncate text-sm">
          {row.original.description || "-"}
        </div>
      ),
      enableSorting: false,
      size: 300,
    },

    // Role Type
    {
      header: "Type",
      accessorKey: "role_type",
      cell: ({ row }) => (
        <Badge
          variant={row.original.role_type === "System" ? "default" : "outline"}
        >
          {row.original.role_type}
        </Badge>
      ),
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id) as string;
        if (!filterValue) return true;
        return rowValue === filterValue;
      },
      enableSorting: true,
      size: 100,
    },

    // Permissions Count
    {
      header: "Permissions",
      accessorKey: "permissions",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.permissions?.length || 0}
        </Badge>
      ),
      enableSorting: false,
      size: 120,
    },

    // Active Status
    {
      header: "Status",
      accessorKey: "is_active",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "success" : "destructive"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id) as boolean;
        if (filterValue === undefined || filterValue === null) return true;
        return rowValue === (filterValue === "true");
      },
      enableSorting: true,
      size: 100,
    },

    // Actions
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const role = row.original;
        const isSystemRole = role.role_type === "System";

        if (!isAdmin) {
          return <span className="text-muted-foreground text-sm">-</span>;
        }

        return (
          <div className="flex items-center gap-2">
            <RoleDialog auth={auth} role={role} />
            {!isSystemRole && <DeleteRoleDialog auth={auth} role={role} />}
          </div>
        );
      },
      enableSorting: false,
      size: 150,
    },
  ];
};
