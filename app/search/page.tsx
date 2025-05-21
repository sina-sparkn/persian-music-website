import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "@/components/search-bar"

interface SearchPageProps {
  searchParams: { q: string }
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  return {
    title: `جستجو برای: ${searchParams.q || ""} | موزیکفا`,
    description: `نتایج جستجو برای ${searchParams.q || ""} در موزیکفا`,
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  // در یک اپلیکیشن واقعی، نتایج جستجو از API دریافت می‌شوند
  const searchResults = query
    ? [
        {
          id: 1,
          title: `${query} عاشقانه`,
          artist: "محسن چاوشی",
          cover: "/placeholder.svg?height=200&width=200",
          slug: `mohsen-chavoshi-${query.replace(/\s+/g, "-")}`,
        },
        {
          id: 2,
          title: `${query} جدید`,
          artist: "میثم ابراهیمی",
          cover: "/placeholder.svg?height=200&width=200",
          slug: `meysam-ebrahimi-${query.replace(/\s+/g, "-")}`,
        },
        {
          id: 3,
          title: `${query} ریمیکس`,
          artist: "علیرضا طلیسچی",
          cover: "/placeholder.svg?height=200&width=200",
          slug: `alireza-talischi-${query.replace(/\s+/g, "-")}`,
        },
        {
          id: 4,
          title: `${query} آکوستیک`,
          artist: "رضا صادقی",
          cover: "/placeholder.svg?height=200&width=200",
          slug: `reza-sadeghi-${query.replace(/\s+/g, "-")}`,
        },
        {
          id: 5,
          title: `${query} بی کلام`,
          artist: "بابک جهانبخش",
          cover: "/placeholder.svg?height=200&width=200",
          slug: `babak-jahanbakhsh-${query.replace(/\s+/g, "-")}`,
        },
      ]
    : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      {query ? (
        <>
          <h1 className="text-2xl font-bold mb-6">نتایج جستجو برای: {query}</h1>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {searchResults.map((song) => (
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
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-xl font-bold mb-2">نتیجه‌ای یافت نشد!</h2>
              <p className="text-gray-600">
                متأسفانه جستجوی شما برای "{query}" نتیجه‌ای نداشت. لطفاً با کلمات کلیدی دیگری جستجو کنید.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold mb-2">جستجو در موزیکفا</h2>
          <p className="text-gray-600">نام آهنگ، خواننده یا آلبوم مورد نظر خود را در کادر بالا وارد کنید.</p>
        </div>
      )}
    </div>
  )
}
