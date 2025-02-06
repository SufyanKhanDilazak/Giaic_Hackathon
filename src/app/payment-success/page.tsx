"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "../../app/components/CartContext";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();

  // Clear the cart when the success page loads (only once)
  useEffect(() => {
    clearCart();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order is being processed, and you will
        receive a confirmation email shortly.
      </p>
      <Link href="/">
        <Button className="bg-black hover:bg-gray-800 py-6 text-lg">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}