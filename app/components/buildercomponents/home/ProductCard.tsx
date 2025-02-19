import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


interface ProductCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    originalprice: number;
    discountprice: number;
    images: string[];
    stars: number;
    reviews: number;
  };
  className?: string;
}

export function ProductCard({ item, className }: ProductCardProps) {
  const discount = ((item.originalprice - item.discountprice) / item.originalprice) * 100;
  
  return (
    <Link href={`/product/${item.id}`}>
    <div className={cn("flex flex-col  p-2 rounded-lg bg-white", className)}>
      
  <Carousel className="">
    <CarouselContent>
      {item.images.map((image, index) => (
        <CarouselItem key={index}>
          <div className="relative ">
            <div className=" min-w-[200px] min-h-[200px] md:min-w-[400px] md:min-h-[400px] lg:min-w-[400px] lg:min-h-[400px] aspect-square">
              <Image
                src={image}
                alt={item.name}
                className="  rounded-lg"
                layout="fill"
                loading="lazy"
              />
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>

  <h3 className="font-weight-600 text-lg mt-0">{item.name}</h3>
  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

  <div className="flex items-center gap-2 mt-0">
    <span className="text-lg  ">₹{item.discountprice}</span>
    <span className="text-sm text-gray-500 line-through">₹{item.originalprice}</span>
    <span className="text-sm text-green-600">{discount.toFixed(0)}% OFF</span>
  </div>

  <div className="flex items-center gap-0 mt-0">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < item.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
    <span className="text-sm text-gray-600">({item.reviews})</span>
  </div>

  
</div>
</Link>

  );
}



