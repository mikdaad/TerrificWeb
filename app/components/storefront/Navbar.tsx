import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import Image from "next/image";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-row items-center justify-between">
  {/* Left Section - Logo */}
  <Link href="/" className="flex items-center">
    <Image
      src="/logo.svg"
      alt="Company Logo"
      width={161.23}
      height={72.87}
      className="w-[120px] h-[54px] sm:w-[140px] sm:h-[65px] lg:w-[161px] lg:h-[73px]"
      priority
    />
  </Link>

  {/* Center Section - Navbar Links */}
  <div className="hidden lg:flex items-center">
    <NavbarLinks />
  </div>

  {/* Right Section - User Controls (Bag, Login, Register) */}
  <div className="flex items-center space-x-4">
    {/* Shopping Bag & User Dropdown - Show only on large screens */}
    {user ? (
      <div className="hidden lg:flex items-center space-x-4">
        <Link href="/bag" className="group p-2 flex items-center">
          <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {total}
          </span>
        </Link>

        <UserDropdown
          email={user.email as string}
          name={user.given_name as string}
          userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
        />
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        {/* Login Button */}
        <Button variant="ghost" asChild>
          <LoginLink className="text-white hover:bg-white hover:bg-opacity-25 hover:text-white text-[1rem] p-2 font-medium rounded-md transition duration-200">
            Sign in
          </LoginLink>
        </Button>

        {/* Register Button */}
        <Button variant="ghost" asChild>
          <RegisterLink className="text-white hover:bg-white hover:bg-opacity-25 hover:text-white text-[1rem] p-2 font-medium rounded-md transition duration-200">
            Create Account
          </RegisterLink>
        </Button>
      </div>
    )}
  </div>
</nav>

  );
}
