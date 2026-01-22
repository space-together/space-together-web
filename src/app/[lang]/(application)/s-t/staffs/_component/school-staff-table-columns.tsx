import { Checkbox } from "@/components/ui/checkbox";
import type { Locale } from "@/i18n";
import type { SchoolStaff } from "@/lib/schema/school-staff/school-staff-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";

export const SchoolStaffTableColumns = (
  lang: Locale,
  auth: AuthContext,
): ColumnDef<SchoolStaff>[] => {
  return [
    // --- 1. Selection Column ---
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

    // --- 2. Staff Info Column (Name, Email, Actions) ---
    {
      header: "Staff",
      accessorKey: "name",
      cell: ({ row }) => (
        // <SchoolStaffModifySheet
        //   auth={auth}
        //   lang={lang}
        //   staff={row.original}
        //   isSchool
        //   isTable
        // />
        <div>{row.original.name}</div>
      ),
      meta: {
        filterVariant: "text",
      },
      enableSorting: true,
      size: 260,
    },

    // --- 3. Email Column ---
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
      meta: {
        filterVariant: "text",
      },
      enableSorting: true,
      size: 220,
    },

    // --- 4. Staff Type Column ---
    {
      header: "Role",
      accessorKey: "type",
      cell: ({ row }) => {
        const type = row.original.type;

        switch (type) {
          case "Director":
            return <div className="text-sm font-medium">Director</div>;
          case "HeadOfStudies":
            return <div className="text-sm font-medium">Head of Studies</div>;
          default:
            return <div className="text-muted-foreground text-sm">N/A</div>;
        }
      },
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        if (!filterValue) return true;
        return row.getValue(id) === filterValue;
      },
      enableSorting: false,
      size: 160,
    },

    // --- 5. Active Status Column ---
    {
      header: "Status",
      accessorKey: "is_active",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.is_active ? (
            <span className="text-green-600 font-medium">Active</span>
          ) : (
            <span className="text-red-600 font-medium">Inactive</span>
          )}
        </div>
      ),
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        if (filterValue === undefined) return true;
        return row.getValue(id) === filterValue;
      },
      enableSorting: false,
      size: 120,
    },

    // --- 6. Tags Column ---
    {
      header: "Tags",
      accessorKey: "tags",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.tags?.length ? (
            <span>{row.original.tags.length}</span>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      ),
      meta: {
        filterVariant: "text",
      },
      enableSorting: false,
      size: 120,
    },

    // --- 7. Created Date Column ---
    {
      header: "Created On",
      accessorKey: "created_at",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.created_at ? (
            formatReadableDate(row.original.created_at)
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      ),
      meta: {
        filterVariant: "text",
      },
      enableSorting: true,
      size: 140,
    },
  ];
};
