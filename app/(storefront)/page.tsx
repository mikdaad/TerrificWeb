'use client'
import { Button } from "../components/ui/button";
import React,{useState,useEffect,useRef } from "react";
import { Clock, Mic, Search, ChevronRight, Timer, Filter, ArrowUpDown, Router } from "lucide-react";
import  ProductList  from "../components/storefront/ProductList";
import  ProductList2  from "../components/storefront/Productlist2";
import ProductList3 from "../components/storefront/productlist3";
import { CategoryList } from "../components/buildercomponents/home/CategoryList";
import { Genderlist } from "../components/buildercomponents/home/Genderlist";
import { Banner } from "../components/buildercomponents/home/Banner";
import {SingleBanner} from "../components/buildercomponents/bottombanner";
import { BottomNav } from "../components/buildercomponents/home/BottomNav";
import Image from "next/image";
import Link from "next/link";
import SortFilter from "../components/storefront/sortfilter";
import { CountdownTimer } from "../components/home/timer";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import UserCart from"../components/storefront/usercart"; 
import { GlowEffect } from "../components/ui/Gloweffect";
import Footer from "../components/ui/footer";
import { NewsletterSection } from "../components/storefront/newsletter";


const categories = [
  //{ image: "/categories/luxury.png", title: "Luxury" },
  { image: "/categories/fashion.png", title: "Fashion" },
];

const genders = [
 // { image: "/categories/kid.png", title: "Kids" },
  { image: "/categories/men.png", title: "Men" },
  { image: "/categories/women.png", title: "Women" },
  //{ image: "/categories/teens.png", title: "Teens" },
];







const Index = () => {

const [currentTime, setCurrentTime] = useState(new Date());
const [lastDate, setLastDate] = useState<string | null>(null);
const searchInputRef = useRef<HTMLInputElement>(null);

const [products, setProducts] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedgender, setSelectedgender] = useState("");
const [selectedstatus, setSelectedstatus] = useState("");
const [sortOption, setSortOption] = useState(""); 
const [filterOption, setFilterOption] = useState(""); 
const [isQueryActive, setIsQueryActive] = useState(false);
const router = useRouter();
const searchParams = useSearchParams();



async function fetchLastDate() {
  try {
    const response = await fetch("/api/lastdate", { method: "GET" });
    const data = await response.json();
   
    setLastDate(data.lastdate);
    console.log(data.lastdate);
  } catch (error) {
    console.error("Error fetching lastdate:", error);
  }
}

  useEffect(() => {
    fetchLastDate();
  }, []);
  const updateSearchParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
  
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        params.set(key, newParams[key]!);
      } else {
        params.delete(key);
      }
    });
  
    // Redirect to /products page instead of staying on index page
    router.push(`/products?${params.toString()}`);
  };
  
  // When filters/search are updated, navigate to the products page
  useEffect(() => {
    if (selectedCategory || selectedgender || selectedstatus || sortOption || filterOption) {
      updateSearchParams({
        search: searchQuery,
        category: selectedCategory,
        gender: selectedgender,
        status: selectedstatus,
        sort: sortOption,
        filter: filterOption,
      });
    }
  }, [ selectedCategory, selectedgender, selectedstatus, sortOption, filterOption,updateSearchParams]);
  

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};

const handleCategorySelect = (category: string) => {
  setSelectedCategory(category);
  setIsQueryActive(true);
};

const handleGenderSelect = (gender: string) => {
  setSelectedgender(gender);
  setIsQueryActive(true);
};

const handleSortSelect = (sortOption: string) => {
  console.log("Selected Sort:", sortOption);
  setSortOption(sortOption);
  // Call your API or sort function here
};

const handleFilterSelect = (filterOption: string) => {
  console.log("Selected Filter:", filterOption);
  setFilterOption(filterOption);
  // Call your API or filter function here
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    updateSearchParams({
      search: searchQuery,
      category: selectedCategory,
      gender: selectedgender,
      status: selectedstatus,
      sort: sortOption,
      filter: filterOption,
    });
  }
};


useEffect(() => {
  const updateCurrentTime = () => setCurrentTime(new Date());
  const timeInterval = setInterval(updateCurrentTime, 60000); // Update every minute instead of every second
  return () => clearInterval(timeInterval);
}, []);


const focusSearchInput = () => {
  if (searchInputRef.current) {
    searchInputRef.current.focus();
  }
};

