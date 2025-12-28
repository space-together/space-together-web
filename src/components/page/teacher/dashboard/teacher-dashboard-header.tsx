import { UserSmCard } from "@/components/cards/user-card"
import MyAvatar from "@/components/common/image/my-avatar"
import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n"
import { School } from "@/lib/schema/school/school-schema"
import { AuthContext } from "@/lib/utils/auth-context"


 interface TeacherDashboardHeaderProps {
        auth: AuthContext,
        lang: Locale,
        school: School
    }

const TeacherDashboardHeader = ({auth, lang, school} : TeacherDashboardHeaderProps) => {

   
  return (
    <div className=" flex justify-between">
      <div className=" flex flex-row gap-4  items-center">
        <MyAvatar
          src={auth.user.image}
          size="xl"
          type="cycle"
          classname=" object-contain"
        />
        <div className=" items-center">
          <h1 className="h4">Good Morning, {auth.user.name}</h1>
          <h2>Here is how your day will be in {school.name} </h2>
        </div>
      </div>

      <div>
         <Button size={"sm"} library="daisy" variant="info">
          What's new
        </Button>
      </div>
    </div>
  )
}

export default TeacherDashboardHeader