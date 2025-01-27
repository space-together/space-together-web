import React from "react";
import { Separator } from "@/components/ui/separator";
import PostCardHeader from "./post-card-header";
import PostCardFooter from "./post-card-footer";
import MyImage from "../my-components/myImage";
import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Dot } from "lucide-react";

interface props {
  postRole?: "NOTES" | "IMAGE" | "VIDEO";
}

const PostCard = ({ postRole }: props) => {
  return (
    <div className=" happy-card p-0">
      <PostCardHeader />
      <Separator />
      {postRole === "NOTES" && (
        <div className=" px-4 pb-2">
          <div className=" space-x-2 text-sm text-myGray">
            <span>Kinyarwanda</span>
            <span className=" ">Notes</span>
          </div>
          <h3 className=" text-lg font-semibold text-center">Lesson 1</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            doloribus nobis totam nemo id provident tempora quos, sed modi.
            Commodi optio, nemo beatae tenetur repellat aspernatur asperiores
            delectus nihil accusamus...
          </p>
        </div>
      )}
      {postRole === "IMAGE" && (
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
      )}
      <Separator />
      <PostCardFooter postRole="NOTES" />
    </div>
  );
};

export default PostCard;
