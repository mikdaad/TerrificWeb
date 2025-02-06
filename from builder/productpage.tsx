import React from "react";
import Head from 'next/head'; // For managing head elements
import Image from 'next/image'; // For optimized images
import Navbar from "./Navf";
import CategoryItem from "./catef";
import ProductCard from "./productf";
import Banner from "./banf";
import FloatingButton from "./floatf";

const ProductPage: React.FC = () => {
  return (
    <>
      <Head> {/* Use Next.js Head for managing metadata */}
        <title>Product Page</title> {/* Set your title */}
        {/* Link tags are now managed within the Head component */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Montserrat:wght@400;500;600&family=Glancyr:wght@200;300;400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="relative pb-20 mx-auto my-0 bg-white max-w-[375px] max-sm:w-full">
        {/* ... (rest of your content) */}
        <div className="flex justify-between items-center px-4 pt-3.5 pb-0">
          <div className="flex items-center">
            <div className="text-base font-medium">04:42</div>
            <i className="ti ti-menu mt-11 ml-5 text-2xl"></i>
          </div>
          <div className="mt-12">
            <Image  {/* Use next/image for the profile image */}
              src="https://placehold.co/40x40/f0f0f0/f0f0f0"
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-[100px]"
            />
          </div>
        </div>
        {/* ... (rest of your content) */}

        <div className="flex overflow-x-auto gap-4 px-0 py-6 max-sm:px-2.5 max-sm:py-6">
          <CategoryItem image="https://placehold.co/56x56/e0e0e0/e0e0e0" altText="Luxury" label="Luxury" />
          {/* ... other CategoryItems */}
        </div>

        <Banner title="50-40% OFF" buttonText="Shop Now" />

        {/* ... (rest of your content) */}
        <div className="flex gap-3 mt-4">
          <ProductCard
            image="https://placehold.co/170x124/d1d1d1/d1d1d1" // Replace with real image URLs
            altText="T-shirt"
            name="Primium T-shirts"
            description="Lorem Ipsum is simply dummy text of the printing"
            price="₹1500"
            originalPrice="₹2499"
            discount="40%Off"
            rating={4.5}
            reviews={56890}
          />
          {/* ... other ProductCards */}
        </div>
        {/* ... (rest of your content) */}
        <div className="overflow-hidden mx-5 my-4 bg-white rounded-lg max-sm:mx-2.5 max-sm:my-4">
           <Image {/* Use next/image for the banner image */}
            src="https://placehold.co/343x200/d5d5d5/d5d5d5"
            alt="New Arrivals"
            width={343} // Or use a responsive width like fill or 100%
            height={200}
            className="object-cover w-full h-[200px]"
          />
          {/* ... rest of the div content */}
        </div>

        <Navbar />
      </div>
    </>
  );
};

export default ProductPage;