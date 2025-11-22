import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../API/fetchClient";
import type { User as BackendUser } from "../types/user";

const PROFILE_ENDPOINT = process.env.REACT_APP_PROFILE_ENDPOINT || "/user/me/"; // adjust if your backend uses another path

export const useGetCurrentUser = (opts?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ["current-user"],
    queryFn: async (): Promise<BackendUser> => {
      const resp = await fetchClient<BackendUser>(PROFILE_ENDPOINT);
      if (resp.error || !resp.data) {
        throw resp.error || new Error("Failed to fetch current user");
      }
      return resp.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: opts?.enabled ?? true,
  });

export default useGetCurrentUser;
