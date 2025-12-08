import { createClient } from "@/app/utils/supabase/server";
import { Post } from "@/app/types/post";

export async function getPostById(id: number): Promise<Post | null> {
  const supabase = await createClient();

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