const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);
  targetDate.setHours(targetDate.getHours() + 12);
  targetDate.setMinutes(targetDate.getMinutes() + 5);
  targetDate.setSeconds(targetDate.getSeconds() + 22);



  return (

    
    <div className="pb-20 p-1 font-glancyr bg-[#1a1818]">
     
      {/* Header */}
      <header className="p-2 mt-2 flex items-center justify-between relative">
     
  {/* Left Section: Time */}
  <Link href="/dashboard">
    <div className="flex items-center ml-2 gap-2 mt-6">
      {/* <Clock className="h-5 w-5 mb-1" /> */}
      <span className="font-medium text-[0.750rem] text-white sm:text-base">
        {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  </Link>

  {/* Centered Logo */}
  <div className="absolute left-1/2 transform -translate-x-1/2">
    <Link href="/">
      <Image
        src="/logo3.svg"
        alt="Company Logo"
        width={150}
        height={62}
        className=""
        priority
      />
    </Link>
  </div>

 <UserCart/>

</header>

{/* Search Bar */}
<div className="p-0 mt-5 mr-0 ml-1 grid grid-cols-[1fr_auto] gap-2 items-center w-full ">
  {/* Search Input */}
  <div className="relative w-full mt-2 font-thin">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />

    <Input
      className="pl-10 pr-10 w-full h-10 rounded-lg text-sm border font-thin border-gray-300 focus:ring-2 focus:ring-black transition-all shadow-yellow-300 shadow-sm
      "
      placeholder="Search any Product..."
      ref={searchInputRef}
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
    />
    
    <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer" />
  
    
  </div>

  
</div>

      

      {/* Featured Section */}
      <section className=" m-2 mt-5 ">
        <div className="flex items-center justify-between m-2 mb-4">
          <h2 className="text-lg font-weight-600 p-1 text-white">All Featured</h2>
          {/* Sort & Filter Section */}
  <div className="flex gap-2">
    <SortFilter onSortSelect={handleSortSelect} onFilterSelect={handleFilterSelect} />
  </div>
         
        </div>
        <div className="w-full  pb-0 hide-scrollbar">
  <div className="flex ">
    {/* CategoryList takes more space (since it has 2 items) */}
    <div >
      <CategoryList categories={categories} onCategorySelect={handleCategorySelect} />
    </div>

    {/* Genderlist takes less space (since it has 3 items) */}
    <div className="flex">
      <Genderlist categories={genders} onCategorySelect={handleGenderSelect} />
    </div>
  </div>
</div>

      </section>

      {/* Banner */}
      <section className="p-2">
        <Banner />
       
        
      </section>

       {/* Trending Section */}
       <section className=" space-y-0">
        <div className="flex items-center m-2 text-white justify-between rounded-lg p-2">
       
          <div >
            <h2 className="text-md font-semibold  ">Brand of products</h2>
            {/*<div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="text-xs"> Last Date {lastDate} </span>
            </div>
            */}
          </div>
          <Button  onClick={()=> setSelectedstatus("TrendingProduct")} variant="ghost" size="sm">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="">
        <ProductList2 status="TrendingProduct"/>
        </div>
      </section>

      {/* Banner */}
      <section className="p-2">
        <Banner />
       
        
      </section>


 {/* Trending Section */}
 <section className=" space-y-0">
        <div className="flex items-center m-2 text-white justify-between rounded-lg p-2">
       
          <div >
            <h2 className="text-md font-semibold  ">Brand of products</h2>
            {/*<div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="text-xs"> Last Date {lastDate} </span>
            </div>
            */}
          </div>
          <Button  onClick={()=> setSelectedstatus("TrendingProduct2")} variant="ghost" size="sm">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="">
        <ProductList2 status="TrendingProduct2"/>
        </div>
      </section>

      
      

      {/* Deals Section 
      <section className="space-y-0">
        <div>
        <div className="m-2 items-center justify-between text-white   rounded-lg p-2 flex flex-row">
        <h2 className="text-xs lg:text-md font-semibold">Flash Sale</h2>
         <div >
            
            <CountdownTimer targetDate={targetDate}/>
            
          </div>
          <Button onClick={()=> setSelectedstatus("Dealoftheday")}  variant="ghost" size="default">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
         
        </div>
        
                  </div>

        <div className="">
        <ProductList2 status="Dealoftheday"/>
        </div>
        
      </section>

*/}
       {/* top selling Section 
       <section className=" space-y-0">
        <div className="flex items-center m-2 text-white justify-between rounded-lg p-2">
       
          <div >
            <h2 className="text-md font-semibold  ">Top selling</h2>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="text-xs"> Last Date {lastDate} </span>
            </div>
            
          </div>
          <Button  onClick={()=> setSelectedstatus("NewArrival")} variant="ghost" size="sm">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="">
        <ProductList3 status="NewArrival"/>
        </div>
      </section>

*/}
      

   
      <NewsletterSection/>
      <Footer/>


      {/* Bottom Navigation */}
      <BottomNav onSearchClick={focusSearchInput} />
         {/* glow 
      <GlowEffect
                    colors={['#ffffff', '#FFF9A6', '#ffffff', '#ffffff']}
                    mode='flowHorizontal'
                    blur='soft'
                className="absolute  inset-0 -z-10"
                  />
                  */}
  

    </div>
  );
};

export default Index;