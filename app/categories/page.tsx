"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { categories } from "@/lib/data"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">دسته‌بندی‌های موسیقی</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Link href={`/categories/${category.id}`}>
              <div
                className={`${category.color} rounded-xl p-6 h-32 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <h2 className="text-2xl font-bold text-white">{category.name}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
