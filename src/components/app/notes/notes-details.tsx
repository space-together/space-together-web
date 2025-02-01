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

  return <div>notes</div>;
};

export default NotesDetails;
