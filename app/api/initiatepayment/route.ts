import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MERCHANT_ID = "SANDBOXTESTMID"; // Replace with actual MID
const SALT_KEY = "51778fc0-016b-48fe-b509-108277bfa5e2";
const SALT_INDEX = "1";
const API_ENDPOINT = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay";
const STATUS_ENDPOINT = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/status";

export async function POST(req: NextRequest) {
  try {
    const { amount, mobileNumber } = await req.json();
    const transactionId = `TXN_${Date.now()}`;
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: `MUID_${Date.now()}`,
      amount: amount * 100, // Convert to paisa
      redirectUrl: "https://terrific.fit/success",
      redirectMode: "REDIRECT",
      callbackUrl: "https://yourdomain.com/api/payment/callback",
      mobileNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payloadString = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadString).toString("base64");
    const hash = crypto.createHash("sha256").update(base64Payload + "/pg/v1/pay" + SALT_KEY).digest("hex");
    const xVerify = `${hash}###${SALT_INDEX}`;

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      body: JSON.stringify({ request: base64Payload }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("transactionId");
  if (!transactionId) return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });

  const checksum = crypto.createHash("sha256").update(`/pg/v1/status/${MERCHANT_ID}/${transactionId}${SALT_KEY}`).digest("hex");
  const xVerify = `${checksum}###${SALT_INDEX}`;

  const response = await fetch(`${STATUS_ENDPOINT}/${MERCHANT_ID}/${transactionId}`, {
    method: "GET",
    headers: {
      "X-VERIFY": xVerify,
      "X-MERCHANT-ID": MERCHANT_ID,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
