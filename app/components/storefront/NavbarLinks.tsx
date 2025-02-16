"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "HOME",
    href: "/",
  },
  {
    id: 1,
    name: "ABOUT US",
    href: "/",
  },
  {
    id: 2,
    name: "SHOP",
    href: "/",
  },
  {
    id: 3,
    name: "CONTACT",
    href: "",
  },
  
];

export function NavbarLinks() {
  const location = usePathname();
  return (
    <div className=" hidden md:flex justify-end items-center gap-x-10  mr-8 mt-0">
      <div className="w-64">

      </div>
  {navbarLinks.map((item) => (
    <Link
      href={item.href}
      key={item.id}
      className={cn(
        location === item.href
          ? "text-white bg-opacity-100 border-b-2 border-white font-semibold text-[0.9rem]"
          : "text-white hover:bg-white hover:bg-opacity-25 text-[0.9rem]",
        "group p-2 font-medium rounded-md transition duration-200"
      )}
      
    >
      {item.name}
    </Link>
  ))}
</div>

  );
}
