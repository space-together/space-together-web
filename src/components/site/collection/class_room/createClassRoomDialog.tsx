"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsPlus } from "react-icons/bs";
import { Sector, Trade } from "../../../../../prisma/prisma/generated";
import CreateClassRoomForm from "@/components/form/create-class-room-form";
interface props {
  sectors: Sector[] | null;
  trades: Trade[] | null;
}

const CreateClassRoomDialog = ({ sectors, trades }: props) => {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm">
          <BsPlus /> Add class room
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] w-full"
      >
        <DialogHeader>
          <DialogTitle>Add New Class Room</DialogTitle>
        </DialogHeader>
        <CreateClassRoomForm sectors={sectors} trades={trades}/>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassRoomDialog;
