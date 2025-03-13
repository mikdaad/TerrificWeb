import { LoadingProductCard } from "@/app/components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TextShimmer } from "../components/storefront/loadingcomp";

export default function LoadingFile() {
  return (
    <div className="text-center   h-full mt-[60%] lg:mt-[20%]">
       
    <TextShimmer className='font-glancyr text-2xl' duration={1.5}>
      T&nbsp;E&nbsp;R&nbsp;R&nbsp;I&nbsp;F&nbsp;I&nbsp;C   
       </TextShimmer>
    </div>
  );
}
