"use client";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import your SVG logo component
import {GlowEffect} from "../app/components/ui/Gloweffect";

const SignIn: React.FC = () => {
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signIn("email", {
      email: state,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center font-glancyr  bg-cover  bg-left p-6"
	style={{ backgroundImage: 'url("/background.jpg")' }}>
		
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 w-full max-w-md bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white"
      >
		
		
        <div className="flex justify-center mb-4">
		
		<Link href="/">
      <Image
        src="/logo2.svg"
        alt="Company Logo"
        width={161}
        height={73}
        className="w-[150px] h-[75px] sm:w-[150px] sm:h-[75px] lg:w-[161px] lg:h-[73px]"
        priority
      />
    </Link>
	
        </div>
        <h2 className="text-xl font-semibold text-black text-center">Sign In</h2>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-black text-sm font-medium">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="spiderman@example.com"
            required
            type="email"
            onChange={(e) => setState(e.target.value)}
            className="w-full p-3 rounded-lg bg-black text-white placeholder-white/60 border border-white/20 focus:border-white/40 focus:ring-white/40"
          />
        </div>
        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-300 py-3 text-white font-medium rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50"
          type="submit"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Send me a magic link"}
        </button>
          {/* Sign in with Google Button */}
      <button
        onClick={() => signIn("google")}
        className="w-full bg-yellow-300 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Sign in with Google
      </button>

		<GlowEffect
        colors={['#ffffff', '#fff37d', '#ffffff', '#fff37d']}
        mode='rotate'
        blur='medium'
		className="absolute  inset-0 -z-10"
      />
		
      </form>

	  
    </div>
  );
};

export default SignIn;
