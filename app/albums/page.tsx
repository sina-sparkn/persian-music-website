"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Disc } from "lucide-react"

// Sample albums data
const albums = [
  {
    id: 1,
    title: "ابراهیمی ۱۴۰۰",
    artist: "میثم ابراهیمی",
    artistSlug: "meysam-ebrahimi",
    cover: "/placeholder.svg?height=300&width=300",
    slug: "meysam-ebrahimi-1400",
    releaseDate: "1400/02/15",
    songCount: 12,
  },
  {
    id: 2,
    title: "چاوشی نامه",
    artist: "محسن چاوشی",
    artistSlug: "mohsen-chavoshi",
    cover: "/placeholder.svg?height=300&width=300",
    slug: "mohsen-chavoshi-nameh",
    releaseDate: "1399/08/20",
    songCount: 10,
  },
  {
    id: 3,
    title: "شهر دیوونه",
    artist: "رضا صادقی",
    artistSlug: "reza-sadeghi",
    cover: "/placeholder.svg?height=300&width=300",
    slug: "reza-sadeghi-shahre-divooneh",
    releaseDate: "1398/11/10",
    songCount: 8,
  },
  {
    id: 4,
    title: "یک و یازده",
    artist: "ماکان بند",
    artistSlug: "macan-band",
    cover: "/placeholder.svg?height=300&width=300",
    slug: "macan-band-yek-o-yazdah",
    releaseDate: "1399/04/05",
    songCount: 11,
  },
  {
    id: 5,
    title: "نگاه",
    artist: "محسن یگانه",
    artistSlug: "mohsen-yeganeh",
    cover: "/placeholder.svg?height=300&width=300",
    slug: "mohsen-yeganeh-negah",
    releaseDate: "1397/09/15",
    songCount: 9,
  },
  {
    id: 6,
    title: "معجزه",
    artist: "حمید هیراد",
    artistSlug: "hamid-hirad",
    cover: "/placeholder.svg?height=300&width=300",
    slug: "hamid-hirad-mojeze",
    releaseDate: "1398/02/20",
    songCount: 7,
  },
]

export default function AlbumsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Disc className="h-8 w-8 text-primary ml-2" />
        <h1 className="text-3xl font-bold">آلبوم‌ها</h1>
      </div>

      <div className="album-grid">
        {albums.map((album, index) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setHoveredId(album.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link href={`/albums/${album.slug}`} className="block">
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
                <div className="relative aspect-square">
                  <Image
                    src={album.cover || "/placeholder.svg"}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {hoveredId === album.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center"
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
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{album.title}</h3>
                  <p className="text-muted-foreground text-sm">{album.artist}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{album.releaseDate}</span>
                    <span>{album.songCount} آهنگ</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
