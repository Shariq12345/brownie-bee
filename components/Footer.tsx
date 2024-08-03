import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Instagram, Facebook, Twitter, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-rose-50 to-pink-100 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold text-rose-700">
              Brownie Bee
            </h2>
            <p className="text-gray-600">
              Delighting taste buds with our handcrafted cakes and pastries
              since 2010.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-rose-500 hover:text-rose-700 transition-colors duration-300"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Our Menu", href: "/menu" },
                { name: "Orders", href: "/orders" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-gray-600 hover:text-rose-600 transition-colors duration-300 cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                Shop Number.8 New Mill Road Safia Bai Building, Bazar Ward,
                Kurla West, Mumbai, Maharashtra 400070
              </li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: hello@browniebee.com</li>
            </ul>
          </div>

          {/* Newsletter Subscription Section */}
          <div className="lg:col-span-4 mt-8 lg:mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Subscribe to Our Sweet Newsletter
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-300"
              />
              <Button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 flex items-center justify-center">
                Subscribe
                <Send size={18} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-center space-x-4 text-gray-500 text-sm mb-4">
            <Link href="/terms">
              <span className="hover:text-gray-700 transition-colors duration-300 cursor-pointer">
                Terms & Conditions
              </span>
            </Link>
            <Link href="/privacy">
              <span className="hover:text-gray-700 transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </span>
            </Link>
          </div>
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Brownie Bee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
