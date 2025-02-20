import crypto from "crypto";
 export async function POST(req) {
  try {
    const { amount, transactionId } = await req.json();
    // Merchant credentials (Use env variables in production)
    const merchantId = "PGTESTPAYUAT132"; // Replace with actual MID
    const saltKey = "58f62bdc-2b1f-44a1-9da5-1820a35835f3";
    const saltIndex = 1;
    const callbackUrl = "https://yourwebsite.com/payment/callback"; // Your frontend callback
    const payload = {
      merchantId,
      merchantTransactionId: transactionId,
      amount: amount * 100, // Convert to paisa
      callbackUrl,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    // Create SHA256 hash
    const payloadString = JSON.stringify(payload);
    const hash = crypto.createHash("sha256").update(payloadString + saltKey).digest("hex");
    const xVerify = hash + "###" + saltIndex;
    // Send request to PhonePe
    const response = await fetch("https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": merchantId,
      },
      body: payloadString,
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
 }