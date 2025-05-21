"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

interface MusicPlayerProps {
  audioUrl: string
  title: string
}

export default function MusicPlayer({ audioUrl, title }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLInputElement | null>(null)
  const volumeBarRef = useRef<HTMLInputElement | null>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", () => setIsPlaying(false))
      cancelAnimationFrame(animationRef.current!)
    }
  }, [])

  // Handle play/pause
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      cancelAnimationFrame(animationRef.current!)
    } else {
      audio.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
    setIsPlaying(!isPlaying)
  }

  const whilePlaying = () => {
    const audio = audioRef.current
    if (audio) {
      setCurrentTime(audio.currentTime)
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  // Handle progress change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Number.parseFloat(e.target.value)
    setCurrentTime(Number.parseFloat(e.target.value))
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const value = Number.parseFloat(e.target.value)
    audio.volume = value
    setVolume(value)

    if (value === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Handle mute toggle
  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume || 1
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  // Format time
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple/10 to-blue/10 rounded-xl p-5 backdrop-blur-sm"
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-gray-500">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div className="mb-4 relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue"
          style={{ width: `${progressPercentage}%` }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        />
        <input
          ref={progressBarRef}
          type="range"
          value={currentTime}
          min="0"
          max={duration || 0}
          step="0.01"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleProgressChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 hover:text-primary focus:outline-none transition-colors"
          >
            <SkipBack className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`${isPlaying ? "bg-blue" : "bg-primary"} text-white rounded-full p-3 hover:opacity-90 focus:outline-none transition-colors`}
            onClick={togglePlay}
            disabled={!isLoaded}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 hover:text-primary focus:outline-none transition-colors"
          >
            <SkipForward className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 hover:text-primary focus:outline-none transition-colors"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </motion.button>

          <div className="relative w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            />
            <input
              ref={volumeBarRef}
              type="range"
              value={isMuted ? 0 : volume}
              min="0"
              max="1"
              step="0.01"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
