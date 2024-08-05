import { NextResponse } from "next/server";

import {
  getPostById,
  getPosts,
  setCachedPostById,
  setCachedPosts,
} from "@/api/posts/fetchers";

export async function GET(_: Request) {
  try {
    const latestPosts = await getPosts();

    const cachedPosts = await setCachedPosts(latestPosts);

    // set individual post caches
    for (const post of cachedPosts) {
      const post_data = await getPostById(post.id);

      await setCachedPostById(post.id, post_data);
    }

    return NextResponse.json({
      data: `Updated posts at ${new Date().toISOString()}. Ids: ${cachedPosts
        .map((item) => item.id)
        .join(", ")} `,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
