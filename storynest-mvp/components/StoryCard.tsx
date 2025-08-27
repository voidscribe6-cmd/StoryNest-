import Link from "next/link";

export default function StoryCard({
  title, slug, cover_url, tags
}: { title: string; slug: string; cover_url?: string | null; tags?: string[] | null; }) {
  return (
    <Link href={`/story/${slug}`} className="group rounded-xl overflow-hidden border hover:shadow">
      <img src={cover_url ?? "/cover-placeholder.webp"} alt={title} className="h-64 w-full object-cover" />
      <div className="p-3">
        <h3 className="font-semibold group-hover:underline">{title}</h3>
        {tags?.length ? <p className="text-xs opacity-70 mt-1">{tags.join(" · ")}</p> : null}
      </div>
    </Link>
  );
}