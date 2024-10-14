import React from "react";
import { ChevronDown } from "lucide-react";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Definitions",
      content: `"Client", "You", "Your" refers to you, the person accessing this website and agreeing to Brownie Bee's terms and conditions. "Company", "Ourselves", "We", "Our" and "Us" refers to Brownie Bee. "Party", "Parties", or "Us" refers to both the Client and ourselves.`,
    },
    {
      title: "Cookies",
      content:
        "We employ the use of cookies. By accessing Brownie Bee, you agree to use cookies in accordance with our Privacy Policy. Cookies are used to enable certain areas of our website to function and to improve the experience for users.",
    },
    {
      title: "Orders and Payment",
      content:
        "All orders made through our website are subject to acceptance and availability. You must ensure all order details are correct before finalizing your purchase. Payment must be made through our provided payment options. All transactions are encrypted and secure. We reserve the right to refuse or cancel any orders at our discretion.",
    },
    {
      title: "Delivery and Shipping",
      content:
        "We aim to deliver products within the specified timeframe mentioned on our website. However, we are not liable for any delays caused by unforeseen circumstances. Delivery is only available in specified regions, and shipping costs may apply based on your location. Please ensure the delivery address is accurate. We are not responsible for orders delivered to incorrect addresses.",
    },
    {
      title: "Cancellations and Refunds",
      content:
        "Orders can only be canceled within 2 hours of placing the order. Contact our customer service to request a cancellation. Refunds may be granted in certain circumstances (e.g., incorrect or damaged products). Please refer to our Refund Policy for more details. Perishable items such as cakes and brownies are non-refundable unless proven faulty upon delivery.",
    },
    {
      title: "Product Information",
      content:
        "We strive to provide accurate descriptions and images of our products. However, there may be slight variations in color or appearance. Our cakes and brownies are made with fresh ingredients and are subject to availability. If you have any allergies, please notify us before placing an order. We are not responsible for allergic reactions caused by undisclosed allergies.",
    },
    {
      title: "User Accounts",
      content:
        "To place an order, you may be required to create an account. It is your responsibility to maintain the confidentiality of your account credentials. We reserve the right to terminate accounts that violate our terms or misuse our services.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content on this website, including images, text, logos, and designs, are the property of Brownie Bee or its licensors. You may not copy, modify, or distribute any part of this content without our explicit permission.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Brownie Bee is not liable for any damages resulting from the use of our website or the consumption of our products. We do not guarantee uninterrupted or error-free access to our website.",
    },
    {
      title: "Governing Law",
      content:
        "These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
    },
    {
      title: "Changes to Terms",
      content:
        "We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page, and continued use of the website after such changes constitutes acceptance of the new terms.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these terms and conditions, please contact us at: support@browniebee.com | +91 9867119576 | Shop Number.8 New Mill Road Safia Bai Building, Bazar Ward, Kurla West, Mumbai-70",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <h1 className="text-4xl font-bold mb-6 text-rose-700">
              Terms and Conditions
            </h1>
            <p className="text-sm text-rose-600 mb-6">
              Last updated:{" "}
              {new Date().toLocaleString("en-US", { dateStyle: "medium" })}
            </p>

            <p className="mb-8 text-rose-700 leading-relaxed">
              Welcome to Brownie Bee! These terms and conditions outline the
              rules and regulations for the use of our website, located at
              www.browniebee.com. By accessing this website, we assume you
              accept these terms and conditions. Do not continue to use Brownie
              Bee if you do not agree to take all the terms and conditions
              stated on this page.
            </p>

            <div className="space-y-6">
              {sections.map((section, index) => (
                <details key={index} className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span className="text-lg font-semibold text-rose-800 transition-colors duration-300 group-open:text-rose-500">
                      {index + 1}. {section.title}
                    </span>
                    <span className="transition group-open:rotate-180">
                      <ChevronDown size={24} className="text-rose-500" />
                    </span>
                  </summary>
                  <p className="text-rose-900 mt-3 group-open:animate-fadeIn">
                    {section.content}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
