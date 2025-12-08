import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 게시물 작성
  const createPost = async (
    title: string,
    content: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("post")
        .insert([{ title, content }])
        .select()
        .single();

      if (error) throw error;
      return true;
    } catch (err) {
      const errorMessage = "글 저장 중 오류가 발생했습니다.";
      setError(errorMessage);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 게시물 수정
  const updatePost = async (
    id: number,
    title: string,
    content: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("post")
        .update({ title, content, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return true;
    } catch (err) {
      const errorMessage = "글 수정 중 오류가 발생했습니다.";
      setError(errorMessage);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 게시물 삭제
  const deletePost = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("post").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (err) {
      const errorMessage = "글 삭제 중 오류가 발생했습니다.";
      setError(errorMessage);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
  };
};
