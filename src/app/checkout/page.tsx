"use client";

import { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Replace <img> with <Image>

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Checkout Form Component
function CheckoutForm({ clientSecret, total }: { clientSecret: string; total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { clearCart } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
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
      } else if (paymentIntent?.status === "succeeded") {
        clearCart();
        router.push('/payment-success'); // Redirect to the success page
      }
    } catch (err) {
      setError("An error occurred during payment");
      console.error("Payment error:", err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Payment Information</h2>
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

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
      </Button>
    </form>
  );
}

// Main Checkout Page Component
export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Fetch PaymentIntent when the component mounts or when `total` changes
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Math.round(total * 100) }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating PaymentIntent:", error);
      }
    };

    fetchPaymentIntent();
  }, [total]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} total={total} />
            </Elements>
          )}
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {/* Replace <img> with <Image> */}
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}