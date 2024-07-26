"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { Trash2, ShoppingBag } from "lucide-react";
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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        products: cart.items,
        userId,
      }
    );

    window.location = response.data.url;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-bold text-pink-800">
          Your Cart
        </h1>
        {cart.items.length > 0 && (
          <Button
            onClick={cart.removeAll}
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Clear Cart
            <Trash2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
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
          <div className="lg:col-span-7">
            <ul role="list" className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <li key={item.id} className="py-6">
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <dl className="mt-6 space-y-4">
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
              <Separator />
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order Total
                </dt>
                <dd className="text-xl font-semibold text-pink-600">
                  ₹{totalPrice.toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Button
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                onClick={onCheckOut}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContent;
