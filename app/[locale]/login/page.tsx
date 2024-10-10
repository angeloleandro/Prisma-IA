import { redirect } from "next/navigation"

export default function Login() {
  // Redireciona para a nova página de login no novo sistema
  return redirect("/signin")
}
