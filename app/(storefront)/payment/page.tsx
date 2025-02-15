"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CheckoutPage: React.FC = () => {
  const [upiUrl, setUpiUrl] = useState<string>("");

  useEffect(() => {
    const transactionId: string = uuidv4();
    const upiId: string = "cashwayclicks-1@okicici"; // Your UPI ID
    const name: string = "M. Mikdad"; // Business or user name
    const amount: string = "100.00"; // Amount in INR
    const orderId: string = `ORDER-${transactionId}`;
    const note: string = "Payment for Order";

    // Callback URL to receive payment response
    const callbackUrl: string = encodeURIComponent(
      "https://terrific-web-git-main-mikdaads-projects.vercel.app/api/payment-callback"
    );

    // Construct UPI Payment URL
    const generatedUpiUrl: string = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR&tr=${orderId}&tn=${encodeURIComponent(
      note
    )}&url=${callbackUrl}`;

    setUpiUrl(generatedUpiUrl);

    // Redirect user to UPI payment
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
