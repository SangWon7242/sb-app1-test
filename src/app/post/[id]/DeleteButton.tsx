// src/app/post/[id]/DeleteButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { usePost } from "@/app/hooks/usePost";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: number;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  const { loading, deletePost } = usePost();

  const handleDelete = async () => {
    // 1. 삭제 확인
    if (!confirm(`${id}번 게시물을 삭제하시겠습니까?`)) {
      return;
    }

    // 2. 삭제 처리
    const isSuccess = await deletePost(id);

    // 3. 결과 처리
    if (isSuccess) {
      alert("게시물이 삭제되었습니다.");
      router.push("/post/list");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDelete}
      disabled={loading}
      className="cursor-pointer"
    >
      {loading ? "삭제 중..." : "삭제"}
    </Button>
  );
}
