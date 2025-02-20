import { useState } from "react";
export default function PaymentPage() {
 const [loading, setLoading] = useState(false);
 const [transactionId, setTransactionId] = useState("");
 const initiatePayment = async () => {
   setLoading(true);
   const txnId = `TXN${Date.now()}`;
   setTransactionId(txnId);
   const response = await fetch("/api/initiatepayment", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ amount: 100, transactionId: txnId }),
   });
   const data = await response.json();
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
       {loading ? "Processing..." : "Pay ₹100"}
       </button>
 </div>
  );
 }