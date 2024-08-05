"use client";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { MoreVertical } from "react-feather";

import { useCopyToClipboard } from "@/utils/copyText";
import { useDeletePost } from "@/api/posts/mutations";

export const TweetCardDropDown = ({ post_id }: { post_id: number }) => {
  const deletePost = useDeletePost();
  const [isCopied, copyFunc] = useCopyToClipboard();

  const menuHandler = (key: React.Key) => {
    switch (key) {
      case "copy":
        copyFunc(`${process.env.NEXT_PUBLIC_HOST}/posts/${post_id}`);
        break;
      case "delete":
        deletePost.mutate({ post_id: post_id });
        break;
    }
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            startContent={<MoreVertical />}
            variant="bordered"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" onAction={(key) => menuHandler(key)}>
          <DropdownItem key="copy">
            {isCopied ? "Copied" : "Copy Post URL"}
          </DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete tweet
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
