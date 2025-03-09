import React,{ type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";


export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    /*<div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/background.png")' }}
 // ✅ Correct syntax
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">{children}</main>
        <Footer />
      </div>
    </div>*/

  
    <div
    className="relative min-h-screen bg-cover  bg-left"
    style={{ backgroundImage: 'url("/background.jpg")' }} // ✅ Correct syntax
  >
   
    {/* SVG Overlay 
    <svg
      className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 909 900"
      fill="none"
    >
      <path
        d="M1.56401 925.73C48.0184 789.268 208.194 541.249 477.259 640.868C746.324 740.486 876.206 547.363 907.514 438.35M100.197 994.292C85.6032 939.502 107.261 813.354 310.643 747.078C564.871 664.233 665.504 610.56 631.704 422.687C604.664 272.388 263.136 53.7626 95.7515 -36.7624M677.673 1027.09C414.379 791.039 202.408 673.578 245.079 400.73C287.749 127.883 808.419 312.657 867.415 209.12"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  */}
    {/* Dark Overlay */}
    <div className="bg-black bg-opacity-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">{children}</main>
    </div>
  </div>
  
    
  );
}
