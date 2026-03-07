"use client";

import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function NotFound() {
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
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-500">
        {/* Image */}
        <div className="relative">
          <MyImage
            className="mx-auto h-72 w-72 drop-shadow-2xl"
            classname="object-contain"
            src="/png/not-found-page.png"
            alt="404 - Page Not Found"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-200/50 to-transparent blur-3xl -z-10" />
        </div>

        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-8xl font-black text-primary/20 select-none">
            404
          </h1>
          <h2 className="text-4xl font-bold text-base-content">
            Page Not Found
          </h2>
          <p className="text-lg text-base-content/70 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist, has been moved,
            or you don&apos;t have permission to access it.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-base-100/50 backdrop-blur-sm rounded-2xl p-6 border border-base-300 shadow-xl">
          <h3 className="text-sm font-semibold text-base-content/60 mb-4 flex items-center justify-center gap-2">
            <Search className="h-4 w-4" />
            What you can do:
          </h3>
          <ul className="text-sm text-base-content/70 space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Check the URL for typos or errors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Use the navigation menu to find what you need</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Go back to the previous page</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Return to the homepage and start fresh</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            variant="outline"
            onClick={handleGoBack}
            className="gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <BsArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button
            size="lg"
            variant="secondary"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            {isRefreshing ? (
              <>
                <RefreshCcw className="h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4" />
                Refresh Page
              </>
            )}
          </Button>

          <Link href="/">
            <Button
              size="lg"
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="h-4 w-4" />
              Go to Homepage
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-xs text-base-content/50">
          If you believe this is an error, please contact support or try again
          later.
        </p>
      </div>
    </div>
  );
}
