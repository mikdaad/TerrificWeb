import React from "react";
import Image from 'next/image'; // Import the Next.js Image component

interface ProductCardProps {
  image: string;
  altText: string;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, altText, name, description, price, originalPrice, discount, rating, reviews }) => {
  return (
    <div className="p-0.5 bg-white rounded-md w-[170px] max-sm:w-[150px]">
      <Image // Use the Next.js Image component
        src={image}
        alt={altText}
        width={170} // Provide width and height (adjust if needed)
        height={124}
        className="object-cover rounded"
      />
      <h3 className="px-1 py-0 mx-0 mt-2 mb-1 text-xs">{name}</h3>
      <p className="px-1 py-0 mb-2 text-xs text-black">{description}</p>
      <div className="px-1 py-0 mb-2">
        <div className="text-xs">{price}</div>
        <div className="text-xs line-through text-zinc-400">{originalPrice}</div>
        <div className="text-xs text-red-400">{discount}</div>
      </div>
      <div className="flex gap-1 items-center px-1 py-0 text-xs text-gray-400">
        <div className="flex gap-0.5 text-yellow-500">
          <i className="ti ti-star-filled" aria-hidden="true"></i>
          <i className="ti ti-star-filled" aria-hidden="true"></i>
          <i className="ti ti-star-filled" aria-hidden="true"></i>
          <i className="ti ti-star-filled" aria-hidden="true"></i>
          <i className={rating >= 4.5 ? "ti ti-star-half-filled" : "ti ti-star-filled"} aria-hidden="true"></i>
        </div>
        <span>{reviews}</span>
      </div>
    </div>
  );
};

export default ProductCard;