"use client";

import React from "react";
import Box from "@/components/Box";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Check } from "lucide-react";

interface CategoryFiltersProps {
  categories: Category[];
}

const CategoryFilters = ({ categories }: CategoryFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (category: string) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    if (currentParams.category === category) {
      delete currentParams.category;
    } else {
      currentParams.category = category;
    }

    const href = qs.stringifyUrl({
      url: "/menu",
      query: currentParams,
    });

    router.push(href);
  };

  return (
    <Box className="flex flex-col gap-2 border-b pb-4">
      <h2 className="text-xl font-semibold text-neutral-700">Category</h2>
      <Box className="flex-col gap-2 mt-2">
        {categories.map((category) => (
          <div
            onClick={() => handleClick(category.name)}
            key={category.id}
            className={cn(
              "flex items-center gap-2 text-sm font-semibold text-neutral-500 cursor-pointer hover:text-rose-700",
              category.name === searchParams.get("category") && "text-rose-700"
            )}
          >
            <div className="w-4 h-4 border border-neutral-300 rounded flex items-center justify-center">
              {category.name === searchParams.get("category") && (
                <Check className="w-3 h-3 text-rose-700" />
              )}
            </div>
            <p>{category.name}</p>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryFilters;
