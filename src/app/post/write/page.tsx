"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { Post } from "@/app/types/post";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function Page() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    const { data, error } = await supabase
      .from("post")
      .insert([{ title, content }])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("글 저장 중 오류가 발생했습니다.");
      return;
    }

    setPosts((prev) => [
      ...prev,
      {
        id: data.id,
        created_at: data.created_at,
        title: data.title,
        content: data.content,
      },
    ]);

    setTitle("");
    setContent("");

    alert("글이 작성 되었습니다.");
    router.push("/");
  };

  return (
    <section className="post-write">
      <h1>게시글 작성</h1>

      <Input
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleSubmit}>작성</Button>
    </section>
  );
}
