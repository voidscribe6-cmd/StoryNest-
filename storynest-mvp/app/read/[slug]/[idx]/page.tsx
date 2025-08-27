import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function Reader({ params }: { params: { slug: string; idx: string } }) {
  const { data: story } = await supabase.from("stories").select("id, title, slug").eq("slug", params.slug).single();
  if (!story) return <div>No encontrado.</div>;

  const { data: chapter } = await supabase
    .from("chapters")
    .select("*")
    .eq("story_id", story.id)
    .eq("idx", Number(params.idx))
    .single();

  if (!chapter) return <div>No encontrado.</div>;

  return (
    <article className="prose max-w-none">
      <Link href={`/story/${story.slug}`} className="text-sm">← Volver</Link>
      <h1>{story.title} — Cap. {chapter.idx}: {chapter.title}</h1>
      <pre className="whitespace-pre-wrap font-sans">{chapter.content_md}</pre>
      {chapter.is_premium && (
        <div className="mt-6 p-4 border rounded bg-yellow-50">
          <p>Capítulo marcado premium. En MVP se muestra sin cobrar tokens.</p>
        </div>
      )}
    </article>
  );
}