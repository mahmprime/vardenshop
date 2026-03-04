import { Handler } from '@netlify/functions'

const SHOP_DOMAIN = "varden-8392.myshopify.com"
const STOREFRONT_TOKEN = "d8da9b08c9a73daa4688cd45796981a9"

export const handler: Handler = async (event, context) => {
  const query = `{
    products(first: 12) {
      edges {
        node {
          id
          title
          productType
          images(first: 1) { edges { node { url } } }
          variants(first: 1) { edges { node { id price { amount } } } }
        }
      }
    }
  }`

  try {
    const response = await fetch(`https://${SHOP_DOMAIN}/api/2026-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      // Shopify API nije vratio 200
      const text = await response.text()
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Shopify API error: ${text}` }),
      }
    }

    const data = await response.json()

    // Provjera da li data.products postoji
    if (!data || !data.data || !data.data.products) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No products returned from Shopify API" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) }),
    }
  }
}