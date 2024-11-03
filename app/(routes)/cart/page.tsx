import React from "react";
import Box from "@/components/Box";
import Container from "@/components/Container";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import CartContent from "./components/cart-content";
import { auth } from "@clerk/nextjs/server";

const CartPage = async () => {
  const { userId } = auth();

  return (
    <div className="">
      <Container className="bg-white py-12 my-4 h-full">
        <div className="w-full px-4 md:px-12 space-y-7 h-full">
          <Box className="text-neutral-700 text-sm items-center">
            <Link href={"/"} className="flex items-center gap-2">
              <Home className="size-4" />
              Main Page
            </Link>
            <ChevronRight className="size-5 text-muted-foreground" />
            <Link
              href={"/menu"}
              className="flex items-center gap-2 text-muted-foreground"
            > 
              Menu
            </Link>
            <ChevronRight className="size-5 text-muted-foreground" />
            <p className="flex items-center gap-2 text-muted-foreground">
              Cart
            </p>
          </Box>
          <CartContent userId={userId} />
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
