'use client';
import { Button } from "../components/ui/button";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { TextEffect } from '../components/storefront/texteffect';
import { TextRoll } from  '../components/storefront/textroll';
import { useState } from "react";
import { Hero } from "../components/storefront/Hero";




export default function IndexPage() {

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Simulate a delay (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/"; // Redirect manually since Next.js `Link` doesn't support onClick
    }, 2000); // 2 seconds delay
  };

  return (
   
    <div>
      
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-12  mt-0">
      
    <div className="block lg:hidden ">
  <Link href="/" className="flex items-center">
  
 
    <Image
      src="/logo.svg"
      alt="Company Logo"
      width={220}
      height={140}
      className="mt-10"
      priority
    />
    
  </Link>
  </div>

    {/* Left Side - Text Content */}
    <div className="flex flex-col items-center  lg:items-start w-full lg:w-[100%] space-y-5 ">
  
      <h1 className="text-white font-glancyr font-medium text-sm lg:text-[1.25rem] mt-20">
      <TextRoll
      className='text-xl text-white dark:text-white'
      variants={{
        enter: {
          initial: { rotateX: 0, filter: 'blur(0px)' },
          animate: { rotateX: 90, filter: 'blur(2px)' },
        },
        exit: {
          initial: { rotateX: 90, filter: 'blur(2px)' },
          animate: { rotateX: 0, filter: 'blur(0px)' },
        },
      }}
    >
        W E L C O M E &nbsp; T O &nbsp; T E R R I F I C
        </TextRoll>
      </h1>
     
      <h1 className="text-white font-glancyr font-weight-300 text-3xl lg:text-[2.45rem]">
      <TextRoll
      className='text-4xl text-white dark:text-white'
      variants={{
        enter: {
          initial: { rotateX: 0, filter: 'blur(0px)' },
          animate: { rotateX: 90, filter: 'blur(2px)' },
        },
        exit: {
          initial: { rotateX: 90, filter: 'blur(2px)' },
          animate: { rotateX: 0, filter: 'blur(0px)' },
        },
      }}
    >
        WHERE MODERN ELEGANCE
        </TextRoll>
      </h1>
   
  
      <h1 className="text-white font-glancyr font-bold text-xl lg:text-4xl">
      <TextRoll
      className='text-4xl text-white dark:text-white'
      variants={{
        enter: {
          initial: { rotateX: 0, filter: 'blur(0px)' },
          animate: { rotateX: 90, filter: 'blur(2px)' },
        },
        exit: {
          initial: { rotateX: 90, filter: 'blur(2px)' },
          animate: { rotateX: 0, filter: 'blur(0px)' },
        },
      }}
    >
        MEETS TIMELESS  
        </TextRoll>
        <span className="text-[#EED359] font-bold">
        <TextRoll
      className='text-4xl text-[#EED359] dark:text-[#EED359]'
      variants={{
        enter: {
          initial: { rotateX: 0, filter: 'blur(0px)' },
          animate: { rotateX: 90, filter: 'blur(2px)' },
        },
        exit: {
          initial: { rotateX: 90, filter: 'blur(2px)' },
          animate: { rotateX: 0, filter: 'blur(0px)' },
        },
      }}
    > STYLE
    </TextRoll>
    </span>
      </h1>
  
      <p className="text-white text-xs lg:text-[0.675] max-w-xl leading-relaxed">
        Discover fashion that speaks to your unique sense of self, with designs that redefine what it means to be timelessly chic.
        Step into a world of confidence, innovation, and unparalleled style with <span className="font-bold">TERRIFIC</span>.
      </p>
  
      {/* Mobile Button */}
      <div className="lg:hidden w-full flex justify-center  mb-20">
        <Button className="bg-white text-black p-3 hover:bg-white/90 px-8 font-glancyr py-4 text-lg rounded-full w-3/4"
         onClick={handleClick}>
        <Link href="/">
        {loading ? "Loading..." : "Get Started"}
          </Link>
        </Button>
        
      </div>

      {/* Mobile Button */}
<div className="hidden lg:block w-full justify-center mb-20">
  <Link href="/">
    <Button
      onClick={handleClick}
      className="bg-white text-black p-3 mt-10 hover:bg-white/90 px-8 font-glancyr py-4 text-lg rounded-full w-[15%] flex items-center justify-center gap-2"
    >
      {loading ? "Loading..." : "Buy Now"}
      <svg
        width="11"
        height="16"
        viewBox="0 0 11 16"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L9 8L2 14"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  </Link>
</div>

    </div>
  
    {/* Right Side - Hero Image */}
    
   
  
  </div>
  
 
    
  <div className="flex-col relative hidden lg:block ">

  
      <div className="absolute flex flex-row gap-10 mt-4 top-20 left-20">

      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_15_270)">
