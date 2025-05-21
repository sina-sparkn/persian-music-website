"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { getSongsByCategory, getCategoryById } from "@/lib/data"
import SongCard from "@/components/song-card"

interface CategorySectionProps {
  categoryId: string
  title: string
}

export default function CategorySection({ categoryId, title }: CategorySectionProps) {
  const [songs, setSongs] = useState<any[]>([])
  const [category, setCategory] = useState<any>(null)

  useEffect(() => {
    const foundCategory = getCategoryById(categoryId)
    if (foundCategory) {
      setCategory(foundCategory)
      setSongs(getSongsByCategory(categoryId).slice(0, 5))
    }
  }, [categoryId])

  if (!category || songs.length === 0) return null

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-4 h-4 rounded-full ${category.color} mr-2`}
          />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Link
          href={`/categories/${categoryId}`}
          className="flex items-center text-primary hover:text-primary/80 text-sm transition-colors"
        >
          <span>مشاهده همه</span>
          <ArrowRight className="h-4 w-4 mr-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {songs.map((song, index) => (
          <SongCard key={song.id} song={song} index={index} />
        ))}
      </div>
    </div>
  )
}
