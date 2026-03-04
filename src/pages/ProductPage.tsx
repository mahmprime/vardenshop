import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import { useState } from "react";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [specsOpen, setSpecsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link
          to="/"
          className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          ← Back to Collection
        </Link>

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square overflow-hidden border border-border bg-card shadow-[var(--shadow-copper)]">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-opacity duration-500"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square overflow-hidden border bg-card transition-all ${
                    activeImage === i
                      ? "border-[hsl(var(--copper))] shadow-[0_0_12px_-3px_hsl(var(--copper)/0.4)]"
                      : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--copper))]">
              {product.category}
            </p>
            <h1 className="mt-3 font-serif text-4xl text-foreground">{product.name}</h1>
            <p className="mt-2 text-2xl text-foreground">${product.price.toFixed(2)}</p>

            <div className="mt-4 h-px w-16 bg-[hsl(var(--copper)/0.4)]" />

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <button
              onClick={() => addItem(product)}
              className="mt-10 w-full bg-primary py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Add to Cart
            </button>

            {/* Premium Guarantee */}
            <div className="mt-8 flex items-center gap-3 border border-border px-5 py-4">
              <Shield className="h-4 w-4 text-[hsl(var(--copper))]" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-medium text-foreground">Premium Guarantee</p>
                <p className="text-[10px] text-muted-foreground">
                  Lifetime warranty · Free returns · Precision-tested
                </p>
              </div>
            </div>

            {/* Technical Specs Accordion */}
            <div className="mt-6 border border-border">
              <button
                onClick={() => setSpecsOpen(!specsOpen)}
                className="flex w-full items-center justify-between px-5 py-4 text-xs font-medium uppercase tracking-[0.15em] text-foreground"
              >
                Technical Specifications
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${specsOpen ? "rotate-180" : ""}`}
                  strokeWidth={1.5}
                />
              </button>
              {specsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="border-t border-border px-5 py-4"
                >
                  <div className="space-y-3">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between">
                        <span className="text-xs text-muted-foreground">{spec.label}</span>
                        <span className="text-xs text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
