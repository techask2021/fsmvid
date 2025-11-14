"use client"

import { useEffect } from "react"

export function ThemeInitializer() {
  useEffect(() => {
    // Get the saved accent color from localStorage or use default
    const accentColor = localStorage.getItem("accent-color") || "blue"

    // Apply the accent color
    const hslValue = getHslValue(accentColor)
    document.documentElement.style.setProperty("--accent-color", hslValue)
  }, [])

  return null
}

function getHslValue(color: string): string {
  switch (color) {
    case "blue":
      return "221.2 83.2% 53.3%"
    case "green":
      return "142.1 76.2% 36.3%"
    case "red":
      return "0 84.2% 60.2%"
    case "purple":
      return "262.1 83.3% 57.8%"
    case "orange":
      return "24.6 95% 53.1%"
    case "yellow":
      return "47.9 95.8% 53.1%"
    case "pink":
      return "322.1 73.3% 57.8%"
    case "teal":
      return "173.4 80.4% 40%"
    default:
      return "221.2 83.2% 53.3%" // Default blue
  }
}
