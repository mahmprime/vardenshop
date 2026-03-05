import { Handler } from "@netlify/functions"

const SHOP = "varden-8392.myshopify.com"

export const handler: Handler = async () => {

  const TOKEN = process.env.SHOPIFY_TOKEN

  if (!TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "SHOPIFY_TOKEN missing" })
    }
  }

  const query = `
  {
    products(first: 12) {
      edges {
        node {
          id
          title
          productType
          images(first: 1) {
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

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Shopify request failed" })
    }

  }
}