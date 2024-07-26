"use client";

import React from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const CartButton = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const cart = useCart();
  const router = useRouter();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="ml-4 flex items-center justify-center gap-x-4">
      <Button
        className="rounded-full w-[60px] h-[35px]"
        size={"icon"}
        onClick={() => router.push("/cart")}
      >
        <ShoppingBag className="size-4 texxt-white" />
        <span className="text-sm font-medium text-white ml-2">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default CartButton;
