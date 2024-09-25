import { FC } from "react"

interface PrismaIASVGProps {
  theme: "dark" | "light"
  scale?: number
}

export const PrismaIASVG: FC<PrismaIASVGProps> = ({ theme, scale = 1 }) => {
  const darkMode = theme === "dark"
  const primaryColor = darkMode ? "#E0E0E0" : "#000000"
  const secondaryColor = darkMode ? "#757779" : "#757779"
  const tertiaryColor = darkMode ? "#323236" : "#323236"

  return (
    <svg
      width={512 * scale}
      height={512 * scale}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <polygon points="256,34.2 256,337 0,404.3" fill={tertiaryColor} />
        <polygon points="512,404.3 256,337 256,34.2" fill={secondaryColor} />
        <polygon
          points="512,404.3 256,471.5 0,404.3 256,337"
          fill={primaryColor}
        />
      </g>
    </svg>
  )
}
