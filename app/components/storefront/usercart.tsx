"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";// Adjust import path

const UserCart = () => {
  const [user, setUser] = useState<any>(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/kindefetch");
        const fetchedUser = await res.json();

        if (fetchedUser?.id) {
          setUser(fetchedUser);
          
        
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className=" flex flex-col items-center mt-3 space-x-4">
     

      <UserDropdown
        email={user.email as string}
        name={user.given_name as string}
        userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
      />
    </div>
  );
};

export default UserCart;
