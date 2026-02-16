"use client";

import { useToast } from "@/lib/context/toast/ToastContext";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface UseFeatureOptions {
  schoolId: string;
  token: string;
  schoolToken?: string | string[] | null;
}

interface UseFeatureReturn {
  isEnabled: (featureKey: string) => boolean;
  loading: boolean;
  features: Record<string, boolean>;
  refetch: () => Promise<void>;
}

/**
 * Hook to check feature toggles for a school
 * Features are enabled by default unless explicitly disabled
 */
export function useFeature({
  schoolId,
  token,
  schoolToken,
}: UseFeatureOptions): UseFeatureReturn {
  const [features, setFeatures] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const res = await apiRequest<void, { features: Record<string, boolean> }>(
        "get",
        `/schools/${schoolId}/features`,
        undefined,
        {
          token,
          schoolToken,
        },
      );

      if (res.data?.features) {
        setFeatures(res.data.features);
      }
    } catch (error) {
      console.error("Failed to fetch features:", error);
      showToast({
        title: "Feature Check Failed",
        description: "Could not load feature settings",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (schoolId && token) {
      fetchFeatures();
    }
  }, [schoolId, token]);

  const isEnabled = (featureKey: string): boolean => {
    // Default to enabled if not explicitly set to false
    return features[featureKey] !== false;
  };

  return {
    isEnabled,
    loading,
    features,
    refetch: fetchFeatures,
  };
}
