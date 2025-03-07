"use client";

import { DataTable } from "@/components/my-components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FaCloudArrowDown } from "react-icons/fa6";
import { useState } from "react";
import MyImage from "@/components/my-components/myImage";
// import UpdateSubjectDialog from "./updateSubjectDialog";
// import DeleteSubjectDialog from "./deleteSubjectDialog";
import { Subject } from "../../../../../prisma/prisma/generated";

interface props {
  subjects: Subject[];
}

const AllSubjectTable = ({ subjects }: props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [SelectedSubject, setSelectedSubject] = useState<Subject[]>([]);

  const columns: ColumnDef<Subject>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedSubject(
                value
                  ? table.getFilteredRowModel().rows.map((row) => row.original)
                  : []
              );
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedSubject((prev) =>
              value
                ? [...prev, { ...row.original, create_on: row.original.created_at.toISOString() }]
                : prev.filter((Subject) => Subject.id !== row.original.id)
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: ({row}) => {
        const Subject = row.original;
        return <MyImage src={Subject.symbol ? Subject.symbol : "/icons/notebook.png"} className="size-8" />;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        // const Subject = row.original;
        return <span> {row.getValue("name")}</span>;
      },
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <span>{row.getValue("code")}</span>,
    },
    {
      accessorKey: "sector_id",
      header: "Sector",
      cell: ({ row }) => (
        <span className="text-lowercase">{row.getValue("sector_id")}</span>
      ),
    },
    {
      accessorKey: "purpose",
      header: "purpose",
      cell: ({ row }) => <span>{row.getValue("purpose") || "N/A"}</span>,
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => (
        <span>{new Date(row.getValue("created_at")).toLocaleDateString()}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({  }) => {
        // const subject = row.original;
        return (
          <div className=" flex gap-2">
            {/* <UpdateSubjectDialog Subject={Subject} education={educations} />
            <DeleteSubjectDialog Subject={Subject} /> */}

            actions
          </div>
        );
      },
    },
  ];

  return (
    <div className="container overflow-x-auto happy-card p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">Subject Table ({subjects.length})</h1>
        <div className="space-x-2">
          <Button variant="success" size="sm">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-0">
        <DataTable
          columns={columns}
          data={subjects}
          searchKeys={["code", "name", "sector_id", "trade_id"]}
        />
      </div>
    </div>
  );
};

export default AllSubjectTable;
