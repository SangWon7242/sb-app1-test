import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";
import styles from "./List.module.css";
import { formatDate } from "@/app/utils/dateFormatter";

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
      <div className="inner container mx-auto flex flex-col gap-2 py-5">
        <h1 className="text-2xl font-bold text-center">내글</h1>
        <nav className="post-menu-wrap">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {data.map((post) => (
              <li key={post.id} className={styles["post-list"]}>
                <Link href={`/post/${post.id}`} className={styles["link-text"]}>
                  <div className={styles["post-id"]}>POST {post.id}</div>
                  <div className={styles["post-info"]}>
                    <div className={styles["profile-img"]}>^__^</div>
                    <div className="profile-info">
                      <div className="post-writer-name text-lg font-bold">
                        유저1
                      </div>
                      <div className="post-writer-date text-sm">
                        {formatDate(post.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
