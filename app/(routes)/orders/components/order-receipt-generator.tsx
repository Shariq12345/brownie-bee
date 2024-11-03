"use client";

import { Orders } from "@/types";
import { FileText } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface OrderReceiptGeneratorProps {
  order: Orders;
  className?: string;
}

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

const OrderReceiptGenerator = ({
  order,
  className,
}: OrderReceiptGeneratorProps) => {
  const formatDate = (timestamp: FirestoreTimestamp | Date | any) => {
    try {
      let date: Date;

      if (
        timestamp &&
        typeof timestamp === "object" &&
        "seconds" in timestamp
      ) {
        date = new Date(timestamp.seconds * 1000);
      } else if (timestamp && typeof timestamp.toDate === "function") {
        date = timestamp.toDate();
      } else {
        date = new Date(timestamp);
      }

      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }

      return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(date)
        .replace(/\//g, "-");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Tax Invoice", doc.internal.pageSize.width / 2, 15, {
      align: "center",
    });

    // Company details
    doc.setFontSize(14);
    doc.text("Brownie Bee", doc.internal.pageSize.width / 2, 25, {
      align: "center",
    });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const address =
      "Address: Shop Number.8 New Mill Road Safia Bai Building, Bazar Ward, Kurla West, Mumbai-70";
    const addressLines = doc.splitTextToSize(address, 180);
    addressLines.forEach((line: string, index: number) => {
      doc.text(line, doc.internal.pageSize.width / 2, 32 + index * 5, {
        align: "center",
      });
    });

    doc.text(`GSTIN: 24AADCO2555N1Z8`, doc.internal.pageSize.width / 2, 45, {
      align: "center",
    });

    // Invoice details
    doc.setFontSize(10);
    doc.text(`Invoice No: ${order.id}`, 14, 55);
    doc.text(`Invoice Date: ${formatDate(order.createdAt)}`, 14, 61);

    // Billing and Shipping Information
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", 14, 71);
    doc.text("SHIP TO:", doc.internal.pageSize.width - 95, 71);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    // Billing Address
    doc.text(`Person Name: ${order.userId}`, 14, 77);
    const billingAddressLines = doc.splitTextToSize(
      `Address: ${order.address}`,
      80
    );
    billingAddressLines.forEach((line: string, index: number) => {
      doc.text(line, 14, 83 + index * 5);
    });
    doc.text("State: Maharashtra", 14, 83 + billingAddressLines.length * 5);

    // Shipping Address
    doc.text(
      `Person Id: ${order.userId}`,
      doc.internal.pageSize.width - 95,
      77
    );
    const shippingAddressLines = doc.splitTextToSize(
      `Address: ${order.address}`,
      80
    );
    shippingAddressLines.forEach((line: string, index: number) => {
      doc.text(line, doc.internal.pageSize.width - 95, 83 + index * 5);
    });
    doc.text(
      "State: Maharashtra",
      doc.internal.pageSize.width - 95,
      83 + shippingAddressLines.length * 5
    );

    // Items table
    autoTable(doc, {
      startY: 120,
      head: [
        [
          "Description",
          "QTY",
          "Unit Price",
          "Gross Amount",
          "Taxable Amount",
          "GST RATE",
          "GST AMOUNT",
          "TOTAL VALUE",
        ],
      ],
      body: order.orderItems.map((item) => {
        const taxableAmount = (item.price * item.quantity * 100) / 118; // Assuming 18% GST
        const gstAmount = item.price * item.quantity - taxableAmount;
        return [
          item.name,
          item.quantity,
          item.price.toFixed(2),
          (item.price * item.quantity).toFixed(2),
          taxableAmount.toFixed(2),
          "18%",
          gstAmount.toFixed(2),
          (item.price * item.quantity).toFixed(2),
        ];
      }),
      foot: [
        [
          {
            content: "Total",
            colSpan: 3,
            styles: { halign: "right", fontStyle: "bold" },
          },
          // Gross Amount
          {
            content: order.orderItems
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2),
            styles: { halign: "center", fontStyle: "bold" },
          },
          // Taxable Amount
          {
            content: order.orderItems
              .reduce(
                (sum, item) => sum + (item.price * item.quantity * 100) / 118,
                0
              )
              .toFixed(2),
            styles: { halign: "center", fontStyle: "bold" },
          },
          // GST Rate
          { content: "18%", styles: { halign: "center", fontStyle: "bold" } },
          // Total GST Amount
          {
            content: order.orderItems
              .reduce(
                (sum, item) => sum + (item.price * item.quantity * 18) / 118,
                0
              )
              .toFixed(2),
            styles: { halign: "center", fontStyle: "bold" },
          },
          // Total Value
          {
            content: order.orderItems
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2),
            styles: { halign: "center", fontStyle: "bold" },
          },
        ],
      ],
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        lineWidth: 0.1,
      },
      theme: "grid",
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: 25, halign: "center" },
        2: { cellWidth: 15, halign: "center" },
        3: { cellWidth: 25, halign: "center" },
        4: { cellWidth: 25, halign: "center" },
        5: { cellWidth: 25, halign: "center" },
        6: { cellWidth: 20, halign: "center" },
        7: { cellWidth: 25, halign: "center" },
        8: { cellWidth: 25, halign: "center" },
      },
    });

    // Footer section
    //@ts-ignore
    const finalY = doc.autoTable.previous.finalY || 150;

    // Signatures
    doc.setFontSize(9);
    doc.text("Prepared By", 14, finalY + 20);
    doc.text("Verified By", 80, finalY + 20);
    doc.text(
      "Authorised Signature",
      doc.internal.pageSize.width - 40,
      finalY + 20
    );

    // Thank you note and disclaimers
    doc.setFontSize(8);
    doc.text(
      "Thank you for shopping with us",
      doc.internal.pageSize.width / 2,
      finalY + 30,
      { align: "center" }
    );

    // Notes and disclaimers
    doc.setFontSize(7);
    doc.text(
      [
        "Note: GST is being discharged in terms of provisions relating to mixed supply of goods and services.",
        "Tax is not payable under reverse charge basis",
        "*Convenience fee charged is non-refundable",
        "Disclaimer: This is a system generated invoice, signature not required",
      ],
      14,
      finalY + 40
    );

    // Save the PDF
    doc.save(`Invoice-${order.id}.pdf`);
  };

  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={generatePDF}
        className={
          className ||
          "flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600"
        }
      >
        <FileText size={16} className="mr-2" />
        View Receipt
      </button>
    </div>
  );
};

export default OrderReceiptGenerator;
