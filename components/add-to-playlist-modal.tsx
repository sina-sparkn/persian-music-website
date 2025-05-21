"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Check } from "lucide-react"
import { usePlaylistStore } from "@/lib/store"

interface AddToPlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  song: any
}

export default function AddToPlaylistModal({ isOpen, onClose, song }: AddToPlaylistModalProps) {
  const { playlists, addSongToPlaylist } = usePlaylistStore()

  const handleAddToPlaylist = (playlistId: number) => {
    addSongToPlaylist(playlistId, song)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-xl shadow-lg max-w-md w-full border border-border">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-xl font-bold">افزودن به پلی‌لیست</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 max-h-96 overflow-y-auto">
                {playlists.length > 0 ? (
                  <ul className="space-y-2">
                    {playlists.map((playlist) => {
                      const isSongInPlaylist = playlist.songs.some((s) => s.id === song.id)

                      return (
                        <li key={playlist.id}>
                          <button
                            onClick={() => handleAddToPlaylist(playlist.id)}
                            disabled={isSongInPlaylist}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                              isSongInPlaylist ? "bg-muted text-muted-foreground cursor-not-allowed" : "hover:bg-muted"
                            }`}
                          >
                            <span>{playlist.name}</span>
                            {isSongInPlaylist ? (
                              <Check className="h-5 w-5 text-primary" />
                            ) : (
                              <Plus className="h-5 w-5" />
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">هنوز هیچ پلی‌لیستی ندارید</p>
                    <Link
                      href="/playlists"
                      className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    >
                      ایجاد پلی‌لیست
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import Link from "next/link"
