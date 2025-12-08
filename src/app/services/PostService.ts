import { createClient } from "@supabase/supabase-js";
import { Post } from "@/app/types/post";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getPostById(id: number): Promise<Post | null> {
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("게시물 조회 실패:", error);
    return null;
  }

  return data;
}

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("게시물 목록 조회 실패:", error);
    return []; // null 대신 빈 배열 반환
  }

  return data || [];
}
