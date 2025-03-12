import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

// Fetch dynamic data from Prisma
type Banner = {
  id: string;
  title: string;
  imageString: string;
  pricing: string;
  pricingd: string;
};

async function getData(): Promise<Banner[]> {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3, // Fetch only three items for the carousel
  });

  return data;
}

export async function Hero() {
  const data = await getData();

  return (
    <div className="">
      <div className="relative">
      {/* Image Carousel */}
      <Carousel className="relative z-20">
        <CarouselContent className="flex ">
          {data.map((item: Banner, index: number) => (
            <CarouselItem
              key={item.id}
              className=" sm:basis-1/1 md:basis-1/2 lg:basis-1/6 flex flex-col items-center"
            >
              {/* Image Display */}
              <div className="relative w-[140px] h-[140px] lg:w-[150px] lg:h-[150px] z-10 left-96">
                
              {/* Product Image */}
                <div className="relative w-[140px] h-[140px] lg:w-[85px] lg:h-[85px] z-10">
                  <Image
                    alt="Product Image"
                    src={item.imageString}
                    fill
                    className="object-contain w-full h-full rounded-xl"
                  />
                </div>

                {/* Display Name & Pricing Only for the First Image */}
                {index === 0 && (
                  <div className="absolute top-10 right-1 w-full bg-white rounded-3xl shadow-lg mx-8 my-2 py-3 flex flex-col items-center">
                    <div className="flex-row">
                      <div className="h-5 w-5"> </div>
                    <div> 
                    <h1 className="text-md lg:text-lg font-semibold text-black">
                      {item.title}
                    </h1>

                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-black">
                        ₹{Number(item.pricingd)}
                      </p>
                      {item.pricing && (
                        <p className="text-sm text-red-500 line-through">
                          ₹{item.pricing}
                        </p>
                      )}
                    </div>
                    </div>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
      </Carousel>
    </div>
    <div className="absolute bottom-[9.38rem] right-2">
    <svg width="466" height="7" viewBox="0 0 466 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    
    <circle cx="2.93854" cy="2.93292" r="2.32144" transform="rotate(-18.2968 2.93854 2.93292)" fill="white"/>
    <circle cx="12.7265" cy="2.95648" r="2.32144" transform="rotate(-18.2968 12.7265 2.95648)" fill="white"/>
    <circle cx="22.5146" cy="2.98004" r="2.32144" transform="rotate(-18.2968 22.5146 2.98004)" fill="white"/>
    <circle cx="32.3026" cy="3.00372" r="2.32144" transform="rotate(-18.2968 32.3026 3.00372)" fill="white"/>
    <circle cx="42.0906" cy="3.02728" r="2.32144" transform="rotate(-18.2968 42.0906 3.02728)" fill="white"/>
    <circle cx="51.8786" cy="3.05084" r="2.32144" transform="rotate(-18.2968 51.8786 3.05084)" fill="#F2B8A2"/>
    <circle cx="61.6666" cy="3.0744" r="2.32144" transform="rotate(-18.2968 61.6666 3.0744)" fill="#F2B8A2"/>
    <circle cx="71.4546" cy="3.09796" r="2.32144" transform="rotate(-18.2968 71.4546 3.09796)" fill="white"/>
    <circle cx="81.2426" cy="3.12164" r="2.32144" transform="rotate(-18.2968 81.2426 3.12164)" fill="white"/>
    <circle cx="91.0306" cy="3.1452" r="2.32144" transform="rotate(-18.2968 91.0306 3.1452)" fill="white"/>
    <circle cx="100.819" cy="3.16888" r="2.32144" transform="rotate(-18.2968 100.819 3.16888)" fill="white"/>
    <circle cx="110.607" cy="3.19244" r="2.32144" transform="rotate(-18.2968 110.607 3.19244)" fill="white"/>
    <circle cx="120.395" cy="3.216" r="2.32144" transform="rotate(-18.2968 120.395 3.216)" fill="white"/>
    <circle cx="130.183" cy="3.23956" r="2.32144" transform="rotate(-18.2968 130.183 3.23956)" fill="white"/>
    <circle cx="139.971" cy="3.26312" r="2.32144" transform="rotate(-18.2968 139.971 3.26312)" fill="white"/>
    <circle cx="149.759" cy="3.2868" r="2.32144" transform="rotate(-18.2968 149.759 3.2868)" fill="white"/>
    <circle cx="159.547" cy="3.31036" r="2.32144" transform="rotate(-18.2968 159.547 3.31036)" fill="white"/>
    <circle cx="169.335" cy="3.33392" r="2.32144" transform="rotate(-18.2968 169.335 3.33392)" fill="#A2000D"/>
    <circle cx="179.123" cy="3.35748" r="2.32144" transform="rotate(-18.2968 179.123 3.35748)" fill="#A2000D"/>
    <circle cx="188.911" cy="3.38116" r="2.32144" transform="rotate(-18.2968 188.911 3.38116)" fill="#A2000D"/>
    <circle cx="198.699" cy="3.40472" r="2.32144" transform="rotate(-18.2968 198.699 3.40472)" fill="#A2000D"/>
    <circle cx="208.487" cy="3.42828" r="2.32144" transform="rotate(-18.2968 208.487 3.42828)" fill="#A2000D"/>
    <circle cx="218.275" cy="3.45196" r="2.32144" transform="rotate(-18.2968 218.275 3.45196)" fill="#A2000D"/>
    <circle cx="228.063" cy="3.47552" r="2.32144" transform="rotate(-18.2968 228.063 3.47552)" fill="white"/>
    <circle cx="237.851" cy="3.49908" r="2.32144" transform="rotate(-18.2968 237.851 3.49908)" fill="white"/>
    <circle cx="247.639" cy="3.52276" r="2.32144" transform="rotate(-18.2968 247.639 3.52276)" fill="white"/>
    <circle cx="257.427" cy="3.54632" r="2.32144" transform="rotate(-18.2968 257.427 3.54632)" fill="white"/>
    <circle cx="267.215" cy="3.56988" r="2.32144" transform="rotate(-18.2968 267.215 3.56988)" fill="white"/>

    <circle cx="277.0" cy="3.6" r="2.32144" transform="rotate(-18.2968 277.0 3.6)" fill="white"/>
<circle cx="286.8" cy="3.63" r="2.32144" transform="rotate(-18.2968 286.8 3.63)" fill="white"/>
<circle cx="296.6" cy="3.66" r="2.32144" transform="rotate(-18.2968 296.6 3.66)" fill="white"/>


    
    <circle cx="306.367" cy="3.66424" r="2.32144" transform="rotate(-18.2968 306.367 3.66424)" fill="white"/>
    <circle cx="316.155" cy="3.68793" r="2.32144" transform="rotate(-18.2968 316.155 3.68793)" fill="white"/>
    <circle cx="325.943" cy="3.71149" r="2.32144" transform="rotate(-18.2968 325.943 3.71149)" fill="#EFAFBC"/>
    <circle cx="335.731" cy="3.73504" r="2.32144" transform="rotate(-18.2968 335.731 3.73504)" fill="#EFAFBC"/>
    <circle cx="345.519" cy="3.7586" r="2.32144" transform="rotate(-18.2968 345.519 3.7586)" fill="#EFAFBC"/>
    <circle cx="355.307" cy="3.78229" r="2.32144" transform="rotate(-18.2968 355.307 3.78229)" fill="#EFAFBC"/>
    <circle cx="365.095" cy="3.80585" r="2.32144" transform="rotate(-18.2968 365.095 3.80585)" fill="white"/>
    <circle cx="374.883" cy="3.82941" r="2.32144" transform="rotate(-18.2968 374.883 3.82941)" fill="white"/>
    <circle cx="384.671" cy="3.85309" r="2.32144" transform="rotate(-18.2968 384.671 3.85309)" fill="white"/>
    <circle cx="394.459" cy="3.87665" r="2.32144" transform="rotate(-18.2968 394.459 3.87665)" fill="white"/>

    </svg>
    
    </div>
     </div>

  );
}



{/*



*/}