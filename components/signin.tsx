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
        className="space-y-3 lg:space-y-6 w-full max-w-md bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white"
      >
		
		
        <div className="flex justify-center mb-4">
		
		<Link href="/">
      <Image
        src="/logo2.svg"
        alt="Company Logo"
        width={280}
        height={160}
        className="w-[160px] h-[90px]  lg:w-[161px] lg:h-[73px]"
        priority
      />
    </Link>
	
        </div>
        <h2 className="text-lg lg:text-2xl  font-semibold text-black text-center">Sign In</h2>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-md text-black lg:text-xl font-medium">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="spiderman@example.com"
            required
            type="email"
            onChange={(e) => setState(e.target.value)}
            className="w-full text-sm  p-3 rounded-lg bg-black text-white placeholder-white/60 border border-white/20 focus:border-white/40 focus:ring-white/40"
          />
        </div>
        <button
          disabled={loading}
          className="w-full flex items-center hover:bg-yellow-300 hover:text-black justify-center gap-2 bg-black py-2 lg:py-3 text-white text-sm lg:text-lg font-medium rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50"
          type="submit"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Get Signin Link"}
        </button>
          {/* Sign in with Google Button */}
          <h2 className="text-xl font-semibold text-black text-center">or </h2>

      <button
        onClick={() => signIn("google")}
        className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-black"
      >
        <div className=" lg:mx-5  ml-5 flex flex-row gap-x-3 lg:gap-x-5">
       <svg width="40px" height="40px" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"/><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"/><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"/><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"/><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"/><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"/><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"/></svg>
       <p className="text-sm lg:mx-5 mt-2 lg:mt-2 "> Sign in with Google </p>
        </div>
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
