"use client";
import React from "react";
import { Products } from "@/types";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, HeartIcon, ShoppingCart } from "lucide-react";

export const revalidate = 0;

interface FeaturedContentProps {
  data: Products;
}

const FeaturedContent = ({ data }: FeaturedContentProps) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const IsLikedIcon = isLiked ? Heart : HeartIcon;

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Card className="w-full max-h-[340px] rounded-md bg-white shadow-lg border border-gray-200 flex flex-col items-center justify-center relative py-8 pt-20 md:pt-28">
      <div className="absolute -top-[4%] md:-top-[15%] overflow-hidden w-28 md:w-44 h-28 md:h-44 rounded-full bg-rose-100 flex items-center justify-center p-1 md:p-2 shadow-sm">
        <div className="w-full h-full bg-white rounded-full relative">
          <Image
            src={data.images[0].url}
            fill
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <Link href={`/menu/${data.id}`} className="w-full px-4 text-center mt-4">
        <CardTitle className="text-neutral-700 truncate w-full text-xl md:text-2xl font-semibold">
          {data.name}
        </CardTitle>
      </Link>

      <div className="w-full flex items-center justify-center gap-2 flex-wrap px-4 mt-4">
        {data.flavor && (
          <div className="rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-semibold capitalize text-emerald-700">
            {data.flavor}
          </div>
        )}
        {data.category && (
          <div className="rounded-md bg-rose-500/20 px-2 py-1 text-xs font-semibold capitalize text-rose-700">
            {data.category}
          </div>
        )}
        {data.weight && (
          <div className="rounded-md bg-yellow-500/20 px-2 py-1 text-xs font-semibold capitalize text-yellow-700">
            {data.weight}
          </div>
        )}
      </div>

      {/* <CardDescription className="text-center px-4 my-2 text-sm text-neutral-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus
        voluptatum atque iusto esse beatae explicabo ratione impedit repellat
        amet.
      </CardDescription> */}

      <div className="w-full flex items-center px-4 mt-4 gap-3">
        <Button
          variant={"outline"}
          className="rounded-full font-bold text-base text-yellow-700 border-yellow-700"
        >
          ₹{data.price}
        </Button>
        <Link href={`/menu/${data.id}`} className="w-full">
          <Button className="bg-rose-500 w-full rounded-full text-white hover:bg-rose-600">
            Buy Now
          </Button>
        </Link>
      </div>

      {/* ADD TO CART */}
      <Button
        onClick={() => {}}
        className="absolute top-0 right-0 text-white rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-none p-2 px-2 shadow-md"
      >
        <ShoppingCart className="w-5 h-5" />
      </Button>

      {/* ADD TO WISHLIST */}
      <Button
        className="absolute left-0 top-0 hover:bg-transparent"
        variant={"ghost"}
        onClick={handleLikeToggle}
      >
        <IsLikedIcon
          className="w-5 h-5"
          style={{ fill: isLiked ? "red" : "none", stroke: "red" }} // Adjust stroke color as needed
        />
      </Button>
    </Card>
  );
};

export default FeaturedContent;
