export interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
}

export interface ApiResponse<T> {
  data?: T;
  error?: unknown;
  status: number;
}

// Get the base URL from environment or use a default
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

/**
 * Custom fetch client for API calls
 * Handles JSON serialization, authentication headers, and error handling
 */
export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Add authentication token if available
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Add body for non-GET requests
  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    let data: T | undefined;
    let error: unknown;

    // Try to parse JSON response
    try {
      const responseData = await response.json();
      if (response.ok) {
        data = responseData;
      } else {
        error = responseData;
      }
    } catch {
      // If JSON parsing fails, use text content or create generic error
      if (!response.ok) {
        error = {
          detail: response.statusText || "An error occurred",
        };
      }
    }

    return {
      data,
      error,
      status: response.status,
    };
  } catch (networkError) {
    return {
      error: {
        detail: "Network error: Unable to reach the server",
      },
      status: 0,
    };
  }
}
