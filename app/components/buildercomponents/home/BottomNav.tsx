"use client";

import { Home, Heart, Search, Settings, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState ,useEffect} from "react";
import { cn } from "@/lib/utils";
import { Cart } from "@/app/lib/interfaces";


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

  
const [user, setUser] = useState<any>(null);
const [cartTotal, setCartTotal] = useState(0);

useEffect(() => {
  const fetchUserAndCart = async () => {
    try {
      // Fetch user details
      const res = await fetch("/api/kindefetch");
      const fetchedUser = await res.json();

      if (!fetchedUser?.id) {
        console.error("User not found");
        return;
      }

      setUser(fetchedUser);

      // Fetch cart data from the API route
      const cartRes = await fetch(`/api/cart?userId=${fetchedUser.id}`);
      const cartData = await cartRes.json();

      setCartTotal(cartData.total || 0);
    } catch (error) {
      console.error("Error fetching user and cart:", error);
    }
  };

  fetchUserAndCart();
}, []);


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="relative">
      <button 
  className="absolute -top-6 left-1/2 -translate-x-1/2 
             bg-white border border-gray-300 shadow-lg 
             text-black p-4 rounded-full 
             transition-all duration-200 ease-in-out 
             hover:shadow-xl hover:bg-gray-100 
             active:shadow-md active:scale-90 
             focus:ring-2 focus:ring-gray-400"
  onClick={() => router.push("/bag")}
>
  <ShoppingCart className="h-6 w-6 text-gray-700" />
    {/* Cart Item Count Badge */}
    {cartTotal > 0 && (
          <span className="absolute -top-0 mt-1 mr-1
                            text-black text-xs font-weight-300 
                           px-1 py-0.5 rounded-full 
                          ">
            {cartTotal}
          </span>
        )}
</button>

</div>

      <div className="grid grid-cols-4 gap-4 p-1 pt-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-md transition",
              active === item.label ? "bg-gray-100" : "hover:bg-gray-100"
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
