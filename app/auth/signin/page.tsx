import SignIn from "../../../components/signin";
import db from "../../../lib/db";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignInPage() {
	const me = await db.user.current();
	if (me) redirect("/");
	return <div className="min-h-screen flex items-center justify-center bg-cover font-glancyr bg-gray-100"
	>
		 <div
    className="absolute inset-0 bg-cover bg-center blur-md"
    style={{ backgroundImage: 'url("/bgblur.png")' }}
  ></div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black to-[#434343] opacity-60"></div>
  <div className="items-center justify-center">
  <div className="relative z-10   items-center ">

	<SignIn />
	</div>
	</div>
	</div>;
}


