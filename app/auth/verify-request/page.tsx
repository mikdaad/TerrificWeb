import db from "../../../lib/db";
import { redirect } from "next/navigation";
import React from "react";

export default async function VerifyRequest() {
  const me = await db.user.current();
  if (me) redirect("/");

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold">Check your email</h2>
      <p>A sign-in link has been sent to your email address.</p>
    </div>
  );
}

