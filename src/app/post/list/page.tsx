import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("post").select("*");

  if (error) {
    console.error(error);
    return;
  }

  if (data.length === 0) {
    return (
      <section>
        <h1>게시글 리스트</h1>
        <ul>
          <li>등록된 글이 없습니다.</li>
        </ul>
      </section>
    );
  }

  return (
    <section className="post-list flex w-full flex-1">
      <div className="inner container mx-auto">
        <h1 className="text-2xl font-bold text-center">내글</h1>
        <nav className="post-menu-wrap">
          <ul className="grid grid-cols-3 gap-2">
            {data.map((post) => (
              <li key={post.id} className="bg-blue-300">
                <Link href={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
