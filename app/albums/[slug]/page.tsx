"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Clock, Calendar, Music, Heart, Plus } from "lucide-react"
import { usePlayerStore } from "@/lib/store"
import AddToPlaylistModal from "@/components/add-to-playlist-modal"

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
    description: "آلبوم جدید میثم ابراهیمی با مجموعه‌ای از آهنگ‌های متنوع",
    songs: [
      {
        id: 101,
        title: "دلتنگی",
        artist: "میثم ابراهیمی",
        artistSlug: "meysam-ebrahimi",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "meysam-ebrahimi-deltangi",
        duration: 210,
        audioUrl: "/sample-audio.mp3",
      },
      {
        id: 102,
        title: "عشق تو",
        artist: "میثم ابراهیمی",
        artistSlug: "meysam-ebrahimi",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "meysam-ebrahimi-eshghe-to",
        duration: 195,
        audioUrl: "/sample-audio.mp3",
      },
      {
        id: 103,
        title: "خاطرات",
        artist: "میثم ابراهیمی",
        artistSlug: "meysam-ebrahimi",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "meysam-ebrahimi-khaterat",
        duration: 225,
        audioUrl: "/sample-audio.mp3",
      },
    ],
  },
  {
    id: 2,
    title: "چاوشی نامه",
    artist: "محسن چاوشی",
    artistSlug: "mohsen-chavoshi",
    cover: "/placeholder.svg?height=300&width=300",
    slug: "mohsen-chavoshi-nameh",
    releaseDate: "1399/08/20",
    description: "آلبوم جدید محسن چاوشی با سبک متفاوت",
    songs: [
      {
        id: 201,
        title: "بعد از تو",
        artist: "محسن چاوشی",
        artistSlug: "mohsen-chavoshi",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "mohsen-chavoshi-bad-az-to",
        duration: 240,
        audioUrl: "/sample-audio.mp3",
      },
      {
        id: 202,
        title: "جاده",
        artist: "محسن چاوشی",
        artistSlug: "mohsen-chavoshi",
        cover: "/placeholder.svg?height=300&width=300",
        slug: "mohsen-chavoshi-jadeh",
        duration: 180,
        audioUrl: "/sample-audio.mp3",
      },
    ],
  },
]

export default function AlbumPage() {
  const params = useParams()
  const albumSlug = params.slug as string

  const [album, setAlbum] = useState<any>(null)
  const [selectedSong, setSelectedSong] = useState<any>(null)
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)

  const { playSong } = usePlayerStore()

  useEffect(() => {
    const foundAlbum = albums.find((a) => a.slug === albumSlug)
    if (foundAlbum) {
      setAlbum(foundAlbum)
    }
  }, [albumSlug])

  if (!album) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  const handlePlayAll = () => {
    if (album.songs.length > 0) {
      playSong(album.songs[0])
    }
  }

  const handleAddToPlaylist = (song: any) => {
    setSelectedSong(song)
    setIsPlaylistModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-square rounded-xl overflow-hidden shadow-lg"
          >
            <Image src={album.cover || "/placeholder.svg"} alt={album.title} fill className="object-cover" />
          </motion.div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-xs bg-muted px-2 py-1 rounded-full">آلبوم</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold mb-2"
            >
              {album.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center mb-4"
            >
              <Link href={`/artists/${album.artistSlug}`} className="font-medium hover:underline">
                {album.artist}
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-4"
            >
              {album.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center text-sm text-muted-foreground"
            >
              <div className="flex items-center ml-4">
                <Calendar className="h-4 w-4 ml-1" />
                <span>{album.releaseDate}</span>
              </div>

              <div className="flex items-center">
                <Music className="h-4 w-4 ml-1" />
                <span>{album.songs.length} آهنگ</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-2 space-x-reverse mt-4"
          >
            <button
              onClick={handlePlayAll}
              disabled={album.songs.length === 0}
              className="flex items-center px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="h-5 w-5 ml-1" />
              پخش
            </button>
          </motion.div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground w-12">#</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">عنوان</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground hidden md:table-cell">
                <Clock className="h-4 w-4" />
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground w-24"></th>
            </tr>
          </thead>
          <tbody>
            {album.songs.map((song: any, index: number) => (
              <motion.tr
                key={song.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="playlist-item hover:bg-muted/50 group"
              >
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <button className="hidden group-hover:block" onClick={() => playSong(song)} aria-label="Play">
                    <Play className="h-4 w-4 text-foreground" />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 rounded overflow-hidden mr-3">
                      <Image src={song.cover || album.cover} alt={song.title} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{song.title}</div>
                      <div className="text-sm text-muted-foreground">{song.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                  {formatTime(song.duration)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end space-x-1 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => playSong(song)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Play"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Like"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleAddToPlaylist(song)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Add to playlist"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSong && (
        <AddToPlaylistModal
          isOpen={isPlaylistModalOpen}
          onClose={() => setIsPlaylistModalOpen(false)}
          song={selectedSong}
        />
      )}
    </div>
  )
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
