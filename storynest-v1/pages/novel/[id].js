import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Link from 'next/link';

export default function Novel() {
  const router = useRouter();
  const { id } = router.query;
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    if (id) supabase.from('chapters').select('*').eq('novel_id', id).then(({ data }) => setChapters(data || []));
  }, [id]);
  return (
    <div className="p-4">
      <h1>Capítulos</h1>
      <ul>{chapters.map(c => (<li key={c.id}><Link href={`/novel/${id}/${c.id}`}>Capítulo {c.number}</Link></li>))}</ul>
    </div>
  );
}