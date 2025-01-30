import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa6";

const SchoolImages = () => {
  return (
    <div className=" happy-card  space-y-4">
      <div className=" space-y-1">
        <div className=" flex space-x-2 items-center">
          <FaImage /> <h3 className=" font-semibold">School images</h3>
        </div>
      <div className=" grid grid-cols-2 gap-2">
        <MyImage src="/images/9.jpg" className=" w-full" classname=" card"/>
        <MyImage src="/images/3.jpg" className=" w-full" classname=" card"/>
        <MyImage src="/images/7.jpg" className=" w-full" classname=" card"/>
        <MyImage src="/images/8.jpg" className=" w-full" classname=" card"/>
        <MyImage src="/images/10.jpg" className=" w-full" classname=" card"/>
        <MyImage src="/images/1.jpg" className=" w-full" classname=" card"/>
      </div>
      {/* TODO: to make dialog where users can see all images for school */}
      <Button variant="ghost" size="sm" className=" w-full">
        see more
      </Button>
      </div>
    </div>
  );
};

export default SchoolImages;
