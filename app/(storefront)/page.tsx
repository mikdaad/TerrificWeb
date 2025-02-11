'use client'
import { Button } from "../components/ui/button";
import React,{useState,useEffect,useRef } from "react";
import { Clock, Mic, Search, ChevronRight, Timer, Filter, ArrowUpDown } from "lucide-react";
import  ProductList  from "../components/storefront/ProductList";
import { CategoryList } from "../components/buildercomponents/home/CategoryList";
import { Genderlist } from "../components/buildercomponents/home/Genderlist";
import { Banner } from "../components/buildercomponents/home/Banner";
import { BottomNav } from "../components/buildercomponents/home/BottomNav";
import Image from "next/image";
import Link from "next/link";
import SortFilter from "../components/storefront/sortfilter";

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
const [remainingTime, setRemainingTime] = useState(null);
const searchInputRef = useRef<HTMLInputElement>(null);

const [products, setProducts] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedgender, setSelectedgender] = useState("");
const [selectedstatus, setSelectedstatus] = useState("");
const [sortOption, setSortOption] = useState(""); // Example: "price-asc", "price-desc"
const [filterOption, setFilterOption] = useState(""); // Example: "in-stock", "discounted"
const [isQueryActive, setIsQueryActive] = useState(false);


useEffect(() => {
  if (!searchQuery && !selectedCategory && !selectedgender && !sortOption && !filterOption ) {
    setIsQueryActive(false);
    return;
  }

  setIsQueryActive(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: searchQuery,
          category: selectedCategory,
          gender: selectedgender, // Ensure gender is sent
          status: selectedstatus,
        }),
      });

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, [searchQuery, selectedCategory, selectedgender, selectedstatus, sortOption, filterOption]); 
 



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
          src="https://picsum.photos/200/300"
          alt="Profile"
          width={40} // Set width
      height={40} // Set height 
          className="w-10 h-10 rounded-full  mt-4"
        />
      </header>


      {/* Search Bar */}
      <div className="p-2 flex w-full gap-4">
        <div className="flex-1 relative ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          
          <input className="pl-10 w-full" placeholder="Search any Product.."  
          ref={searchInputRef}  type="text"
           value={searchQuery}  onChange={handleSearchChange} />
          <Mic className="absolute h-4 w-4 text-gray-500 left-[90%] top-1/3" />
          
         
        </div>
        <SortFilter onSortSelect={handleSortSelect} onFilterSelect={handleFilterSelect}/>
        
      </div>

      {isQueryActive ? (
      /* Show Dynamic Product List */
      <section className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Search Results</h2>
        <div className="grid grid-cols-2 gap-4">
          <ProductList products={products} />
        </div>
      </section>
    ) : (<>

      {/* Featured Section */}
      <section className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Featured</h2>
         
        </div>
        <div className="flex gap-4 items-center w-full" >
        <CategoryList categories={categories}  onCategorySelect={handleCategorySelect} />
        <Genderlist categories={genders}  onCategorySelect={handleGenderSelect} />
        </div>
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
        <ProductList products={products}/>
        </div>
      </section>

      {/* Trending Section */}
      <section className="p-4 space-y-4">
        <div className="flex items-center  text-white justify-between bg-blue-500 rounded-lg p-3">
          <div >
            <h2 className="text-xl font-semibold  ">Trending Products</h2>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span> Last Date 25/10/24 </span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
        <ProductList products={products}/>
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
            <Button variant="secondary">
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
