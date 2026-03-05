import { Handler } from "@netlify/functions"

const SHOP = "varden-8392.myshopify.com"

export const handler: Handler = async (event) => {
  const TOKEN = process.env.SHOPIFY_TOKEN
  if (!TOKEN) {
    return { statusCode: 500, body: JSON.stringify({ error: "SHOPIFY_TOKEN missing" }) }
  }

  const { id } = event.queryStringParameters || {}

  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Product ID missing" }) }
  }

  // Shopify Storefront API očekuje ID u formatu "gid://shopify/Product/<num>"
  const query = `
    {
      product(id: "${id}") {
        id
        title
        productType
        description
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price {
                amount
              }
            }
          }
        }
      }
    }
  `

  try {
    const res = await fetch(`https://${SHOP}/api/2026-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN
      },
      body: JSON.stringify({ query })
    })

    const data = await res.json()

    if (data.errors) {
      return { statusCode: 400, body: JSON.stringify(data) }
    }

    const product = data.data.product
    return { statusCode: 200, body: JSON.stringify(product) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Shopify request failed", details: err }) }
  }
}