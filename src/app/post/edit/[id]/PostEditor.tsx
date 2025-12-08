"use client";

import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSaveShortcut } from "@/app/hooks/useSaveShortcut";
import { Post } from "@/app/types/post";
import { usePost } from "@/app/hooks/usePost";

interface PostEditorProps {
  post: Post;
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const { loading, error, updatePost } = usePost();

  const handleSubmit = async () => {
    const id = post.id;

    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");

    const isSuccess = await updatePost(id, title, content);

    if (isSuccess) {
      alert(`${id}번 글이 수정되었습니다.`);
      router.push(`/post/${id}`);
    }
  };

  useSaveShortcut(handleSubmit, [title, content]);

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
