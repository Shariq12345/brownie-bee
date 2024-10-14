"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import {
  Trash2,
  ShoppingBag,
  Pencil,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import CartItem from "./cart-item";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

interface CartContentProps {
  userId: string | null;
}

const CartContent = ({ userId }: CartContentProps) => {
  const cart = useCart();
  const searchParams = useSearchParams();
  const [cakeMessage, setCakeMessage] = useState("");
  const [note, setOrderNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMessageArea, setShowMessageArea] = useState(false);
  const [showNoteArea, setShowNoteArea] = useState(false);

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price * item.quantity);
  }, 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment Successful");
      cart.removeAll();
    }

    if (searchParams.get("cancelled")) {
      toast.error("Something went wrong. Please try again");
    }
  }, [searchParams, cart.removeAll]);

  const onCheckOut = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          products: cart.items,
          userId,
          cakeMessage,
          note,
        }
      );
      console.log("Checkout response:", response);
      window.location = response.data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMessageArea = () => setShowMessageArea(!showMessageArea);
  const toggleNoteArea = () => setShowNoteArea(!showNoteArea);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-pink-800 mb-4 sm:mb-0">
          Your Cart
        </h1>
        {cart.items.length > 0 && (
          <Button
            onClick={cart.removeAll}
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50 w-full sm:w-auto"
          >
            Clear Cart
            <Trash2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {cart.items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Start adding some delicious treats!
          </p>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7 mb-8 lg:mb-0">
            <ul
              role="list"
              className="divide-y divide-gray-200 bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {cart.items.map((item) => (
                <li key={item.id} className="p-4 sm:p-6">
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg bg-white shadow-sm px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <dl className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <dt className="text-sm text-gray-600">
                      {item.name} (x{item.quantity})
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </dd>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex items-center justify-between pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order Total
                  </dt>
                  <dd className="text-xl font-semibold text-pink-600">
                    ₹{totalPrice.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 space-y-4">
                <div className="bg-pink-50 rounded-lg transition-all duration-300 hover:shadow-md">
                  <button
                    onClick={toggleMessageArea}
                    className="w-full p-4 text-left focus:outline-none"
                  >
                    <h2 className="text-lg font-medium text-pink-800 flex items-center justify-between">
                      <span className="flex items-center">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Add a Message
                      </span>
                      {showMessageArea ? (
                        <ChevronUp className="w-5 h-5 text-pink-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-pink-600" />
                      )}
                    </h2>
                  </button>
                  {showMessageArea && (
                    <div className="p-4 pt-0">
                      <textarea
                        className="w-full p-3 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 placeholder-pink-300 text-pink-800 resize-none"
                        placeholder="Enter a sweet message for the cake..."
                        value={cakeMessage}
                        onChange={(e) => setCakeMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 rounded-lg transition-all duration-300 hover:shadow-md">
                  <button
                    onClick={toggleNoteArea}
                    className="w-full p-4 text-left focus:outline-none"
                  >
                    <h2 className="text-lg font-medium text-blue-800 flex items-center justify-between">
                      <span className="flex items-center">
                        <Pencil className="w-5 h-5 mr-2" />
                        Add a Note
                      </span>
                      {showNoteArea ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      )}
                    </h2>
                  </button>
                  {showNoteArea && (
                    <div className="p-4 pt-0">
                      <textarea
                        className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 placeholder-blue-300 text-blue-800 resize-none"
                        placeholder="Any special instructions for your order?"
                        value={note}
                        onChange={(e) => setOrderNote(e.target.value)}
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 text-lg"
                  onClick={onCheckOut}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContent;
