"use client";
// AuthDebug.tsx
// Temporary component to debug authentication state

import { getAccessToken, getSchoolToken } from "@/lib/utils/client-auth";
import { useEffect, useState } from "react";

export function AuthDebug() {
  const [authState, setAuthState] = useState({
    hasAccessToken: false,
    hasSchoolToken: false,
    cookies: "",
  });

  useEffect(() => {
    const accessToken = getAccessToken();
    const schoolToken = getSchoolToken();
    
    setAuthState({
      hasAccessToken: !!accessToken,
      hasSchoolToken: !!schoolToken,
      cookies: document.cookie,
    });
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-base-200 p-4 rounded-lg shadow-lg max-w-md z-50">
      <h3 className="font-bold text-sm mb-2">🔍 Auth Debug</h3>
      <div className="text-xs space-y-1">
        <p>
          Access Token: {authState.hasAccessToken ? "✅ Found" : "❌ Missing"}
        </p>
        <p>
          School Token: {authState.hasSchoolToken ? "✅ Found" : "❌ Missing"}
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer">View Cookies</summary>
          <pre className="text-[10px] mt-1 overflow-auto max-h-32">
            {authState.cookies || "No cookies found"}
          </pre>
        </details>
      </div>
    </div>
  );
}
