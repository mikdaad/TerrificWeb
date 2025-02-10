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
import { Button } from "@/components/ui/button";

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
    <div className={cn("flex flex-col gap-2 p-4 rounded-lg bg-white", className)}>
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[250px] w-full">
                <Image
                  src={image}
                  alt={item.name}
                  fill
                  className="object-cover object-center w-full h-full rounded-lg"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
      
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg font-bold">${item.discountprice}</span>
        <span className="text-sm text-gray-500 line-through">${item.originalprice}</span>
        <span className="text-sm text-green-600">{discount.toFixed(0)}% OFF</span>
      </div>
      
      <div className="flex items-center gap-2 mt-1">
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

      <Button asChild className="w-full mt-3">
        <Link href={`/product/${item.id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}
