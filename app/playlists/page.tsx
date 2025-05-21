"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plus, Play, Lock, Globe } from "lucide-react"
import { usePlaylistStore } from "@/lib/store"
import CreatePlaylistModal from "@/components/create-playlist-modal"

export default function PlaylistsPage() {
  const { playlists } = usePlaylistStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">پلی‌لیست‌های شما</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 ml-1" />
          ایجاد پلی‌لیست
        </motion.button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {playlists.map((playlist) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link href={`/playlists/${playlist.id}`} className="block">
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
                <div className="relative aspect-square">
                  <Image
                    src={playlist.cover || "/placeholder.svg"}
                    alt={playlist.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-primary rounded-full p-3"
                    >
                      <Play className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute top-2 left-2">
                    {playlist.isPublic ? (
                      <div className="bg-blue/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Globe className="h-3 w-3 ml-1" />
                        عمومی
                      </div>
                    ) : (
                      <div className="bg-muted/80 text-foreground text-xs px-2 py-1 rounded-full flex items-center">
                        <Lock className="h-3 w-3 ml-1" />
                        خصوصی
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{playlist.name}</h3>
                  <p className="text-muted-foreground text-sm truncate">{playlist.songs.length} آهنگ</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {playlists.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">هنوز هیچ پلی‌لیستی ندارید</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            ایجاد اولین پلی‌لیست
          </motion.button>
        </div>
      )}

      <CreatePlaylistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
