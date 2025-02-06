import React from "react";
import Link from 'next/link'; // If you want the button to link somewhere

interface BannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink?: string; // Optional: URL for the button
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <div className="overflow-hidden relative mx-5 my-8 rounded-xl h-[189px] max-sm:mx-2.5 max-sm:my-4">
      <div className="relative px-9 py-10 text-white">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        {subtitle && <p className="mb-1 text-xs">{subtitle}</p>}
        <p className="mb-1 text-xs">All colours</p>

        {buttonLink ? ( // Conditionally render Link or regular button
          <Link href={buttonLink} legacyBehavior> {/* Use legacyBehavior if needed */}
            <a className="flex gap-1 items-center p-2 mt-3 text-xs font-semibold text-white rounded-md border border-white border-solid">
              <span>{buttonText}</span>
              <i className="ti ti-arrow-right" aria-hidden="true"></i>
            </a>
          </Link>
        ) : (
          <button className="flex gap-1 items-center p-2 mt-3 text-xs font-semibold text-white rounded-md border border-white border-solid">
            <span>{buttonText}</span>
            <i className="ti ti-arrow-right" aria-hidden="true"></i>
          </button>
        )}


      </div>
    </div>
  );
};

export default Banner;