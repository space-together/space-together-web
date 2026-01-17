import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

// ✅ Helper for safe revalidation
async function safeRevalidate(path: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4646";
    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
    if (!response.ok) {
      console.warn(
        `⚠️ Revalidation failed for ${path}: ${response.status} ${response.statusText}`,
      );
    } else {
      console.log(`✅ Successfully revalidated path: ${path}`);
    }
  } catch (error) {
    console.warn(
      `⚠️ Skipping revalidation for ${path}: ${String(error)} (safe fallback)`,
    );
  }
}

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface APIResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
  isLoading: boolean;
  realtime?: {
    enabled: boolean;
    entityType?: string;
  };
}

export interface ApiRequestOptions {
  token?: string;
  role?: string;
  realtime?: boolean | string;
  onRealtimeEvent?: (event: any) => void;
  revalidatePath?: string | string[];
  schoolToken?: string | string[] | null;
}

/**
 * Reusable API request function with loading state and safe revalidation support
 */
async function apiRequest<TRequest = unknown, TResponse = unknown>(
  method: HttpMethod,
  url: string,
  data?: TRequest,
  options: ApiRequestOptions = {},
): Promise<APIResponse<TResponse>> {
  let result: APIResponse<TResponse> = {
    isLoading: true,
  };

  try {
    if (data && typeof data !== "object" && data !== undefined) {
      throw new TypeError(
        `Invalid data type: Expected object, received ${typeof data}`,
      );
    }

    const config: AxiosRequestConfig = {
      method,
      url: `http://localhost:4646${url}`,
      headers: {
        "Content-Type": "application/json",
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...(options.schoolToken ? { "School-Token": options.schoolToken } : {}),
        ...(options.role ? { role: options.role } : {}),
      },
      ...(method !== "get" && data ? { data } : {}),
    };

    const response: AxiosResponse<TResponse> = await axios<TResponse>(config);

    result = {
      ...result,
      data: response.data,
      message: "Request successful",
      statusCode: response.status,
      isLoading: false,
    };

    if (options.realtime) {
      result.realtime = {
        enabled: true,
        entityType:
          typeof options.realtime === "string" ? options.realtime : undefined,
      };
    }

    if (
      options.revalidatePath &&
      ["post", "put", "patch", "delete"].includes(method)
    ) {
      const paths = Array.isArray(options.revalidatePath)
        ? options.revalidatePath
        : [options.revalidatePath];
      for (const path of paths) {
        await safeRevalidate(path);
      }
    }

    return result;
  } catch (error: unknown) {
    const errorResult: APIResponse<TResponse> = {
      isLoading: false,
      statusCode: 500,
      message: "An error occurred",
    };

    if (error instanceof TypeError) {
      return {
        ...errorResult,
        error: error.message,
        message: "Type Error",
        statusCode: 400,
      };
    }

    if (axios.isAxiosError(error)) {
      const res = error.response;
      return {
        ...errorResult,
        error: res?.data?.error || res?.statusText || "Axios Error",
        message: res?.data?.message || "Something went wrong",
        statusCode: res?.status || 500,
      };
    }

    return {
      ...errorResult,
      error: "Unknown error",
      message: String(error) || "An unexpected error occurred",
    };
  }
}

export default apiRequest;
