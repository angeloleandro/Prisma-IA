import { FC, memo, ComponentProps } from "react" // Importando ComponentProps de React
import ReactMarkdown from "react-markdown"

// Utilizando ComponentProps para inferir automaticamente as props do ReactMarkdown
export const MessageMarkdownMemoized: FC<ComponentProps<typeof ReactMarkdown>> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
)
