import fetch from "node-fetch";

export async function handler(event, context) {
  const SHOPIFY_DOMAIN = "varden-8392.myshopify.com";
  const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2026-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}