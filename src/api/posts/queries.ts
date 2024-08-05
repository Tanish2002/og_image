import { useQuery } from "@tanstack/react-query";

import { getPostById, getPosts } from "./fetchers";

export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(), // always fetch latest posts
  });
}

export function useGetPost(post_id: number) {
  return useQuery({
    queryKey: [`post-${post_id}`],
    queryFn: () => getPostById(post_id),
  });
}
