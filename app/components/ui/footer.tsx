import React from "react";
import SocialIcons from "./socialicons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgba(36,36,36,1)] flex w-full flex-col items-stretch pt-[210px] pb-[82px] px-[61px] max-md:max-w-full max-md:pt-[100px] max-md:px-5">
      <div className="border self-center w-[1240px] shrink-0 max-w-full h-px border-[rgba(0,0,0,0.1)] border-solid" />
      <div className="flex w-full items-stretch gap-[40px_100px] flex-wrap mt-5 max-md:max-w-full">
        <p className="text-white text-sm font-light text-right my-auto">
          Terrific © 2024-2025, All Rights Reserved
        </p>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;