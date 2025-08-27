import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function NewStory() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const createStory = async () => {
    const { data: novel } = await supabase.from('novels').insert({ title, description }).select().single();
    if (novel) await supabase.from('chapters').insert({ novel_id: novel.id, number: 1, title: 'Capítulo 1', content });
  };
  return (
    <div className="p-4">
      <h1>Nueva Historia</h1>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" className="border p-1 block mb-2" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descripción" className="border p-1 block mb-2" />
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Contenido inicial" className="border p-1 block mb-2" />
      <button onClick={createStory} className="bg-green-600 text-white px-3 py-1">Crear</button>
    </div>
  );
}