"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";

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

  // Ctrl + S 키보드 단축키 추가
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + S (Windows/Linux) 또는 Cmd + S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault(); // 브라우저 기본 저장 동작 방지
        handleSubmit();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [title, content]); // title과 content가 변경될 때마다 최신 값을 참조

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
