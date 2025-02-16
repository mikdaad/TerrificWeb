'use client'
import { Button } from "../components/ui/button";
import React,{useState,useEffect,useRef } from "react";
import { Clock, Mic, Search, ChevronRight, Timer, Filter, ArrowUpDown, Router } from "lucide-react";
import  ProductList  from "../components/storefront/ProductList";
import  ProductList2  from "../components/storefront/Productlist2";
import { CategoryList } from "../components/buildercomponents/home/CategoryList";
import { Genderlist } from "../components/buildercomponents/home/Genderlist";
import { Banner } from "../components/buildercomponents/home/Banner";
import { BottomNav } from "../components/buildercomponents/home/BottomNav";
import Image from "next/image";
import Link from "next/link";
import SortFilter from "../components/storefront/sortfilter";
import CountdownTimer from "../components/home/timer";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import UserCart from"../components/storefront/usercart"; 

const categories = [
  { image: "/categories/luxury.png", title: "Luxury" },
  { image: "/categories/fashion.png", title: "Fashion" },
];

const genders = [
  { image: "/categories/kid.png", title: "Kids" },
  { image: "/categories/men.png", title: "Men" },
  { image: "/categories/women.png", title: "Women" },
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
const [sortOption, setSortOption] = useState(""); // Example: "price-asc", "price-desc"
const [filterOption, setFilterOption] = useState(""); // Example: "in-stock", "discounted"
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


  useEffect(() => {
    if (!searchQuery && !selectedCategory && !selectedgender && !sortOption && !filterOption && !selectedstatus) {
      setIsQueryActive(false);
      return;
    }
  
    setIsQueryActive(true);
  
    const fetchProducts = async () => {
      try {
        // Construct query params
        const queryParams = new URLSearchParams({
          ...(searchQuery && { search: searchQuery }),
          ...(selectedCategory && { category: selectedCategory }),
          ...(selectedgender && { gender: selectedgender }),
          ...(selectedstatus && { status: selectedstatus }),
          ...(sortOption && { sort: sortOption }),
          ...(filterOption && { filter: filterOption }),
        }).toString();

        router.replace(`?${queryParams.toString()}`, { scroll: false });
      
  
        const response = await fetch(`/api/products?${queryParams}`, {
          method: "GET",
        });
  
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, [searchQuery, selectedCategory, selectedgender, selectedstatus, sortOption, filterOption,searchParams]);
  
 
  useEffect(() => {
    const fetchUpdatedProducts = async () => {
      const queryParams = searchParams.toString();
  
      const response = await fetch(`/api/products?${queryParams}`, { method: "GET" });
      const data = await response.json();
      setProducts(data);
      
    };
  
    fetchUpdatedProducts();
  }, [searchParams]);



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

    
    <div className="pb-20 p-1 font-glancyr">
      {/* Header */}
      <header className="p-2 flex items-center justify-between relative">
  {/* Left Section: Time */}
  <Link href="/dashboard">
    <div className="flex items-center ml-2 gap-2 mt-4">
      {/* <Clock className="h-5 w-5 mb-1" /> */}
      <span className="font-medium text-[0.650rem] sm:text-base">
        {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  </Link>

  {/* Centered Logo */}
  <div className="absolute left-1/2 transform -translate-x-1/2">
    <Link href="/">
      <Image
        src="/logo2.svg"
        alt="Company Logo"
        width={161}
        height={73}
        className="w-[150px] h-[75px] sm:w-[150px] sm:h-[75px] lg:w-[161px] lg:h-[73px]"
        priority
      />
    </Link>
  </div>

 <UserCart/>
</header>

{/* Search Bar */}
<div className="p-2 mt-3 mr-0 ml-1 grid grid-cols-[1fr_auto] gap-2 items-center w-full">
  {/* Search Input */}
  <div className="relative w-full font-thin">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />

    <Input
      className="pl-10 pr-10 w-full h-12 rounded-lg border font-thin border-gray-300 shadow-md focus:ring-2 focus:ring-blue-400 transition-all"
      placeholder="Search any Product..."
      ref={searchInputRef}
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
    />
    
    <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer" />
  </div>

  
</div>

      {isQueryActive ? (
      /* Show Dynamic Product List */
      <section className="p-2 space-y-4">
        <h2 className="text-xl font-semibold">Search Results</h2>
        <div className="">
          <ProductList products={products} />
        </div>
      </section>
    ) : (<>

      {/* Featured Section */}
      <section className=" m-2">
        <div className="flex items-center justify-between m-2 mb-4">
          <h2 className="text-xl font-weight-600 p-1 ">All Featured</h2>
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

      {/* Deals Section */}
      <section className="space-y-0">
        <div className="flex m-2 items-center justify-between text-white  bg-[#4392F9] rounded-lg p-3">
          <div >
            <h2 className="text-xl font-thin">Deal of the Day</h2>
            <CountdownTimer/>
          </div>
          <Button onClick={()=> setSelectedstatus("Dealoftheday")}  variant="ghost" size="sm">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="">
        <ProductList2 status="Dealoftheday"/>
        </div>
      </section>

      {/* Trending Section */}
      <section className=" space-y-0">
        <div className="flex items-center m-2 text-white justify-between bg-[#4392F9] rounded-lg p-3">
          <div >
            <h2 className="text-xl font-thin  ">Trending Products</h2>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span> Last Date {lastDate} </span>
            </div>
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

      {/* New Arrivals */}
      <section className="p-4">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/200/300"
            alt="New Arrivals"
            
            className="w-full h-[200px] object-cover"
            width={40} // Set width
      height={40} // Set height
          />
          <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <p className="text-lg">Winter&apos;s 24 Collections</p>
            </div>
            <Button  onClick={()=> setSelectedstatus("NewArrival")} variant="secondary">
              View all
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav onSearchClick={focusSearchInput} />

      </>
    )}
    </div>
  );
};

export default Index;
