"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Users } from "lucide-react"

// Sample artists data
const artists = [
  {
    id: 1,
    name: "میثم ابراهیمی",
    slug: "meysam-ebrahimi",
    image: "/placeholder.svg?height=300&width=300",
    followers: "1.2M",
    albums: 4,
    songs: 42,
  },
  {
    id: 2,
    name: "محسن چاوشی",
    slug: "mohsen-chavoshi",
    image: "/placeholder.svg?height=300&width=300",
    followers: "2.5M",
    albums: 8,
    songs: 87,
  },
  {
    id: 3,
    name: "رضا صادقی",
    slug: "reza-sadeghi",
    image: "/placeholder.svg?height=300&width=300",
    followers: "1.8M",
    albums: 6,
    songs: 65,
  },
  {
    id: 4,
    name: "ماکان بند",
    slug: "macan-band",
    image: "/placeholder.svg?height=300&width=300",
    followers: "950K",
    albums: 3,
    songs: 28,
  },
  {
    id: 5,
    name: "محسن یگانه",
    slug: "mohsen-yeganeh",
    image: "/placeholder.svg?height=300&width=300",
    followers: "1.5M",
    albums: 5,
    songs: 54,
  },
  {
    id: 6,
    name: "حمید هیراد",
    slug: "hamid-hirad",
    image: "/placeholder.svg?height=300&width=300",
    followers: "780K",
    albums: 2,
    songs: 23,
  },
  {
    id: 7,
    name: "علیرضا طلیسچی",
    slug: "alireza-talischi",
    image: "/placeholder.svg?height=300&width=300",
    followers: "920K",
    albums: 3,
    songs: 31,
  },
  {
    id: 8,
    name: "مسعود صادقلو",
    slug: "masoud-sadeghloo",
    image: "/placeholder.svg?height=300&width=300",
    followers: "850K",
    albums: 2,
    songs: 25,
  },
]

export default function ArtistsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Users className="h-8 w-8 text-primary ml-2" />
        <h1 className="text-3xl font-bold">هنرمندان</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {artists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setHoveredId(artist.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link href={`/artists/${artist.slug}`} className="block">
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border text-center p-4">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{artist.name}</h3>
                <p className="text-muted-foreground text-sm">{artist.followers} دنبال‌کننده</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
