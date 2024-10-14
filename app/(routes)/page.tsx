import React from "react";
import getProducts from "@/actions/get-products";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FeaturedContent from "@/components/featured-content";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CakeIcon, GiftIcon, Star } from "lucide-react";
import Carousel from "@/components/Carousel";
import Image from "next/image";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-pink-100">
        <Container>
          <div className="flex flex-col items-center justify-between py-12 md:py-20 lg:py-32 lg:flex-row px-4 sm:px-6 lg:px-8">
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Indulge in <br />
                <span className="text-pink-600">Sweet Delights</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                Discover our handcrafted cakes, pastries, and sweets. Perfect
                for every occasion or just because you deserve a treat!
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link href="/menu">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md text-base md:text-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <Image
                src={"/img/pastries.jpg"}
                alt={""}
                width={600}
                height={600}
              />
              {/* <Carousel /> */}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
              Our <span className="text-pink-600">Featured Treats</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.slice(0, 4).map((product) => (
                <FeaturedContent key={product.id} data={product} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container>
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-900">
              Why Choose <span className="text-pink-600">Brownie Bee</span>?
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">
              At Brownie Bee, we&apos;re passionate about creating unforgettable
              sweet experiences. Our commitment to quality and creativity sets
              us apart.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Star,
                  title: "Premium Ingredients",
                  description:
                    "We use only the finest, freshest ingredients to ensure exceptional taste and quality.",
                },
                {
                  icon: CakeIcon,
                  title: "Artisanal Craftsmanship",
                  description:
                    "Each treat is handcrafted with love and attention to detail by our expert bakers.",
                },
                {
                  icon: GiftIcon,
                  title: "Perfect for Any Occasion",
                  description:
                    "From birthdays to weddings, our creations make every moment sweeter and more memorable.",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                >
                  <div className="p-6 flex flex-col items-center text-center">
                    <item.icon className="w-10 h-10 md:w-12 md:h-12 text-pink-600 mb-4" />
                    <CardTitle className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base text-gray-600">
                      {item.description}
                    </CardDescription>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 bg-pink-600 text-white">
        <Container>
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Ready to Indulge?
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
              Explore our full range of delicious treats and make your day a
              little sweeter.
            </p>
            <Link href="/menu">
              <Button className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-3 rounded-md text-base md:text-lg transition duration-300 ease-in-out transform hover:scale-105">
                View Our Menu
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
