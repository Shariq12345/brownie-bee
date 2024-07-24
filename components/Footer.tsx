import React from "react";
import Container from "@/components/Container";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-rose-100">
      <Container>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 px-4 md:px-12 py-8 gap-6">
          {/* Menu Section */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-bold text-rose-700">Menu</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-600 hover:text-rose-700">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-rose-700">
                  Why Choose
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-rose-700">
                  Special Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-rose-700">
                  Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-bold text-rose-700">Help</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-600 hover:text-rose-700">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-rose-700">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-rose-700">
                  Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-bold text-rose-700">Contact</h2>
            <p className="text-neutral-600">+000 0000 0000</p>
            <p className="text-neutral-600">info@foodied.com</p>
            <p className="text-neutral-600">
              Shop Number.8 New Mill Road Safia Bai Building, Bazar Ward, Kurla
              West, Mumbai, Maharashtra 400070
            </p>
          </div>

          {/* Newsletter Subscription Section */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-bold text-rose-700">
              Subscribe to Our Newsletter
            </h2>
            <div className="w-full flex items-center border rounded-md border-rose-500 bg-white">
              <input
                type="email"
                placeholder="Enter your Email"
                className="flex-1 py-2 px-4 text-sm text-neutral-700 placeholder-neutral-400 outline-none"
              />
              <Button className="bg-rose-500 text-white rounded-r-md hover:bg-rose-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center py-6">
          <p className="text-xs text-neutral-600">
            &copy; 2024 Brownie Bee, Inc. All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
