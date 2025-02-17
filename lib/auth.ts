import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { db } from "../lib/db";
import { AuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

export const options = {
	providers: [
		EmailProvider({
			server: {
			  host: process.env.EMAIL_SERVER_HOST,
			  port: 465 , // Gmail SMTP port
			  auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			  },
			},
			from: process.env.EMAIL_FROM,
		  })
	],
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(db as unknown as PrismaClient),
	session: {
		strategy: "database",
		maxAge: 30 * 24 * 60 * 60 
	},
	pages: {
		signIn: "/auth/signin",
		verifyRequest: "/auth/verify-request"
	},
	callbacks: {
		async signIn({ user, account, profile }) {
		  console.log("User signing in:", user);
		  
		  return true;
		},
		async session({ session, user }) {
		  console.log("Session updated:", session);
		  return session;
		}
	  },
	events: {
		async signIn(message) {
			console.log("Signed in!", { message });
		},
		async signOut(message) {
			console.log("Signed out!", { message });
		},
		async createUser(message) {
			console.log("User created!", { message });
		}
	}
} satisfies AuthOptions;
