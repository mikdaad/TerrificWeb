"use client"; // Ensure this is a Client Component

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // ❌ Don't use useRouter(), it's not needed here
import { v4 as uuidv4 } from "uuid";

const CheckoutPage: React.FC = () => {
  useEffect(() => {
    const transactionId: string = uuidv4();
    const upiId: string = "cashwayclickd@okaxis"; // Replace with your UPI ID
const name: string = "Terrific";
const amount: string = "5"; // Replace with the actual amount
const orderId: string = `ORDER-${transactionId}`;
const note: string = "Payment for Order";
const callbackUrl: string = encodeURIComponent("https://localhost:3000/api/payment-callback");

    const upiUrl: string = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tr=${orderId}&tn=${encodeURIComponent(note)}&url=${callbackUrl}`;

    window.location.href = upiUrl; // Redirect to Google Pay
  }, []);

  return <p>Redirecting to Google Pay...</p>;
};

export default CheckoutPage;



