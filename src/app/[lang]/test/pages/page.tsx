"use client";

import { OpenImages } from "@/components/common/image/open-images";

function TestingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 bg-base-200">
      <OpenImages
        images={["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]}
      />
    </div>
  );
}

export default TestingPage;
