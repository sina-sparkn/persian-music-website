"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { getSongsByCategory, getCategoryById } from "@/lib/data"
import SongCard from "@/components/song-card"

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.slug as string

  const [category, setCategory] = useState<any>(null)
  const [songs, setSongs] = useState<any[]>([])

  useEffect(() => {
    const foundCategory = getCategoryById(categoryId)
    if (foundCategory) {
      setCategory(foundCategory)
      setSongs(getSongsByCategory(categoryId))
    }
  }, [categoryId])

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${category.color} rounded-xl p-6 mb-6`}
        >
          <h1 className="text-3xl font-bold text-white">موسیقی {category.name}</h1>
        </motion.div>

        <p className="text-muted-foreground">
          {songs.length} آهنگ در دسته‌بندی {category.name} یافت شد
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {songs.map((song, index) => (
          <SongCard key={song.id} song={song} index={index} />
        ))}
      </div>

      {songs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">هیچ آهنگی در این دسته‌بندی یافت نشد</p>
        </div>
      )}
    </div>
  )
}
