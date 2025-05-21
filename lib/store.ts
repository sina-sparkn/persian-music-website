import { create } from "zustand"

// Mobile menu store
interface MobileMenuState {
  isOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  closeMenu: () => set({ isOpen: false }),
}))

// Music player store
interface Song {
  id: number
  title: string
  artist: string
  artistSlug: string
  cover: string
  slug: string
  audioUrl: string
  duration: number
}

interface PlayerState {
  currentSong: Song | null
  queue: Song[]
  isPlaying: boolean
  progress: number
  duration: number
  volume: number
  isMuted: boolean
  playSong: (song: Song) => void
  togglePlayPause: () => void
  nextSong: () => void
  prevSong: () => void
  setProgress: (progress: number | ((prev: number) => number)) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  addToQueue: (song: Song) => void
  clearQueue: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 0.7,
  isMuted: false,

  playSong: (song) => {
    set({
      currentSong: song,
      isPlaying: true,
      progress: 0,
      duration: song.duration || 180, // Default to 3 minutes if no duration
    })
  },

  togglePlayPause: () => {
    set((state) => ({ isPlaying: !state.isPlaying }))
  },

  nextSong: () => {
    const { queue } = get()
    if (queue.length > 0) {
      const nextSong = queue[0]
      const newQueue = queue.slice(1)
      set({
        currentSong: nextSong,
        queue: newQueue,
        isPlaying: true,
        progress: 0,
        duration: nextSong.duration || 180,
      })
    } else {
      set({ isPlaying: false, progress: 0 })
    }
  },

  prevSong: () => {
    // In a real app, you'd implement history
    set((state) => ({ progress: 0 }))
  },

  setProgress: (progress) => {
    set((state) => ({
      progress: typeof progress === "function" ? progress(state.progress) : progress,
    }))
  },

  setVolume: (volume) => {
    set({ volume, isMuted: volume === 0 })
  },

  toggleMute: () => {
    set((state) => ({ isMuted: !state.isMuted }))
  },

  addToQueue: (song) => {
    set((state) => ({ queue: [...state.queue, song] }))
  },

  clearQueue: () => {
    set({ queue: [] })
  },
}))

// Playlist store
interface Playlist {
  id: number
  name: string
  description: string
  cover: string
  songs: Song[]
  isPublic: boolean
}

interface PlaylistState {
  playlists: Playlist[]
  createPlaylist: (name: string, description: string, isPublic: boolean) => void
  addSongToPlaylist: (playlistId: number, song: Song) => void
  removeSongFromPlaylist: (playlistId: number, songId: number) => void
  deletePlaylist: (playlistId: number) => void
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [
    {
      id: 1,
      name: "مورد علاقه‌های من",
      description: "آهنگ‌های مورد علاقه من",
      cover: "/placeholder.svg?height=300&width=300",
      songs: [],
      isPublic: false,
    },
  ],

  createPlaylist: (name, description, isPublic) => {
    set((state) => ({
      playlists: [
        ...state.playlists,
        {
          id: Date.now(),
          name,
          description,
          cover: "/placeholder.svg?height=300&width=300",
          songs: [],
          isPublic,
        },
      ],
    }))
  },

  addSongToPlaylist: (playlistId, song) => {
    set((state) => ({
      playlists: state.playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          // Check if song already exists in playlist
          const songExists = playlist.songs.some((s) => s.id === song.id)
          if (songExists) return playlist

          return {
            ...playlist,
            songs: [...playlist.songs, song],
          }
        }
        return playlist
      }),
    }))
  },

  removeSongFromPlaylist: (playlistId, songId) => {
    set((state) => ({
      playlists: state.playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter((song) => song.id !== songId),
          }
        }
        return playlist
      }),
    }))
  },

  deletePlaylist: (playlistId) => {
    set((state) => ({
      playlists: state.playlists.filter((playlist) => playlist.id !== playlistId),
    }))
  },
}))
