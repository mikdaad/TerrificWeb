"use client";

import { useState } from "react";
import { addItem, addToWishlist } from "../../actions";
import { ShoppingBagButton, WishlistButton } from "@/app/components/SubmitButtons";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import { StarIcon } from "lucide-react";

export default function ProductPage({ data }: { data: any }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const addProductToShoppingCart = () => addItem(data.id, selectedSize, selectedColor);
  const addProductToWishlist = () => addToWishlist(data.id, selectedSize, selectedColor);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 font-glancyr gap-6 items-start px-4 lg:gap-x-24 py-6">
      {/* Image Slider */}
      <ImageSlider images={data.images} />

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{data.name}</h1>
        <p className="text-2xl mt-2 text-gray-900">₹{data.originalprice}</p>
        
        {/* Star Rating */}
        <div className="mt-3 flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        <p className="text-xl mt-2 text-gray-900">{data.reviews}</p>
        
        <p className="text-base text-gray-700 mt-6">{data.description}</p>

        {/* Available Sizes */}
<div className="mt-4">
  <label className="text-lg font-semibold text-gray-800">Available Sizes:</label>
  <div className="relative mt-2">
    <select
      name="size"
      className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 text-gray-700 shadow-md transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 hover:shadow-lg"
      value={selectedSize}
      onChange={(e) => setSelectedSize(e.target.value)}
      required
    >
      <option value="" disabled>Select Size</option>
      {data.sizes.map((size: string) => (
        <option key={size} value={size}>{size}</option>
      ))}
    </select>
    {/* Custom Dropdown Icon */}
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
      ▼
    </div>
  </div>
</div>


       {/* Available Colors */}
<div className="mt-4">
  <label className="text-lg font-semibold text-gray-800">Available Colors:</label>
  <div>
    <div className="flex flex-row gap-3 mt-2">
      {data.colors.map((color: string) => (
        <div
          key={color}
          className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-200 
                      ${selectedColor === color ? 'ring-4 ring-offset-2 ring-gray-600 scale-110 shadow-lg' : 'shadow-md hover:shadow-lg'}`}
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>

    {/* Dropdown for Accessibility */}
    <select
      name="color"
      className="mt-3 block w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 text-gray-700 shadow-md transition-all duration-200 
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 hover:shadow-lg"
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
      required
    >
      <option value="" disabled>Select Color</option>
      {data.colors.map((color: string) => (
        <option key={color} value={color}>{color}</option>
      ))}
    </select>
  </div>
</div>


        {/* Action Buttons */}
        <div className="mt-6 flex-col">
          
          <form onSubmit={(e) => { e.preventDefault(); addProductToWishlist(); }}>
            <WishlistButton />
          </form>
          <form onSubmit={(e) => { e.preventDefault(); addProductToShoppingCart(); }}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
    </div>
  );
}