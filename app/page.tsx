import FeaturedSongs from "@/components/featured-songs";
import NewSongs from "@/components/new-songs";
import SingersList from "@/components/singers-list";
import SearchBar from "@/components/search-bar";
import CategoryTabs from "@/components/category-tabs";
import TrendingSection from "@/components/trending-section";
import CategorySection from "@/components/category-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سانگ بار - دانلود آهنگ جدید",
  description:
    "دانلود بهترین موزیک های جدید ایرانی با لینک مستقیم و کیفیت عالی",
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-8">
        <CategoryTabs />
      </div>

      <div className="mb-12">
        <FeaturedSongs />
      </div>

      <TrendingSection />

      <CategorySection categoryId="pop" title="موسیقی پاپ" />

      <CategorySection categoryId="traditional" title="موسیقی سنتی" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2">
          <NewSongs />
        </div>
        <div>
          <SingersList />
        </div>
      </div>
    </div>
  );
}
