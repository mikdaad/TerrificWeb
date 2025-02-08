"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    image: "/shop/dress.png",
    discount: "50-40% OFF",
    description: "Now in Fashion Wear",
    subtext: "All colours",
  },
  {
    image: "/shop/dress2.jpg",
    discount: "Up to 30% OFF",
    description: "Exclusive Footwear",
    subtext: "Limited stock",
  },
  {
    image: "/shop/dress3.jpg",
    discount: "Flat 20% OFF",
    description: "Trendy Accessories",
    subtext: "Grab yours now",
  },
];

export  function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2000); // Change banner every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full  mx-auto">
      {/* Banner */}
      <div
        className="relative bg-primary rounded-lg p-6 text-white bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 69.15%), url('${banners[activeIndex].image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{banners[activeIndex].discount}</h2>
          <p className="text-lg">{banners[activeIndex].description}</p>
          <p className="text-sm opacity-90">{banners[activeIndex].subtext}</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => console.log("Navigate to Shop")}
          >
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-black" : "bg-gray-400 opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
