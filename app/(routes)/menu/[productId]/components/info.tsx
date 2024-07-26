"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Products } from "@/types";
import { ShoppingCart } from "lucide-react";
import React from "react";

interface InfoProps {
  product: Products;
}

const Info = ({ product }: InfoProps) => {
  const [qty, setQty] = React.useState(1);
  const cart = useCart();

  const handleQty = (num: number) => {
    setQty(num);
    cart.updateItemQty(product.id, num);
  };

  const addToCart = (data: Products) => {
    cart.addItem({ ...data, quantity: qty });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-rose-700">{product.name}</h1>
      <div className="mt-4">
        <p className="text-base text-left text-neutral-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ex
          quisquam officia provident eos dicta obcaecati eum voluptatem
          aspernatur quos nulla porro eaque nesciunt, corrupti perspiciatis
          nostrum molestiae ducimus non?
        </p>
      </div>
      <div className="w-full flex items-center justify-start gap-3 flex-wrap mt-8">
        {product.flavor && (
          <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-600">
            {product.flavor}
          </div>
        )}
        {product.weight && (
          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            {product.weight}
          </div>
        )}
        {product.category && (
          <div className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-600">
            {product.category}
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-4 my-12">
        <div className="col-span-1 space-y-8">
          <p className="text-lg font-semibold text-neutral-700">Price</p>
          <p className="text-lg font-semibold text-neutral-700">Quantity</p>
        </div>
        <div className="col-span-3 space-y-8">
          <p className="text-xl font-bold text-black">&#8377;{product.price}</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={cn(
                  "w-8 h-8 cursor-pointer rounded-full flex items-center justify-center border border-rose-700",
                  qty === num
                    ? "bg-rose-700 shadow-md text-white"
                    : "bg-transparent shadow-none"
                )}
                onClick={() => handleQty(num)}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={() => addToCart(product)}
        className="w-full flex items-center justify-center text-xl font-semibold gap-3 py-4 bg-rose-700 text-white hover:bg-rose-600"
      >
        <ShoppingCart className="w-6 h-6" />
        Add to cart
      </Button>
    </div>
  );
};

export default Info;
