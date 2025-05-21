import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""

  // در یک اپلیکیشن واقعی، نتایج جستجو از دیتابیس دریافت می‌شوند
  // اینجا فقط یک پاسخ شبیه‌سازی شده برمی‌گردانیم

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  // شبیه‌سازی تأخیر جستجو
  await new Promise((resolve) => setTimeout(resolve, 300))

  const results = [
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
  ]

  return NextResponse.json({ results })
}
