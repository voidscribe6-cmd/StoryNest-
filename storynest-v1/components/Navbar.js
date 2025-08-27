import Link from 'next/link';
import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import { supabase } from '../utils/supabaseClient';

function Navbar() {
  const { session, profile } = useContext(SessionContext);
  const handleLogout = async () => { await supabase.auth.signOut(); };
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold">StoryNest</Link>
      <div>
        {session ? (
          <>
            <span className="mr-4">Monedas: {profile ? profile.coins : 0}</span>
            <Link href="/new-story" className="mr-4 underline">Subir Historia</Link>
            <button onClick={handleLogout} className="bg-gray-700 px-2 py-1 rounded">Salir</button>
          </>
        ) : (
          <Link href="/login" className="underline">Login</Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;