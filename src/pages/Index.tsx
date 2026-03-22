import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import backgroundImage from "@/assets/unnamed.png";

const reviews = [
  {
    name: "J. Morrison",
    role: "Expedition Leader",
    rating: 5,
    text: "The Varden Water Straw saved our team during a 30-day trek through the Andes. Absolutely flawless performance in sub-zero conditions.",
  },
  {
    name: "K. Tanaka",
    role: "Search & Rescue",
    rating: 5,
    text: "I've tested every portable power solution on the market. The Varden Powerbank is the only one I trust with my life. Period.",
  },
  {
    name: "A. Bergström",
    role: "Arctic Photographer",
    rating: 5,
    text: "The Varden Solar Pad charged my camera gear through three weeks of overcast Nordic skies. The engineering is remarkable.",
  },
];

const faqs = [
  {
    q: "What if my product arrives damaged?",
    a: "All orders are inspected before shipping. If your item arrives damaged, you must contact us within 24 hours of delivery with clear photos of the packaging and the product. Claims submitted after this period may not be accepted."
  },
  {
    q: "Do you guarantee the condition of products after delivery?",
    a: "Once an order has been successfully delivered, responsibility for the product transfers to the customer. We are not responsible for damage caused after delivery, including improper handling, storage, or external factors."
  },
  {
    q: "What if the product stops working or becomes defective later?",
    a: "Our products are provided as-is. We do not guarantee that products will function indefinitely or remain free from wear over time. Product lifespan may vary depending on usage, storage conditions, and other external factors."
  },
  {
    q: "Are you responsible for shipping delays or courier issues?",
    a: "Shipping is handled by third-party courier services. While we do our best to process orders quickly, we are not responsible for delays, lost packages, or damages caused during transit by the shipping provider."
  },
  {
    q: "Can I return a product if I change my mind?",
    a: "Returns based on personal preference or change of mind are generally not accepted unless explicitly stated otherwise. Please review product descriptions carefully before placing an order."
  },
  {
    q: "Do you guarantee product compatibility or suitability?",
    a: "Customers are responsible for ensuring the product is suitable for their intended use before purchasing. We cannot guarantee compatibility or suitability for every individual situation."
  },
  {
    q: "What happens if the product degrades over time?",
    a: "Certain products may naturally degrade, wear out, or change in quality over time due to normal usage, environmental conditions, or storage practices. We are not responsible for natural degradation after delivery."
  },
  {
    q: "Do you accept liability for indirect damages?",
    a: "We are not liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products."
  }
];

const products = [
  {
    id: "water-straw",
    title: "Varden Water Straw",
    price: 54.95,
    comparePrice: 89.95,
    images: ["/products/strawmain.webp"],
    productType: "Survival Gear",
  },
  {
    id: "solar-pad",
    title: "Varden Solar Pad",
    price: 69.95,
    comparePrice: 109.95,
    images: ["/products/padmain.webp"],
    productType: "Survival Gear",
  },
  {
    id: "powerbank",
    title: "Varden Powerbank",
    price: 89.95,
    comparePrice: 149.95,
    images: ["/products/powerbankmain.webp"],
    productType: "Survival Gear",
  }
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center px-6 py-48 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative text-[10px] uppercase tracking-[0.4em] text-muted-foreground z-10"
        >
          Premium Survival Gear
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-8 font-serif text-5xl leading-tight tracking-tight text-foreground md:text-7xl z-10"
        >
          Engineered for
          <br />
          the <span className="text-[hsl(var(--copper))]">Adventurous</span>
        </motion.h1>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-12 border-b border-border pb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-[hsl(var(--copper))]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            The Collection
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-12 border-b border-border pb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-[hsl(var(--copper))]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Field Reports
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-border p-8"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-3 w-3 fill-[hsl(var(--copper))] text-[hsl(var(--copper))]"
                  />
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                "{review.text}"
              </p>
              <div className="mt-6">
                <p className="text-xs font-medium text-foreground">{review.name}</p>
                <p className="text-[10px] text-muted-foreground">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-3xl px-6 pb-32">
        <div className="mb-12 border-b border-border pb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-[hsl(var(--copper))]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Frequently Asked Questions
          </p>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="pb-5"
                >
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
