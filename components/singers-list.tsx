"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const singers = [
  { id: 1, name: "محسن چاوشی", slug: "mohsen-chavoshi" },
  { id: 2, name: "میثم ابراهیمی", slug: "meysam-ebrahimi" },
  { id: 3, name: "حمید هیراد", slug: "hamid-hirad" },
  { id: 4, name: "ماکان بند", slug: "macan-band" },
  { id: 5, name: "محسن یگانه", slug: "mohsen-yeganeh" },
  { id: 6, name: "محسن ابراهیم زاده", slug: "mohsen-ebrahimzadeh" },
  { id: 7, name: "رضا صادقی", slug: "reza-sadeghi" },
  { id: 8, name: "مسیح", slug: "masih" },
  { id: 9, name: "مسعود صادقلو", slug: "masoud-sadeghloo" },
  { id: 10, name: "بابک جهانبخش", slug: "babak-jahanbakhsh" },
  { id: 11, name: "یوسف زمانی", slug: "yousef-zamani" },
  { id: 12, name: "راغب", slug: "ragheb" },
  { id: 13, name: "گرشا رضایی", slug: "garsha-rezaei" },
  { id: 14, name: "آرش ای پی", slug: "arash-ap" },
  { id: 15, name: "مهدی احمدوند", slug: "mehdi-ahmadvand" },
  { id: 16, name: "احمد سلو", slug: "ahmad-solo" },
  { id: 17, name: "مرتضی جعفرزاده", slug: "morteza-jafarzadeh" },
  { id: 18, name: "مجید رضوی", slug: "majid-razavi" },
]

export default function SingersList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-purple to-purple/90 text-white rounded-xl shadow-md p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
        <h2 className="text-xl font-bold">لیست خوانندگان</h2>
        <span className="text-sm text-gray-200">Singer List</span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {singers.map((singer, index) => (
          <motion.div
            key={singer.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <Link href={`/artist/${singer.slug}`} className="flex items-center py-2 group">
              <motion.span
                className="inline-block h-2 w-2 bg-secondary rounded-full ml-2 group-hover:scale-150"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <span className="text-sm text-gray-200 group-hover:text-white transition-colors">{singer.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
