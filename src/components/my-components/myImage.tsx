import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  src: string;
  alt?: string;
  className?: string;
  classname?: string; // consider removing this if it's redundant
  role ?: "ICON" | "AVATAR"
}

const MyImage = ({
  src,
  alt = "Default alt text",
  className,
  classname,
  role
}: Props) => {
  return (
    <div className={cn("size-32 relative" , role === "ICON" && " size-4", className)}>
      <Image
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
        src={src}
        alt={alt}
        className={cn("object-cover", role === "AVATAR" && "mask mask-squircle", classname)}
        fill
        blurDataURL={`${src}?w=10&q=10`} // Low-quality blur preview
        quality={90} // Adjust quality
        priority // Ensure critical images load first
      />
    </div>
  );
};

export default MyImage;
