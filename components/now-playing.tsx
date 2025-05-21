"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, ListMusic, X } from "lucide-react"
import { usePlayerStore } from "@/lib/store"
import MusicVisualizer from "@/components/music-visualizer"

export default function NowPlaying() {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    nextSong,
    prevSong,
    progress,
    setProgress,
    duration,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = usePlayerStore()

  const [showVisualizer, setShowVisualizer] = useState(false)

  // Update progress bar as song plays
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            clearInterval(interval)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, duration, setProgress])

  // If no song is playing, don't show the player
  if (!currentSong) return null

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-background/80 dark:bg-card/80 border-t border-border now-playing-bar z-30"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Song info */}
            <div className="flex items-center w-1/3">
              <div className="relative h-10 w-10 md:h-14 md:w-14 rounded-md overflow-hidden mr-3">
                <Image
                  src={currentSong.cover || "/placeholder.svg?height=100&width=100"}
                  alt={currentSong.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="truncate">
                <Link
                  href={`/song/${currentSong.slug}`}
                  className="font-medium text-sm md:text-base hover:underline truncate block"
                >
                  {currentSong.title}
                </Link>
                <Link
                  href={`/artist/${currentSong.artistSlug}`}
                  className="text-xs md:text-sm text-muted-foreground hover:underline truncate block"
                >
                  {currentSong.artist}
                </Link>
              </div>
            </div>

            {/* Player controls */}
            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="flex items-center space-x-2 space-x-reverse mb-1">
                <button
                  onClick={prevSong}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Previous song"
                >
                  <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlayPause}
                  className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </motion.button>

                <button
                  onClick={nextSong}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Next song"
                >
                  <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>

              <div className="w-full max-w-md hidden md:flex items-center">
                <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(progress)}</span>

                <div className="flex-1 mx-2 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-primary" style={{ width: `${(progress / duration) * 100}%` }} />
                </div>

                <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume and additional controls */}
            <div className="flex items-center justify-end w-1/3 space-x-2 space-x-reverse">
              <div className="hidden md:flex items-center space-x-1 space-x-reverse">
                <button
                  onClick={toggleMute}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-primary" style={{ width: `${isMuted ? 0 : volume * 100}%` }} />
                </div>
              </div>

              <button
                onClick={() => setShowVisualizer(true)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Show visualizer"
              >
                <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              <Link
                href="/queue"
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Queue"
              >
                <ListMusic className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Full screen visualizer */}
      <AnimatePresence>
        {showVisualizer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 dark:bg-background/95 z-50 flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setShowVisualizer(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Close visualizer"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-1">{currentSong.title}</h2>
              <p className="text-muted-foreground">{currentSong.artist}</p>
            </div>

            <div className="w-full max-w-2xl px-4">
              <MusicVisualizer isPlaying={isPlaying} />
            </div>

            <div className="w-full max-w-2xl px-4 mt-8">
              <div className="flex items-center mb-2">
                <span className="text-sm text-muted-foreground w-12">{formatTime(progress)}</span>

                <div className="flex-1 mx-2 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-primary" style={{ width: `${(progress / duration) * 100}%` }} />
                </div>

                <span className="text-sm text-muted-foreground w-12">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSong}
                  className="p-2 text-foreground rounded-full hover:bg-muted transition-colors"
                  aria-label="Previous song"
                >
                  <SkipBack className="h-6 w-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlayPause}
                  className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSong}
                  className="p-2 text-foreground rounded-full hover:bg-muted transition-colors"
                  aria-label="Next song"
                >
                  <SkipForward className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
