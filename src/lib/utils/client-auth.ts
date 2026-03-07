// client-auth.ts
// Client-side utility to get auth tokens from cookies

import { SCHOOL_TOKEN_KEY, TOKEN_KEY } from "@/lib/env";
import { jwtDecode } from "jwt-decode";

interface UserJwtClaims {
  user: {
    _id: string;
    [key: string]: any;
  };
  exp: number;
}

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
 * Get current user ID from JWT token
 */
export function getCurrentUserId(): string | null {
  try {
    const token = getAccessToken();
    if (!token) return null;
    
    const decoded = jwtDecode<UserJwtClaims>(token);
    return decoded.user._id || null;
  } catch (error) {
    console.error("Failed to decode user token:", error);
    return null;
  }
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
