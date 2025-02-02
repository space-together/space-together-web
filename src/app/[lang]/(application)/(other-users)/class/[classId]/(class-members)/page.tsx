import ClassActivities from "@/components/app/class/classActivities";
import ClassBody from "@/components/app/class/classBody";
import ClassHead from "@/components/app/class/classHead";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";

interface Props {
  params: Promise<{ lang: Locale }>;
}

const ClassIdPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" px-4">
      <ClassHead lang={lang}/>
      <div className=" mt-28">
        <Separator />
        <div className="flex  justify-between space-x-4 mt-4">
          <ClassBody lang={lang}/>
          <ClassActivities />
        </div>
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default ClassIdPage;
