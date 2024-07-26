import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Products } from "@/types";
import { toast } from "react-hot-toast";

interface CartStore {
  items: Products[];
  addItem: (data: Products) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQty: (id: string, qty: number) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Products) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);

        if (existingItems) {
          return toast("Item already in cart", { icon: "🛒" });
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart", { icon: "🛒" });
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart", { icon: "🗑️" });
      },

      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart", { icon: "🗑️" });
      },

      updateItemQty: (id: string, qty: number) => {
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, qty } : item
        );
        set({ items: updatedItems });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
