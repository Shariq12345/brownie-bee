"use client";
import React from "react";
import { Orders } from "@/types";
import Box from "@/components/Box";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OrderItemProps {
  order: Orders;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Box className="bg-white shadow-lg rounded-lg p-6">
      <div className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-x-6 gap-y-8">
        {/* Product Images */}
        <div className="flex items-center gap-2 col-span-2 md:col-span-1">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square w-24 h-24 rounded-md relative overflow-hidden bg-gray-100 shadow-inner"
            >
              <Image
                src={item.images[0].url}
                alt="Product Image"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center col-span-2 md:col-span-2">
          <p className="text-lg font-semibold text-gray-900">
            {order.orderItems.map((item) => item.name).join(", ")}
          </p>
          <div className="flex space-x-4 mt-2">
            <p className="text-base text-gray-600">
              {order.orderItems
                .map((item) => `Qty: ${item.quantity}`)
                .join(", ")}
            </p>
            <p className="text-base text-gray-600">
              {order.orderItems.map((item) => `₹${item.price}`).join(", ")}
            </p>
          </div>
        </div>

        {/* Order Status */}
        <div className="flex items-center col-span-1 md:col-span-1 lg:col-span-1">
          <p
            className={cn(
              "text-base font-semibold py-2 px-4 rounded-full",
              order.order_status === "Delivering" &&
                "bg-yellow-100 text-yellow-600",
              order.order_status === "Processing" &&
                "bg-orange-100 text-orange-600",
              order.order_status === "Delivered" &&
                "bg-green-100 text-green-600",
              order.order_status === "Cancelled" && "bg-red-100 text-red-600"
            )}
          >
            {order.order_status}
          </p>
        </div>

        {/* Payment Status */}
        <div className="flex items-center col-span-1 md:col-span-1 lg:col-span-1">
          <p
            className={cn(
              "text-base font-semibold py-2 px-4 rounded-full",
              order.isPaid
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            )}
          >
            {order.isPaid ? "Paid" : "Not Paid"}
          </p>
        </div>
      </div>
    </Box>
  );
};

export default OrderItem;
