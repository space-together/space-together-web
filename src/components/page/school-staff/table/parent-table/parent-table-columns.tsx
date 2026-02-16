import ParentModifySheet from "@/components/page/school-staff/parents-components/parent-modify-sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Locale } from "@/i18n";
import type { ParentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";

export const ParentTableColumns = (
  lang: Locale,
  auth: AuthContext,
): ColumnDef<ParentWithRelations>[] => {
  return [
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

    {
      header: "Parent",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <ParentModifySheet
            isTable
            isSchool
            auth={auth}
            lang={lang}
            parent={row.original}
          />
        </div>
      ),
      meta: {
        filterVariant: "text",
      },
      enableSorting: true,
      size: 250,
    },

    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.email || (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      ),
      enableSorting: true,
      meta: {
        filterVariant: "text",
      },
      size: 200,
    },

    {
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.phone || (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      ),
      enableSorting: false,
      meta: {
        filterVariant: "text",
      },
      size: 150,
    },

    {
      header: "Relationship",
      accessorKey: "relationship",
      cell: ({ row }) => {
        const relationship = row.original.relationship;
        return (
          <div className="text-sm">
            {relationship || <span className="text-muted-foreground">-</span>}
          </div>
        );
      },
      enableSorting: false,
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id) as string | undefined | null;
        if (!filterValue) return true;
        if (!rowValue) return false;
        return rowValue === filterValue;
      },
      size: 120,
    },

    {
      header: "Connected Students",
      accessorKey: "student_ids",
      cell: ({ row }) => {
        const count = row.original.student_ids?.length || 0;
        return (
          <Badge variant={count > 0 ? "default" : "outline"}>
            {count} {count === 1 ? "student" : "students"}
          </Badge>
        );
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const countA = rowA.original.student_ids?.length || 0;
        const countB = rowB.original.student_ids?.length || 0;
        return countA - countB;
      },
      size: 150,
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status || "ACTIVE";
        return (
          <Badge variant={status === "ACTIVE" ? "success" : "destructive"}>
            {status}
          </Badge>
        );
      },
      enableSorting: false,
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id) as string | undefined | null;
        if (!filterValue) return true;
        if (!rowValue) return false;
        return rowValue === filterValue;
      },
      size: 100,
    },

    {
      header: "Created On",
      accessorKey: "created_at",
      cell: ({ row }) => (
        <div className="text-sm">
          {formatReadableDate(row.original.created_at)}
        </div>
      ),
      enableSorting: true,
      meta: {
        filterVariant: "text",
      },
      size: 120,
    },
  ];
};
