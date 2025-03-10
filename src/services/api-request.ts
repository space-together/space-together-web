import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIV002 } from '@/env';

/**
 * A reusable API request function with strict TypeScript typing
 * @param method HTTP method ('get' | 'post' | 'put' | 'delete')
 * @param url API endpoint
 * @param data Optional request body
 * @returns Response data or error message
 */
async function apiRequest<TRequest = unknown, TResponse = unknown>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: TRequest
): Promise<{ data?: TResponse; success?: string; error?: string }> {
  try {
    // Construct request configuration
    const config: AxiosRequestConfig = {
      method,
      url: `${APIV002}${url}`,
      ...(data && method !== 'get' ? { data } : {}), // Only include `data` if it's not a GET request
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token if required
        // 'Authorization': `Bearer ${yourToken}`,
      },
    };

    // Ensure the correct response type
    const response: AxiosResponse<TResponse> = await axios<TResponse>(config);
    
    return { data: response.data, success: `${method.toUpperCase()} request successful` };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "An unexpected error occurred" };
  }
}

export default apiRequest;
