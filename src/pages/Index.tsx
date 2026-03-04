import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Footer from "@/components/Footer";
import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import backgroundImage from "@/assets/unnamed.png"; // Import pozadinske slike

const reviews = [
  {
    name: "J. Morrison",
    role: "Expedition Leader",
    rating: 5,
    text: "The H1 Filter saved our team during a 30-day trek through the Andes. Absolutely flawless performance in sub-zero conditions.",
  },
  {
    name: "K. Tanaka",
    role: "Search & Rescue",
    rating: 5,
    text: "I've tested every portable power solution on the market. The Power Core is the only one I trust with my life. Period.",
  },
  {
    name: "A. Bergström",
    role: "Arctic Photographer",
    rating: 5,
    text: "The Solar Fold charged my camera gear through three weeks of overcast Nordic skies. The engineering is remarkable.",
  },
];

const faqs = [
  {
    q: "What is your warranty policy?",
    a: "Every VARDEN product comes with a lifetime warranty against manufacturing defects. We stand behind our engineering without compromise.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard orders ship within 48 hours. Domestic delivery takes 3–5 business days. International orders arrive within 7–14 business days.",
  },
  {
    q: "Are your products field-tested?",
    a: "Every product undergoes 2,000+ hours of field testing across extreme environments — from arctic tundra to desert heat — before release.",
  },
  {
    q: "Do you offer returns?",
    a: "Yes. We offer a 60-day no-questions-asked return policy. If a VARDEN product doesn't meet your expectations, send it back for a full refund.",
  },
  {
    q: "Can the Solar Fold charge in cloudy conditions?",
    a: "Yes. The SunPower monocrystalline cells are optimized for both direct and diffused light, maintaining up to 70% efficiency under overcast skies.",
  },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center px-6 py-48 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay preko slike za tamniji izgled */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* GRADIENT FADE OUT - Ovo rešava prelaz na dnu */}
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
          the <span className="text-[hsl(var(--copper))]">Unforgiving</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground z-10"
        >
          Every VARDEN product is precision-crafted from aerospace-grade materials.
          Built to perform when failure is not an option.
        </motion.p>
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

      {/* Video Section */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-12 border-b border-border pb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-[hsl(var(--copper))]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            In the Field
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video overflow-hidden border border-border bg-card"
        >
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&controls=1"
            title="VARDEN Field Test"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </motion.div>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Watch our gear endure the harshest conditions on Earth. From the Arctic Circle to the Sahara — VARDEN performs where others fail.
        </p>
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
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;