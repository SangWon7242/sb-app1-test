import PostEditor from "./PostEditor";
import { getNumberParam } from "@/app/utils/numberFormatter";
import { getPostById } from "@/app/services/PostService";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paramId = getNumberParam(id);

  if (paramId === null) {
    redirect("/post/list?error=invalid_id"); // ✅ 에러 코드 사용
  }

  const post = await getPostById(paramId);

  if (!post) {
    redirect(`/post/list?error=not_found&id=${id}`); // ✅ 에러 코드 사용
  }

  return <PostEditor post={post} />;
}
