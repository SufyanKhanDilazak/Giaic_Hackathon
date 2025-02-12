"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "../components/CartContext";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useUser, SignInButton } from "@clerk/nextjs"; // Import Clerk hooks

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, cartQuantity } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useUser(); // Check if the user is signed in

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 10; // Fixed shipping cost
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!isSignedIn) {
      // If the user is not signed in, show a sign-in modal
      return;
    }
    setIsLoading(true);
    router.push('/checkout'); // Redirect to checkout if signed in
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="w-8 h-8" />
        Shopping Cart ({cartQuantity})
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
          <Link href="/">
            <Button className="bg-black hover:bg-gray-800">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                  width={100}
                  height={500}
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Size: {item.selectedSize}</p>
                    <p>Color: {item.selectedColor}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                      className="h-8 w-8"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addToCart(item)}
                      className="h-8 w-8"
                    >
                      +
                    </Button>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button with Clerk Integration */}
              {isSignedIn ? (
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full mt-6 bg-black hover:bg-gray-800"
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button
                    className="w-full mt-6 bg-black hover:bg-gray-800"
                  >
                    Sign In to Checkout
                  </Button>
                </SignInButton>
              )}

              <Link href="/">
                <Button variant="outline" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}