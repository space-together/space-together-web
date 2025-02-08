import React from "react";
import Link from "next/link";

interface props {
  title: string;
  link?: string;
}

const PageTitle = ({ title, link }: props) => {
  return (
    <div className=" flex items-center">
      <h1 className=" happy-title-head">
        {link ? <Link href={link}>{title}</Link> : `${title}`}
      </h1>
    </div>
  );
};

export default PageTitle;
