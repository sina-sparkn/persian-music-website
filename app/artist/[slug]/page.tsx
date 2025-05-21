import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "@/components/search-bar"

interface ArtistPageProps {
  params: { slug: string }
}

export function generateMetadata({ params }: ArtistPageProps): Metadata {
  // در یک اپلیکیشن واقعی، اطلاعات خواننده از API دریافت می‌شود
  const artistName = params.slug.split("-").join(" ")

  return {
    title: `دانلود آهنگ های ${artistName} | موزیکفا`,
    description: `دانلود تمام آهنگ های ${artistName} با کیفیت عالی و لینک مستقیم از موزیکفا`,
  }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const artistSlug = params.slug

  // در یک اپلیکیشن واقعی، اطلاعات خواننده از API دریافت می‌شود
  const artistName = artistSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // در یک اپلیکیشن واقعی، آهنگ‌های خواننده از API دریافت می‌شوند
  const songs = [
    {
      id: 1,
      title: "عشق تو",
      releaseDate: "1404/02/15",
      cover: "/placeholder.svg?height=300&width=300",
      slug: `${artistSlug}-eshghe-to`,
    },
    {
      id: 2,
      title: "خاطرات",
      releaseDate: "1404/01/20",
      cover: "/placeholder.svg?height=300&width=300",
      slug: `${artistSlug}-khaterat`,
    },
    {
      id: 3,
      title: "دلتنگی",
      releaseDate: "1403/12/10",
      cover: "/placeholder.svg?height=300&width=300",
      slug: `${artistSlug}-deltangi`,
    },
    {
      id: 4,
      title: "روزهای خوب",
      releaseDate: "1403/11/05",
      cover: "/placeholder.svg?height=300&width=300",
      slug: `${artistSlug}-roozhaye-khoob`,
    },
    {
      id: 5,
      title: "بی تو",
      releaseDate: "1403/10/15",
      cover: "/placeholder.svg?height=300&width=300",
      slug: `${artistSlug}-bi-to`,
    },
    {
      id: 6,
      title: "آرامش",
      releaseDate: "1403/09/20",
      cover: "/placeholder.svg?height=300&width=300",
      slug: `${artistSlug}-aramesh`,
    },
    {
      id: 7,
      title: "تنهایی",
      releaseDate: "1403/08/10",
      cover: "/placeholder.svg?height=300&width=300",
      slug: `${artistSlug}-tanhaei`,
    },
    {
      id: 8,
      title: "عاشقانه",
      releaseDate: "1403/07/05",
      cover: "/placeholder.svg?height=300&width=300",
      slug: `${artistSlug}-asheghaneh`,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-primary">
            <Image src="/placeholder.svg?height=400&width=400" alt={artistName} fill className="object-cover" />
          </div>

          <div className="text-center md:text-right">
            <h1 className="text-3xl font-bold mb-2">{artistName}</h1>
            <p className="text-gray-600 mb-4">دانلود تمام آهنگ های {artistName} با کیفیت عالی و لینک مستقیم</p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                تعداد آهنگ‌ها: {songs.length}
              </span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">سبک: پاپ</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">آهنگ های {artistName}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <Link key={song.id} href={`/song/${song.slug}`} className="group">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={song.cover || "/placeholder.svg"}
                  alt={`${artistName} - ${song.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{song.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{artistName}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{song.releaseDate}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
