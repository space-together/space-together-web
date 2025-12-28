import { Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ClassItem {
  id: string
  name: string
  studentCount: number
  imageUrl: string
  isSelected?: boolean
}

const CLASSES_DATA: ClassItem[] = [
  {
    id: "1",
    name: "Class Name",
    studentCount: 89,
    imageUrl: "/images/cc.png",
  },
  {
    id: "2",
    name: "Class Name",
    studentCount: 89,
    imageUrl: "/images/cc.png",
    isSelected: true,
  },
  {
    id: "3",
    name: "Class Name",
    studentCount: 89,
    imageUrl: "/images/cc.png",
  },
]

const ClassesTable = () => {
  return (
    <div className="w-full max-w-sm space-y-4">
      <h2 className="text-xl font-medium px-1">4 Classes</h2>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="h-10 text-foreground font-normal">Class</TableHead>
              <TableHead className="h-10 text-right text-foreground font-normal">Students</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CLASSES_DATA.map((item) => (
              <TableRow
                key={item.id}
                className={cn(
                  "group transition-colors border-none hover:bg-muted/50"
                )}
              >
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border">
                     <AvatarImage
                         src={item.imageUrl || "/placeholder.svg"}
                         alt={item.name}
                      />
                         <AvatarFallback >
                           {item.name?.[0]}
                         </AvatarFallback>
                    </Avatar>

                    <span className="text-sm font-normal text-muted-foreground">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-2">
                  <div className="flex items-center justify-end gap-2 text-muted-foreground">
                    <span className="text-sm">{item.studentCount}</span>
                    <Users className="h-4 w-4" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ClassesTable;