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
    const { subtotal, tax, total, items, shipping } = JSON.parse(event.body);
    console.log("[create-order] Request body:", { subtotal, tax, total, items, shipping });

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

    // Convert items
    const paypalItems = items.map((i, idx) => ({
      name: i.name || `Item ${idx + 1}`,
      unit_amount: {
        currency_code: "USD",
        value: Number(i.price || 0).toFixed(2)
      },
      quantity: (i.quantity || 1).toString(),
      category: "PHYSICAL_GOODS"
    }));
    console.log("[create-order] PayPal items:", paypalItems);

    // Check totals
    const calcTotal = Number(subtotal) + Number(tax);
    console.log(`[create-order] Calculated total: ${calcTotal}, Provided total: ${total}`);
    if (Math.abs(calcTotal - total) > 0.01) {
      console.warn("[create-order] Total mismatch! PayPal may reject this order.");
    }

    // 2️⃣ CREATE ORDER
    const orderBody = {
    intent: "CAPTURE",
    payer: {
      email_address: shipping.email, // PayPal email
      name: {
        given_name: shipping.firstName,
        surname: shipping.lastName
      }
    },
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total.toFixed(2),
          breakdown: {
            item_total: { currency_code: "USD", value: subtotal.toFixed(2) },
            tax_total: { currency_code: "USD", value: tax.toFixed(2) }
          },
        },
        items: items.map((item, idx) => ({
          name: item.name || `Item ${idx + 1}`,
          unit_amount: {
            currency_code: "USD",
            value: Number(item.unit_amount.value).toFixed(2)
          },
          quantity: item.quantity.toString(),
          category: "PHYSICAL_GOODS"
        })),
        shipping: {
          name: { full_name: `${shipping.firstName} ${shipping.lastName}` },
          address: {
            address_line_1: shipping.address, // stvarna ulica
            admin_area_2: shipping.city,
            admin_area_1: shipping.state,
            postal_code: shipping.zip,
            country_code: shipping.country || "US"
          }
        }
      }
    ]
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