import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { getServerSession } from "next-auth";
import { options } from "../lib/auth";
import Provider from "../components/provider";
import ClientRedirect from "./components/clientredirect";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Terrific",
  description: "A fashion-forward brand dedicated to redefining modern style",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const session = await getServerSession(options);
  
  return (
    
    <html lang="en">
      <body className={inter.className}>
      <Provider session={session}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        </Provider>
        <ClientRedirect />
        {children}
      </body>
    </html>
  );
}
