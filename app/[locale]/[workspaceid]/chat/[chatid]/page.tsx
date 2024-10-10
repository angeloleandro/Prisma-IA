// app/[locale]/[workspaceid]/chat/[chatid]/page.tsx

"use client"

import { ChatUI } from "@/components/chat/chat-ui"
// import { useTranslation } from "react-i18next"; // Removido pois não está sendo usado

export default function ChatIDPage() {
  // const { t } = useTranslation(); // Removido pois não está sendo usado

  return (
    <div className="h-full overflow-hidden">
      <ChatUI />
    </div>
  )
}
