import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"

export const SETUP_STEP_COUNT = 2

interface StepContainerProps {
  children: ReactNode
  onShouldProceed: (proceed: boolean) => void
  showBackButton: boolean
  showNextButton: boolean
  stepDescription: string
  stepNum: number
  stepTitle: string
  totalSteps: number
}

export const StepContainer: FC<StepContainerProps> = ({
  children,
  onShouldProceed,
  showBackButton,
  showNextButton,
  stepDescription,
  stepNum,
  stepTitle,
  totalSteps
}) => {
  const { t } = useTranslation()

  return (
    <Card className="w-[500px]">
      <CardContent className="pt-6">
        <div className="mb-4 text-center">
          <div className="mb-2 text-2xl font-bold">{stepTitle}</div>

          <div className="mb-2 text-sm text-muted-foreground">
            {stepDescription}
          </div>

          <div className="text-sm text-muted-foreground">
            {t("Step")} {stepNum} {t("of")} {totalSteps}
          </div>
        </div>

        <div className="space-y-4">{children}</div>

        <div className="mt-4 flex justify-between">
          <Button
            variant="outline"
            onClick={() => onShouldProceed(false)}
            disabled={!showBackButton}
          >
            <IconArrowLeft className="mr-2" />
            {t("Back")}
          </Button>

          <Button
            onClick={() => onShouldProceed(true)}
            disabled={!showNextButton}
          >
            {stepNum === totalSteps ? t("Finish") : t("Next")}
            <IconArrowRight className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
