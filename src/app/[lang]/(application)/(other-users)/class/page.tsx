import ClassTimetable from "@/components/app/class/classTimetable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserTooltip from "@/context/tooltip/user-tooltip";
import { Locale } from "@/i18n";
import { getSectorsByEducationId } from "@/services/data/sector-data";

interface Props {
  params: Promise<{ lang: Locale }>;
}

const ClassIdPage = async (props: Props) => {
  // const params = await props.params;
  // const { lang } = params;
  // const educationClass = await getSectorsByEducationId(
  //   "6797b81f071fbeb2d8b5512c"
  // );
  return (
    <div className=" p-4 min-h-screen h-full ">
      <ClassTimetable />
      {/* {educationClass
        ? educationClass.map((item) => <div key={item.id}>{item.name}</div>)
        : "No education for sector"}
      <UserTooltip
        lang={lang}
        trigger={
          <Avatar className=" size-12">
            <AvatarImage src="/images/2.jpg" />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        }
      /> */}
    </div>
  );
};

export default ClassIdPage;
