import React, { useState } from "react";
import { Products } from "@/types";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemProps {
  item: Products;
}

const CartItem = ({ item }: CartItemProps) => {
  const [qty, setQty] = useState(item.quantity ?? 1);
  const cart = useCart();

  const handleQuantity = (newQty: number) => {
    if (newQty > 0 && newQty <= 10) {
      setQty(newQty);
      cart.updateItemQty(item.id, newQty);
    }
  };

  return (
    <div className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-md border border-pink-100 mb-4 transition-all hover:shadow-lg">
      <div className="aspect-square w-28 h-28 rounded-lg bg-pink-50 flex items-center justify-center relative overflow-hidden">
        <Image
          src={item.images[0].url}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-grow">
        <h2 className="font-serif text-2xl text-pink-800 mb-2">{item.name}</h2>

        <div className="flex items-center gap-2 mb-3">
          {item.flavor && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
              {item.flavor}
            </span>
          )}
          {item.category && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              {item.category}
            </span>
          )}
          {item.weight && (
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
              {item.weight}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-pink-200 rounded-md">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleQuantity(qty - 1)}
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-3 font-medium text-pink-800">{qty}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleQuantity(qty + 1)}
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => cart.removeItem(item.id)}
        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CartItem;
