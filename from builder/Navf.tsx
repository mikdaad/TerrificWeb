import React from "react";
import Link from 'next/link'; // Import Link if you're using Next.js routing

interface NavbarItemProps {
  label: string;
  iconClass: string;
  href?: string; // Optional: Add href for Next.js routing
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, iconClass, href }) => {
  const content = (
    <div className="flex flex-col gap-1 items-center text-xs text-black">
      <i className={iconClass + " text-2xl"} aria-hidden="true"></i>
      <span>{label}</span>
    </div>
  );

  return href? ( // Conditionally render Link or div
    <Link href={href} legacyBehavior>
      <a role="button">{content}</a> {/* role="button" is needed for <a> with Link */}
    </Link>
  ): (
    <div role="button">{content}</div> // Still need role="button" for div
  );
};


const Navbar: React.FC = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 px-5 py-4 mx-auto my-0 bg-white shadow-sm max-w-[375px]">
      <div className="flex absolute -top-8 left-2/4 justify-center items-center h-16 bg-white shadow-sm -translate-x-2/4 rounded-[50px] w-[62px]" role="button">
        <i className="ti ti-shopping-cart text-3xl"></i>
      </div>
      <div className="flex justify-between items-center">
        <NavbarItem label="Home" iconClass="ti ti-home" href="/" /> {/* Example href */}
        <NavbarItem label="Wishlist" iconClass="ti ti-heart" href="/wishlist" /> {/* Example href */}
        <NavbarItem label="Search" iconClass="ti ti-search" href="/search" /> {/* Example href */}
        <NavbarItem label="Setting" iconClass="ti ti-settings" href="/settings" /> {/* Example href */}
      </div>
    </nav>
  );
};

export default Navbar;