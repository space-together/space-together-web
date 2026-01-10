"use client";

import { useDisplayMode } from "@/lib/hooks/use-display-mode";

interface Props {
  table?: React.ReactNode;
  cards?: React.ReactNode;
  page?: string;
}

const DisplaySwitcher = ({ table, cards, page }: Props) => {
  const { displayMode } = useDisplayMode(page);
  return <div>{displayMode === "card" ? cards : table}</div>;
};

export default DisplaySwitcher;
