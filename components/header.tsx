"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Bell, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useMobileMenuStore } from "@/lib/store";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { toggleMenu } = useMobileMenuStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm dark:bg-background/80"
          : "bg-background dark:bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden text-foreground p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center">
              <div className="relative h-16 w-20 mr-10">
                <div className="flex items-center justify-center gap-2 w-full h-full">
                  <Image
                    width={70}
                    height={70}
                    src={"/Asset 1@4x.png"}
                    alt=""
                  ></Image>
                  <span className="whitespace-nowrap font-bold text-xl text-primary">
                    سانگ باز
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <NavLink href="/">خانه</NavLink>
            <NavLink href="/latest">جدیدترین‌ها</NavLink>
            <NavLink href="/categories">دسته‌بندی‌ها</NavLink>
            <NavLink href="/playlists">پلی‌لیست‌ها</NavLink>
            <NavLink href="/albums">آلبوم‌ها</NavLink>
            <NavLink href="/artists">هنرمندان</NavLink>
          </nav>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Link
              href="/search"
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>

            <ThemeToggle />

            <Link
              href="/notifications"
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Link>

            <Link
              href="/profile"
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
    >
      {children}
    </Link>
  );
}
