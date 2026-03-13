import productFilter from "@/assets/product-filter.png";
import productFilter2 from "@/assets/product-filter-2.png";
import productFilter3 from "@/assets/product-filter-3.png";
import productSolar from "@/assets/product-solar.png";
import productSolar2 from "@/assets/product-solar-2.png";
import productSolar3 from "@/assets/product-solar-3.png";
import productPowerbank from "@/assets/product-powerbank.png";
import productPowerbank2 from "@/assets/product-powerbank-2.png";
import productPowerbank3 from "@/assets/product-powerbank-3.png";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "h1-filter",
    name: "VARDEN H1 Filter",
    category: "Water Purification",
    price: 120.0,
    image: productFilter,
    images: [productFilter, productFilter2, productFilter3],
    description:
      "Engineered from aerospace-grade materials, the H1 Filter removes 99.99% of waterborne pathogens. A single unit purifies up to 4,000 liters — enough for years of use in the most demanding conditions.",
    specs: [
      { label: "Filtration", value: "0.01 micron hollow fiber" },
      { label: "Capacity", value: "4,000 liters" },
      { label: "Flow Rate", value: "1.5 L/min" },
      { label: "Weight", value: "56g" },
      { label: "Material", value: "Aerospace-grade titanium housing" },
    ],
  },
  {
    id: "solar-fold",
    name: "VARDEN Solar Fold",
    category: "Solar Energy",
    price: 250.0,
    image: productSolar,
    images: [productSolar, productSolar2, productSolar3],
    description:
      "Ultra-thin monocrystalline cells deliver 28W of power from a panel that folds to the size of a journal. ETFE-coated for total weather resistance, the Solar Fold charges any USB device in direct or diffused light.",
    specs: [
      { label: "Output", value: "28W / 5V 3.4A" },
      { label: "Cell Type", value: "SunPower monocrystalline" },
      { label: "Folded Size", value: "28 × 16 × 2.5 cm" },
      { label: "Weight", value: "680g" },
      { label: "Coating", value: "ETFE lamination, IP67" },
    ],
  },
  {
    id: "power-core",
    name: "VARDEN Power Core",
    category: "Portable Power",
    price: 310.0,
    image: productPowerbank,
    images: [productPowerbank, productPowerbank2, productPowerbank3],
    description:
      "20,000 mAh of LiFePO4 power in a mil-spec enclosure. Built-in MPPT solar charging, dual USB-C PD outputs, and an integrated LED array. The Power Core is rated for 2,000+ charge cycles.",
    specs: [
      { label: "Capacity", value: "20,000 mAh / 72 Wh" },
      { label: "Outputs", value: "2× USB-C PD 65W, 1× USB-A QC 3.0" },
      { label: "Solar Input", value: "MPPT, 24W max" },
      { label: "Cycles", value: "2,000+" },
      { label: "Rating", value: "MIL-STD-810H, IP68" },
    ],
  },
];
