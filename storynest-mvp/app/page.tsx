import { supabase } from "@/lib/supabaseClient";
import StoryCard from "@/components/StoryCard";

export default async function Home() {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) return <div>Error cargando historias.</div>;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {(stories ?? []).map(s => (
        <StoryCard key={s.id} title={s.title} slug={s.slug} cover_url={s.cover_url} tags={s.tags}/>
      ))}
      {(!stories || stories.length===0) && <p>Sin historias aún.</p>}
    </section>
  );
}