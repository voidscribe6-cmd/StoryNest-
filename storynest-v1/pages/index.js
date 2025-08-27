import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

export default function Home() {
  const [novelas, setNovelas] = useState([]);
  useEffect(() => {
    supabase.from('novels').select('id,title,description').then(({ data }) => setNovelas(data || []));
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Novelas</h1>
      <ul>
        {novelas.map(n => (
          <li key={n.id} className="border p-2 mb-2">
            <Link href={`/novel/${n.id}`}><b>{n.title}</b></Link>
            <p>{n.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}