"use client"

import { ChatUI } from "@/components/chat/chat-ui"
import { useTranslation } from "react-i18next"

export default function ChatIDPage() {
  const { t } = useTranslation()

  return (
    <div className="h-full overflow-hidden">
      <ChatUI />
    </div>
  )
}
