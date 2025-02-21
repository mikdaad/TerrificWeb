'use client';
import { useState } from "react";

interface PaymentPageProps {
  totalPrice: number;
}

export default function PaymentPage({ totalPrice }: PaymentPageProps) {
 const [loading, setLoading] = useState(false);
 const [transactionId, setTransactionId] = useState("");
 const initiatePayment = async () => {
   setLoading(true);
   const txnId = `TXN${Date.now()}`;
   setTransactionId(txnId);
   const response = await fetch("/api/initiatepayment", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ amount: totalPrice, transactionId: txnId }),
   });
   const data = await response.json();
   console.log(data);
   setLoading(false);
   if (data.success) {
     window.location.href = data.data.instrumentResponse.redirectInfo.url; // Redirect to PhonePe
   } else {
     alert("Payment initiation failed");
   }
 };
 return (
   <div>
     <h2>PhonePe Payment</h2>
     <button onClick={initiatePayment} disabled={loading}>
      
       {loading ? "Processing..." : "Pay ₹" + totalPrice}
       </button>
 </div>
  );
 }