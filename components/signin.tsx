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
    <div className=" m-10  lg:max-w-[418px]  text-xs text-black font-normal"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[rgba(217,217,217,1)] flex w-full flex-col items-center px-[25px] py-14 rounded-[32px_32px_0px_0px]"
      >
        <h1 className=" text-[18px] lg:text-[24px] font-semibold uppercase">Signin</h1>

        <p className="text-neutral-600 text-[12px] md:text-[16px] font-light mt-3.5 m-2">
          kindly provide your email to recieve the signin  link.
        </p>

        <div className="w-full mt-4">
          <div className="bg-[rgba(240,237,255,0.8)] flex items-center gap-2 text-[rgba(28,28,28,1)] px-4 py-[12px] lg:py-[17px] rounded-2xl">
            <img
              src="/email.png"
              alt="Email icon"
              className="w-[18px] aspect-square object-contain shrink-0 opacity-35"
            />
            <input
              id="email" 
              name="email"
              placeholder="yourmail@example.com"
              type="email"
              onChange={(e) => setState(e.target.value)}
              className="flex-1 mr-2 bg-transparent outline-none"
              aria-label="email input"
            />
          </div>
        </div>

        <button
  disabled={loading}
  className="bg-white shadow-lg w-[187px] max-w-full font-semibold mt-6 px-[42px] py-[17px] rounded-2xl hover:bg-gray-50 transition-colors flex justify-center items-center"
  type="submit"
>
  {loading ? (
    <Loader2 className="animate-spin w-5 h-5" />
  ) : (
    <span>Signin Now</span>
  )}
</button>


        <div className="mt-6 w-full flex flex-col items-center">
        <div className="flex items-center w-full my-4">
  {/* Left Line */}
  <div className="flex-1 border-t border-[#F0EDFF]"></div>

  {/* Text in the Middle */}
  <div className="text-neutral-600 text-sm mx-4">
    <span className="font-bold text-[rgba(28,28,28,1)]">Signin</span> with Others
  </div>

  {/* Right Line */}
  <div className="flex-1 border-t border-[#F0EDFF]"></div>
</div>


          <button
            onClick={() => signIn("google")}
            className="border w-full flex justify-center items-center text-[rgba(28,28,28,1)] text-[12px] px-[10px] lg:px-[70px] py-[10px]  lg:py-[11px] rounded-2xl border-[rgba(240,237,255,1)] border-solid hover:bg-gray-50 transition-colors"
            aria-label="Login with Google"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/9d1ebc4b0d4b8e4fbccb9aeda5cbea14be49e44241abca7ec2649315085e1454"
                alt="Google logo"
                className="w-[24px] lg:w-[30px] mr-1 aspect-square object-contain shrink-0"
              />
              <div>
                <span>Signin with </span>
                <span className="font-bold">Google</span>
              </div>
            </div>
          </button>
        </div>
      </form>
    </div>

  );
};

export default SignIn;


