"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import { useState } from "react";

interface CopySchoolCodeButtonProps {
  value: string;
}

const CopySchoolCodeButton = ({ value }: CopySchoolCodeButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button onClick={handleCopy} variant="outline" size="sm" library="daisy">
      {copied ? "Copied!" : "Copy"}{" "}
      {copied ? <CheckCheck size={14} className=" text-success" /> : null}
    </Button>
  );
};

export default CopySchoolCodeButton;
