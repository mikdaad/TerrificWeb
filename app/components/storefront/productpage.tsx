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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start px-5 lg:gap-x-24 py-6">
      {/* Image Slider */}
      <ImageSlider images={data.images} />

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{data.name}</h1>
        <p className="text-3xl mt-2 text-gray-900">₹{data.originalprice}</p>
        
        {/* Star Rating */}
        <div className="mt-3 flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        
        <p className="text-base text-gray-700 mt-6">{data.description}</p>

        {/* Available Sizes */}
        <div className="mt-4">
          <label className="text-lg font-medium">Available Sizes:</label>
          <select
            name="size"
            className="mt-2 block w-full border p-2 rounded"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            required
          >
            <option value="" disabled>Select Size</option>
            {data.sizes.map((size: string) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Available Colors */}
        <div className="mt-4">
          <label className="text-lg font-medium">Available Colors:</label>
          <div >
            <div className="flex flex-row gap-2 mt-2">
            {data.colors.map((color: string) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-gray-700' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
            </div>
            <select
          name="color"
          className="mt-2 block w-full border p-2 rounded"
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
        <div className="mt-6 flex gap-4">
          <form onSubmit={(e) => { e.preventDefault(); addProductToShoppingCart(); }}>
            <ShoppingBagButton />
          </form>
          <form onSubmit={(e) => { e.preventDefault(); addProductToWishlist(); }}>
            <WishlistButton />
          </form>
        </div>
      </div>
    </div>
  );
}