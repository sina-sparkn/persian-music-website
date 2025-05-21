import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import CategoryTabs from "@/components/category-tabs"
import SearchBar from "@/components/search-bar"

interface CategoryPageProps {
  params: { slug: string }
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const categoryMap: Record<string, string> = {
    new: "آهنگ های جدید",
    special: "آهنگ های ویژه",
    happy: "آهنگ های شاد",
    remix: "ریمیکس",
    madahi: "مداحی",
  }

  const categoryName = categoryMap[params.slug] || params.slug

  return {
    title: `دانلود ${categoryName} | موزیکفا`,
    description: `دانلود جدیدترین ${categoryName} با کیفیت عالی و لینک مستقیم از موزیکفا`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.slug

  const categoryMap: Record<string, string> = {
    new: "آهنگ های جدید",
    special: "آهنگ های ویژه",
    happy: "آهنگ های شاد",
    remix: "ریمیکس",
    madahi: "مداحی",
  }

  const categoryName = categoryMap[categorySlug] || categorySlug

  // در یک اپلیکیشن واقعی، آهنگ‌های دسته‌بندی از API دریافت می‌شوند
  const songs = [
    {
      id: 1,
      title: "جیگر طلا",
      artist: "دیوار",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "divar-jigar-tala",
    },
    {
      id: 2,
      title: "دی میدونه",
      artist: "مجید رضوی",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "majid-razavi-dey-midoone",
    },
    {
      id: 3,
      title: "باهام بد تا کرد",
      artist: "جواد آرا",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "javad-ara-baham-bad-ta-kard",
    },
    {
      id: 4,
      title: "بعد از تو",
      artist: "محسن چاوشی",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "mohsen-chavoshi-bad-az-to",
    },
    {
      id: 5,
      title: "هستی",
      artist: "امیر ماهان",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "amir-mahan-hasti",
    },
    {
      id: 6,
      title: "نداریم از تو بهتر",
      artist: "علیرضا طلیسچی",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "alireza-talischi-nadarim-az-to-behtar",
    },
    {
      id: 7,
      title: "ابراهیمی من هر شب",
      artist: "میثم ابراهیمی",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "meysam-ebrahimi-har-shab",
    },
    {
      id: 8,
      title: "مادر",
      artist: "مرتضی اشرفی",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "morteza-ashrafi-madar",
    },
    {
      id: 9,
      title: "عشق تو",
      artist: "رضا صادقی",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "reza-sadeghi-eshghe-to",
    },
    {
      id: 10,
      title: "خاطرات",
      artist: "محسن یگانه",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "mohsen-yeganeh-khaterat",
    },
    {
      id: 11,
      title: "دلتنگی",
      artist: "ماکان بند",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "macan-band-deltangi",
    },
    {
      id: 12,
      title: "روزهای خوب",
      artist: "حمید هیراد",
      cover: "/placeholder.svg?height=300&width=300",
      slug: "hamid-hirad-roozhaye-khoob",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-8">
        <CategoryTabs />
      </div>

      <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {songs.map((song) => (
          <Link key={song.id} href={`/song/${song.slug}`} className="group">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={song.cover || "/placeholder.svg"}
                  alt={`${song.artist} - ${song.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-3">
                <h3 className="font-bold text-sm truncate">{song.title}</h3>
                <p className="text-xs text-gray-500 truncate">{song.artist}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
