// src/lib/shopify.ts
import Client from 'shopify-buy'; // Promijenjeno sa '@shopify/buy' u 'shopify-buy'

export const shopifyClient = Client.buildClient({
  domain: 'varden-8392.myshopify.com',
  storefrontAccessToken: 'd8da9b08c9a73daa4688cd45796981a9'
});