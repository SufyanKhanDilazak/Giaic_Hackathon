"use client";

import Link from "next/link";
import { Search, User, ChevronDown, ShoppingCart, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "./CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";

export function Header() {
  const { cartQuantity, shouldGlow } = useCart();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchBar = document.querySelector(".mobile-search-bar");
      if (isSearchVisible && searchBar && !searchBar.contains(event.target as Node)) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background dark:bg-gray-950">
      {/* Top banner */}
      <div className="bg-black text-white text-center py-2 text-xs sm:text-sm">
        <div className="px-4">
          Sign-up and get 20% off your first order{" "}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="link" className="font-bold underline p-0 text-white">
                Sign Up Now
              </Button>
            </SignInButton>
          </SignedOut> 
          <SignedIn>
            <div className="relative inline-block ml-2">
              <style jsx global>{`
                .banner-user-button .cl-userButtonTrigger {
                  transform: translateY(7px);
                }
              `}</style>
              <div className="banner-user-button">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between dark:bg-gray-950">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <DialogTitle className="sr-only">Mobile Menu</DialogTitle>
              <nav className="flex flex-col space-y-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center hover:text-primary">
                    Shop
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/" className="w-full">
                        Home
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/allproducts" className="w-full">
                        All Products
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/onsale" className="hover:text-primary">
                  On Sale
                </Link>
                <Link href="/new" className="hover:text-primary">
                  New Arrivals
                </Link>
                <Link href="/brands" className="hover:text-primary">
                  Brands
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="text-xl sm:text-2xl font-black text-gray-950 dark:text-gray-50">
            SHOP.CO
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-gray-950 dark:text-gray-50">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center hover:text-primary">
              Shop
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/allproducts" className="w-full">
                  All Products
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/onsale" className="hover:text-primary">
            On Sale
          </Link>
          <Link href="/new" className="hover:text-primary">
            New Arrivals
          </Link>
          <Link href="/brands" className="hover:text-primary">
            Brands
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4 text-gray-950 dark:text-gray-50">
          {/* Search Icon for Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Search size={24} />
          </Button>

          {/* Search Input for Desktop */}
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search for products"
              className="pl-10 pr-4 w-full md:w-[300px] lg:w-[400px] h-[48px] rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Cart Icon */}
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart" className={`transition-transform ${shouldGlow ? 'animate-pulse' : ''}`}>
              <ShoppingCart className="h-5 w-5" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartQuantity}
                </span>
              )}
            </Link>
          </Button>

          {/* User Menu */}
          <SignedIn>
            <div className="nav-user-button mt-1">
              <style jsx global>{`
                .nav-user-button .cl-userButtonTrigger {
                  transform: none;
                }
              `}</style>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <User className="h-4 w-4 " />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Search Input */}
      {isSearchVisible && (
        <div className="mobile-search-bar absolute top-16 left-0 right-0 bg-white p-2 md:hidden border-t flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search for products"
            className="w-full h-10"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchVisible(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </header>
  );
}