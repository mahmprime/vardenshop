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
            node { url }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price { amount }
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

    if (!data.data?.products?.edges) {
      return { statusCode: 500, body: JSON.stringify({ error: "No products found" }) }
    }

    // Mapiranje proizvoda u jednostavan format
    const products = data.data.products.edges.map((edge: any) => {
      const node = edge.node
      const variant = node.variants.edges[0]?.node

      return {
        id: node.id || "",
        title: node.title || "No title",
        productType: node.productType || "",
        image: node.images.edges[0]?.node.url || "",
        price: variant?.price?.amount ? parseFloat(variant.price.amount) : 0,
        variantId: variant?.id || "", // OBAVEZNO za cart URL
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Shopify request failed", details: err })
    }
  }
}