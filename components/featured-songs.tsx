"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import { motion } from "framer-motion"
import { usePlayerStore } from "@/lib/store"
import { songs } from "@/lib/data"
import CategoryTag from "@/components/category-tag"

// Get featured songs (those marked as special)
const featuredSongs = songs.filter((song) => song.special).slice(0, 8)

export default function FeaturedSongs() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { currentSong, isPlaying, playSong, togglePlayPause } = usePlayerStore()

  const handlePlayPause = (song: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (currentSong && currentSong.id === song.id) {
      togglePlayPause()
    } else {
      playSong(song)
    }
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">آهنگ های ویژه</h2>
        <Link href="/category/special" className="text-primary hover:text-primary/80 text-sm transition-colors">
          مشاهده همه
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {featuredSongs.map((song) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: song.id * 0.05 }}
            className="group"
            onMouseEnter={() => setHoveredId(song.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link href={`/song/${song.slug}`} className="block">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple/10 to-primary/10 shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-square">
                  <Image
                    src={song.cover || "/placeholder.svg"}
                    alt={`${song.artist} - ${song.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>

                  {/* Category tag */}
                  {song.categories.length > 0 && (
                    <div className="absolute top-2 right-2">
                      <CategoryTag categoryId={song.categories[0]} size="sm" />
                    </div>
                  )}

                  {song.special && (
                    <div className="absolute top-2 left-2 bg-secondary/90 text-black text-xs px-2 py-1 rounded-full font-medium">
                      ویژه
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredId === song.id ? 1 : 0,
                      scale: hoveredId === song.id ? 1 : 0.8,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <button
                      onClick={(e) => handlePlayPause(song, e)}
                      className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg transition-transform duration-300 hover:scale-110"
                    >
                      {currentSong && currentSong.id === song.id && isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </button>
                  </motion.div>
                </div>

                <div className="absolute bottom-0 w-full p-3 text-white">
                  <h3 className="font-bold text-sm truncate">{song.artist}</h3>
                  <p className="text-xs truncate text-gray-300">{song.title}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
