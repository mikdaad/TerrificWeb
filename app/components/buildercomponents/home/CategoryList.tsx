import Image from "next/image";

interface CategoryItem {
  image: string;
  title: string;
}

interface CategoryListProps {
  categories: CategoryItem[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 min-w-[80px]"
        >
          <Image
            src={category.image}
            alt={category.title}
            className="w-14 h-14 rounded-full"
            width={40} // Set width
      height={40} // Set height
            loading="lazy"
          />
          <span className="text-sm font-medium">{category.title}</span>
        </div>
      ))}
    </div>
  );
}
