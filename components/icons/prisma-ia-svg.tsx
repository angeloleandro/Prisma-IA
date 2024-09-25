import { FC, useMemo } from "react"

interface PrismaIASVGProps {
  theme: "dark" | "light"
  scale?: number
}

export const PrismaIASVG: FC<PrismaIASVGProps> = ({ theme, scale = 1 }) => {
  const colors = useMemo(() => {
    return {
      primary: theme === "dark" ? "#E0E0E0" : "#000000",
      secondary: "#757779",
      tertiary: "#323236"
    }
  }, [theme])

  return (
    <svg
      width={512 * scale}
      height={512 * scale}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <polygon points="256,34.2 256,337 0,404.3" fill={colors.tertiary} />
        <polygon points="512,404.3 256,337 256,34.2" fill={colors.secondary} />
        <polygon
          points="512,404.3 256,471.5 0,404.3 256,337"
          fill={colors.primary}
        />
      </g>
    </svg>
  )
}