<path d="M16 0C11.658 0 11.112 0.02 9.406 0.096C7.7 0.176 6.538 0.444 5.52 0.84C4.45219 1.24164 3.48498 1.87165 2.686 2.686C1.87215 3.48539 1.24221 4.45248 0.84 5.52C0.444 6.536 0.174 7.7 0.096 9.4C0.02 11.11 0 11.654 0 16.002C0 20.346 0.02 20.89 0.096 22.596C0.176 24.3 0.444 25.462 0.84 26.48C1.25 27.532 1.796 28.424 2.686 29.314C3.574 30.204 4.466 30.752 5.518 31.16C6.538 31.556 7.698 31.826 9.402 31.904C11.11 31.98 11.654 32 16 32C20.346 32 20.888 31.98 22.596 31.904C24.298 31.824 25.464 31.556 26.482 31.16C27.5491 30.7582 28.5156 30.1282 29.314 29.314C30.204 28.424 30.75 27.532 31.16 26.48C31.554 25.462 31.824 24.3 31.904 22.596C31.98 20.89 32 20.346 32 16C32 11.654 31.98 11.11 31.904 9.402C31.824 7.7 31.554 6.536 31.16 5.52C30.7578 4.45245 30.1279 3.48535 29.314 2.686C28.5153 1.87135 27.548 1.24129 26.48 0.84C25.46 0.444 24.296 0.174 22.594 0.096C20.886 0.02 20.344 0 15.996 0H16.002H16ZM14.566 2.884H16.002C20.274 2.884 20.78 2.898 22.466 2.976C24.026 3.046 24.874 3.308 25.438 3.526C26.184 3.816 26.718 4.164 27.278 4.724C27.838 5.284 28.184 5.816 28.474 6.564C28.694 7.126 28.954 7.974 29.024 9.534C29.102 11.22 29.118 11.726 29.118 15.996C29.118 20.266 29.102 20.774 29.024 22.46C28.954 24.02 28.692 24.866 28.474 25.43C28.2175 26.1247 27.8081 26.7529 27.276 27.268C26.716 27.828 26.184 28.174 25.436 28.464C24.876 28.684 24.028 28.944 22.466 29.016C20.78 29.092 20.274 29.11 16.002 29.11C11.73 29.11 11.222 29.092 9.536 29.016C7.976 28.944 7.13 28.684 6.566 28.464C5.871 28.2078 5.24225 27.7992 4.726 27.268C4.1935 26.7521 3.78345 26.1233 3.526 25.428C3.308 24.866 3.046 24.018 2.976 22.458C2.9 20.772 2.884 20.266 2.884 15.992C2.884 11.72 2.9 11.216 2.976 9.53C3.048 7.97 3.308 7.122 3.528 6.558C3.818 5.812 4.166 5.278 4.726 4.718C5.286 4.158 5.818 3.812 6.566 3.522C7.13 3.302 7.976 3.042 9.536 2.97C11.012 2.902 11.584 2.882 14.566 2.88V2.884ZM24.542 5.54C24.2899 5.54 24.0402 5.58966 23.8072 5.68615C23.5743 5.78264 23.3626 5.92407 23.1844 6.10236C23.0061 6.28064 22.8646 6.4923 22.7682 6.72525C22.6717 6.95819 22.622 7.20786 22.622 7.46C22.622 7.71214 22.6717 7.96181 22.7682 8.19475C22.8646 8.4277 23.0061 8.63936 23.1844 8.81765C23.3626 8.99593 23.5743 9.13736 23.8072 9.23385C24.0402 9.33034 24.2899 9.38 24.542 9.38C25.0512 9.38 25.5396 9.17772 25.8996 8.81765C26.2597 8.45757 26.462 7.96922 26.462 7.46C26.462 6.95078 26.2597 6.46242 25.8996 6.10236C25.5396 5.74229 25.0512 5.54 24.542 5.54ZM16.002 7.784C14.9121 7.767 13.8298 7.96697 12.818 8.37228C11.8061 8.77759 10.885 9.38014 10.1083 10.1448C9.33157 10.9096 8.71473 11.8211 8.29368 12.8265C7.87264 13.8319 7.6558 14.911 7.6558 16.001C7.6558 17.091 7.87264 18.1701 8.29368 19.1755C8.71473 20.1809 9.33157 21.0924 10.1083 21.8572C10.885 22.6219 11.8061 23.2244 12.818 23.6297C13.8298 24.035 14.9121 24.235 16.002 24.218C18.1591 24.1843 20.2164 23.3038 21.73 21.7665C23.2435 20.2292 24.0918 18.1583 24.0918 16.001C24.0918 13.8437 23.2435 11.7728 21.73 10.2355C20.2164 8.69817 18.1591 7.81765 16.002 7.784ZM16.002 10.666C17.4167 10.666 18.7734 11.228 19.7737 12.2283C20.774 13.2286 21.336 14.5853 21.336 16C21.336 17.4147 20.774 18.7714 19.7737 19.7717C18.7734 20.772 17.4167 21.334 16.002 21.334C14.5873 21.334 13.2306 20.772 12.2303 19.7717C11.23 18.7714 10.668 17.4147 10.668 16C10.668 14.5853 11.23 13.2286 12.2303 12.2283C13.2306 11.228 14.5873 10.666 16.002 10.666Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_15_270">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>


