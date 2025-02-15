"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CheckoutPage: React.FC = () => {
  const [upiUrl, setUpiUrl] = useState<string>("");

  useEffect(() => {
    const transactionId: string = uuidv4();
    const upiId: string = "cashwayclickd@okaxis"; // Replace with your UPI ID
    const name: string = "Terrific";
    const amount: string = "5"; // Replace with the actual amount
    const orderId: string = `ORDER-${transactionId}`;
    const note: string = "Payment for Order";
    const callbackUrl: string = encodeURIComponent("https://terrific-web-git-main-mikdaads-projects.vercel.app/api/payment-callback");

    const generatedUpiUrl: string = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR&tr=${orderId}&tn=${encodeURIComponent(note)}&url=${callbackUrl}`;

    setUpiUrl(generatedUpiUrl); // Store the link for fallback

    // Try opening the UPI link
    window.location.href = generatedUpiUrl;
  }, []);

  return (
    <div>
      <p>Redirecting to Google Pay...</p>
      {upiUrl && (
        <p>
          If nothing happens,{" "}
          <a href={upiUrl} style={{ color: "blue", textDecoration: "underline" }}>
            click here to pay manually
          </a>
        </p>
      )}
    </div>
  );
};

export default CheckoutPage;
