import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";

// Shopify checkout URL generator
const getShopifyCheckoutUrl = (items: { product: any; quantity: number }[]) => {
  const domain = "varden-8392.myshopify.com";

  // Shopify cart format: /cart/{variantId}:{quantity},{variantId}:{quantity}
  const cartItems = items
    .map((item) => `${item.product.variantId}:${item.quantity}`)
    .join(",");

  return `https://${domain}/cart/${cartItems}`;
};

const CartDrawer = () => {
  const { isOpen, closeCart, items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-serif text-lg tracking-wider">Cart</h2>
              <button onClick={closeCart} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                <div className="space-y-6">
                  {items.map(({ product, quantity }) => (
                    <div key={product.variantId} className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-20 w-20 object-cover bg-card"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{product.title}</p>
                          {product.productType && (
                            <p className="text-xs text-muted-foreground">{product.productType}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(product.variantId, quantity - 1)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.variantId, quantity + 1)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm">${(product.price * quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(product.variantId)}
                        className="self-start text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-6 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <a
                  href={getShopifyCheckoutUrl(items)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeCart}
                  className="block w-full bg-primary py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Checkout
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;