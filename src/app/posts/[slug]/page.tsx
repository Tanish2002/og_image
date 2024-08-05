import type { Metadata, ResolvingMetadata } from "next";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getPostById } from "@/api/posts/fetchers";
import BigTweetCard from "@/components/posts/card/big_card";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  _: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  if (isNaN(Number(slug))) {
    return {
      title: "Error 404",
    };
  }
  const post_data = await getPostById(Number(slug));

  return {
    title: post_data?.title ?? "Unknown Post ID",
    description: post_data?.content.slice(0, 30) ?? "",
    openGraph: {
      title: post_data?.title ?? "Unknown Post ID",
      description: post_data?.content.slice(0, 30) ?? "",
      url: `${process.env.NEXT_PUBLIC_HOST}"`,
      type: "article",
      images: [`${process.env.NEXT_PUBLIC_HOST}/api/og?post_id=${slug}`],
    },
    twitter: {
      title: post_data?.title ?? "Unknown Post ID",
      description: post_data?.content.slice(0, 30) ?? "",
      card: "summary_large_image",
      images: [`${process.env.NEXT_PUBLIC_HOST}/api/og?post_id=${slug}`],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  if (isNaN(Number(params.slug))) {
    return <div>Unknown PostID</div>;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [`post-${Number(params.slug)}`],
    queryFn: () => getPostById(Number(params.slug)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BigTweetCard post_id={Number(params.slug)} />
    </HydrationBoundary>
  );
}
