"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { categories } from "@/lib/data"

// Take the first 5 categories for the tabs
const tabCategories = categories.slice(0, 5)

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState(tabCategories[0].id)

  return (
    <div className="relative border-b border-border mb-8">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className={cn(
              "flex flex-col items-center whitespace-nowrap py-4 px-6 text-sm font-medium transition-colors relative",
              activeTab === category.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
            onClick={(e) => {
              e.preventDefault()
              setActiveTab(category.id)
            }}
          >
            <span>{category.name}</span>
            <span className="text-xs text-muted-foreground mt-1">
              {category.id === "pop"
                ? "Pop"
                : category.id === "traditional"
                  ? "Traditional"
                  : category.id === "rap"
                    ? "Rap"
                    : category.id === "rock"
                      ? "Rock"
                      : category.id === "folk"
                        ? "Folk"
                        : ""}
            </span>
            {activeTab === category.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        ))}

        <Link
          href="/categories"
          className="flex items-center whitespace-nowrap py-4 px-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          همه دسته‌بندی‌ها
        </Link>
      </div>
    </div>
  )
}
