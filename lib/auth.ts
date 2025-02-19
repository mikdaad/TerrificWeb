import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { db } from "../lib/db";
import { AuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";

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
      ,
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID  as string ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET  as string,
      }),
	],
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(db as unknown as PrismaClient),
	session: {
		strategy: "database",
		maxAge: 24 * 30 * 24 * 60 * 60 
	},
	pages: {
		signIn: "/auth/signin",
		verifyRequest: "/auth/verify-request"
	},
	callbacks: {
		async signIn({ user, account, profile }) {
		  console.log("User signing in:", user);
      if (account?.provider === "google" && profile) {
        user.image = profile.image || `https://avatar.vercel.sh/${profile.name}`;
      }
		  if (profile) {
			user.image = profile.image ?? `https://avatar.vercel.sh/${profile.name}`;
		  }
      
      if (!user || !user.email) {
        return false; // Prevent session creation
      }
		  
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