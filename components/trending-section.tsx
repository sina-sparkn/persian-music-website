"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { TrendingUp, Play } from "lucide-react"

const trendingSongs = [
  {
    id: 1,
    title: "عشق تو",
    artist: "محسن چاوشی",
    cover: "/placeholder.svg?height=200&width=200",
    slug: "mohsen-chavoshi-eshghe-to",
    plays: "1.2M",
  },
  {
    id: 2,
    title: "خاطرات",
    artist: "میثم ابراهیمی",
    cover: "/placeholder.svg?height=200&width=200",
    slug: "meysam-ebrahimi-khaterat",
    plays: "980K",
  },
  {
    id: 3,
    title: "دلتنگی",
    artist: "رضا صادقی",
    cover: "/placeholder.svg?height=200&width=200",
    slug: "reza-sadeghi-deltangi",
    plays: "875K",
  },
  {
    id: 4,
    title: "روزهای خوب",
    artist: "حمید هیراد",
    cover: "/placeholder.svg?height=200&width=200",
    slug: "hamid-hirad-roozhaye-khoob",
    plays: "750K",
  },
]

export default function TrendingSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="h-6 w-6 text-primary ml-2" />
          <h2 className="text-2xl font-bold">محبوب‌ترین‌ها</h2>
        </div>
        <Link href="/trending" className="text-primary hover:text-primary/80 text-sm transition-colors">
          مشاهده همه
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trendingSongs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setHoveredId(song.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link href={`/song/${song.slug}`} className="block">
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative aspect-square">
                  <Image
                    src={song.cover || "/placeholder.svg"}
                    alt={`${song.artist} - ${song.title}`}
                    fill
                    className="object-cover"
                  />
                  {hoveredId === song.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="bg-primary rounded-full p-3"
                      >
                        <Play className="h-8 w-8 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                  <div className="absolute top-2 left-2 bg-secondary/90 text-black text-xs px-2 py-1 rounded-full font-medium">
                    {song.plays}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{song.title}</h3>
                  <p className="text-gray-600 text-sm">{song.artist}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
