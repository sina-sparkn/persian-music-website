"use client"

import Link from "next/link"
import { Music, Play } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const newSongs = [
  {
    id: 1,
    title: "دانلود آهنگ ولادت امام رضا",
    slug: "veladat-imam-reza",
  },
  {
    id: 2,
    title: "دانلود آهنگ احسان دریادل رز",
    slug: "ehsan-daryadel-rose",
  },
  {
    id: 3,
    title: "دانلود آهنگ بی تو شریف این دیوونه مست نکات زیر بارونه توان",
    slug: "bi-to-sharif-in-divoone-mast",
  },
  {
    id: 4,
    title: "دانلود آهنگ خوشتیپ ارک شوتی",
    slug: "khoshtip-ark-shooti",
  },
  {
    id: 5,
    title: "دانلود آهنگ احمد سلو قاتل",
    slug: "ahmad-solo-ghatel",
  },
]

export default function NewSongs() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-6 backdrop-blur-sm bg-opacity-80 border border-gray-100"
    >
      <div className="border-b pb-4 mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">جدیدترین آهنگ ها</h2>
        <Link href="/category/new" className="text-primary hover:text-primary/80 text-sm transition-colors">
          مشاهده همه
        </Link>
      </div>

      <div className="space-y-2">
        {newSongs.map((song) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: song.id * 0.1 }}
            whileHover={{ scale: 1.01 }}
            onMouseEnter={() => setHoveredId(song.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link
              href={`/song/${song.slug}`}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="relative bg-gradient-to-br from-blue/20 to-purple/20 p-3 rounded-full mr-3 transition-all duration-300 group-hover:from-blue/30 group-hover:to-purple/30">
                {hoveredId === song.id ? (
                  <Play className="h-5 w-5 text-primary" />
                ) : (
                  <Music className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <span className="text-gray-800 group-hover:text-primary transition-colors">{song.title}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
