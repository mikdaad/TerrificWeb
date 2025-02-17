import SignIn from "../../../components/signin";
import db from "../../../lib/db";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignInPage() {
	const me = await db.user.current();
	if (me) redirect("/");
	return <SignIn />;
}
