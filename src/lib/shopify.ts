// /lib/shopify.ts
const domain = "varden-8392.myshopify.com";
const storefrontAccessToken = "ea96eff574852ce8f8f28220876af224";

export async function fetchProducts() {
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
  `;

  const response = await fetch(
    `https://${domain}/api/2026-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify fetch error: ${response.status}`);
  }

  const json = await response.json();
  return json.data.products.edges.map((edge: any) => edge.node);
}