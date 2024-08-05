import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost, insertPost } from "./fetchers";

export function useInsertPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: [`post-${data?.id}`] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, { post_id }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: [`post-${post_id}`] });
    },
  });
}
