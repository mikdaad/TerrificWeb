//
// "use client";

import { useState, useEffect } from "react";
import { UserDropdown } from "./UserDropdown"; 
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "../ui/Gloweffect";

const UserCart = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) {
          throw new Error("User not found");
        }
 const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if(user) {
    return (
    <div className="flex flex-col items-center mt-3 space-x-4">
      <UserDropdown
        email={user.email as string}
        name={(user.firstName as string) || "anonymous"}
        userImage={user.profileImage ?? `https://avatar.vercel.sh/${user.firstName}`}
      />
    </div>
  );
}

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <p className="mb-5 text-gray-600"></p>
        <Button
          onClick={() => router.push("/auth/signin")}
          className="px-2 py-0 bg-gray-100 text-black text-[0.7rem] rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </Button>
        <GlowEffect
                            colors={['#ffffff', '#f5f5dc', '#ffffff', '#ffffff']}
                            mode='breathe'
                            blur='strongest'
                        className="absolute  inset-0 -z-10"
                          />
      </div>
    );
  }
 
};

export default UserCart;
