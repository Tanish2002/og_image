"use client";
import { useGetPosts } from "../../api/posts/queries";

import TweetCard from "./card";

import { modifyUrl } from "@/utils/modifyUrl";

export default function TweetList() {
  const posts = useGetPosts();

  return (
    <>
      {posts.error ? (
        <div>Error {`${posts.error}`}</div>
      ) : (
        posts.data?.map((post, idx) => (
          <TweetCard
            key={idx}
            content={post.content}
            media_url={
              post.image_url ? modifyUrl(post.image_url, "q_auto") : null
            }
            post_id={post.id}
            timestamp={post.createdAt!}
            title={post.title}
          />
        ))
      )}
    </>
  );
}
