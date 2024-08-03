"use client";

import React from "react";
import Box from "@/components/Box";
import { cn } from "@/lib/utils";
import { Flavor } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Check } from "lucide-react";

interface FlavorFiltersProps {
  flavors: Flavor[];
}

const FlavorFilters = ({ flavors }: FlavorFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (flavor: string) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    if (currentParams.flavor === flavor) {
      delete currentParams.flavor;
    } else {
      currentParams.flavor = flavor;
    }

    const href = qs.stringifyUrl({
      url: "/menu",
      query: currentParams,
    });

    router.push(href);
  };

  return (
    <Box className="flex flex-col gap-2 border-b pb-4">
      <h2 className="text-xl font-semibold text-neutral-700">Flavor</h2>
      <Box className="flex-col gap-2 mt-2">
        {flavors.map((flavor) => (
          <div
            onClick={() => handleClick(flavor.name)}
            key={flavor.id}
            className={cn(
              "flex items-center gap-2 text-sm font-semibold text-neutral-500 cursor-pointer hover:text-rose-700",
              flavor.name === searchParams.get("flavor") && "text-rose-700"
            )}
          >
            <div className="w-4 h-4 border border-neutral-300 rounded flex items-center justify-center">
              {flavor.name === searchParams.get("flavor") && (
                <Check className="w-3 h-3 text-rose-700" />
              )}
            </div>
            <p>{flavor.name}</p>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default FlavorFilters;
