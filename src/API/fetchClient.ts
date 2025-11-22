export interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
}

export interface ApiResponse<T> {
  data?: T;
  error?: any;
  status: number;
}

// Get the base URL from environment or use a default
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

/**
 * Custom fetch client for API calls
 * Handles JSON serialization, authentication headers, and error handling
 */
export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const token =
    localStorage.getItem("authToken") || localStorage.getItem("ACCESS_TOKEN");
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  let body: any = undefined;
  if (options.body !== undefined && options.body !== null) {
    // If caller passes FormData, do not set Content-Type and do not stringify
    if (options.body instanceof FormData) {
      body = options.body;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(options.body);
    }
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );
  const fullUrl = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

  // DEBUG: show final URL and body
  console.debug(
    "[fetchClient] Request ->",
    options.method ?? "GET",
    fullUrl,
    "body=",
    options.body,
  );

  try {
    const resp = await fetch(fullUrl, {
      method: options.method ?? "GET",
      headers,
      mode: "cors", // allow cross-origin; backend must enable CORS
      cache: "no-cache",
      body,
      credentials: options.credentials,
    });

    let parsed: any = undefined;
    try {
      parsed = await resp.json();
    } catch (e) {
      // no json body
      parsed = undefined;
    }

    if (!resp.ok) {
      console.warn(
        "[fetchClient] non-ok response:",
        resp.status,
        resp.statusText,
        parsed,
      );
      return {
        error: parsed ?? { statusText: resp.statusText, status: resp.status },
        status: resp.status,
      };
    }

    console.debug("[fetchClient] Response OK:", resp.status, parsed);
    return {
      data: parsed as T,
      status: resp.status,
    };
  } catch (networkError) {
    // More explicit error logging to help debug CORS/network problems
    console.error("[fetchClient] Network error ->", networkError);
    return {
      error: { message: "Network error", detail: String(networkError) },
      status: 0,
    };
  }
}
