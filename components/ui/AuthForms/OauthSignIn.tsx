"use client"

import Button from "@/components/ui/Button/Button"
import { signInWithOAuth } from "@/utils/auth-helpers/client"
import { type Provider } from "@supabase/supabase-js"
import { Github } from "lucide-react"
import { useState } from "react"

type OAuthProviders = {
  name: Provider
  displayName: string
  icon: JSX.Element
}

export default function OauthSignIn() {
  const oAuthProviders: OAuthProviders[] = [
    {
      name: "github",
      displayName: "GitHub",
      icon: <Github className="size-5" />
    }
    // Adicione outros provedores de OAuth aqui, se necessário
  ]

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true) // Desativa o botão enquanto a requisição é tratada
    await signInWithOAuth(e)
    setIsSubmitting(false)
  }

  return (
    <div className="mt-8">
      {oAuthProviders.map(provider => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={e => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            variant="slim"
            type="submit"
            className="w-full"
            loading={isSubmitting}
          >
            <span className="mr-2">{provider.icon}</span>
            <span>{provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  )
}
