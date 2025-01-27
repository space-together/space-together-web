import React from "react";
import PostCardHeader from "./post-card-header";
import { Separator } from "../ui/separator";
import MyImage from "../my-components/myImage";
import PostCardFooter from "./post-card-footer";
import { Dot } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "../ui/button";

const PostImageCard = () => {
  return (
    <div className=" happy-card p-0">
      <PostCardHeader />
      <Separator />
      <div className=" relative h-72">
        <MyImage src="/images/2.jpg" className=" w-full h-full" />
        <div className=" flex justify-between">
          <Button
            variant="ghost"
            shape="circle"
            className="absolute top-1/2 left-0 transform -translate-x-0 -translate-y-1/2 text-white"
          >
            <FaChevronLeft size={32} />
          </Button>
          <Button
            variant="ghost"
            shape="circle"
            className=" absolute top-1/2 right-0 transform -translate-x-0 -translate-y-1/2 text-white"
          >
            <FaChevronRight
              size={32}
              className=""
            />
          </Button>
        </div>
        <div className=" absolute bottom-0 z-30  right-1/2 ml-4">
          <div className=" -space-x-8 flex">
            <Dot size={48} />
            <Dot size={48} className="text-white"/>
            <Dot size={48} />
          </div>
        </div>
      </div>
      <Separator />
      <PostCardFooter />
    </div>
  );
};

export default PostImageCard;
