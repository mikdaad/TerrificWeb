import Image from 'next/image';

interface CategoryItemProps {
  image: string;
  altText: string;
  label: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ image, altText, label }) => {
  return (
    <div className="flex flex-col gap-1 items-center min-w-[56px]">
      <Image 
        src={image} 
        alt={altText} 
        width={56} // 14 * 4 (assuming tailwind's default spacing scale)
        height={56} // 14 * 4
        className="rounded-full" 
      />
      <span className="text-xs text-indigo-950">{label}</span>
    </div>
  );
};

export default CategoryItem;