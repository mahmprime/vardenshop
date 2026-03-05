import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-16">
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        <Link
          to="/"
          className="mt-6 border border-border px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-foreground hover:bg-primary hover:text-primary-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
//sdas
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16"
    >
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-serif text-3xl text-foreground">Checkout</h1>

        <div className="mt-12 grid gap-16 lg:grid-cols-5">
          {/* Form */}
          <div className="space-y-8 lg:col-span-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Contact
              </p>
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Shipping Address
              </p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="First name"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                  />
                  <input
                    placeholder="Last name"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                  />
                </div>
                <input
                  placeholder="Address"
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    placeholder="City"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                  />
                  <input
                    placeholder="State"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                  />
                  <input
                    placeholder="ZIP"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Payment
              </p>
              <div className="space-y-3">
                <input
                  placeholder="Card number"
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="MM / YY"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                  />
                  <input
                    placeholder="CVC"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
                  />
                </div>
              </div>
            </div>

            <button className="w-full bg-primary py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90">
              Place Order — ${total.toFixed(2)}
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Order Summary
            </p>
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 object-cover bg-card border border-border"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {quantity}</p>
                  </div>
                  <p className="text-sm text-foreground">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3 border-t border-border pt-6">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-foreground border-t border-border pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
