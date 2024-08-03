"use client";

import React, { useState } from "react";
import { Products } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye, Router } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface FeaturedContentProps {
  data: Products;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const cart = useCart();

  const addToCart = (data: Products) => {
    cart.addItem({ ...data, quantity: 1 });
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative aspect-square w-full h-64 sm:h-72 lg:h-80 cursor-pointer"
        onClick={() => router.push(`/menu/${data.id}`)}
      >
        <Image
          src={data.images[0].url}
          alt={data.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        <Button
          onClick={handleLikeToggle}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-pink-500 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? "fill-current" : "stroke-current"}`}
          />
        </Button>
      </div>

      <div className="p-4 sm:p-6">
        <Link href={`/menu/${data.id}`}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-pink-600 transition-colors duration-300">
            {data.name}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.flavor && (
            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {data.flavor}
            </span>
          )}
          {data.category && (
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {data.category}
            </span>
          )}
          {data.weight && (
            <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              {data.weight}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-bold text-pink-600">
            ₹{data.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(data)}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-6 py-2 flex items-center transition-colors duration-300"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </motion.button>
        </div>

        <Link href={`/menu/${data.id}`}>
          <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center">
            {/* <Eye className="w-5 h-5 mr-2" /> */}
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturedContent;
