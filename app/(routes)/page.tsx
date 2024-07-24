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
    <>
      <Container className="px-4 md:px-12">
        <section className="grid grid-cols-1 md:grid-cols-2 py-12 pt-16">
          <div className="flex flex-col items-start justify-start gap-4">
            <p className="px-6 py-1 rounded-full text-neutral-500 border border-gray-300">
              Treat Yourself
            </p>
            <h2 className="text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">
              Welcome to
              <span className="block py-4">Brownie Bee</span>
            </h2>
            <p className="text-base text-center md:text-left text-neutral-500 my-3">
              Discover our delectable range of cakes, pastries, and sweets.
              Whether you're celebrating a special occasion or just indulging in
              something sweet, we've got the perfect treat for you. Explore our
              menu and find your new favorite dessert!
            </p>

            <div className="my-4 flex text-center justify-center gap-6 w-full md:w-auto">
              <Link href={"/menu"}>
                <Button className="px-8 md:px-16 py-4 md:py-6 rounded-full bg-pink-400 text-white hover:bg-pink-500">
                  Order Now
                </Button>
              </Link>
              <Link href={"/"}>
                <Button
                  className="px-8 md:px-16 py-4 md:py-6 rounded-full border border-gray-300 text-neutral-700 hover:bg-gray-100"
                  variant={"outline"}
                >
                  Explore More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center w-full relative h-[560px]">
            <Image
              src="/img/Food.png"
              alt="Hero"
              className="object-contain w-full h-full absolute"
              fill
            />
          </div>
        </section>

        {/* FEATURED SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 gap-y-20 md:gap-12 my-4 py-12">
          {products.slice(0, 4).map((product) => (
            <FeaturedContent key={product.id} data={product} />
          ))}
        </section>

        {/* WHY CHOOSE US */}
        <section className="my-8 py-12 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide uppercase text-rose-700 my-4">
            Why Choose Us?
          </h2>
          <p className="w-full text-center md:w-[560px] text-base text-neutral-600 my-4">
            At Brownie Bee, we take pride in using only the finest ingredients
            to create our delectable cakes and pastries. Our expert bakers craft
            each item with love and attention to detail, ensuring that every
            bite is a delightful experience. Discover why our customers keep
            coming back for more!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-6 px-2">
            <Card className="shadow-lg rounded-md border-none p-4 py-8 flex flex-col items-center justify-center gap-4 bg-white">
              <Star className="w-8 h-8 text-rose-500" />{" "}
              <CardTitle className="text-neutral-700 font-semibold">
                Fresh Ingredients
              </CardTitle>
              <CardDescription className="text-center text-neutral-500">
                We use only the freshest ingredients to ensure our cakes and
                pastries are always top-notch
              </CardDescription>
            </Card>
            <Card className="shadow-lg rounded-md border-none p-4 py-8 flex flex-col items-center justify-center gap-4 bg-white">
              <CakeIcon className="w-8 h-8 text-rose-500" />{" "}
              <CardTitle className="text-neutral-700 font-semibold">
                Handcrafted with Love
              </CardTitle>
              <CardDescription className="text-center text-neutral-500">
                Each of our baked goods is handcrafted with care and passion to
                deliver a delightful experience.
              </CardDescription>
            </Card>
            <Card className="shadow-lg rounded-md border-none p-4 py-8 flex flex-col items-center justify-center gap-4 bg-white">
              <GiftIcon className="w-8 h-8 text-rose-500" />{" "}
              <CardTitle className="text-neutral-700 font-semibold">
                Perfect for Every Occasion
              </CardTitle>
              <CardDescription className="text-center text-neutral-500">
                Whether it’s a birthday, wedding, or just because, our cakes and
                pastries make every occasion special.
              </CardDescription>
            </Card>
          </div>
        </section>
      </Container>
    </>
  );
};

export default HomePage;
