"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { useSaveShortcut } from "@/app/hooks/useSaveShortcut";
import { usePost } from "@/app/hooks/usePost";

export default function Page() {
  const router = useRouter();

  const { createPost, error } = usePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    createPost(title, content);
    setTitle("");
    setContent("");
    router.push("/");
  };

  useSaveShortcut(handleSubmit, [title, content]);

  if (error) {
    alert(error);
    return;
  }

  return (
    <section className="post-write flex flex-col w-full gap-4 p-2">
      <Input
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || "")}
          height="calc(100vh - 300px)"
          preview="live" // 분할 화면으로 변경
          hideToolbar={false} // 툴바 표시/숨김
          enableScroll={true} // 스크롤 동기화
          visibleDragbar={false} // 크기 조절 바 표시
          textareaProps={{
            placeholder: "마크다운을 입력해주세요.",
          }}
        />
      </div>
      <Button onClick={handleSubmit} className="w-[70%] self-center">
        작성
      </Button>
    </section>
  );
}
