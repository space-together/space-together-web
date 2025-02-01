"use client";

import { useEffect, useState } from "react";
import UserCardSmallSmall from "@/components/cards/user-card-small-small";
import { Button } from "@/components/ui/button";
import { TextTooltip } from "@/context/tooltip/text-tooltip";
import { Locale } from "@/i18n";
import { BsExclamationCircle } from "react-icons/bs";

interface Props {
  lang: Locale;
}

const NotesHeader = ({}: Props) => {
  const [showNotesDetails, setShowNotesDetails] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("showNotesDetails");
    const params = new URLSearchParams(window.location.search);
    const isShowing = storedValue === "true" || params.has("showNotesDetails");

    setShowNotesDetails(isShowing);

    if (isShowing) {
      params.set("showNotesDetails", "true");
    } else {
      params.delete("showNotesDetails");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, []);

  const toggleNotesDetails = () => {
    const newShowNotesDetails = !showNotesDetails;
    setShowNotesDetails(newShowNotesDetails);

    localStorage.setItem("showNotesDetails", newShowNotesDetails.toString());

    const params = new URLSearchParams(window.location.search);
    if (newShowNotesDetails) {
      params.set("showNotesDetails", "true");
    } else {
      params.delete("showNotesDetails");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  return (
    <div className="p-4 flex justify-between">
      <div className="space-y-1">
        <h3 className="font-semibold text-2xl">Machine learning</h3>
        <UserCardSmallSmall />
      </div>
      <TextTooltip
        trigger={
          <Button onClick={toggleNotesDetails} variant="ghost" shape="circle">
            <BsExclamationCircle size={22} />
          </Button>
        }
        content={<span>View notes details</span>}
      />
    </div>
  );
};

export default NotesHeader;
