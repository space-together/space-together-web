"use client";
// MessageSearchFile.tsx
// ----------------------
// Simple wrapper around the general `SearchBox` component used in the
// conversation view to filter shared files.  This is currently a placeholder
// – backend support should include an API to query files belonging to a
// conversation.

import SearchBox from "@/components/common/form/search-box";

const MessageSearchFile = () => {
  return (
    <div className=" ">
      <SearchBox
        className=" w-96"
        placeholder="Search file..."
        onSearch={() => {}}
      />
    </div>
  );
};

export default MessageSearchFile;
