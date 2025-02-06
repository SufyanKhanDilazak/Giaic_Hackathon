"use client"

import Link from "next/link"
import { Search, User, ChevronDown, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "./CartContext"

export function Header() {
  const { cartQuantity, shouldGlow } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background dark:bg-gray-950">
      {/* Top banner */}
      <div className="bg-black text-white text-center py-2 text-xs sm:text-sm">
        <p className="px-4">
          Sign-up and get 20% off your first order{" "}
          <Link href="/shop" className="font-bold underline">
            Sign Up Now
          </Link>
        </p>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between dark:bg-gray-950">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
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
          {/* Search Icon */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search size={24} />
          </Button>

          {/* Search Input */}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/account" className="w-full">
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/orders" className="w-full">
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout" className="w-full">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}