<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9121 11.0992V13.3024H12.2993V15.9952H13.9121V24H17.2273V15.9952H19.4513C19.4513 15.9952 19.6609 14.704 19.7617 13.2912H17.2401V11.4512C17.2401 11.1744 17.6017 10.8048 17.9601 10.8048H19.7649V8H17.3089C13.8305 8 13.9121 10.696 13.9121 11.0992Z" fill="white"/>
<path d="M6.4 3.2C5.55131 3.2 4.73737 3.53714 4.13726 4.13726C3.53714 4.73737 3.2 5.55131 3.2 6.4V25.6C3.2 26.4487 3.53714 27.2626 4.13726 27.8627C4.73737 28.4629 5.55131 28.8 6.4 28.8H25.6C26.4487 28.8 27.2626 28.4629 27.8627 27.8627C28.4629 27.2626 28.8 26.4487 28.8 25.6V6.4C28.8 5.55131 28.4629 4.73737 27.8627 4.13726C27.2626 3.53714 26.4487 3.2 25.6 3.2H6.4ZM6.4 0H25.6C27.2974 0 28.9252 0.674284 30.1255 1.87452C31.3257 3.07475 32 4.70261 32 6.4V25.6C32 27.2974 31.3257 28.9252 30.1255 30.1255C28.9252 31.3257 27.2974 32 25.6 32H6.4C4.70261 32 3.07475 31.3257 1.87452 30.1255C0.674284 28.9252 0 27.2974 0 25.6V6.4C0 4.70261 0.674284 3.07475 1.87452 1.87452C3.07475 0.674284 4.70261 0 6.4 0Z" fill="white"/>
</svg>


<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.3332 2.66667L14.6665 17.3333" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29.3332 2.66667L19.9998 29.3333L14.6665 17.3333L2.6665 12L29.3332 2.66667Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </div>
      <div className="ml-96">
      <Hero  />
      </div>
   

    </div>
    
      


  
  
    </div>
   
  
   
  );
}