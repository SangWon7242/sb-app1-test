export default function Page({ params }: { params: { id: string } }) {
  return (
    <section>
      <h1>게시글</h1>
      <p>{params.id}</p>
    </section>
  );
}
