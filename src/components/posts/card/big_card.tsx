"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import NextImage from "next/image";
import React from "react";

import { timeAgo } from "../../../utils/timeAgo";

import { useGetPost } from "@/api/posts/queries";

interface TweetCardProps {
  post_id: number;
}

export default function BigTweetCard({ post_id }: TweetCardProps) {
  const post = useGetPost(post_id);

  if (post.data === undefined) {
    return <div>Unknown Post ID</div>;
  }
  const {
    title,
    updatedAt: timestamp,
    content,
    image_url: media_url,
  } = post.data!;

  return (
    <Card className="px-2 py-4">
      <CardHeader>
        <div className="flex justify-between w-full gap-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <span className="text-tiny text-default-400">
            {timeAgo(timestamp!)}
          </span>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-center mb-4">{content}</p>
        {media_url && (
          <div className="relative aspect-square">
            <NextImage
              fill
              alt="Card background"
              className="object-cover rounded-xl"
              loading="lazy"
              src={media_url}
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
}
