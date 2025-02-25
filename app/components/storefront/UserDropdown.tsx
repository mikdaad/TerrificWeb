'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface iAppProps {
  email: string;
  name: string;
  userImage: string;
}




export function UserDropdown({ email, name, userImage }: iAppProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/getstarted" })
  
      
  
      router.push("/getstarted"); // Redirect after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userImage} alt="User Image" />
            <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-1 font-glancyr">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs leading-none text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
        <Button onClick={handleLogout} className="bg-black text-yellow-300 font-glancyr" disabled={loading}>Log out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
