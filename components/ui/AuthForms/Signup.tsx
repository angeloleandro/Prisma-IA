// components/ui/AuthForms/Signup.tsx

"use client"

import Button from "@/components/ui/Button/Button"
import React from "react"
import Link from "next/link"
import { signUp } from "@/utils/auth-helpers/server"
import { handleRequest } from "@/utils/auth-helpers/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface SignUpProps {
  allowEmail: boolean
  redirectMethod: string
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = useRouter() // Hook chamado incondicionalmente
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const redirect = redirectMethod === "client" ? router : null
      await handleRequest(e, signUp, redirect)
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
            Sign up
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <p>Already have an account?</p>
      <p>
        <Link href="/signin/password_signin" className="text-sm font-light">
          Sign in with email and password
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="text-sm font-light">
            Sign in via magic link
          </Link>
        </p>
      )}
    </div>
  )
}
