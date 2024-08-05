import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import NextImage from "next/image";
import React from "react";
import Link from "next/link";

import { timeAgo } from "../../../utils/timeAgo";

import { TweetCardDropDown } from "./dropdown";
interface TweetCardProps {
  title: string;
  timestamp: Date;
  content: string | null;
  media_url: string | null;
  post_id: number;
}

const TweetCard = ({
  title,
  timestamp,
  content,
  media_url,
  post_id,
}: TweetCardProps) => {
  return (
    <Card className="px-2 py-4">
      <CardHeader>
        <div className="flex justify-between w-full gap-4">
          <Avatar showFallback src={""} />
          <div className="grow">
            <h2>Some Username</h2>
            <div>
              <span className="text-sm">{title}</span>
              <span className="text-tiny text-default-400 before:content-['∙'] before:mx-2">
                {timeAgo(timestamp)}
              </span>
            </div>
          </div>
          <TweetCardDropDown post_id={post_id} />
        </div>
      </CardHeader>
      <Divider />
      <Link href={`/posts/${Number(post_id)}`}>
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
      </Link>
    </Card>
  );
};

export default TweetCard;
