"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useState } from "react"
import { usePlayerStore } from "@/lib/store"
import CategoryTag from "@/components/category-tag"

interface SongCardProps {
  song: any
  index?: number
}

export default function SongCard({ song, index = 0 }: SongCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { playSong } = usePlayerStore()

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    playSong(song)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/song/${song.slug}`} className="block">
        <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
          <div className="relative aspect-square">
            <Image
              src={song.cover || "/placeholder.svg"}
              alt={`${song.artist} - ${song.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Category tags */}
            <div className="absolute top-2 right-2 flex flex-col gap-1.5 items-end">
              {song.categories.slice(0, 2).map((categoryId: string) => (
                <CategoryTag key={categoryId} categoryId={categoryId} size="sm" />
              ))}

              {song.categories.length > 2 && (
                <span className="text-xs bg-black/70 text-white px-2 py-0.5 rounded-full">
                  +{song.categories.length - 2}
                </span>
              )}
            </div>

            {/* Play button overlay */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center"
              >
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="bg-primary rounded-full p-3"
                  onClick={handlePlay}
                >
                  <Play className="h-8 w-8 text-white" />
                </motion.button>
              </motion.div>
            )}

            {/* Special badge */}
            {song.special && (
              <div className="absolute top-2 left-2 bg-secondary/90 text-black text-xs px-2 py-1 rounded-full font-medium">
                ویژه
              </div>
            )}
          </div>

          <div className="p-3">
            <h3 className="font-bold text-sm truncate">{song.title}</h3>
            <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
