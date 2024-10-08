import { createClient } from '@/utils/supabase/server';
import s from './Navbar.module.css';
import Navlinks from './Navlinks';
import { cookies } from 'next/headers'; // Importa o gerenciamento de cookies

export default async function Navbar() {
  const cookieStore = cookies(); // Obtém os cookies do Next.js
  const supabase = createClient(cookieStore); // Passa o cookieStore ao criar o cliente

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <Navlinks user={user} />
      </div>
    </nav>
  );
}