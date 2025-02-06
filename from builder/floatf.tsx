import React from "react";

interface FloatingButtonProps {
  iconClass: string;
  onClick?: () => void; // Add an onClick handler
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ iconClass, onClick }) => {
  return (
    <button // Use a <button> element
      className="flex absolute -top-8 left-2/4 justify-center items-center h-16 bg-white shadow-sm -translate-x-2/4 rounded-[50px] w-[62px]"
      onClick={onClick} // Attach the onClick handler
      aria-label="Floating Button" // Add an aria-label for accessibility
    >
      <i className={iconClass + " text-3xl"} aria-hidden="true"></i>
    </button>
  );
};

export default FloatingButton;