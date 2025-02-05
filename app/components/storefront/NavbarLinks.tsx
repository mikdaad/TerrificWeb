"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All Products",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Men",
    href: "/products/men",
  },
  {
    id: 3,
    name: "Women",
    href: "/products/women",
  },
  {
    id: 4,
    name: "Kids",
    href: "/products/kids",
  },
];

export function NavbarLinks() {
  const location = usePathname();
  return (
    <div className=" hidden md:flex justify-end items-center gap-x-10  mr-8 mt-7">
  {navbarLinks.map((item) => (
    <Link
      href={item.href}
      key={item.id}
      className={cn(
        location === item.href
          ? "text-white bg-opacity-100 border-b-2 border-white font-semibold text-[1.200rem]"
          : "text-white hover:bg-white hover:bg-opacity-25 text-[1.200rem]",
        "group p-2 font-medium rounded-md transition duration-200"
      )}
      
    >
      {item.name}
    </Link>
  ))}
</div>

  );
}
