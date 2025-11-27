import { createClient } from "@/app/utils/supabase/server";
import { formatDate } from "@/app/utils/dateFormatter";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MarkdownViewer from "@/components/viewer/MarkdownViewer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // 특정 ID의 게시물 가져오기
  const { data: post, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id)
    .single(); // single()은 단일 객체를 반환 (배열이 아님)

  // 에러 처리
  if (error) {
    console.error("게시물 조회 에러:", error);
    notFound(); // 404 페이지로 이동
  }

  // 게시물이 없는 경우
  if (!post) {
    notFound();
  }

  return (
    <section className="post-detail flex w-full flex-1">
      <div className="inner px-[3.725vw] flex flex-col gap-5 py-10">
        {/* 게시물 헤더 */}
        <div className="post-header border-b pb-5">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="post-meta flex items-center gap-4 text-gray-600">
            <div className="author flex items-center gap-2">
              <div className="profile-img w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                ^__^
              </div>
              <span className="font-medium">유저1</span>
            </div>
            <span>•</span>
            <time className="text-sm">{formatDate(post.created_at)}</time>
          </div>
        </div>

        {/* 게시물 본문 */}
        <div className="post-content">
          <div className="prose max-w-none">
            <MarkdownViewer content={post.content} />
          </div>
        </div>

        {/* 게시물 정보 */}
        <div className="post-info mt-5 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <p>게시물 ID: {post.id}</p>
            <p>작성일: {formatDate(post.created_at)}</p>
            {post.updated_at && <p>수정일: {formatDate(post.updated_at)}</p>}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="post-actions flex gap-3 mt-5">
          <Button>수정</Button>
          <Button>삭제</Button>
          <Link
            href={"/post/list"}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            목록으로
          </Link>
        </div>
      </div>
    </section>
  );
}
