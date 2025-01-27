"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseTheme from "@/context/theme/use-theme";
import { useId } from "react";

export default function SelectClassActivitiesSubject() {
  const id = useId();
  const theme = UseTheme();
  return (
    <div className="space-y-2">
      <Label className=" font-medium text-lg" htmlFor={id}>
        Select Activities Subject
      </Label>
      <Select defaultValue="1">
        <SelectTrigger id={id} className="w-96">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent data-theme={theme} className=" w-96">
        <SelectItem value="1">All subjects</SelectItem>
        <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Main Subjects</SelectLabel>
            <SelectItem value="7">React</SelectItem>
            <SelectItem value="2">Vue</SelectItem>
            <SelectItem value="3">Angular</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Others Subjects</SelectLabel>
            <SelectItem value="4">Node.js</SelectItem>
            <SelectItem value="5">Python</SelectItem>
            <SelectItem value="6">Java</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
