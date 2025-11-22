import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "../API/fetchClient";
import type { CreateSiteRequest, Site } from "../types/site";

export const useCreateSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (siteData: CreateSiteRequest): Promise<Site> => {
      const response = await fetchClient<Site>(
        "https://overmuch-pileous-merissa.ngrok-free.dev/user/sites/",
        {
          method: "POST",
          body: siteData,
        },
      );

      if (response.error || !response.data) {
        throw response.error || new Error("Failed to create site");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });
};

export default useCreateSite;
