"use client"

import React from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface MusicVisualizerProps {
  isPlaying: boolean
}

export default function MusicVisualizer({ isPlaying }: MusicVisualizerProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate random heights for the bars
  const generateBars = () => {
    return Array.from({ length: 64 }, () => Math.random() * 100)
  }

  const [bars, setBars] = React.useState(generateBars())
  const animationRef = useRef<number>()

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setBars(generateBars())
        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className="w-full h-40 md:h-64 flex items-end justify-center space-x-1 space-x-reverse">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="visualizer-bar w-1 md:w-2 rounded-t-sm"
          style={{
            height: `${isPlaying ? height : 5}%`,
            backgroundColor: getBarColor(index, isDark),
          }}
          initial={{ scaleY: 0.1 }}
          animate={{ scaleY: isPlaying ? 1 : 0.1 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  )
}

function getBarColor(index: number, isDark: boolean) {
  // Create a gradient effect across the bars
  const colors = [
    "#FF006E", // primary
    "#8338EC", // purple
    "#3A86FF", // blue
    "#FB5607", // accent
    "#FFBE0B", // secondary
  ]

  const section = Math.floor(index / 13) % colors.length
  const baseColor = colors[section]

  // Add some opacity for a nicer effect
  return isDark ? `${baseColor}` : `${baseColor}90`
}
