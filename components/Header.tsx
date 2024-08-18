// Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MainNav from "./MainNav";
import CartButton from "./cart-button";
import { Menu } from "lucide-react";

type Props = {
  userId: string | null;
};

const Header = ({ userId }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)", false);

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
        <div className="flex relative px-4 sm:px-6 lg:px-12 h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="uppercase flex gap-x-2 font-bold text-neutral-700 text-lg md:text-xl"
          >
            Brownie Bee
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <MainNav
                scrolled={scrolled}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
              <div className="flex items-center space-x-4">
                {userId && <CartButton />}
                {userId ? (
                  <UserButton />
                ) : (
                  <div className="flex items-center space-x-2">
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
              </div>
            </>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <div className="flex items-center space-x-4">
              {userId && <CartButton />}
              {userId ? (
                <UserButton />
              ) : (
                <Link href="/sign-in">
                  <Button variant={"outline"} size="sm">
                    Login
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <MainNav
            scrolled={scrolled}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        )}
      </Container>
    </header>
  );
};

export default Header;
