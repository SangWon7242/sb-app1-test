"use client"; // ✅ 클라이언트 컴포넌트 선언

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_id: "id를 올바르게 입력해주세요.",
  not_found: "게시물이 존재하지 않습니다.",
};

export default function PostListAlert() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasAlerted = useRef(false); // React 18 StrictMode에서 두 번 뜨는 것 방지

  useEffect(() => {
    const errorCode = searchParams.get("error");
    const id = searchParams.get("id");

    if (errorCode && !hasAlerted.current) {
      hasAlerted.current = true; // 알림 표시 체크

      // 에러 메시지 생성
      let message = ERROR_MESSAGES[errorCode] || "오류가 발생했습니다.";
      if (errorCode === "not_found" && id) {
        message = `${id}번 ${message}`;
      }

      // 1. 알림 띄우기
      alert(message);

      // 2. URL에서 errMsg 파라미터만 깔끔하게 제거
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("error");
      newParams.delete("id");

      // 파라미터가 다 지워졌으면 경로만, 남은게 있으면 쿼리 포함해서 이동
      const newPath = newParams.toString()
        ? `/post/list?${newParams.toString()}`
        : "/post/list";

      router.replace(newPath);
    }
  }, [searchParams, router]);

  return null; // 화면에 그릴 것은 없음 (기능만 수행)
}
