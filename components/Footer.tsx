import React from "react";
import { Button } from "./ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-100 to-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-pink-800 mb-4">
              Brownie Bee
            </h2>
            <p className="text-gray-600 mb-4">
              Delighting taste buds with our handcrafted cakes and pastries
              since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Our Menu", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>123 Cake Street, Sweet City, 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: hello@browniebee.com</li>
            </ul>
          </div>

          {/* Newsletter Subscription Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-r-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Brownie Bee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
