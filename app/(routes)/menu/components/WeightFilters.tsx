"use client";

import React from "react";
import Box from "@/components/Box";
import { cn } from "@/lib/utils";
import { Weight } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Check } from "lucide-react";

interface WeightFiltersProps {
  weights: Weight[];
}

const WeightFilters = ({ weights }: WeightFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (weight: string) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    if (currentParams.weight === weight) {
      delete currentParams.weight;
    } else {
      currentParams.weight = weight;
    }

    const href = qs.stringifyUrl({
      url: "/menu",
      query: currentParams,
    });

    router.push(href);
  };

  return (
    <Box className="flex flex-col gap-2 border-b pb-4">
      <h2 className="text-xl font-semibold text-neutral-700">Weight</h2>
      <Box className="flex-col gap-2 mt-2">
        {weights.map((weight) => (
          <div
            onClick={() => handleClick(weight.name)}
            key={weight.id}
            className={cn(
              "flex items-center gap-2 text-sm font-semibold text-neutral-500 cursor-pointer hover:text-rose-700",
              weight.name === searchParams.get("weight") && "text-rose-700"
            )}
          >
            <div className="w-4 h-4 border border-neutral-300 rounded flex items-center justify-center">
              {weight.name === searchParams.get("weight") && (
                <Check className="w-3 h-3 text-rose-700" />
              )}
            </div>
            <p>{weight.value}</p>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default WeightFilters;
