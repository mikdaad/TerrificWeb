'use client';
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Cart,newcart } from "@/app/lib/interfaces";

interface PaymentPageProps {
  totalPrice: number;
  cartItems: newcart[];

}

export default function PaymentPage({ totalPrice,cartItems }: PaymentPageProps) {
 const [loading, setLoading] = useState(false);
 const [transactionId, setTransactionId] = useState("");
 const initiatePayment = async () => {
   setLoading(true);
   const txnId = `TXN${Date.now()}`;
   setTransactionId(txnId);
   const response = await fetch("/api/initiatepayment", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ amount: totalPrice, transactionId: txnId , cartItems: cartItems }),
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
  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-2xl max-w-sm mx-auto">
  <h2 className="text-white text-xl font-bold mb-4">PhonePe Payment</h2>
  <button
    onClick={initiatePayment}
    disabled={loading}
    className={`relative flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
  >
    {loading ? (
      <>
        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
      </>
    ) : (
      `Pay ₹${totalPrice}`
    )}
  </button>
</div>
  );
 }