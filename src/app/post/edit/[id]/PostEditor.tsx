"use client";

import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSaveShortcut } from "@/app/hooks/useSaveShortcut";
import { usePost } from "@/app/hooks/usePost";

interface PostEditorProps {
  id: string;
}

export default function PostEditor({ id }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { loading, error, getPost } = usePost();

  // 게시물 데이터 불러오기
  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await getPost(id);

        if (post) {
          setTitle(post.title);
          setContent(post.content);
        } else {
          alert("게시물을 찾을 수 없습니다.");
          router.push("/post/list");
        }
      } catch (error) {
        console.error(error);
        alert("게시물을 불러오는 중 오류가 발생했습니다.");
        router.push("/post/list");
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadPost();
  }, [id]); // id를 dependency로

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
  };

  useSaveShortcut(handleSubmit, [title, content]);

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
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
