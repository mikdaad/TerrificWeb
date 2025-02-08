import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";
import { Navbar } from "../components/storefront/Navbar";
import { Button } from "../components/ui/button";
import React from 'react';
import Link from "next/link";

export default function IndexPage() {
  return (
    /*<div>
         
         <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
      
     
    </div>
    */
    <div>
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-12  mt-12">

    {/* Left Side - Text Content */}
    <div className="flex flex-col items-center mt-[22rem] lg:mt-[0rem] lg:items-start w-full lg:w-[100%] space-y-4">
  
      <h1 className="text-white font-glancyr font-medium text-sm lg:text-2xl">
        W E L C O M E &nbsp; T O &nbsp; T E R R I F I C
      </h1>
  
      <h1 className="text-white font-glancyr font-semibold text-3xl lg:text-5xl">
        WHERE MODERN ELEGANCE
      </h1>
  
      <h1 className="text-white font-glancyr font-bold text-xl lg:text-4xl">
        MEETS TIMELESS  
        <span className="text-[#EED359] font-bold"> STYLE</span>
      </h1>
  
      <p className="text-white text-xs lg:text-sm max-w-xl leading-relaxed">
        Discover fashion that speaks to your unique sense of self, with designs that redefine what it means to be timelessly chic.
        Step into a world of confidence, innovation, and unparalleled style with <span className="font-bold">TERRIFIC</span>.
      </p>
  
      {/* Mobile Button */}
      <div className="lg:hidden w-full flex justify-center mt-4">
        <Button className="bg-white text-black hover:bg-white/90 px-8 font-glancyr py-4 text-lg rounded-full w-3/4">
        <Link href="/">
          Get Started
          </Link>
        </Button>
        
      </div>
  
    </div>
  
    {/* Right Side - Hero Image */}
    
  
  </div>
  <div className="flex flex-row">
    <div className=" w-[90%]">

    </div>
  <div className="relative hidden lg:block   items-center justify-start">
    
      <Hero  />
    </div>
    </div>
    </div>
  );
}