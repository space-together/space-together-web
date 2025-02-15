"use client";
import MyImage from "../my-components/myImage";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full justify-center">
      <div className=" flex flex-col">
        <MyImage className="size-96" src="/notFound.svg" />
        <div>
          <div className="text-center">
          <h4 className="  font-medium"> Not found item</h4>
           <p className=" text-myGray">Check your internet connection or your params for this page.</p>
          </div>
          <div className="flex space-x-2 mt-2 justify-center">
            <Button size="sm" variant="outline" onClick={handleGoBack}>
              <BsArrowLeft /> Go back
            </Button>
            <Button size="sm" variant="info" onClick={handleRefresh}>
              Refresh <RefreshCcw size={12} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
