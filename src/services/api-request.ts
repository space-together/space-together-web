import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIV002 } from '@/env';

/**
 * A reusable API request function with strict TypeScript typing and improved error handling.
 * @param method HTTP method ('get' | 'post' | 'put' | 'delete')
 * @param url API endpoint
 * @param data Optional request body
 * @param Authorization Optional authorization token
 * @returns Response data or detailed error message
 */
async function apiRequest<TRequest = unknown, TResponse = unknown>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: TRequest,
  Authorization?: string
): Promise<{ data?: TResponse; success?: string; error?: string }> {
  try {
    // Validate that data is an object (if provided)
    if (data && typeof data !== 'object') {
      throw new TypeError(`Invalid data type: Expected object, received ${typeof data}`);
    }

    // Construct request configuration
    const config: AxiosRequestConfig = {
      method,
      url: `${APIV002}${url}`,
      ...(data && method !== 'get' ? { data } : {}), // Only include `data` if it's not a GET request
      headers: {
        'Content-Type': 'application/json',
        ...(Authorization ? { Authorization } : {}),
      },
    };

    // Ensure the correct response type
    const response: AxiosResponse<TResponse> = await axios<TResponse>(config);
    
    return { data: response.data, success: `request successful` };
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      return { error: error.message }; // Returns meaningful type error
    }

    if (error instanceof AxiosError) {
      return {
        error: error.response?.data?.message || `HTTP Error: ${error.response?.status || 'Unknown Status'}`,
      };
    }

    return { error: "An unexpected error occurred" };
  }
}

export default apiRequest;
