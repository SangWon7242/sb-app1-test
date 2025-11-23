import { createClient } from "@/app/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("post").select("*");
  if (error) {
    console.error(error);
    return;
  }

  return (
    <section>
      <h1>게시글 리스트</h1>
      <ul>
        {data.length === 0 && <li>등록된 글이 없습니다.</li>}
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
}
