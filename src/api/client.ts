/**
 * Centralized API Client for BIS Parakh
 * Connects directly to Parakh FastAPI backend.
 * Provides unified request handling, auth tokens, multipart uploads, and error extraction.
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000/api/v1';

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: any;

  constructor(message: string, status: number, code?: string, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

let authToken: string | null = typeof window !== 'undefined' ? localStorage.getItem('parakh_token') : null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('parakh_token', token);
    } else {
      localStorage.removeItem('parakh_token');
    }
  }
};

export const getAuthToken = (): string | null => authToken;

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (authToken && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // If body is not FormData and not already specified, default to application/json
  if (!(options.body instanceof FormData) && !headers['Content-Type'] && options.body) {
    headers['Content-Type'] = 'application/json';
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      let errorCode: string | undefined;
      let errorDetails: any = undefined;

      try {
        const errorJson = await response.json();
        if (errorJson?.error) {
          errorMessage = errorJson.error.message || errorMessage;
          errorCode = errorJson.error.code;
          errorDetails = errorJson.error.details;
        } else if (errorJson?.detail) {
          errorMessage = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
        }
      } catch {
        // Fallback to status text
      }

      throw new ApiError(errorMessage, response.status, errorCode, errorDetails);
    }

    // 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();
    return data as T;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err instanceof ApiError) {
      throw err;
    }
    if (err.name === 'AbortError') {
      throw new ApiError('Request timed out. Please check your network connection and retry.', 408, 'TIMEOUT');
    }
    throw new ApiError(
      err.message || 'Unable to connect to BIS Parakh backend service.',
      0,
      'NETWORK_ERROR'
    );
  }
}

export const apiClient = {
  get: <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    let query = '';
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.append(key, String(val));
        }
      });
      const qs = searchParams.toString();
      if (qs) query = `?${qs}`;
    }
    return request<T>(`${endpoint}${query}`, { method: 'GET' });
  },

  post: <T>(endpoint: string, body?: any, isFormData: boolean = false): Promise<T> => {
    let payload = body;
    if (body && !isFormData && !(body instanceof FormData)) {
      payload = JSON.stringify(body);
    }
    return request<T>(endpoint, {
      method: 'POST',
      body: payload,
    });
  },

  put: <T>(endpoint: string, body?: any): Promise<T> => {
    return request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete: <T>(endpoint: string): Promise<T> => {
    return request<T>(endpoint, {
      method: 'DELETE',
    });
  },
};
