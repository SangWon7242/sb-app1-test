"use client";

import MDEditor from "@uiw/react-md-editor";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSaveShortcut } from "@/app/hooks/useSaveShortcut";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const { id: postId } = await params;
      setId(postId);

      const { data: post, error } = await supabase
        .from("post")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        console.error(error);
        alert("게시물을 불러오는 중 오류가 발생했습니다.");
        router.push("/");
        return;
      }

      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }

      setLoading(false);
    };

    loadPost();
  }, [params, router]);

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
      .update({ title, content })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("글 수정 중 오류가 발생했습니다.");
      return;
    }

    alert("글이 수정 되었습니다.");
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
        수정
      </Button>
    </section>
  );
}
