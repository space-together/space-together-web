
import { Locale } from "@/i18n"
import { AuthContext } from "@/lib/utils/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import ClassCard from "@/components/cards/class-card"
import TeacherTimetable from "../timetable/time-table"
import MessageCard from "@/components/common/cards/message-card"
import ClassesTable from "../class/class-table"
import SubjectsTable from "../class/subjects-table"


interface TeacherDashboardContentProps {
    auth: AuthContext,
    lang: Locale
}

const TeacherDashboardContent = ({auth, lang}: TeacherDashboardContentProps) => {
  return (
    <div className=" space-y-2">
        <Card className=" p-6">
            <TeacherTimetable/>
        </Card>
        <div className=" flex space-x-2">
           <div className="w-full space-y-2">
            <Card className=" p-6 object-contain">
                <MessageCard  senderName="Bruno" senderRole="Student"  timestamp="2h" content="we lorem ipsungu5u9gbgbggibgi5gg recognise your work" commentCount={4}/>
            </Card>
            <Card className=" p-6">
                <MessageCard senderName="Bruno" senderRole="Student"  timestamp="2h" content="weg55gbg5ubgub5gb5bg5bgb5bgb5bg5bgb5gbg5ub5gi4u recognise your work" commentCount={4}/>
            </Card>
           </div>
           <div className=" w-1/2 space-y-2">
             <Card className=" p-6">
                <ClassesTable/>
             </Card>
             <Card className=" p-6">
                <SubjectsTable/>
             </Card>
           </div>
        </div>

    </div>
  )
}

export default TeacherDashboardContent