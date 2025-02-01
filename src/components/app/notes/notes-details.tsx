"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NotesDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsVisible(searchParams.get("showNotesDetails") === "true");
  }, [searchParams]);

  if (!isVisible) return null;

  return <div className="bg-base-100 h-full min-h-screen border-l border-l-border">
    <div className=" w-96">
      note details body
        {/* TODO: to make and to find  why i need note details */}
    </div>
  </div>;
};

export default NotesDetails;
