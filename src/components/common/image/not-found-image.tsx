import { cn } from "@/lib/utils";
import MyImage from "../myImage";

interface NotFoundImageProps {
  className?: string;
  ClassName?: string;
}

const NotFoundImage = ({ className }: NotFoundImageProps) => {
  return (
    <MyImage
      className={cn("size-32 bg-base-300", className)}
      src="/png/image-not-found.png"
      alt="Default User Image"
      classname="object-contain"
    />
  );
};

export default NotFoundImage;
