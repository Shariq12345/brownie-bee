"use client";

import React, { useState } from "react";
import { Products } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface FeaturedContentProps {
  data: Products;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const cart = useCart();

  const discountedPrice = data.discount
    ? data.price * (1 - data.discount / 100)
    : data.price;

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cart.addItem({ ...data, quantity: 1, price: discountedPrice });
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/menu/${data.id}`} className="block relative flex-grow">
        <div className="aspect-square relative">
          <Image
            src={data.images[0].url}
            alt={data.name}
            fill
            className="transition-transform duration-500 ease-out hover:scale-105 object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLikeToggle}
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm transition-all duration-300"
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isLiked ? "fill-pink-500 text-pink-500" : "text-gray-600"
              }`}
            />
          </motion.button>
          {data.discount > 0 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {data.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
            {data.name}
          </h3>
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
            {data.flavor && (
              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {data.flavor}
              </span>
            )}
            {data.weight && (
              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                {data.weight}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-pink-600 mr-1 sm:mr-2">
                ₹{discountedPrice.toFixed(2)}
              </span>
              {data.discount > 0 && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  ₹{data.price.toFixed(2)}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-1.5 sm:p-2 shadow-sm transition-colors duration-300"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </Link>
      <Button
        onClick={() => router.push(`/menu/${data.id}`)}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 sm:py-3 rounded-none transition-all duration-300 text-sm sm:text-base"
      >
        View Details
      </Button>
    </motion.div>
  );
};

export default FeaturedContent;
