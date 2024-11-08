"use client";

import FeaturedContent from "@/components/featured-content";
import { Products } from "@/types";
import { useParams } from "next/navigation";
import React from "react";

export const revalidate = 0;

interface SuggestedProductsProps {
  products: Products[];
}

const SuggestedProducts = ({ products }: SuggestedProductsProps) => {
  const { productId } = useParams();
  return (
    <>
      <h2 className="text-3xl text-neutral-600 font-semibold">
        Related Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 md:gap-x-4 md:gap-y-10 my-6 py-12 pt-0">
        {products
          .filter((item) => item.id !== productId)
          .map((item) => (
            <FeaturedContent key={item.id} data={item} />
          ))}
      </div>
    </>
  );
};

export default SuggestedProducts;
