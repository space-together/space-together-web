import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";

type props = {
  href: string;
  type?: "button" | "link";
  className?: string;
  classname?: string;
  children: React.ReactNode | string;
  button ?: ButtonProps
};
const MyLink = ({ href, type, className, classname, children , button}: props) => {
  if (type == "button") {
    return (
      <Link href={href} className={className}>
        <Button {...button} className={classname}>{children}</Button>
      </Link>
    );
  } else {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
};

export default MyLink;
