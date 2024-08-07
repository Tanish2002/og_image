import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

import { getPosts } from "@/api/posts/fetchers";
import TweetInput from "@/components/posts/input_box";
import TweetList from "@/components/posts/list";

export const metadata: Metadata = {
  title: "Posts By Some User",
  description: "Assignment Provided by Medial",
  openGraph: {
    title: "Posts By Some User",
    description: "Assignment Provided by Medial",
    url: `${process.env.NEXT_PUBLIC_HOST}"`,
    type: "website",
    images: [
      `${process.env.NEXT_PUBLIC_HOST}/api/og?title=Posts%20By%20Some%20User&desc=Empty%20Description`,
    ],
  },
  twitter: {
    title: "Posts By Some User",
    description: "Assignment Provided by Medial",
    card: "summary_large_image",
    images: [
      `${process.env.NEXT_PUBLIC_HOST}/api/og?title=Posts%20By%20Some%20User&desc=Empty%20Description`,
    ],
  },
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <main className="flex flex-col gap-y-9 col-span-2">
      <TweetInput />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TweetList />
      </HydrationBoundary>
    </main>
  );
}
