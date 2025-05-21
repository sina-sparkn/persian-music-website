"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useState } from "react"
import { usePlayerStore } from "@/lib/store"
import CategoryTag from "@/components/category-tag"

interface RelatedSongsProps {
  songs: any[]
  artistName: string
}

export default function RelatedSongs({ songs, artistName }: RelatedSongsProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { playSong } = usePlayerStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-xl shadow-md p-6 backdrop-blur-sm bg-opacity-80 border border-border"
    >
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">آهنگ‌های مرتبط</h2>
        <Link
          href={`/artist/${songs[0]?.artistSlug || artistName.toLowerCase()}`}
          className="text-primary hover:text-primary/80 text-sm transition-colors"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="space-y-3">
        {songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setHoveredId(song.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link
              href={`/song/${song.slug}`}
              className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="relative h-16 w-16 rounded-lg overflow-hidden ml-3 shadow-sm">
                <Image
                  src={song.cover || "/placeholder.svg"}
                  alt={`${song.artist} - ${song.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {hoveredId === song.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault()
                      playSong(song)
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Play className="h-6 w-6 text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium group-hover:text-primary transition-colors">{song.title}</h3>
                <p className="text-sm text-muted-foreground">{song.artist}</p>

                {/* Category tags */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {song.categories.slice(0, 2).map((categoryId: string) => (
                    <CategoryTag key={categoryId} categoryId={categoryId} size="sm" />
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
