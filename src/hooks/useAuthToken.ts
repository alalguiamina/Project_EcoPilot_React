import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "../API/fetchClient";

export interface TokenResponse {
  access?: string;
  refresh?: string;
  token?: string;
  access_token?: string;
  refresh_token?: string;
}

// Use endpoint path only. REACT_APP_API_BASE_URL will be prepended by fetchClient.
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_TOKEN_ENDPOINT ?? "/token/";

export const useAuthToken = () => {
  return useMutation({
    mutationFn: async (credentials: {
      username?: string;
      user?: string;
      email?: string;
      password: string;
    }): Promise<TokenResponse> => {
      const username =
        credentials.username ?? credentials.user ?? credentials.email ?? "";
      const body = { username, password: credentials.password };

      const resp = await fetchClient<TokenResponse>(AUTH_ENDPOINT, {
        method: "POST",
        body,
      });

      console.debug("[useAuthToken] server response:", resp);

      if (resp.error || !resp.data) {
        const msg =
          resp.error?.detail ??
          resp.error?.message ??
          JSON.stringify(resp.error) ??
          `Auth failed (${resp.status})`;
        throw new Error(msg);
      }

      return resp.data;
    },
  });
};

export default useAuthToken;
