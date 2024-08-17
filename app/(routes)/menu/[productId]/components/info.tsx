"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Products } from "@/types";
import {
  ShoppingCart,
  Heart,
  Cake,
  Weight,
  Tag,
  Info as InfoIcon,
  AlertTriangle,
  Leaf,
  MapPin,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface InfoProps {
  product: Products;
}

const Info: React.FC<InfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [pincode, setPincode] = useState("");
  const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);
  const cart = useCart();
  const router = useRouter();

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  useEffect(() => {
    setTotalPrice(discountedPrice * quantity);
  }, [quantity, discountedPrice]);

  const handleQuantity = (num: number) => {
    setQuantity(num);
    cart.updateItemQuantity(product.id, num);
  };

  const addToCart = (data: Products) => {
    cart.addItem({ ...data, quantity: quantity, price: discountedPrice });
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/cart");
  };

  // Mock function to check pincode validity
  const checkPincode = (code: string) => {
    // This is a mock implementation. Replace with actual API call or logic.
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Example: consider codes between 100000 and 600000 as valid
        resolve(parseInt(code) >= 400070 && parseInt(code) <= 600000);
      }, 500);
    });
  };

  const handlePincodeCheck = async () => {
    if (pincode.length === 6) {
      const isValid = await checkPincode(pincode);
      setPincodeValid(isValid);
    }
  };

  useEffect(() => {
    if (pincode.length === 6) {
      handlePincodeCheck();
    } else {
      setPincodeValid(null);
    }
  }, [pincode]);

  const tabContent = {
    description: product.description,
    "Product Info": (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Flavor:</span> {product.flavor}
        </p>
        <p>
          <span className="font-semibold">Weight:</span> {product.weight}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {product.category}
        </p>
      </div>
    ),
    "More Info": (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-rose-700">
            Product Details
          </h3>
          <p>
            <span className="font-semibold">Ingredients:</span> Fresh cream,
            sugar, flour, etc.
          </p>
          <p>
            <span className="font-semibold">Allergens:</span> May contain nuts,
            dairy, and gluten
          </p>
          <p>
            <span className="font-semibold">Storage:</span> Keep refrigerated at
            10°C or below
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
          <h3 className="font-semibold text-lg text-amber-800 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Important Notes
          </h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-amber-900">
            <li>Delivered product might vary slightly from the image shown.</li>
            <li>
              This product is perishable therefore delivery will be attempted
              only once.
            </li>
            <li>The delivery cannot be redirected to any other address.</li>
          </ul>
        </div>
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="mr-3 bg-green-100 rounded-full p-1.5 mt-2"
            title="Vegetarian"
          >
            <Image
              width={25}
              height={10}
              src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
              alt="Veg"
            />
          </motion.div>
          <h1 className="text-4xl font-bold text-rose-700">{product.name}</h1>
        </div>
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

      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          {["description", "Product Info", "More Info"].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300",
                activeTab === tab
                  ? "bg-rose-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-md p-4 min-h-[100px]"
          >
            {tabContent[activeTab as keyof typeof tabContent]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* <div className="flex flex-wrap gap-3 mb-8">
        {product.flavor && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center rounded-md bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm"
          >
            <Cake className="w-4 h-4 mr-2 text-orange-500" />
            {product.flavor}
          </motion.div>
        )}
        {product.weight && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center rounded-md bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm"
          >
            <Weight className="w-4 h-4 mr-2 text-rose-500" />
            {product.weight}
          </motion.div>
        )}
        {product.category && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center rounded-md bg-gradient-to-r from-teal-100 to-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm"
          >
            <Tag className="w-4 h-4 mr-2 text-emerald-500" />
            {product.category}
          </motion.div>
        )}
      </div> */}

      <div className="bg-rose-50 rounded-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Price</span>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-rose-600">
                ₹{totalPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-sm font-medium text-green-600">
                  ({product.discount}% off)
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ₹{(product.price * quantity).toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Quantity</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
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

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Check Delivery Availability
        </h2>
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter your pincode"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePincodeCheck}
            className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors duration-300"
          >
            Check
          </motion.button> */}
        </div>
        <AnimatePresence>
          {pincodeValid !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "mt-2 p-2 rounded-md flex items-center",
                pincodeValid
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              )}
            >
              {pincodeValid ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Delivery available in your area!
                </>
              ) : (
                <>
                  <X className="w-5 h-5 mr-2" />
                  Sorry, we don't deliver to this pincode yet.
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center text-lg font-bold gap-3 py-4 bg-white text-black rounded-md transition-colors duration-300 border border-gray-500"
        >
          <ShoppingCart className="w-6 h-6" />
          Add to cart
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyNow}
          className="w-full flex items-center justify-center text-lg font-bold gap-3 py-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-md transition-all duration-300 hover:from-pink-500 hover:to-rose-600 shadow-lg hover:shadow-xl"
        >
          <Cake className="w-6 h-6" />
          Buy Now
        </motion.button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Free delivery on orders over ₹1000
      </p>
    </motion.div>
  );
};

export default Info;
