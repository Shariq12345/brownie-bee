"use client";
import React, { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MainNav from "./MainNav";
import CartButton from "./cart-button";
import { Menu, Search } from "lucide-react";

type Props = {
  userId: string | null;
};

const Header = ({ userId }: Props) => {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)", false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const ratio = Math.min(scrollTop / 100, 1); // Full effect after 100px of scroll
      setScrollRatio(ratio);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchClick = () => {
    router.push("/menu");
  };

  return (
    <>
      <header
        className={cn(
          "w-full z-50 transition-all duration-300 ease-in-out fixed top-0 left-0",
          "bg-white shadow-lg"
        )}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${scrollRatio})`,
          boxShadow: `0 4px 6px -1px rgba(0, 0, 0, ${
            scrollRatio * 0.1
          }), 0 2px 4px -1px rgba(0, 0, 0, ${scrollRatio * 0.06})`,
        }}
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
                  scrolled={scrollRatio > 0}
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <div className="flex items-center space-x-4">
                  {/* Search Icon */}
                  <button
                    onClick={handleSearchClick}
                    className="focus:outline-none transition-transform duration-200 ease-in-out hover:scale-110 ml-5 mr-2"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5 text-black" />
                  </button>
                  {userId ? (
                    <UserButton />
                  ) : (
                    <div className="flex items-center space-x-2 ml-3">
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
              </>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
              <div className="flex items-center space-x-4">
                {/* <button
                  onClick={handleSearchClick}
                  className="focus:outline-none transition-transform duration-200 ease-in-out hover:scale-110"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-neutral-700" />
                </button> */}
                {userId ? (
                  <UserButton />
                ) : (
                  <Link href="/sign-in">
                    <Button variant={"outline"} size="sm">
                      Login
                    </Button>
                  </Link>
                )}
                {userId && <CartButton />}
                {/* Search Icon */}
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
              scrolled={scrollRatio > 0}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          )}
        </Container>
      </header>
      {/* Spacer div to push content down */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
