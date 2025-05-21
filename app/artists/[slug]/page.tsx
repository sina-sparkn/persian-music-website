"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Disc, Music, Heart, User } from "lucide-react"
import { usePlayerStore } from "@/lib/store"

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
    bio: "میثم ابراهیمی خواننده، آهنگساز و ترانه‌سرای ایرانی است که فعالیت حرفه‌ای خود را از سال ۱۳۸۵ آغاز کرد. او با انتشار آلبوم‌ها و تک آهنگ‌های متعدد، به یکی از محبوب‌ترین خوانندگان پاپ ایران تبدیل شده است.",
    topSongs: [
      {
        id: 101,
        title: "دلتنگی",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "meysam-ebrahimi-deltangi",
        duration: 210,
        plays: "2.5M",
        audioUrl: "/sample-audio.mp3",
      },
      {
        id: 102,
        title: "عشق تو",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "meysam-ebrahimi-eshghe-to",
        duration: 195,
        plays: "1.8M",
        audioUrl: "/sample-audio.mp3",
      },
      {
        id: 103,
        title: "خاطرات",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "meysam-ebrahimi-khaterat",
        duration: 225,
        plays: "1.5M",
        audioUrl: "/sample-audio.mp3",
      },
    ],
    albums: [
      {
        id: 1,
        title: "ابراهیمی ۱۴۰۰",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "meysam-ebrahimi-1400",
        releaseDate: "1400/02/15",
        songCount: 12,
      },
    ],
  },
  {
    id: 2,
    name: "محسن چاوشی",
    slug: "mohsen-chavoshi",
    image: "/placeholder.svg?height=300&width=300",
    followers: "2.5M",
    albums: 8,
    songs: 87,
    bio: "محسن چاوشی خواننده، آهنگساز و ترانه‌سرای ایرانی است که با سبک منحصر به فرد خود در موسیقی پاپ و تلفیق آن با موسیقی سنتی ایرانی، به یکی از تأثیرگذارترین هنرمندان معاصر ایران تبدیل شده است.",
    topSongs: [
      {
        id: 201,
        title: "بعد از تو",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "mohsen-chavoshi-bad-az-to",
        duration: 240,
        plays: "3.2M",
        audioUrl: "/sample-audio.mp3",
      },
      {
        id: 202,
        title: "جاده",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "mohsen-chavoshi-jadeh",
        duration: 180,
        plays: "2.7M",
        audioUrl: "/sample-audio.mp3",
      },
    ],
    albums: [
      {
        id: 2,
        title: "چاوشی نامه",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "mohsen-chavoshi-nameh",
        releaseDate: "1399/08/20",
        songCount: 10,
      },
    ],
  },
]

export default function ArtistPage() {
  const params = useParams()
  const artistSlug = params.slug as string

  const [artist, setArtist] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("top-songs")

  const { playSong } = usePlayerStore()

  useEffect(() => {
    const foundArtist = artists.find((a) => a.slug === artistSlug)
    if (foundArtist) {
      setArtist(foundArtist)
    }
  }, [artistSlug])

  if (!artist) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  const handlePlayTopSongs = () => {
    if (artist.topSongs.length > 0) {
      playSong({
        ...artist.topSongs[0],
        artist: artist.name,
        artistSlug: artist.slug,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Artist header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-purple/20 to-transparent rounded-xl -z-10" />

        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 h-48 rounded-full overflow-hidden border-4 border-card"
          >
            <Image
              src={artist.image || "/placeholder.svg"}
              alt={artist.name}
              width={192}
              height={192}
              className="object-cover"
            />
          </motion.div>

          <div className="text-center md:text-right">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              {artist.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4"
            >
              <div className="flex items-center">
                <User className="h-4 w-4 ml-1" />
                <span>{artist.followers} دنبال‌کننده</span>
              </div>

              <div className="flex items-center">
                <Disc className="h-4 w-4 ml-1" />
                <span>{artist.albums} آلبوم</span>
              </div>

              <div className="flex items-center">
                <Music className="h-4 w-4 ml-1" />
                <span>{artist.songs} آهنگ</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center md:justify-start space-x-2 space-x-reverse"
            >
              <button
                onClick={handlePlayTopSongs}
                className="flex items-center px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              >
                <Play className="h-5 w-5 ml-1" />
                پخش
              </button>

              <button className="flex items-center px-4 py-2 border border-border rounded-full hover:bg-muted transition-colors">
                <Heart className="h-5 w-5 ml-1" />
                دنبال کردن
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-border">
        <div className="flex overflow-x-auto hide-scrollbar">
          <TabButton active={activeTab === "top-songs"} onClick={() => setActiveTab("top-songs")}>
            محبوب‌ترین آهنگ‌ها
          </TabButton>

          <TabButton active={activeTab === "albums"} onClick={() => setActiveTab("albums")}>
            آلبوم‌ها
          </TabButton>

          <TabButton active={activeTab === "about"} onClick={() => setActiveTab("about")}>
            درباره
          </TabButton>
        </div>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "top-songs" && (
          <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground w-12">#</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">عنوان</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground hidden md:table-cell">
                    پخش
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground hidden md:table-cell">
                    مدت
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground w-12"></th>
                </tr>
              </thead>
              <tbody>
                {artist.topSongs.map((song: any, index: number) => (
                  <motion.tr
                    key={song.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="playlist-item hover:bg-muted/50 group"
                  >
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <button
                        className="hidden group-hover:block"
                        onClick={() =>
                          playSong({
                            ...song,
                            artist: artist.name,
                            artistSlug: artist.slug,
                          })
                        }
                        aria-label="Play"
                      >
                        <Play className="h-4 w-4 text-foreground" />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 rounded overflow-hidden mr-3">
                          <Image
                            src={song.cover || "/placeholder.svg"}
                            alt={song.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{song.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{song.plays}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                      {formatTime(song.duration)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        className="p-1 text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Like"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "albums" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {artist.albums.map((album: any, index: number) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-primary rounded-full p-3">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 truncate">{album.title}</h3>
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
        )}

        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-md p-6 border border-border"
          >
            <h2 className="text-xl font-bold mb-4">بیوگرافی</h2>
            <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3 text-sm font-medium transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeArtistTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
