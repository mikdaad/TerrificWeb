"use client";

import { Home, Heart, Search, Settings, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

type BottomNavProps = {
  onSearchClick?: () => void;
};

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Heart, label: "Wishlist", path: "/wishlist" },
  { icon: Search, label: "Search", action: "search" }, // Keeps search functionality
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function BottomNav({ onSearchClick }: BottomNavProps) {
  const router = useRouter();
  const [active, setActive] = useState("Home");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="relative">
  <button 
    className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-lg text-black p-4 rounded-full transition hover:shadow-xl"
    onClick={() => router.push("/bag")}
  >
    <ShoppingCart className="h-8 w-8" />
  </button>
</div>

      <div className="grid grid-cols-4 gap-4 p-1 pt-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-md transition",
              active === item.label ? "bg-gray-200" : "hover:bg-gray-100"
            )}
            onClick={() => {
              setActive(item.label);
              if (item.action === "search" && onSearchClick) {
                onSearchClick();
              } else if (item.path) {
                router.push(item.path);
              }
            }}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
