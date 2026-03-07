"use client";

import { RefreshCcw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import MyImage from "../common/myImage";
import { Button } from "../ui/button";

interface NotFoundPageProps {
  message?: string;
  title?: string;
  showSuggestions?: boolean;
}

const NotFoundPage = ({
  message,
  title = "Not Found",
  showSuggestions = true,
}: NotFoundPageProps) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full min-h-[60vh] justify-center items-center p-4">
      <div className="flex flex-col items-center max-w-2xl w-full space-y-6 animate-in fade-in duration-500">
        {/* Image */}
        <div className="relative">
          <MyImage
            className="size-64 drop-shadow-xl"
            classname="object-contain"
            src="/notFound.svg"
            alt={title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-200/30 to-transparent blur-2xl -z-10" />
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          <h4 className="text-2xl font-bold text-base-content">{title}</h4>
          <p className="text-base-content/70 max-w-md">
            {message ||
              "Check your internet connection or verify the parameters for this page."}
          </p>
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-5 border border-base-300 shadow-lg w-full max-w-md">
            <h3 className="text-xs font-semibold text-base-content/60 mb-3 flex items-center justify-center gap-2">
              <Search className="h-3.5 w-3.5" />
              Suggestions:
            </h3>
            <ul className="text-sm text-base-content/70 space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Verify your internet connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Check if the URL parameters are correct</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Try refreshing the page</span>
              </li>
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <BsArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            variant="secondary"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2 shadow-md hover:shadow-lg transition-all"
          >
            {isRefreshing ? (
              <>
                <RefreshCcw className="h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
