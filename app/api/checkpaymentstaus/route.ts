export async function POST(req) {
    try {
      const { transactionId } = await req.json();
      const merchantId = "PGTESTPAYUAT132";
      const saltKey = "58f62bdc-2b1f-44a1-9da5-1820a35835f3";
      const saltIndex = 1;
      const url = `https://api-preprod.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${transactio
      const hash = crypto.createHash("sha256").update(url + saltKey).digest("hex");
      const xVerify = hash + "###" + saltIndex;
      // Fetch transaction status
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": merchantId,
        },
      });
      const data = await response.json();
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
   }