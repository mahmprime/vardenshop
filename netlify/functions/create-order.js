// netlify/functions/create-order.js

export async function handler(event) {
  console.log("[create-order] Event received:", event.httpMethod);

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  try {
    const { subtotal, tax, total, items } = JSON.parse(event.body);
    console.log("[create-order] Request body:", { subtotal, tax, total, items });

    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const BASE = "https://api-m.paypal.com";

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");

    // 1️⃣ GET ACCESS TOKEN
    const tokenRes = await fetch(`${BASE}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();
    console.log("[create-order] Token response:", tokenData);

    const accessToken = tokenData.access_token;
    if (!accessToken) {
      throw new Error("PayPal auth failed");
    }

    // Convert items for PayPal
    const paypalItems = items.map((i, idx) => ({
      name: i.name || `Item ${idx + 1}`,
      unit_amount: {
        currency_code: "USD",
        value: Number(i.price || 0).toFixed(2),
      },
      quantity: (i.quantity || 1).toString(),
      category: "PHYSICAL_GOODS",
    }));
    console.log("[create-order] PayPal items:", paypalItems);

    // 2️⃣ CREATE ORDER
    const orderBody = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: { currency_code: "USD", value: subtotal.toFixed(2) },
              tax_total: { currency_code: "USD", value: tax.toFixed(2) },
            },
          },
          items: paypalItems,
        },
      ],
      application_context: {
        shipping_preference: "GET_FROM_FILE", // PayPal traži shipping adresu
        allowed_shipping_country_codes: ["US"], // lock na SAD
      },
    };

    console.log("[create-order] Order payload:", JSON.stringify(orderBody, null, 2));

    const orderRes = await fetch(`${BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderBody),
    });

    const orderData = await orderRes.json();
    console.log("[create-order] Order response:", orderData);

    if (!orderRes.ok) {
      console.error("[create-order] PayPal order creation failed");
      throw new Error("PayPal order creation failed");
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ id: orderData.id }),
    };
  } catch (err) {
    console.error("[create-order] error:", err);

    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}