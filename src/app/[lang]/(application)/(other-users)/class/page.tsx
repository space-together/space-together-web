// import ClassTimetable from "@/components/app/class/classTimetable";
import { getSectorsByEducationId } from "@/services/data/sector-data";

const ClassIdPage = async () => {
  const educationClass = await getSectorsByEducationId("6797b81f071fbeb2d8b5512c");
  return (
    <div className=" p-4 min-h-screen h-full ">
      {/* <ClassTimetable /> */}
      {educationClass ? educationClass.map((item) => (<div key={item.id}>{item.name}</div>)) : "No education for sector"}

    </div>
  );
};

export default ClassIdPage;
