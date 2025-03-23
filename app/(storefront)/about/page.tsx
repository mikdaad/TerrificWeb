"use client";


import React from "react";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-800 font-glancyr">
      <h1 className="text-3xl font-bold text-center">About Us</h1>
      <p className="text-lg text-center text-gray-600">
        Welcome to Terrific, your one-stop destination for premium products and seamless shopping experiences.
      </p>
      
       {/* Embed Instagram Profile */}
       <div className="border rounded-lg overflow-hidden">
        <iframe
          src="https://www.instagram.com/terrific.tr/"
          width="100%"
          height="600"
          style={{ border: "none" }}
          allowFullScreen
        ></iframe>
      </div>

      {/* Instagram Button Link */}
      <div className="text-center mt-4">
        <a
          href="https://www.instagram.com/terrific.tr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View on Instagram
        </a>
      </div>

      
      <footer className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Terrific. All rights reserved.
      </footer>
    </div>
  );
};

export default Page;