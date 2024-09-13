import React from "react";
import { Orders } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Package, CreditCard, DollarSign } from "lucide-react";

interface ReceiptProps {
  order: Orders;
}

const Receipt = ({ order }: ReceiptProps) => {
  const orderItems = order.orderItems;
  const totalQuantity = orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalAmount = orderItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Card className="w-full max-w-3xl mx-auto my-6 p-6 border border-gray-300 rounded-lg shadow-md">
      <CardContent>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Receipt</h1>
          <p className="text-gray-600 text-sm">Thank you for your purchase!</p>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Order Details */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Order Details
              </h2>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <Package size={18} />
                <span className="text-sm font-medium py-1 px-2 rounded-full bg-gray-200 text-gray-700">
                  {order.order_status}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <CreditCard size={18} />
                <span className="text-sm font-medium py-1 px-2 rounded-full bg-gray-200 text-gray-700">
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized List */}
          <div className="border-t border-gray-300 my-4"></div>
          <h2 className="text-lg font-semibold text-gray-900">Items</h2>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={item.images[0].url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between items-center text-gray-900">
            <p className="text-lg font-semibold">Total Quantity</p>
            <p className="text-lg font-medium">{totalQuantity}</p>
          </div>
          <div className="flex justify-between items-center text-gray-900 mt-2">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-lg font-medium">₹{totalAmount}</p>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-300 my-4"></div>
          <div className="text-center text-gray-600 text-sm">
            <p>For any queries, contact us at support@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Receipt;
