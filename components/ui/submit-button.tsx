// components/ui/submit-button.tsx
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  formAction?: () => Promise<void>
}

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, formAction, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={formAction}
        className={`rounded-md px-4 py-2 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

SubmitButton.displayName = "SubmitButton"
