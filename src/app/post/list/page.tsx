import Link from "next/link";
import styles from "./list.module.css";
import { formatDate } from "@/app/utils/dateFormatter";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/app/services/PostService";

export default async function Page() {
  const posts = await getPosts();

  if (!posts) {
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
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {posts.map((post) => (
              <li key={post.id} className={styles["post-list"]}>
                <Link href={`/post/${post.id}`} className={styles["link-text"]}>
                  <div className="post-detail-header flex items-center w-full gap-2">
                    <Badge
                      className="h-5 min-w-10 rounded-full px-1 font-mono tabular-nums"
                      variant="outline"
                    >
                      {post.id}
                    </Badge>
                    <p className="font-bold">{post.title}</p>
                  </div>
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
