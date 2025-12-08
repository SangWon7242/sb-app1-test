import PostEditor from "./PostEditor.tsx";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PostEditor id={id} />;
}
