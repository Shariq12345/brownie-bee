import React from "react";
import getProducts from "@/actions/get-products";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import FeaturedContent from "@/components/featured-content";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CakeIcon, GiftIcon, Star } from "lucide-react";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white">
      <Container>
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
          <div className="w-full md:w-1/2 space-y-6">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-800 font-semibold text-sm">
              Indulge in Sweetness
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Welcome to <span className="text-pink-600">Brownie Bee</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Discover our delectable range of handcrafted cakes, pastries, and
              sweets. Perfect for every occasion or just because you deserve a
              treat!
            </p>
            <div className="flex space-x-4">
              <Link href="/menu">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg">
                  Order Now
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="text-pink-600 border-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full text-lg"
                >
                  Explore More
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <div className="relative h-[400px] md:h-[500px] w-full">
              <Image
                src="/img/Food.png"
                alt="Delicious Cakes"
                layout="fill"
                objectFit="contain"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Our <span className="text-pink-600">Featured Treats</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <FeaturedContent key={product.id} data={product} />
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white rounded-lg shadow-xl mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose <span className="text-pink-600">Brownie Bee</span>?
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            At Brownie Bee, we&apos;re passionate about creating unforgettable
            sweet experiences. Our commitment to quality and creativity sets us
            apart.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
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
                className="bg-pink-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <item.icon className="w-12 h-12 text-pink-600 mb-4" />
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default HomePage;
