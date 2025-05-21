"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Eye, Heart, MessageSquare, Share2 } from "lucide-react"
import MusicPlayer from "@/components/music-player"
import DownloadButtons from "@/components/download-buttons"
import RelatedSongs from "@/components/related-songs"
import CategoryTag from "@/components/category-tag"
import { getSongBySlug, getRelatedSongs } from "@/lib/data"

export default function SongPage() {
  const params = useParams()
  const songSlug = params.slug as string

  const [song, setSong] = useState<any>(null)
  const [relatedSongs, setRelatedSongs] = useState<any[]>([])

  useEffect(() => {
    const foundSong = getSongBySlug(songSlug)
    if (foundSong) {
      setSong(foundSong)
      setRelatedSongs(getRelatedSongs(foundSong))
    }
  }, [songSlug])

  if (!song) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={song.cover || "/placeholder.svg"}
                    alt={`${song.artist} - ${song.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <h1 className="text-2xl font-bold mb-2">
                  دانلود آهنگ {song.artist} - {song.title}
                </h1>

                {/* Category tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {song.categories.map((categoryId: string) => (
                    <Link key={categoryId} href={`/categories/${categoryId}`}>
                      <CategoryTag categoryId={categoryId} size="md" />
                    </Link>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>تاریخ انتشار: 1404/02/15</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 ml-1" />
                    <span>مدت زمان: {formatTime(song.duration)}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 ml-1" />
                    <span>بازدید: 12,345</span>
                  </div>
                </div>

                <div className="mb-6">
                  <MusicPlayer audioUrl={song.audioUrl} title={`${song.artist} - ${song.title}`} />
                </div>

                <DownloadButtons songSlug={songSlug} />

                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-5 w-5 ml-1" />
                      <span>1,234</span>
                    </button>
                    <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="h-5 w-5 ml-1" />
                      <span>48</span>
                    </button>
                  </div>

                  <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="h-5 w-5 ml-1" />
                    <span>اشتراک گذاری</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">توضیحات</h2>
            <div className="whitespace-pre-line text-muted-foreground">
              {`دانلود آهنگ جدید ${song.artist} به نام ${song.title} با کیفیت عالی و لینک مستقیم
              
${song.artist} - ${song.title}

ترانه و آهنگ: ${song.artist}
تنظیم: استودیو موزیکفا
میکس و مستر: استودیو موزیکفا

دانلود آهنگ با کیفیت 320 و 128 به همراه متن آهنگ از موزیکفا`}
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">متن آهنگ</h2>
            <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
              {`متن آهنگ ${song.title} از ${song.artist}
    
بیت اول: لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
و مجله در ستون و سطرآنچنان که لازم است.
    
کوپلت: لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
و با استفاده از طراحان گرافیک است.
    
بیت دوم: لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
و مجله در ستون و سطرآنچنان که لازم است.`}
            </div>
          </div>
        </div>

        <div>
          <RelatedSongs songs={relatedSongs} artistName={song.artist} />
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
