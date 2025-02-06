import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe using the secret key from the environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia", // Updated to the latest version
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return NextResponse.json(
      { error: "Failed to create PaymentIntent" },
      { status: 500 }
    );
  }
}
