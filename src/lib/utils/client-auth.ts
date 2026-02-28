// client-auth.ts
// Client-side utility to get auth tokens from cookies

import { SCHOOL_TOKEN_KEY, TOKEN_KEY } from "@/lib/env";

/**
 * Get a cookie value by name (client-side only)
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  
  return null;
}

/**
 * Get the user access token from cookies
 */
export function getAccessToken(): string | null {
  return getCookie(TOKEN_KEY);
}

/**
 * Get the school token from cookies
 */
export function getSchoolToken(): string | null {
  return getCookie(SCHOOL_TOKEN_KEY);
}

/**
 * Get auth headers for API requests
 */
export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const schoolToken = getSchoolToken();
  if (schoolToken) {
    headers["School-Token"] = schoolToken;
  }

  return headers;
}
