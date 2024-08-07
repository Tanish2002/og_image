import { ImageResponse } from "@vercel/og";

import { getCachedPostById } from "@/api/posts/fetchers";
import { timeAgo } from "@/utils/timeAgo";
import { isValidURL } from "@/utils/validUrl";
import { Post } from "@/api/posts/types";
import { modifyUrl } from "@/utils/modifyUrl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const website = "bakaotaku.dev";

  const title = searchParams.get("title") ?? "";
  const desc = searchParams.get("desc") ?? "";
  const postId = searchParams.get("post_id") ?? "";

  let post_data: Post | undefined;

  if (!title && postId) {
    if (isNaN(Number(postId))) {
      return new Response(null, {
        status: 400,
        statusText: "Bad Request. Invalid post_id",
      });
    }
    post_data = await getCachedPostById(Number(postId));
    if (!post_data) {
      return new Response(null, {
        status: 400,
        statusText: "Bad Request. Invalid post_id",
      });
    }
  }

  const displayTitle = title || post_data?.title || "Title Required";
  const displayDesc = desc || post_data?.content || "Desc Required";

  if (post_data?.image_url && isValidURL(post_data.image_url)) {
    return new ImageResponse(
      (
        <div tw="bg-black flex items-center justify-center overflow-hidden">
          <img
            alt="Post Picure"
            src={modifyUrl(post_data.image_url, "q_auto:low")}
            tw="max-w-full max-h-full object-contain"
          />
        </div>
      ),
    );
  }

  return new ImageResponse(
    (
      <div tw="h-full w-full flex bg-black border-black border-[16px]">
        <div tw="flex flex-col justify-between bg-[#18181B] w-full h-full p-20 rounded-3xl">
          <div tw="flex justify-between">
            <div tw="flex flex-col">
              <div tw="text-[32px] text-white">
                {post_data ? timeAgo(post_data.updatedAt!) : ""}
              </div>
              <h1 tw="text-[64px] text-white">{displayTitle}</h1>
              <span tw="text-[32px] text-white">{displayDesc.slice(0, 60) + "..."}</span>
            </div>
            <img
              alt="Logo"
              src="https://github.com/Context-Not-Found.png" // just some logo..
              tw="w-24 h-24 rounded-full"
            />
          </div>
          <div tw="flex flex-row">
            <svg
              fill="none"
              height="24"
              stroke="rgb(59 130 246)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "9999px",
              }}
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <div tw="flex flex-col pl-8">
              <div tw="text-[32px] text-white">Some User</div>
              <div tw="text-[24px] text-blue-500">{website}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
