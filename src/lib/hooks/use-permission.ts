"use client";

import { useToast } from "@/lib/context/toast/ToastContext";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface UsePermissionOptions {
  userId: string;
  schoolId: string;
  token: string;
  schoolToken?: string | string[] | null;
  userRole?: string;
}

interface UsePermissionReturn {
  has: (permission: string) => boolean;
  loading: boolean;
  permissions: string[];
  refetch: () => Promise<void>;
}

/**
 * Hook to check user permissions
 * Caches permissions per session
 * Admin bypass: Admins always have all permissions
 */
export function usePermission({
  userId,
  schoolId,
  token,
  schoolToken,
  userRole,
}: UsePermissionOptions): UsePermissionReturn {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchPermissions = async () => {
    // Admin bypass
    if (userRole === "ADMIN") {
      setPermissions(["*"]); // Wildcard for all permissions
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await apiRequest<void, { permissions: string[] }>(
        "get",
        `/users/${userId}/permissions?school_id=${schoolId}`,
        undefined,
        {
          token,
          schoolToken,
        },
      );

      if (res.data?.permissions) {
        setPermissions(res.data.permissions);
      }
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
      showToast({
        title: "Permission Check Failed",
        description: "Could not load your permissions",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && schoolId && token) {
      fetchPermissions();
    }
  }, [userId, schoolId, token]);

  const has = (permission: string): boolean => {
    if (loading) return false;
    if (userRole === "ADMIN") return true;
    if (permissions.includes("*")) return true;
    return permissions.includes(permission);
  };

  return {
    has,
    loading,
    permissions,
    refetch: fetchPermissions,
  };
}
