"use client"

import React from "react"
import { useFormStatus } from "react-dom"
import { useTranslation } from "react-i18next"
import { Button, ButtonProps } from "./button"

interface SubmitButtonProps extends ButtonProps {
  pendingText?: string
}

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, pendingText, ...props }, ref) => {
    const { pending } = useFormStatus()
    const { t } = useTranslation()

    return (
      <Button disabled={pending} ref={ref} {...props}>
        {pending ? pendingText || t("submitting") : children}
      </Button>
    )
  }
)

SubmitButton.displayName = "SubmitButton"

export { SubmitButton }
