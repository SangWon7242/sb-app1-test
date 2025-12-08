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
    alert("id를 올바르게 입력해주세요.");
    redirect("/post/list");
  }

  const post = await getPostById(paramId);

  if (!post) {
    alert(`${id}번 게시물은 존재하지 않습니다.`);
    redirect("/post/list");
  }

  return <PostEditor post={post} />;
}
