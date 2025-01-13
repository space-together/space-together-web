"use client";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
interface props {
isOpen : boolean,
userId : string,
}
const IsStudentDialog = ({isOpen , userId}: props) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>
            Do you have school or class code?
        </DialogTitle>
      </DialogContent>
    </Dialog>
  )
}

export default IsStudentDialog
