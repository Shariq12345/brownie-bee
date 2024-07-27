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
    <Box className="bg-white shadow-md rounded-lg p-4">
      <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-6">
        {/* Product Images */}
        <div className="flex items-center gap-2">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square w-16 h-16 rounded-md relative overflow-hidden bg-gray-200"
            >
              <Image
                src={item.images[0].url}
                alt="Product Image"
                fill
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Product Names */}
        <div className="flex items-center">
          <p className="text-lg font-semibold text-gray-700">
            {order.orderItems.map((item) => item.name).join(", ")}
          </p>
        </div>

        {/* Quantities */}
        <div className="flex items-center">
          <p className="text-base font-semibold text-gray-700">
            {order.orderItems.map((item) => `Qty: ${item.quantity}`).join(", ")}
          </p>
        </div>

        {/* Prices */}
        <div className="flex items-center">
          <p className="text-base font-semibold text-gray-700">
            {order.orderItems.map((item) => `₹${item.price}`).join(", ")}
          </p>
        </div>

        {/* Order Status */}
        <div className="flex items-center">
          <p
            className={cn(
              "text-base font-semibold",
              (order.order_status === "Delivering" && "text-yellow-600") ||
                (order.order_status === "Processing" && "text-orange-600") ||
                (order.order_status === "Delivered" && "text-green-600") ||
                (order.order_status === "Cancelled" && "text-red-600")
            )}
          >
            {order.order_status}
          </p>
        </div>

        {/* Payment Status */}
        <div className="flex items-center">
          <p
            className={cn(
              "text-base font-semibold",
              order.isPaid ? "text-green-600" : "text-red-600"
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
