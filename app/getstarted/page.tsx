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
        WHERE MODERN ELEGANCE
        </TextRoll>
      </h1>
   
  
      <h1 className="text-white font-glancyr font-bold text-xl lg:text-4xl">
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
        MEETS TIMELESS  
        </TextRoll>
        <span className="text-[#EED359] font-bold">
        <TextRoll
      className='text-xl text-[#EED359] dark:text-[#EED359]'
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
        <div className="hidden lg:block w-full justify-center  mb-20">
        <Button onClick={handleClick}  className="bg-white text-black p-3 mt-10 hover:bg-white/90 px-8 font-glancyr py-4 text-lg rounded-full w-[15%]">
        <Link href="/">
        {loading ? "Loading..." : "Buy Now"} 
          </Link>
        </Button>
        
      </div>
  
    </div>
  
    {/* Right Side - Hero Image */}
    
   
  
  </div>
  
 
    
  <div className="relative hidden lg:block ">
    
    <Hero  />
      


  
  
    </div>
   
  
    </div>
  );
}