import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const { data: story } = await supabase.from("stories").select("*").eq("slug", params.slug).single();
  if (!story) return <div>No encontrado.</div>;

  const { data: chapters } = await supabase
    .from("chapters")
    .select("id, idx, title, is_premium, tokens_required")
    .eq("story_id", story.id)
    .order("idx");

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <img src={story.cover_url ?? "/cover-placeholder.webp"} alt={story.title} className="w-40 h-56 object-cover rounded"/>
        <div>
          <h1 className="text-2xl font-bold">{story.title}</h1>
          <p className="text-sm opacity-70 mt-1">{(story.tags ?? []).join(" · ")}</p>
        </div>
      </div>

      <ul className="divide-y rounded border">
        {(chapters ?? []).map((c) => (
          <li key={c.id} className="flex items-center justify-between p-3">
            <span>{c.idx}. {c.title}</span>
            <Link className="text-blue-600 hover:underline" href={`/read/${params.slug}/${c.idx}`}>
              {c.is_premium ? `Leer (⚡${c.tokens_required})` : "Leer"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}