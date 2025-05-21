"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Clock, Trash } from "lucide-react"
import { usePlaylistStore, usePlayerStore } from "@/lib/store"

export default function PlaylistPage() {
  const params = useParams()
  const router = useRouter()
  const playlistId = Number(params.id)

  const { playlists, deletePlaylist, removeSongFromPlaylist } = usePlaylistStore()
  const { playSong } = usePlayerStore()

  const [playlist, setPlaylist] = useState<any>(null)

  useEffect(() => {
    const foundPlaylist = playlists.find((p) => p.id === playlistId)
    if (foundPlaylist) {
      setPlaylist(foundPlaylist)
    } else {
      router.push("/playlists")
    }
  }, [playlistId, playlists, router])

  if (!playlist) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  const handlePlayAll = () => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0])
    }
  }

  const handleDeletePlaylist = () => {
    if (confirm("آیا از حذف این پلی‌لیست اطمینان دارید؟")) {
      deletePlaylist(playlistId)
      router.push("/playlists")
    }
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
            <Image src={playlist.cover || "/placeholder.svg"} alt={playlist.name} fill className="object-cover" />
          </motion.div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold mb-2"
            >
              {playlist.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-4"
            >
              {playlist.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground"
            >
              <span>{playlist.songs.length} آهنگ</span>
              <span className="mx-2">•</span>
              <span>{playlist.isPublic ? "پلی‌لیست عمومی" : "پلی‌لیست خصوصی"}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-2 space-x-reverse mt-4"
          >
            <button
              onClick={handlePlayAll}
              disabled={playlist.songs.length === 0}
              className="flex items-center px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="h-5 w-5 ml-1" />
              پخش
            </button>

            <button
              onClick={handleDeletePlaylist}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Delete playlist"
            >
              <Trash className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {playlist.songs.length > 0 ? (
        <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground w-12">#</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">عنوان</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground hidden md:table-cell">
                  آلبوم
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground hidden md:table-cell">
                  <Clock className="h-4 w-4" />
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground w-12"></th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map((song: any, index: number) => (
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
                        <Image
                          src={song.cover || "/placeholder.svg?height=40&width=40"}
                          alt={song.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{song.title}</div>
                        <div className="text-sm text-muted-foreground">{song.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{song.album || "-"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                    {formatTime(song.duration)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => removeSongFromPlaylist(playlistId, song.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove from playlist"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow-md p-8 text-center border border-border">
          <p className="text-muted-foreground mb-4">این پلی‌لیست خالی است</p>
          <p className="text-sm text-muted-foreground">
            برای افزودن آهنگ به این پلی‌لیست، به صفحه آهنگ مورد نظر بروید و گزینه "افزودن به پلی‌لیست" را انتخاب کنید.
          </p>
        </div>
      )}
    </div>
  )
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
