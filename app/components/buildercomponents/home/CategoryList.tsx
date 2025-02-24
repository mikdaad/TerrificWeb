import Image from "next/image";

interface CategoryItem {
  image: string;
  title: string;
}

interface CategoryListProps {
  categories: CategoryItem[];
  onCategorySelect: (category: string) => void;
}

export function CategoryList({ categories,onCategorySelect }: CategoryListProps ) {
  return (
    <div className="flex  overflow-x-auto  hide-scrollbar">
      {categories.map((category, index) => (
         <button key={category.title} onClick={() => onCategorySelect(category.title)}>
        <div
          key={index}
          className="flex flex-col items-center m-1.5  gap-2 min-w-[40px]"
        >
          <Image
            src={category.image}
            alt={category.title}
            className="w-12 h-12 rounded-full"
            width={40} // Set width
      height={40}
            loading="lazy"
          />
          <span className="text-xs  font-thin">{category.title}</span>
        </div>
        </button>
      ))}
    </div>
  );
}
