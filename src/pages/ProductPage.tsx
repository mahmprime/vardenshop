import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Shield, ChevronDown } from "lucide-react";

interface ProductSpec {
  label: string;
  value: string;
}

interface ShopifyProduct {
  id: string;
  variantId: string;
  title: string;
  productType: string;
  longDescription?: string;
  image: string;
  images: string[];
  price: number;
  comparePrice?: number;
  specs?: ProductSpec[];
  video?: string;
}

const productDetails: Record<string, Partial<ShopifyProduct>> = {
  "7471258632263": {
    comparePrice: 89.95,
    description: "Professional-grade survival knife designed for extreme conditions.",

    longDescription: `
      <p>Designed for adventurers who refuse to compromise, the VARDEN Power Bank is more than just a battery—it is an essential life-line for the modern explorer. Whether you are trekking through remote mountain ranges, setting up camp in the deep woods, or facing unexpected power outages during emergency situations, this rugged power solution ensures that your communication and navigation devices never go dark. Engineered for the toughest environments, it combines high-capacity storage with the ultimate reliability of renewable energy, making it a cornerstone of any professional survival kit or weekend camping setup.</p>

<img src="/products/powerbank1.png" class="my-10 w-70% rounded-lg"/>

<div class="my-6">
  <h3 class="text-xl font-bold mb-4">Key Features:</h3>
  <ul class="list-none space-y-4">
    <li>
      <strong>Dual-Charging Technology:</strong> Never be stranded without options in the field. This versatile unit allows you to charge via a standard USB wall outlet before your journey begins for a full core of energy, or utilize the integrated high-efficiency polycrystalline solar panel to top up your levels using nothing but the power of the sun while you are on the move. It is the perfect balance between high-speed grid charging and sustainable off-grid independence.
    </li>
    <li>
      <strong>Superior Stability & Safety:</strong> Performance you can trust when it matters most. The built-in "Powerful Chips" are specifically tuned to ensure a consistent, stable voltage output, achieving a charging efficiency of over 78%. This advanced circuitry is designed to get your gear back to full power faster and more reliably than standard portable chargers, even in fluctuating environmental conditions.
    </li>
    <li>
      <strong>Intelligent Protection:</strong> Your expensive electronics are in safe hands. Our advanced thermal management system actively monitors internal components to keep the operating temperature below 45°C. This effectively prevents dangerous overcharging, short-circuiting, and overheating, fully protecting the battery lifespan of both the power bank and your mission-critical smartphone or GPS device.
    </li>
    <li>
      <strong>Field-Ready Durability:</strong> Built to survive the harshest elements nature can throw at you. The VARDEN Power Bank features a rugged, shock-resistant housing designed to withstand accidental drops on rocky terrain and rough handling. Equipped with a powerful built-in LED flashlight for night navigation and a specialized compass hanger on the heavy-duty carabiner, it ensures you always find your way home, even in total darkness.
    </li>
  </ul>
</div>

<img src="/products/powerbank2.png" class="my-10 w-70% rounded-lg"/>

<div class="my-6">
  <h3 class="text-xl font-bold mb-2">Advanced Technical Specifications and Operation:</h3>
  <p>This device is optimized for maximum utility with a 4.06in length and 2.24in width, making it highly portable. It features a Dual Output system: Output 1 (DC 5V/1A) for standard devices and Output 2 (DC 5V/2.1A) for high-speed charging requirements. The input is rated at DC 5V/1.0A for traditional recharging.</p>
  
  <p class="mt-4"><strong>Operation Guide:</strong><br/>
  Managing your light and power is simple. A short press activates the blue LED indicators to show current battery levels. A long press toggles the high-intensity LED light into steady mode. While in steady mode, a single press cycles through the strobe and rapid strobe emergency modes, while a double press turns the light off completely. Blue "Pilot Lamp" indicators provide real-time feedback on your power status, so you are never caught off guard.</p>
</div>

<p class="mt-6">The ergonomic anti-slip handle and reinforced side-grips ensure a perfect, secure hold in wet, cold, or extreme survival situations where dexterity might be limited. Even when wearing thick tactical gloves or dealing with rain-slicked gear, the device remains easy to handle and operate. Choose VARDEN—your smart choice for professional-grade power in the palm of your hand.</p>
    `,

    images: [
      "/products/powerbank1.png",
      "/products/powerbank2.png"
    ],

    

    specs: [
      { label: "Blade Material", value: "Carbon Steel" },
      { label: "Blade Length", value: "18 cm" },
      { label: "Weight", value: "320 g" }
    ]
  },

  "7471258665031": {
    comparePrice: 54.95,
    description: "Professional-grade survival knife designed for extreme conditions.",

    longDescription: `
      <p>Designed for adventurers who refuse to compromise, the VARDEN Solar Pad is more than just a charging plate—it is an essential energy source for the modern explorer. Whether you are trekking through remote mountain ranges, setting up a base camp in the deep woods, or requiring a sustainable backup for your monitoring devices, this ultra-slim solar solution ensures that your essential electronics stay powered by the sun. Engineered for maximum portability and efficiency, it brings the ultimate reliability of renewable energy to any professional survival kit or outdoor setup.</p>

<img src="/products/solar1.png" class="my-10 w-70% rounded-lg"/>

<div class="my-6">
  <h3 class="text-xl font-bold mb-4">Key Features:</h3>
  <ul class="list-none space-y-4">
    <li>
      <strong>Advanced Polycrystalline Efficiency:</strong> Harness the power of the sun with our A-grade polycrystalline silicon chips. This technology is specifically designed to provide a steady 5V working voltage, ensuring your electronic products receive consistent energy flow even in varying sunlight conditions. It is the perfect tool for maintaining independence from the grid.
    </li>
    <li>
      <strong>Integrated Lamination Process:</strong> Durability meets sophisticated engineering. The VARDEN Solar Pad utilizes an EVA laminated integrated process, creating a seamless and resilient surface that protects the internal solar cells. This specialized construction ensures the panel can withstand the rigors of travel while maintaining a professional, sleek profile.
    </li>
    <li>
      <strong>Versatile Device Compatibility:</strong> Power a wide range of mission-critical gear. With a working current of 0-400MA, this panel is optimized to charge 3.6V-5V electronic products, including smartphones, portable fans, flashlights, and even remote monitoring devices. It serves as a universal energy gateway for all your small-scale tactical and recreational electronics.
    </li>
    <li>
      <strong>Ultra-Portable Form Factor:</strong> Designed with the weight-conscious traveler in mind. Measuring at just 157 * 94MM, this compact panel fits effortlessly into any backpack compartment or emergency bag. The lightweight design ensures that you can carry a constant power source without the bulk, making it a "must-have" for long-distance expeditions.
    </li>
  </ul>
</div>

<img src="/products/solar2.png" class="my-10 w-70% rounded-lg"/>

<div class="my-6">
  <h3 class="text-xl font-bold mb-2">Advanced Technical Specifications and Operation:</h3>
  <p>The VARDEN Solar Pad is built for direct utility, featuring a standard USB output port for maximum compatibility. The package includes a 50CM USB cable, providing ample length for connecting your devices while the panel is positioned for optimal sunlight. Operating at a 5V standard, it is the ideal companion for direct-fill charging of secondary batteries or low-draw devices.</p>
  
  <p class="mt-4"><strong>Operation Guide:</strong><br/>
  Using the Solar Pad is straightforward: place the panel in direct sunlight to begin the energy conversion process. For maximum efficiency, ensure the panel is "drying and filling"—exposed to clear, direct rays without obstruction. Please note that this product is a direct-conversion device and does not have an internal storage function; for the best performance in all weather conditions, we recommend using it to charge an external battery pack or power bank.</p>
</div>

<p class="mt-6">The seamless edges and industrial-grade finish ensure the VARDEN Solar Pad remains reliable in extreme outdoor environments. Whether you are using it for a quick emergency boost or as a primary charging station for your small devices, its simple "plug-and-play" nature makes it indispensable. Choose VARDEN—your smart choice for professional-grade solar energy wherever the trail takes you.</p>
    `,

    images: [
      "/products/solar1.png",
      "/products/solar2.png"
    ],

    

    specs: [
      { label: "Blade Material", value: "Carbon Steel" },
      { label: "Blade Length", value: "18 cm" },
      { label: "Weight", value: "320 g" }
    ]
  },

  "7471265218631": {
    comparePrice: 69.95,
    description: "Professional-grade survival knife designed for extreme conditions.",

    longDescription: `
      <p>Designed for adventurers who refuse to compromise, the VARDEN H1 Filter is more than just a straw—it is an essential life-line for the modern explorer. Whether you are trekking through remote mountain ranges, setting up camp in the deep woods, or facing unexpected water shortages during emergency situations, this high-performance purification tool ensures that any surface water source becomes safe to drink. Engineered for the toughest environments, it combines medical-grade filtration precision with the ultimate reliability of chemical-free technology, making it a cornerstone of any professional survival kit or outdoor travel gear.</p>

<img src="/products/straw1.png" class="my-10 w-70% rounded-lg"/>

<div class="my-6">
  <h3 class="text-xl font-bold mb-4">Key Features:</h3>
  <ul class="list-none space-y-4">
    <li>
      <strong>Medical-Grade Filtration Precision:</strong> Experience unparalleled safety with our advanced hollow fiber filaments. Boasting a 0.01-micron filter precision, the VARDEN H1 effectively removes 99.9999% of waterborne bacteria and 99.9% of aquatic parasitic protozoa. It turns risky wastewater into high-quality drinking water that exceeds the tap water standards of many developed countries.
    </li>
    <li>
      <strong>Chemical-Free Purification:</strong> Your health is our priority. Unlike traditional purifiers that rely on iodine or other chemical mediums, the VARDEN H1 uses a new generation of hollow fiber film. This ensures there are no chemical aftertastes, side effects, or long-term health concerns, providing you with clean, safe water exactly as nature intended.
    </li>
    <li>
      <strong>Extreme Lifespan & Performance:</strong> Built for the long haul. Under standard outdoor conditions, this filter straw can purify up to 1000 liters of water. In controlled laboratory environments, it has reached a staggering 1,500-liter yield—1.6 times its design life—ensuring you have a "defense weapon" that lasts through multiple expeditions or long-term disaster recovery.
    </li>
    <li>
      <strong>High-Flow Tactical Design:</strong> Get hydrated without the struggle. With an average flow rate of 280 ml/min at the start of use, the VARDEN H1 provides immediate relief from thirst. The ultra-lightweight 75g body and attached tactical rope allow you to carry it around your neck or secure it to your gear for instant access in high-pressure situations.
    </li>
  </ul>
</div>

<img src="/products/straw2.png" class="my-10 w-70% rounded-lg"/>

<div class="my-6">
  <h3 class="text-xl font-bold mb-2">Advanced Technical Specifications and Performance:</h3>
  <p>The VARDEN H1 Filter is optimized for maximum utility with a 20cm length and 3cm diameter, fitting perfectly into any side pocket. It is engineered to handle extreme turbidity, with lab tests showing an average turbidity decrease of 99.6%—taking inflow water from 104 NTU down to a crystal-clear 0.4 NTU effluent.</p>
  
  <p class="mt-4"><strong>Operation Guide:</strong><br/>
  Using the H1 Filter is simple and intuitive: directly absorb water from any surface source, such as lakes, rivers, or streams. The filter's high-performance membrane acts instantly as you draw water through the straw. For maintenance, the attached rope helps in holding the straw during use or hanging it to dry. This device requires no spare parts or batteries, making it a 100% reliable fail-safe for any off-grid journey.</p>
</div>

<p class="mt-6">The sleek, robust housing ensures the VARDEN H1 remains your most trusted companion in wet, cold, or extreme survival situations. From victims of natural disasters to hardcore backcountry hikers, this filter provides a touch of security when you need it most. Choose VARDEN—your smart choice for professional-grade water purification in the palm of your hand.</p>
    `,

    images: [
      "/products/straw1.png",
      "/products/straw2.png"
    ],

    

    specs: [
      { label: "Blade Material", value: "Carbon Steel" },
      { label: "Blade Length", value: "18 cm" },
      { label: "Weight", value: "320 g" }
    ]
  },
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const { addItem } = useCart();

  
  useEffect(() => {
    if (!id) return;

    const getCleanId = (gidOrId: string | number) => {
      if (!gidOrId) return "";
      const str = String(gidOrId);
      if (str.includes("/")) return str.split("/").pop()!;
      return str;
    };

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/shopify");
        const products = await response.json();

        // DEBUG log
        console.log("ID iz URL-a:", id);
        console.log("Svi proizvodi:", products);
        console.log(
          "Čisti ID-evi proizvoda:",
          products.map((p: any) => getCleanId(p.id))
        );

        const prod = products.find((p: any) => getCleanId(p.id) === id);

        if (!prod) {
          console.warn("Proizvod nije pronađen. ID iz URL-a:", id);
          setProduct(null);
          return;
        }

        console.log("Pronađen proizvod:", prod);

        const cleanId = getCleanId(prod.id);

        const manualData = productDetails[cleanId] || {};

        const shopifyProduct: ShopifyProduct = {
        id: prod.id,
        variantId: prod.variantId,
        title: prod.title,
        productType: prod.productType || "Survival Gear",
        description: manualData.description || "",
        longDescription: manualData.longDescription,
        image: prod.image || "/placeholder.png",
        images: [
          prod.image || "/placeholder.png",
          ...(manualData.images || [])
        ],
        price: prod.price || 0,
        comparePrice: manualData.comparePrice,
        video: manualData.video,
        specs: manualData.specs || [],
      };

        
        setActiveImage(0);

        setProduct(shopifyProduct);
      } catch (error) {
        console.error("Greška pri fetchovanju proizvoda:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16 text-muted-foreground">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16 text-muted-foreground">
        Product not found.
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
                alt={product.title}
                className="h-full w-full object-cover"
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
                  <img
                    src={img}
                    alt={`${product.title} view ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--copper))]">
              {product.productType}
            </p>
            <h1 className="mt-3 font-serif text-4xl text-foreground">
              {product.title}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-3xl font-semibold text-foreground">
                ${product.price.toFixed(2)}
              </span>

              {product.comparePrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}

              {product.comparePrice && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </span>
              )}
            </div>

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
            {product.specs && product.specs.length > 0 && (
              <div className="mt-6 border border-border">
                <button
                  onClick={() => setSpecsOpen(!specsOpen)}
                  className="flex w-full items-center justify-between px-5 py-4 text-xs font-medium uppercase tracking-[0.15em] text-foreground"
                >
                  Technical Specifications
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      specsOpen ? "rotate-180" : ""
                    }`}
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
            )}
          </div>
        </div>
        {product.longDescription && (
        <div className="mt-24 mx-auto max-w-4xl px-6">
          
          <h2 className="font-serif text-3xl mb-8 text-center">
            Product Details
          </h2>

          <div
            className="prose prose-invert max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />
          {product.video && (
          <div className="mt-24">
            <div className="mx-auto max-w-6xl px-6">

              <h2 className="font-serif text-3xl text-center mb-10">
                See It In Action
              </h2>

              <div className="overflow-hidden border border-border shadow-[var(--shadow-copper)]">
                <video
                  className="w-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={product.video} type="video/mp4" />
                </video>
              </div>

            </div>
          </div>
        )}
          

        </div>
        
        
      )}
      </div>
    </motion.div>
  );
};

export default ProductPage;