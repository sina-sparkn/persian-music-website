"use client";

import type React from "react";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  ListMusic,
  Disc,
  Users,
  Heart,
  Clock,
  Settings,
  LogOut,
  Tag,
  Calendar,
} from "lucide-react";
import { useMobileMenuStore } from "@/lib/store";

export default function MobileMenu() {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenuStore();

  // Close menu when pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeMenu]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={closeMenu}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", damping: 25 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-background dark:bg-card z-50 shadow-xl mobile-menu flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">منو</h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              <div className="px-4 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  منو اصلی
                </h3>
                <ul className="space-y-1">
                  <MenuItem
                    href="/"
                    icon={<Home className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    خانه
                  </MenuItem>
                  <MenuItem
                    href="/latest"
                    icon={<Calendar className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    جدیدترین‌ها
                  </MenuItem>
                  <MenuItem
                    href="/categories"
                    icon={<Tag className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    دسته‌بندی‌ها
                  </MenuItem>
                  <MenuItem
                    href="/playlists"
                    icon={<ListMusic className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    پلی‌لیست‌ها
                  </MenuItem>
                  <MenuItem
                    href="/albums"
                    icon={<Disc className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    آلبوم‌ها
                  </MenuItem>
                  <MenuItem
                    href="/artists"
                    icon={<Users className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    هنرمندان
                  </MenuItem>
                </ul>
              </div>

              <div className="px-4 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  کتابخانه شما
                </h3>
                <ul className="space-y-1">
                  <MenuItem
                    href="/favorites"
                    icon={<Heart className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    مورد علاقه‌ها
                  </MenuItem>
                  <MenuItem
                    href="/recently-played"
                    icon={<Clock className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    اخیراً پخش شده
                  </MenuItem>
                </ul>
              </div>

              <div className="px-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  حساب کاربری
                </h3>
                <ul className="space-y-1">
                  <MenuItem
                    href="/settings"
                    icon={<Settings className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    تنظیمات
                  </MenuItem>
                  <MenuItem
                    href="/logout"
                    icon={<LogOut className="h-5 w-5" />}
                    onClick={closeMenu}
                  >
                    خروج
                  </MenuItem>
                </ul>
              </div>
            </nav>

            <div className="p-4 border-t">
              <p className="text-sm text-muted-foreground">نسخه ۱.۰.۰</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuItem({
  href,
  icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
        onClick={onClick}
      >
        <span className="ml-3">{icon}</span>
        <span>{children}</span>
      </Link>
    </li>
  );
}
