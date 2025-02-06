"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function PaymentForm({ totalAmount }: { totalAmount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not been properly initialized");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          amount: Math.round(totalAmount * 100)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
      } else if (paymentIntent.status === "succeeded") {
        clearCart();
        router.push('/payment-success');
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-md bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <Button 
        type="submit" 
        disabled={!stripe || loading} 
        className="w-full bg-black hover:bg-gray-800"
      >
        {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </Button>
    </form>
  );
}