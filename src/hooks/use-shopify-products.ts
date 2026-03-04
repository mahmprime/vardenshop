import { useQuery } from "@tanstack/react-query";
import { shopifyFetch, isShopifyConfigured, PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from "@/services/shopify";
import type { ShopifyProduct } from "@/types/shopify";

/** Flatten Shopify edges/node structure */
function flattenEdges<T>(edges: { node: T }[]): T[] {
  return edges.map((e) => e.node);
}

export function useShopifyProducts(first = 12) {
  return useQuery({
    queryKey: ["shopify-products", first],
    queryFn: async () => {
      const data = await shopifyFetch<{
        products: { edges: { node: ShopifyProduct }[] };
      }>(PRODUCTS_QUERY, { first });
      return flattenEdges(data.products.edges);
    },
    enabled: isShopifyConfigured(),
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const data = await shopifyFetch<{
        productByHandle: ShopifyProduct;
      }>(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data.productByHandle;
    },
    enabled: isShopifyConfigured() && Boolean(handle),
  });
}
