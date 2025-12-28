import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SubjectItem {
  id: string
  subject: string
  percentage: string
  className: string
}

const SUBJECTS_DATA: SubjectItem[] = [
  {
    id: "1",
    subject: "Subject",
    percentage: "89%",
    className: "Class Name",
  },
  {
    id: "2",
    subject: "Subject",
    percentage: "89%",
    className: "Class Name",
  },
  {
    id: "3",
    subject: "Subject",
    percentage: "89%",
    className: "Class Name",
  },
]

const SubjectsTable = () => {
  return (
    <div className="w-full max-w-sm space-y-4">
      <h2 className="text-xl font-medium px-1">9 Subjects</h2>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader >
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="h-10 text-foreground font-normal">Subject</TableHead>
              <TableHead className="h-10 text-right text-foreground font-normal">Class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUBJECTS_DATA.map((item) => (
              <TableRow key={item.id} className="border-none hover:bg-muted/50">
                <TableCell className="py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-normal text-foreground leading-tight">{item.subject}</span>
                    <span className="text-xs font-normal text-muted-foreground">{item.percentage}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-3 align-top">
                  <span className="text-sm font-normal text-foreground">{item.className}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default SubjectsTable;