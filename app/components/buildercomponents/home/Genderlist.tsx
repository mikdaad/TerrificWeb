import Image from "next/image";

interface CategoryItem {
  image: string;
  title: string;
}

interface CategoryListProps {
  categories: CategoryItem[];
  onCategorySelect: (category: string) => void;
}

export function Genderlist({ categories,onCategorySelect }: CategoryListProps ) {
  return (
    <div className="flex  overflow-x-auto  hide-scrollbar">
      {categories.map((category, index) => (
         <button key={category.title} onClick={() => onCategorySelect(category.title)}>
        <div
          key={index}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <Image
            src={category.image}
            alt={category.title}
            className="w-14 h-14 rounded-full"
            width={40} // Set width
      height={40}
            loading="lazy"
          />
          <span className="text-sm font-weight-200">{category.title}</span>
        </div>
        </button>
      ))}
    </div>
  );
}
