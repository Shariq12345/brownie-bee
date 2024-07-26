"use client";

import React from "react";
import { Products } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface FeaturedContentProps {
  data: Products;
}

const FeaturedContent = ({ data }: FeaturedContentProps) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const cart = useCart();

  const addToCart = (data: Products) => {
    cart.addItem({ ...data, quantity: 1 });
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-square">
        <Image
          src={data.images[0].url}
          alt={data.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
        <Button
          onClick={handleLikeToggle}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-pink-500 rounded-full p-2"
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? "fill-current" : "stroke-current"}`}
          />
        </Button>
      </div>

      <div className="p-4">
        <Link href={`/menu/${data.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-pink-600 transition-colors duration-300">
            {data.name}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-2 mb-3">
          {data.flavor && (
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {data.flavor}
            </span>
          )}
          {data.category && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {data.category}
            </span>
          )}
          {data.weight && (
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              {data.weight}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-pink-600">
            ₹{data.price}
          </span>
          <Button
            onClick={() => addToCart(data)}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>

        <Link href={`/menu/${data.id}`}>
          <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedContent;
