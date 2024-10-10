// components/ui/AuthForms/PasswordSignIn.tsx

"use client"

import Button from "@/components/ui/Button/Button"
import Link from "next/link"
import { signInWithPassword } from "@/utils/auth-helpers/server"
import { handleRequest } from "@/utils/auth-helpers/client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface PasswordSignInProps {
  allowEmail: boolean
  redirectMethod: string
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod
}: PasswordSignInProps) {
  const router = useRouter() // Hook chamado incondicionalmente
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true) // Desativa o botão enquanto a requisição é tratada
    try {
      const redirect = redirectMethod === "client" ? router : null
      await handleRequest(e, signInWithPassword, redirect)
    } catch (err: any) {
      setError(err.message)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="my-8">
      <form noValidate className="mb-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full rounded-md bg-zinc-800 p-3"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full rounded-md bg-zinc-800 p-3"
              required
            />
          </div>
          <Button
            variant="slim"
            type="submit"
            className="mt-1"
            loading={isSubmitting}
          >
            Sign in
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <p>
        <Link href="/signin/forgot_password" className="text-sm font-light">
          Forgot your password?
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="text-sm font-light">
            Sign in via magic link
          </Link>
        </p>
      )}
      <p>
        <Link href="/signin/signup" className="text-sm font-light">
          Don&apos;t have an account? Sign up
        </Link>
      </p>
    </div>
  )
}
