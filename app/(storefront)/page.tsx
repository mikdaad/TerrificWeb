'use client'
import { Button } from "../components/ui/button";
import React,{useState,useEffect,useRef } from "react";
import { Clock, Mic, Search, ChevronRight, Timer, Filter, ArrowUpDown } from "lucide-react";
import { ProductCard } from "../components//buildercomponents/home/ProductCard";
import { CategoryList } from "../components/buildercomponents/home/CategoryList";
import { Banner } from "../components/buildercomponents/home/Banner";
import { BottomNav } from "../components/buildercomponents/home/BottomNav";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { image: "/categories/luxury.png", title: "Luxury" },
  { image: "/categories/fashion.png", title: "Fashion" },
  { image: "/categories/kid.png", title: "Kids" },
  { image: "/categories/men.png", title: "Mens" },
  { image: "/categories/women.png", title: "Womens" },
];

const products = [
  {
    image: "https://placehold.co/170x124/d1d1d1/d1d1d1",
    title: "Premium T-shirts",
    description: "Lorem Ipsum is simply dummy text of the printing",
    currentPrice: "₹1500",
    originalPrice: "₹2499",
    discount: "40%Off",
    rating: 4,
    reviews: 56890,
  },
  {
    image: "https://placehold.co/170x124/d2d2d2/d2d2d2",
    title: "RIPPED JEANS",
    description: "Lorem Ipsum is simply dummy text of the printing",
    currentPrice: "₹2499",
    originalPrice: "₹4999",
    discount: "50%Off",
    rating: 5,
    reviews: 344567,
  },
  {
    image: "https://placehold.co/170x124/d1d1d1/d1d1d1",
    title: "Premium T-shirts",
    description: "Lorem Ipsum is simply dummy text of the printing",
    currentPrice: "₹1500",
    originalPrice: "₹2499",
    discount: "40%Off",
    rating: 4,
    reviews: 56890,
  },
  {
    image: "https://placehold.co/170x124/d2d2d2/d2d2d2",
    title: "RIPPED JEANS",
    description: "Lorem Ipsum is simply dummy text of the printing",
    currentPrice: "₹2499",
    originalPrice: "₹4999",
    discount: "50%Off",
    rating: 5,
    reviews: 344567,
  },
];





const Index = () => {

const [currentTime, setCurrentTime] = useState(new Date());
const [remainingTime, setRemainingTime] = useState(null);
const searchInputRef = useRef<HTMLInputElement>(null);


useEffect(() => {
  // Update current time every second
  const timeInterval = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timeInterval);
}, []);

const focusSearchInput = () => {
  if (searchInputRef.current) {
    searchInputRef.current.focus();
  }
};

  return (
    <div className="pb-24 font-glancyr">
      {/* Header */}
      <header className="p-4 flex items-center justify-between  ">
        <div className="flex items-center gap-2 mt-4">
          <Clock className="h-5 w-5 mb-1" />
          <span className="font-medium"> {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}</span>
        </div>
        <Link href="/" className="flex items-center">
    <Image
      src="/logo2.svg"
      alt="Company Logo"
      width={161.23}
      height={72.87}
      className="relative right-[18%] w-[120px] h-[54px]  sm:w-[140px] sm:h-[65px] lg:w-[161px] lg:h-[73px]"
      priority
    />
  </Link>
        <Image
          src="https://placehold.co/40x40/f0f0f0/f0f0f0"
          alt="Profile"
          className="w-10 h-10 rounded-full  mt-4"
        />
      </header>

      {/* Search Bar */}
      <div className="p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          
          <input className="pl-10" placeholder="Search any Product.."  ref={searchInputRef}  type="text" />
          <Mic className="absolute h-4 w-4 text-gray-500 left-[90%] top-1/3" />
          
         
        </div>
        
        
      </div>

      {/* Featured Section */}
      <section className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Featured</h2>
          <div className="flex gap-2  ">
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2 font-thin" />
              Sort
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        <CategoryList categories={categories} />
      </section>

      {/* Banner */}
      <section className="p-4">
        <Banner />
      </section>

      {/* Deals Section */}
      <section className="p-4 space-y-4">
        <div className="flex items-center justify-between text-white  bg-blue-500 rounded-lg p-3">
          <div>
            <h2 className="text-xl font-thin">Deal of the Day</h2>
            <div className="flex items-center gap-2 text-sm ">
              <Timer className="h-4 w-4" />
              <span>22h 55m 20s remaining</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="p-4 space-y-4">
        <div className="flex items-center  text-white justify-between bg-blue-500 rounded-lg p-3">
          <div >
            <h2 className="text-xl font-semibold  ">Trending Products</h2>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>Last Date 25/10/24</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="p-4">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://placehold.co/343x200/d5d5d5/d5d5d5"
            alt="New Arrivals"
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <p className="text-lg">Winter&apos;s 24 Collections</p>
            </div>
            <Button variant="secondary">
              View all
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav onSearchClick={focusSearchInput} />
    </div>
  );
};

export default Index;
