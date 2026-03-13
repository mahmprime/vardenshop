import type { ShopifyConfig } from "@/types/shopify";

/**
 * Shopify configuration.
 * Replace these values once you connect a Shopify store.
 * storeDomain: your-store.myshopify.com
 * storefrontAccessToken: from Shopify Admin → Settings → Apps → Storefront API
 */
export const shopifyConfig: ShopifyConfig = {
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN ?? "",
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ?? "",
  apiVersion: "2024-01",
};

export const getStorefrontApiUrl = () =>
  `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.apiVersion}/graphql.json`;

export const isShopifyConfigured = () =>
  Boolean(shopifyConfig.storeDomain && shopifyConfig.storefrontAccessToken);
