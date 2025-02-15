import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const txnId = searchParams.get("txnId");
  const responseCode = searchParams.get("responseCode");
  const Status = searchParams.get("Status");
  const approvalRefNo = searchParams.get("approvalRefNo");
  const tr = searchParams.get("tr"); // Order ID

  if (Status === "SUCCESS") {
    console.log(`Payment Successful: ${txnId}, Order ID: ${tr}`);

    return NextResponse.redirect(
      new URL(`/payment/success?txnId=${txnId}&orderId=${tr}`, req.nextUrl)
    );
  } else {
    console.log("Payment Failed:", responseCode);
    return NextResponse.redirect(new URL("/payment/cancel", req.nextUrl));
  }
}
