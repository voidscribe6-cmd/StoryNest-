import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabaseClient';

export default function Chapter() {
  const router = useRouter();
  const { chapterId } = router.query;
  const [content, setContent] = useState('');
  useEffect(() => {
    if (chapterId) supabase.from('chapters').select('content').eq('id', chapterId).single().then(({ data }) => setContent(data?.content || ''));
  }, [chapterId]);
  return <div className="p-4 whitespace-pre-wrap">{content}</div>;
}