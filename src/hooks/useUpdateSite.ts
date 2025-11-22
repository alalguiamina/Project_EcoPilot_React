import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "../API/fetchClient";
import type { UpdateSiteRequest, Site } from "../types/site";

interface UpdateSiteParams {
  siteId: number;
  siteData: UpdateSiteRequest;
}

export const useUpdateSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      siteId,
      siteData,
    }: UpdateSiteParams): Promise<Site> => {
      const response = await fetchClient<Site>(`/user/sites/${siteId}/`, {
        method: "PATCH",
        body: siteData,
      });

      if (response.error || !response.data) {
        throw response.error || new Error("Failed to update site");
      }

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
      queryClient.invalidateQueries({ queryKey: ["site", data.id] });
    },
  });
};

export default useUpdateSite;
