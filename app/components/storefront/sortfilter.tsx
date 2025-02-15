import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter } from "lucide-react";

// Define prop types
interface SortFilterProps {
  onSortSelect: (sortOption: string) => void;
  onFilterSelect: (filterOption: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ onSortSelect, onFilterSelect }) => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const handleSortSelect = (sortOption: string) => {
    setSelectedSort(sortOption);
    onSortSelect(sortOption);
  };

  const handleFilterSelect = (filterOption: string) => {
    setSelectedFilter(filterOption);
    onFilterSelect(filterOption);
  };

  return (
    <div className="flex gap-1">
  {/* Sort Button with Popover */}
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="icon" className="p-2">
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-32 text-sm">
      <div className="flex flex-col">
        <button
          onClick={() => handleSortSelect("asc")}
          className={`p-1 hover:bg-gray-100 ${
            selectedSort === "price-asc" ? "bg-gray-200" : ""
          }`}
        >
          Low to High
        </button>
        <button
          onClick={() => handleSortSelect("desc")}
          className={`p-1 hover:bg-gray-100 ${
            selectedSort === "price-desc" ? "bg-gray-200" : ""
          }`}
        >
          High to Low
        </button>
      </div>
    </PopoverContent>
  </Popover>

  {/* Filter Button with Popover */}
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="icon" className="p-2">
        <Filter className="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-32 text-sm">
      <div className="flex flex-col">
        {["Men", "Women", "Kids", "Unisex"].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => handleFilterSelect(filterOption)}
            className={`p-1 hover:bg-gray-100 ${
              selectedFilter === filterOption ? "bg-gray-200" : ""
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>
    </PopoverContent>
  </Popover>
</div>

  );
};

export default SortFilter;
