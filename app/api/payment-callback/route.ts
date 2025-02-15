import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const txnId = searchParams.get("txnId");
  const status = searchParams.get("Status");
  const responseCode = searchParams.get("responseCode");
  const orderId = searchParams.get("tr");

  if (status === "SUCCESS") {
    console.log(`✅ Payment Successful: ${txnId}, Order ID: ${orderId}`);

    // Store transaction in DB (MongoDB, PostgreSQL, etc.)
    // await saveTransactionToDB({ txnId, orderId, status });

    // Redirect to success page
    return NextResponse.redirect(`https://terrific-web-git-main-mikdaads-projects.vercel.app/payment/success?txnId=${txnId}&orderId=${orderId}`);
  } else {
    console.log(`❌ Payment Failed: ${responseCode}`);

    // Redirect to failure page
    return NextResponse.redirect(`https://terrific-web-git-main-mikdaads-projects.vercel.app/payment/cancel`);
  }
}
