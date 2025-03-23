"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "../../ui/Gloweffect";

type Banner = {
  id: string;
  title: string;
  imageString: string;
  description: string;
  subtext: string;
};

export function Banner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response =  await fetch("/api/topbannner", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: Banner[] = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    }

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return <div className="text-center text-gray-500"></div>;
  }

  return (
    <div className="relative w-full mx-auto ">
      <div
       className="relative bg-primary rounded-lg p-6 text-white bg-cover bg-center transition-all duration-500 
             shadow-[0px_0px_20px_4px_rgba(255,255,255,0.3)]"
        
        style={{
          backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 69.15%), url('${banners[activeIndex].imageString}')`,
        }}
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{banners[activeIndex].title}</h2>
          <p className="text-lg">{banners[activeIndex].description}</p>
          <p className="text-sm opacity-90">{banners[activeIndex].subtext}</p>
          {/*<Button variant="secondary" className="mt-4">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          */}
        </div>
     
      </div>
      

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {banners.map((_, index) => (
          <button
          
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-white" : "bg-gray-400 opacity-50"
            }`}
          />
        ))}
      </div>
      
    </div>
  );
}
