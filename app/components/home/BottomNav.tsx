import { Home, Heart, Search, Settings, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Heart, label: "Wishlist" },
  { icon: Search, label: "Search" },
  { icon: Settings, label: "Setting" },
];

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="relative">
        <button className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white p-4 rounded-full">
          <ShoppingCart className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4 pt-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center gap-1",
              item.active && "text-primary"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
