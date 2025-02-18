"use client";

import { useState, useEffect } from "react";
import { UserDropdown } from "./UserDropdown"; 

const UserCart = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="flex flex-col items-center mt-3 space-x-4">
      <UserDropdown
        email={user.email as string}
        name={user.firstName as string ?? "anonymous"}
        userImage={user.profileImage ?? `https://avatar.vercel.sh/${user.firstName}`}
      />
    </div>
  );
};

export default UserCart;
