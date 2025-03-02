"use client";

import { DataTable } from "@/components/my-components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FaCloudArrowDown } from "react-icons/fa6";
import { useState } from "react";
import MyImage from "@/components/my-components/myImage";
import CreateClassRoomDialog from "./createClassRoomDialog";
import UpdateClassRoomDialog from "./updateClassRoomDialog";
import DeleteClassRoomDialog from "./deleteClassRoomDialog";
import { ClassRoom, Sector, Trade } from "../../../../../prisma/prisma/generated";

interface props {
  classRoom: ClassRoom[];
  sectors: Sector[] | null
  trades: Trade[] | null;
  collectionName: string;
}

const AllClassRoomTable = ({
  classRoom,
  sectors,
  trades,
}: props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [SelectedSector, setSelectedSector] = useState<ClassRoom[]>([]);

  const columns: ColumnDef<ClassRoom>[] = [
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
              setSelectedSector(
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
            setSelectedSector((prev) =>
              value
                ? [...prev, row.original]
                : prev.filter((sector) => sector.id !== row.original.id)
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
            const class_room = row.original;
        return <MyImage src={class_room.symbol ? class_room.symbol: "/icons/video-conference.png"} className="size-8" />;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        // const sector = row.original;
        return (
          <div>
            {" "}
            {row.getValue("name") || <span className=" text-myGray">N/A</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <div>
          {row.getValue("username") || (
            <span className=" text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "ClassRoomType",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-lowercase">
          {row.getValue("ClassRoomType") || (
            <span className=" text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "trade",
      header: "Trade",
      cell: ({ row }) => (
        <div className="text-lowercase">
          {row.getValue("trade") || <span className=" text-myGray">N/A</span>}
        </div>
      ),
    },
    {
      accessorKey: "sector",
      header: "Sector",
      cell: ({ row }) => (
        <div className="text-lowercase">
          {row.getValue("sector") || <span className=" text-myGray">N/A</span>}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className=" line-clamp-1">
          {row.getValue("description") || (
            <span className=" text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created On",
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("created_at")).toLocaleDateString() || (
            <span className=" text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const classRoom = row.original;
          return (
            <div className=" flex gap-2">
              <UpdateClassRoomDialog classRoom={classRoom} trades={trades} sectors={sectors} />
              <DeleteClassRoomDialog classRoom={classRoom} />
            </div>
          );
        },
      },
  ];

  return (
    <div className="container overflow-x-auto happy-card p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">
          ClassRoom Table ({classRoom.length})
        </h1>
        <div className="space-x-2">
          <CreateClassRoomDialog
            trades={trades}
            sectors={sectors}
          />
          <Button variant="success" size="sm">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-0">
        <DataTable
          columns={columns}
          data={classRoom}
          searchKeys={[
            "username",
            "name",
            "tradeId",
            "sector_id",
            "ClassRoomType",
            "description",
          ]}
          searchPlaceholder="Search: username , name , etc ..."
        />
      </div>
    </div>
  );
};

export default AllClassRoomTable;
