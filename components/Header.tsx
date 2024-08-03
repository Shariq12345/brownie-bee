"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MainNav from "./MainNav";
import CartButton from "./cart-button";

type Props = {
  userId: string | null;
};

const Header = ({ userId }: Props) => {
  const [scrolled, setScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "w-full z-50 transition",
        scrolled ? "fixed top-0 left-0 bg-white shadow-lg" : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex relative px-4 sm:px-6 lg:px-12 h-16 items-center">
          <Link
            href="/"
            className="uppercase flex gap-x-2 font-bold text-neutral-700 text-lg md:text-xl"
          >
            Brownie Bee
          </Link>

          {/* MAIN NAV */}
          <MainNav scrolled={scrolled} />

          {userId ? (
            <div className="ml-4 flex items-center space-x-4">
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-4">
              <Link href="/sign-in">
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-pink-400 text-white hover:bg-pink-500">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          {userId && <CartButton />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
