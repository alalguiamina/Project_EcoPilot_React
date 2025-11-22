import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "../API/fetchClient";

export const useDeleteSite = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (siteId: number) => {
      const resp = await fetchClient<void>(`/user/sites/${siteId}/`, {
        method: "DELETE",
      });

      if (resp.error) {
        // try to provide a useful error
        const errMsg =
          resp.error?.detail ||
          resp.error?.message ||
          JSON.stringify(resp.error) ||
          `Failed to delete site (status ${resp.status})`;
        throw new Error(errMsg);
      }

      return resp;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sites"] });
      qc.invalidateQueries({ queryKey: ["site-groups"] });
    },
  });
};

export default useDeleteSite;
