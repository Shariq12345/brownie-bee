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
import { Menu } from "lucide-react";
import Image from "next/image";

type Props = {
  userId: string | null;
};

const Header = ({ userId }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)", false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Set true if scrolled down
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
          "bg-white shadow-sm", // Default to white background
          {
            "bg-white shadow-md": isScrolled, // Add shadow when scrolled
            "bg-transparent": !isScrolled, // Make transparent if not scrolled
          }
        )}
      >
        <Container>
          <div className="flex relative px-4 sm:px-6 lg:px-12 h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="uppercase flex gap-x-2 font-bold text-neutral-700 text-lg md:text-xl"
            >
              <Image src={"/img/logo.png"} alt="" width={100} height={120} />
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <>
                <MainNav
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <div className="flex items-center space-x-4">
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
