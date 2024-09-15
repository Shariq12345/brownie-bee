"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMedia } from "react-use";
import { Sheet, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { useAuth, UserButton } from "@clerk/nextjs";
import CartButton from "./cart-button";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  scrolled: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MainNav = ({
  scrolled,
  className,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  ...props
}: MainNavProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/menu",
      label: "Menu",
      active: pathname === "/menu",
    },
    {
      href: "/orders",
      label: "Orders",
      active: pathname === "/orders",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ];

  const linkStyles = (active: boolean) => {
    if (scrolled) {
      return active ? "text-black font-bold underline" : "text-gray-600";
    } else {
      return active ? "text-gray-800 font-bold underline" : "text-black";
    }
  };

  const { userId } = useAuth();

  if (isMobile) {
    return (
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="px-4">
          <nav className="flex flex-col gap-y-4 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="ml-auto">
      <nav
        className={cn(
          "flex items-center space-x-4 lg:space-x-12 pl-6",
          className
        )}
      >
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "text-base font-medium transition-colors hover:text-primary",
              linkStyles(route.active)
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainNav;
