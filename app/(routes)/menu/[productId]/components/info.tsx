"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Products } from "@/types";
import { ShoppingCart, Heart, Cake, Weight, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoProps {
  product: Products;
}

const Info: React.FC<InfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [isLiked, setIsLiked] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  const handleQuantity = (num: number) => {
    setQuantity(num);
    cart.updateItemQuantity(product.id, num);
  };

  const addToCart = (data: Products) => {
    cart.addItem({ ...data, quantity: quantity });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold text-rose-700">{product.name}</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            "p-2 rounded-full transition-colors duration-300",
            isLiked ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-400"
          )}
        >
          <Heart className={cn("w-6 h-6", isLiked && "fill-current")} />
        </motion.button>
      </div>

      <p className="text-base text-gray-600 mb-8">{product.description}</p>

      <div className="flex flex-wrap gap-4 mb-8">
        {product.flavor && (
          <div className="flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-600">
            <Cake className="w-4 h-4 mr-2" />
            {product.flavor}
          </div>
        )}
        {product.weight && (
          <div className="flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            <Weight className="w-4 h-4 mr-2" />
            {product.weight}
          </div>
        )}
        {product.category && (
          <div className="flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-600">
            <Tag className="w-4 h-4 mr-2" />
            {product.category}
          </div>
        )}
      </div>

      <div className="bg-rose-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Price</span>
          <div>
            <span className="text-3xl font-bold text-rose-600">
              ₹{totalPrice}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              (₹{product.price} per item)
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Quantity</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.div
                key={num}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  quantity === num
                    ? "bg-rose-600 border-rose-600 text-white font-bold"
                    : "bg-white border-gray-300 text-gray-600 hover:border-rose-400"
                )}
                onClick={() => handleQuantity(num)}
              >
                {num}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => addToCart(product)}
        className="w-full flex items-center justify-center text-lg font-bold gap-3 py-4 bg-rose-600 text-white rounded-xl transition-colors duration-300 hover:bg-rose-700"
      >
        <ShoppingCart className="w-6 h-6" />
        Add to cart
      </motion.button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Free delivery on orders over ₹1000 • 30-day return policy
      </p>
    </motion.div>
  );
};

export default Info;
