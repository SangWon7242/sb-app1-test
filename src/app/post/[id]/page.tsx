import { formatDate } from "@/app/utils/dateFormatter";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MarkdownViewer from "@/components/viewer/MarkdownViewer";
import { getNumberParam } from "@/app/utils/numberFormatter";
import { getPostById } from "@/app/services/PostService";

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

  return (
    <section className="post-detail flex w-full flex-1">
      <div className="inner px-[3.725vw] flex flex-col gap-5 py-10 w-full">
        {/* 게시물 헤더 */}
        <div className="post-header border-b pb-5">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="post-meta flex items-center justify-between gap-4 text-gray-600">
            <div className="post-meta-left flex items-center gap-4">
              <div className="author flex items-center gap-2">
                <div className="profile-img w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  ^__^
                </div>
              </div>
              <div className="author-info flex flex-col">
                <span className="font-bold">유저1</span>
                <div className="post-date flex gap-2">
                  <span className="text-sm">
                    작성일 : {formatDate(post.created_at)}
                  </span>
                  {post.updated_at && (
                    <span className="text-sm">
                      수정일 : {formatDate(post.updated_at)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="post-meta-right flex gap-2">
              <Button className="cursor-pointer">
                <Link href={`/post/edit/${post.id}`}>수정</Link>
              </Button>
              <Button variant="outline" className="cursor-pointer">
                <Link href={`/post/delete/${post.id}`}>삭제</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 게시물 본문 */}
        <div className="post-content flex-grow">
          <div className="prose max-w-none">
            <MarkdownViewer content={post.content} />
          </div>
        </div>
      </div>
    </section>
  );
}
