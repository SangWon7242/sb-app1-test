import PostEditor from "./PostEditor";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PostEditor id={id} />;
}
