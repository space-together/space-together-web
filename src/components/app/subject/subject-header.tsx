import MyImage from "@/components/my-components/myImage";
import React from "react";

const SubjectHeader = () => {
  return (
    <div className=" flex flex-col  w-full space-y-4">
      <div className=" flex space-x-6 items-center">
        <MyImage src="/images/1.jpg" classname=" card " className=" size-20" />
        <div>
          <h2 className=" happy-title-head">Subject Name</h2>
          <span className=" ">DY123P</span>
        </div>
      </div>
      <div className=" flex justify-between">
        <div className=" space-y-2">
          <div className=" flex space-x-2">
            <span className=" ">Sector:</span>
            <h3 className="  font-medium">TVET </h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Trade:</span>
            <h3 className="  font-medium">Software Development</h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Subject Type:</span>
            <h3 className="  font-medium">General</h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Class room:</span>
            <h3 className="  font-medium">Level 5 Software development</h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Curriculum:</span>
            <h3 className="  font-medium">
              CTSWD5001-TVET CERTIFICATE V IN SOFTWARE DEVELOPMENT
            </h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Copyright:</span>
            <h3 className="  font-medium"> &copy; Rwanda TVET Board, 2024 </h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Issue Date:</span>
            <h3 className="  font-medium">February,2024 </h3>
          </div>
        </div>
        <div>
          <div className=" flex space-x-2">
            <span className=" ">Learning Hours:</span>
            <h3 className="  font-medium">32 houses </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectHeader;
