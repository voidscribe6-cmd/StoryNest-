import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { SessionContext } from '../context/SessionContext';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, profile, setProfile }}>
      <Navbar />
      <Component {...pageProps} />
    </SessionContext.Provider>
  );
}
export default MyApp;