"use server";

import { desc, eq } from "drizzle-orm";

import { db } from "../../db";

import { Post } from "./types";

import { posts } from "@/db/schema";
import { uploadFromBuffer } from "@/utils/uploadImage";

const UPSTASH_URL = process.env.UPSTASH_URL!;
const AUTH_HEADER = {
  Authorization: process.env.UPSTASH_TOKEN!,
  "Content-Type": "application/json",
};

export async function getPosts() {
  return db.query.posts.findMany({ orderBy: desc(posts.id) });
}

export async function getCachedPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${UPSTASH_URL}/get/posts`, {
      headers: AUTH_HEADER,
    });
    const data = await response.json();
    const cachedPosts = data.result ? (JSON.parse(data.result) as Post[]) : [];

    if (cachedPosts.length === 0) {
      const posts = await getPosts();

      return await setCachedPosts(posts);
    }

    return cachedPosts;
  } catch {
    throw new Error("Error fetching cached posts");
  }
}

export async function getPostById(post_id: number) {
  return db.query.posts.findFirst({ where: eq(posts.id, post_id) });
}

export async function getCachedPostById(
  post_id: number,
): Promise<Post | undefined> {
  try {
    const response = await fetch(`${UPSTASH_URL}/get/post-${post_id}`, {
      headers: AUTH_HEADER,
    });
    const data = await response.json();
    const cachedPost = data.result
      ? (JSON.parse(data.result) as Post)
      : undefined;

    if (!cachedPost) {
      const post = await getPostById(post_id);

      return await setCachedPostById(post_id, post);
    }

    return cachedPost;
  } catch {
    throw new Error("Error fetching cached post");
  }
}

export async function insertPost(formData: FormData) {
  let uploadResult = null;

  if (formData.has("image") && (formData.get("image") as File).size !== 0) {
    uploadResult = await uploadFromBuffer(formData.get("image") as File);
  }

  const post = await db
    .insert(posts)
    .values({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      image_url: uploadResult ? uploadResult.url : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  // set cache
  return await setCachedPostById(post[0].id, post[0]);
}

export async function deletePost({ post_id }: { post_id: number }) {
  // delete cache
  await fetch(`${UPSTASH_URL}/del/post-${post_id}`, {
    headers: AUTH_HEADER,
  });

  return db.delete(posts).where(eq(posts.id, post_id));
}

export async function setCachedPosts(posts_data: Post[]) {
  try {
    await fetch(`${UPSTASH_URL}/set/posts`, {
      method: "POST",
      headers: AUTH_HEADER,
      body: JSON.stringify(posts_data),
    });

    return posts_data;
  } catch {
    throw new Error("Error setting cached posts");
  }
}

export async function setCachedPostById(
  post_id: number,
  post_data: Post | undefined,
) {
  try {
    await fetch(`${UPSTASH_URL}/set/post-${post_id}`, {
      method: "POST",
      headers: AUTH_HEADER,
      body: JSON.stringify(post_data),
    });

    return post_data;
  } catch {
    throw new Error("Error setting cached post");
  }
}
