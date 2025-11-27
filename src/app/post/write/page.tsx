"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { useSaveShortcut } from "@/app/hooks/useSaveShortcut";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function Page() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const { error } = await supabase
      .from("post")
      .insert([{ title, content }])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("글 저장 중 오류가 발생했습니다.");
      return;
    }

    setTitle("");
    setContent("");

    alert("글이 작성 되었습니다.");
    router.push("/");
  };

  useSaveShortcut(handleSubmit, [title, content]);

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
