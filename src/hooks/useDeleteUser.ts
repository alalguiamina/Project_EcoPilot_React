import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "../API/fetchClient";
import type { DeleteUserResponse } from "../types/user";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number): Promise<DeleteUserResponse> => {
      const response = await fetchClient<DeleteUserResponse>(
        `/user/users/${userId}/`,
        {
          method: "DELETE",
        },
      );

      if (response.error || !response.data) {
        throw response.error || new Error("Failed to delete user");
      }

      return response.data;
    },
    onSuccess: (_, userId) => {
      // Remove the deleted user from cache and refetch users list
      queryClient.removeQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
