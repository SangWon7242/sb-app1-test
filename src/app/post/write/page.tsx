"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { Post } from "@/app/types/post";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    // 2. 새 글 추가
    setPosts((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        content,
      },
    ]);

    // 3. 입력값 초기화
    setTitle("");
    setContent("");
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

      {/* 4. 등록된 글 목록 표시 */}
      <div style={{ marginTop: 24 }}>
        <h2>테스트 등록된 글</h2>
        {posts.length === 0 && <p>아직 등록된 글이 없습니다.</p>}
        {posts.map((post) => (
          <div
            key={post.id}
            style={{ border: "1px solid #ddd", marginTop: 8, padding: 8 }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
