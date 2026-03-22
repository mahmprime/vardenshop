import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const Checkout = () => {
  const { items, subtotal } = useCart();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-16">
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        <Link
          to="/"
          className="mt-6 border border-border px-6 py-3 text-[10px] uppercase tracking-[0.2em]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const baseInput =
    "w-full bg-black border text-white px-4 py-3 rounded-md focus:outline-none";



  const createOrderFromServer = async () => {
    setLoading(true);

    try {
      const paypalItems = items.map((i, idx) => ({
        name: i.product?.title || `Item ${idx + 1}`,
        unit_amount: {
          currency_code: "USD",
          value: Number(i.product?.price || 0).toFixed(2)
        },
        quantity: (i.quantity || 1).toString(),
        category: "PHYSICAL_GOODS"
      }));

      const res = await fetch("https://vardensurvival.com/.netlify/functions/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subtotal: Number(subtotal.toFixed(2)),
          tax: Number(tax.toFixed(2)),
          total: Number(total.toFixed(2)),
          items: paypalItems
          // shipping više nije potrebno
        })
      });

      const data = await res.json();
      setLoading(false);

      return data.id;
    } catch (err) {
      console.error("Failed to create PayPal order:", err);
      setLoading(false);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD"
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-16"
      >
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="font-serif text-3xl text-foreground">Checkout</h1>

          <div className="mt-12 grid gap-16 lg:grid-cols-5">
            {/* FORM */}
            <div className="space-y-8 lg:col-span-3">

             

              {/* PAYPAL */}
              <div className="mt-6">
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "rect",
                    label: "paypal"
                  }}

                  createOrder={createOrderFromServer}

                  onApprove={async (data, actions) => {
                    await actions.order!.capture();
                    setSuccess(true);
                  }}

                  onError={(err) => {
                    console.error("PayPal Checkout Error:", err);
                  }}

                  disabled={loading}
                />
              </div>

            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-6">
                Order Summary
              </p>

              <div className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <img
                      src={product.image}
                      className="h-14 w-14 object-cover border"
                    />

                    <div className="flex-1">
                      <p>{product.name}</p>
                      <p className="text-xs">
                        Qty {quantity}
                      </p>
                    </div>

                    <p>
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3 border-t pt-6">

                <div className="flex justify-between text-xs">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm border-t pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* SUCCESS MODAL */}
        {success && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-black border border-gray-600 p-8 rounded-lg text-center max-w-md">

              <h2 className="text-2xl mb-4">
                Payment Successful 🎉
              </h2>

              <p className="text-sm text-gray-400 mb-6">
                Thank you for your purchase. Your order has been received.
              </p>

              <Link
                to="/"
                className="border border-gray-500 px-6 py-3 text-xs uppercase tracking-widest"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        )}
      </motion.div>
    </PayPalScriptProvider>
  );
};

export default Checkout;