"use client"

import { useState } from "react"

function getRGB(c) {
  return parseInt(c, 16) || c
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  )
}

function getContrast(f, b) {
  const L1 = getLuminance(f)
  const L2 = getLuminance(b)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

function getTextColor(bgColor) {
  const whiteContrast = getContrast(bgColor, "#ffffff")
  const blackContrast = getContrast(bgColor, "#000000")

  return whiteContrast > blackContrast ? "#ffffff" : "#000000"
}

export default function TeamListItem({ team }) {
  const [isHover, setIsHover] = useState(false)

  return (
    <a
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={
        isHover
          ? {
              backgroundColor: team.alt_color,
              color: getTextColor(team.alt_color),
            }
          : {}
      }
      className="relative overflow-hidden flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 p-4 rounded-md"
      href="#"
    >
      <div className="text-lg">{team.rank}</div>
      <div className="font-medium text-lg">{team.school}</div>
      <img
        style={
          isHover
            ? { opacity: 1, transform: "translateY(-50%)" }
            : { opacity: 0, transform: "translateY(calc(-50% + 8px))" }
        }
        src={team.logos[0]}
        className="w-32 h-32 absolute right-0 top-[50%] rotate-12 transition-all duration-200"
      />
    </a>
  )
}
