"use client";

import { useEffect } from "react";

export const useSaveShortcut = (onSave: () => void, props: any[] = []) => {
  // Ctrl + S 키보드 단축키 추가
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + S (Windows/Linux) 또는 Cmd + S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault(); // 브라우저 기본 저장 동작 방지
        onSave();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSave, ...props]); // title과 content가 변경될 때마다 최신 값을 참조
};
