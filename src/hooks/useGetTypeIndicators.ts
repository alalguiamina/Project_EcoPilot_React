import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../API/fetchClient";
import type { IndicatorType } from "../types/indicator";

export const useGetTypeIndicators = () => {
  return useQuery({
    queryKey: ["type-indicators"],
    queryFn: async (): Promise<IndicatorType[]> => {
      const response = await fetchClient<IndicatorType[]>(
        "/user/type-indicateurs/",
      );

      if (response.error || !response.data) {
        throw response.error || new Error("Failed to fetch indicator types");
      }

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetTypeIndicators;
