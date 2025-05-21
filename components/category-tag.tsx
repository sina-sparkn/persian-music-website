"use client"

import { motion } from "framer-motion"
import { getCategoryById } from "@/lib/data"

interface CategoryTagProps {
  categoryId: string
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export default function CategoryTag({ categoryId, size = "md", onClick }: CategoryTagProps) {
  const category = getCategoryById(categoryId)

  if (!category) return null

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5",
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-block rounded-full ${category.color} text-white font-medium ${sizeClasses[size]} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {category.name}
    </motion.span>
  )
}
