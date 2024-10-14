import React, { useState } from "react";
import { Products } from "@/types";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Assuming you're using a dialog component from a library

interface CartItemProps {
  item: Products;
}

const CartItem = ({ item }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity ?? 1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cart = useCart();

  const handleQuantity = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 3) {
      // Allow quantity updates only between 1 and 3
      setQuantity(newQuantity);
      cart.updateItemQuantity(item.id, newQuantity);
    } else if (newQuantity > 3) {
      // If the user tries to increase beyond 3, show the dialog
      setIsDialogOpen(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-pink-100 mb-4 transition-all hover:shadow-lg">
        <div className="aspect-square w-full sm:w-28 h-40 sm:h-28 rounded-lg bg-pink-50 flex items-center justify-center relative overflow-hidden">
          <Image
            src={item.images[0].url}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-grow w-full sm:w-auto">
          <h2 className="font-serif text-xl sm:text-2xl text-pink-800 mb-2">
            {item.name}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-3">
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
                onClick={() => handleQuantity(quantity - 1)}
                className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 font-medium text-pink-800">{quantity}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleQuantity(quantity + 1)}
                className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => cart.removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 ml-2 sm:ml-0"
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog for quantities greater than 3 */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact the Store</DialogTitle>
              <DialogDescription>
                If you wish to order more than 3 items, please contact the store
                for further assistance.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CartItem;
