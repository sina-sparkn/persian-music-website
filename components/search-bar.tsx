"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches] = useState(["محسن چاوشی", "میثم ابراهیمی", "آهنگ شاد"])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsLoading(true)
      // Simulate loading
      setTimeout(() => {
        router.push(`/search?q=${encodeURIComponent(query)}`)
        setIsLoading(false)
        setIsFocused(false)
      }, 500)
    }
  }

  const handleRecentSearch = (term: string) => {
    setQuery(term)
    router.push(`/search?q=${encodeURIComponent(term)}`)
    setIsFocused(false)
  }

  const handleClearInput = () => {
    setQuery("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative z-10">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <motion.div
            initial={false}
            animate={{
              boxShadow: isFocused ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
            className="relative bg-white rounded-xl overflow-hidden"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="نام آهنگ، خواننده یا آلبوم را جستجو کنید..."
              className="w-full bg-transparent border-none py-4 px-5 pr-12 focus:outline-none text-gray-800"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isLoading ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              ) : query ? (
                <button
                  type="button"
                  onClick={handleClearInput}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : (
                <Search className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </motion.div>
        </div>
      </form>

      <AnimatePresence>
        {isFocused && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2">جستجوهای اخیر</div>
              {recentSearches.map((term, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  className="px-3 py-2 cursor-pointer rounded-md text-sm"
                  onClick={() => handleRecentSearch(term)}
                >
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-gray-400 ml-2" />
                    <span>{term}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
