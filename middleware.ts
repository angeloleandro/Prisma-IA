// middleware.ts

import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase/types"; // Certifique-se que este caminho está correto

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // Definir rotas protegidas
  const protectedRoutes = [
    "/dashboard",
    "/account",
    "/settings",
    "/workspace",
    "/chat",
    // Adicione outras rotas protegidas conforme necessário
  ];

  // Redirecionar usuários não autenticados
  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Verificar status de assinatura para rotas Pro
  const proRoutes = ["/pro-feature"]; // Substitua pela rota real
  if (session && proRoutes.some((route) => pathname.startsWith(route))) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("is_pro")
      .eq("user_id", session.user.id) // Alterado de "id" para "user_id"
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (!profile?.is_pro) {
      return NextResponse.redirect(new URL("/upgrade", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
