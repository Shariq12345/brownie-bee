"use client";

import React from "react";
import { Products } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import Box from "@/components/Box";
import Link from "next/link";
import { ChevronRight, Home, X } from "lucide-react";
import FeaturedContent from "@/components/featured-content";

interface PageContentProps {
  products: Products[];
}

const PageContent = ({ products }: PageContentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentParams = Object.fromEntries(searchParams.entries());

  const handleClick = (param: string) => {
    if (currentParams.hasOwnProperty(param)) {
      const newParams = { ...currentParams };
      delete newParams[param];
      const href = qs.stringifyUrl({
        url: "/menu",
        query: newParams,
      });
      router.push(href);
    }
  };
  return (
    <>
      <Box className="pt-4 pb-24 flex-col items-start">
        <Box className="text-neutral-700 text-sm text-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Home className="size-4" />
            Main Page
          </Link>
          <ChevronRight className="size-5 text-muted-foreground" />
          <Link href={"/menu"} className="flex items-center gap-2">
            Products
          </Link>

          {searchParams.get("category") && (
            <>
              <ChevronRight className="size-5 text-muted-foreground" />
              <Link href={"/menu"} className="flex items-center gap-2">
                {searchParams.get("category")}
              </Link>
            </>
          )}
        </Box>

        <Box className="mt-8 flex-col items-start">
          {searchParams.get("category") && (
            <h2 className="flex items-center gap-2 text-3xl font-semibold text-neutral-600">
              {searchParams.get("category")}
            </h2>
          )}

          <Box className="gap-3 my-4">
            {currentParams &&
              Object.entries(currentParams).map(([key, value]) => (
                <div
                  key={key}
                  onClick={() => handleClick(key)}
                  className="px-4 py-1 cursor-pointer hover:shadow-md rounded-md bg-rose-500/10 text-neutral-600 items-center gap-1 flex transition-all"
                >
                  {value}
                  <X className="size-4" />
                </div>
              ))}
          </Box>
        </Box>
      </Box>

      <div className="grid grid-cols-2 lg:grid-cols-3 w-full h-full gap-4 gap-y-24">
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <FeaturedContent key={product.id} data={product} />
            ))}
          </>
        ) : (
          <>
            <Box className=" col-span-10 items-center justify-center py-12 text-muted-foreground text-xl font-bold">
              No products found
            </Box>
          </>
        )}
      </div>
    </>
  );
};

export default PageContent;
