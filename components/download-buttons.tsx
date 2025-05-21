"use client"

import { Download } from "lucide-react"
import { motion } from "framer-motion"

interface DownloadButtonsProps {
  songSlug: string
}

export default function DownloadButtons({ songSlug }: DownloadButtonsProps) {
  // در یک اپلیکیشن واقعی، لینک‌های دانلود از API دریافت می‌شوند
  const downloadLinks = {
    high: `/api/download/${songSlug}?quality=320`,
    medium: `/api/download/${songSlug}?quality=128`,
    low: `/api/download/${songSlug}?quality=64`,
  }

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.4 },
    }),
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  }

  return (
    <div className="space-y-3">
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        custom={1}
        className="flex items-center justify-center w-full bg-gradient-to-r from-primary to-primary/90 text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        onClick={() => window.open(downloadLinks.high, "_blank")}
      >
        <Download className="h-5 w-5 ml-2" />
        دانلود با کیفیت عالی (320 کیلوبیت)
      </motion.button>

      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        custom={2}
        className="flex items-center justify-center w-full bg-gradient-to-r from-blue to-blue/90 text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        onClick={() => window.open(downloadLinks.medium, "_blank")}
      >
        <Download className="h-5 w-5 ml-2" />
        دانلود با کیفیت متوسط (128 کیلوبیت)
      </motion.button>

      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        custom={3}
        className="flex items-center justify-center w-full bg-gradient-to-r from-accent to-accent/90 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        onClick={() => window.open(downloadLinks.low, "_blank")}
      >
        <Download className="h-5 w-5 ml-2" />
        دانلود با کیفیت پایین (64 کیلوبیت)
      </motion.button>
    </div>
  )
}
