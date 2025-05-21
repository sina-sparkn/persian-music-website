"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { songs } from "@/lib/data"
import SongCard from "@/components/song-card"
import SearchBar from "@/components/search-bar"
import PaginationControls from "@/components/pagination-controls"
import BackToTopButton from "@/components/back-to-top-button"

// Sort songs by newest first (in a real app, this would be based on actual release dates)
const sortedSongs = [...songs].sort((a, b) => b.id - a.id)

export default function LatestPage() {
  const [page, setPage] = useState(1)
  const [songsPerPage, setSongsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [displayedSongs, setDisplayedSongs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Calculate total pages and set displayed songs based on current page
  useEffect(() => {
    const calculatePages = () => {
      const total = Math.ceil(sortedSongs.length / songsPerPage)
      setTotalPages(total)

      const startIndex = (page - 1) * songsPerPage
      const endIndex = startIndex + songsPerPage
      setDisplayedSongs(sortedSongs.slice(startIndex, endIndex))
    }

    setIsLoading(true)

    // Simulate loading delay
    const timer = setTimeout(() => {
      calculatePages()
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [page, songsPerPage])

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      // Scroll to top of the song list
      document.getElementById("song-list-top")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle songs per page change
  const handleSongsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSongsPerPage(Number(e.target.value))
    setPage(1) // Reset to first page when changing items per page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">جدیدترین آهنگ‌ها</h1>

        <div className="flex items-center space-x-2 space-x-reverse">
          <label htmlFor="songsPerPage" className="text-sm text-muted-foreground">
            تعداد در هر صفحه:
          </label>
          <select
            id="songsPerPage"
            value={songsPerPage}
            onChange={handleSongsPerPageChange}
            className="bg-card border border-border rounded-md px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Pagination controls - top */}
      <div className="mb-6">
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* Song list */}
      <div id="song-list-top" className="scroll-mt-20">
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: songsPerPage }).map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-md border border-border animate-pulse"
              >
                <div className="aspect-square bg-muted"></div>
                <div className="p-3">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`page-${page}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {displayedSongs.map((song, index) => (
                <SongCard key={song.id} song={song} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!isLoading && displayedSongs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">هیچ آهنگی یافت نشد</p>
          </div>
        )}
      </div>

      {/* Pagination controls - bottom */}
      <div className="mt-8">
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* Back to top button */}
      <BackToTopButton />

      {/* Fixed pagination navigation buttons */}
      <div className="fixed bottom-24 left-0 right-0 flex justify-between px-4 pointer-events-none z-30">
        <AnimatePresence>
          {page > 1 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-primary text-white rounded-full p-3 shadow-lg pointer-events-auto"
              onClick={() => handlePageChange(page - 1)}
              aria-label="Previous page"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {page < totalPages && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-primary text-white rounded-full p-3 shadow-lg pointer-events-auto mr-auto"
              onClick={() => handlePageChange(page + 1)}
              aria-label="Next page"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
