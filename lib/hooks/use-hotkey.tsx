import { useEffect, useState } from "react"

const useHotkey = (key: string, callback: () => void): { isMac: boolean } => {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const modifierKey = isMac ? event.metaKey : event.ctrlKey
      if (
        modifierKey &&
        event.shiftKey &&
        event.key.toLowerCase() === key.toLowerCase()
      ) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [key, callback, isMac])

  return { isMac }
}

export default useHotkey
