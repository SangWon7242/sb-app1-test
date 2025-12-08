"use client";

import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSaveShortcut } from "@/app/hooks/useSaveShortcut";
import { usePost } from "@/app/hooks/usePost";
import { getNumberParam } from "@/app/utils/numberFormatter";

interface PostEditorProps {
  paramId: string;
}

export default function PostEditor({ paramId }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { loading, error, getPost, updatePost } = usePost();

  const id = getNumberParam(paramId);

  // 게시물 데이터 불러오기
  useEffect(() => {
    if (id === null) {
      alert("잘못된 게시물 ID입니다.");
      router.replace("/post/list"); // replace : 기록을 남기지 않음
      return;
    }

    const loadPost = async () => {
      const post = await getPost(id);

      if (!post) {
        // getPost가 null을 반환하면 이미 에러 처리됨
        alert("게시물을 찾을 수 없습니다.");
        router.replace("/post/list");
        return;
      }

      setTitle(post.title);
      setContent(post.content);
      setIsInitialLoading(false);
    };

    loadPost();
  }, [id, getPost, router]);

  const handleSubmit = async () => {
    if (id === null) return;

    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");

    const isSuccess = await updatePost(id, title, content);

    if (isSuccess) {
      alert(`${id}번 글이 수정되었습니다.`);
      router.push(`/post/${id}`);
    }
  };

  useSaveShortcut(handleSubmit, [title, content]);

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-lg">게시물을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <section className="post-write flex flex-col w-full gap-4 p-2">
      <Input
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <div>
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || "")}
          height="calc(100vh - 300px)"
          preview="live"
          hideToolbar={false}
          enableScroll={true}
          visibleDragbar={false}
          textareaProps={{
            placeholder: "마크다운을 입력해주세요.",
          }}
        />
      </div>
      <Button
        onClick={handleSubmit}
        className="w-[70%] self-center"
        disabled={loading}
      >
        {loading ? "수정 중..." : "수정"}
      </Button>
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
    </section>
  );
}
