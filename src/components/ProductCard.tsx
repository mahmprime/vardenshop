import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import useSound from "use-sound";

import hoverSfx from "@/assets/sounds/plug.mp3"; 
import clickSfx from "@/assets/sounds/futuristic-ui-positive-selection-davies-aguirre-2-2-00-00.mp3";

// Tip proizvoda koji kartica prima (ShopifyProduct kompatibilan)
interface ProductCardProps {
  product: {
    id: string;
    variantId?: string; // obavezno za cart
    title: string;
    price: number;
    images: string[];
    productType?: string;
  };
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const [playHover] = useSound(hoverSfx, { volume: 0.15 });
  const [playClick] = useSound(clickSfx, { volume: 0.4 });

  const handleCardClick = (e: React.MouseEvent) => {
    // Ako je kliknuto na dugme, ne navigiraj
    if ((e.target as HTMLElement).closest('button')) return;

    e.preventDefault();
    playClick();

    // Navigacija ka /product/:id (uzmi "čist" ID iz gid)
    setTimeout(() => {
      const cleanId = product.id.includes("/") ? product.id.split("/").pop() : product.id;
      navigate(`/product/${cleanId}`);
    }, 150);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group cursor-pointer relative"
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden bg-card border border-border transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(184,115,51,0.15)]">
        {/* LASER SA REPOM (COPPER TRAIL) */}
        <svg
          className="absolute inset-0 z-10 h-full w-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }} 
        >
          <motion.rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            stroke="hsl(var(--copper))"
            strokeWidth="2" 
            strokeDasharray="30 70" 
            strokeLinecap="round" 
            animate={isHovered ? { strokeDashoffset: [0, -100], opacity: 1 } : { opacity: 0 }}
            transition={{
              strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.3 }
            }}
            style={{ 
              filter: `
                drop-shadow(0 0 5px hsl(var(--copper))) 
                drop-shadow(0 0 15px hsl(var(--copper)/0.8)) 
                drop-shadow(0 0 30px hsl(var(--copper)/0.4))
              `,
            }}
          />
        </svg>

        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--copper))]">
          {product.productType || "Category"}
        </p>
        <h3 className="font-serif text-lg text-foreground transition-colors duration-300 group-hover:text-[hsl(var(--copper))]">
          {product.title}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm text-foreground font-medium">${product.price.toFixed(2)}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();

              // Dodaj u cart sa variantId
              addItem({
                id: product.id,
                variantId: product.variantId || product.id.split("/").pop(),
                title: product.title,
                price: product.price,
                image: product.images[0],
                quantity: 1,
              });
            }}
            className="relative z-20 border border-border px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-foreground transition-all 
              hover:bg-[hsl(var(--copper))] hover:border-[hsl(var(--copper))] hover:text-white"
          >
            Quick Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;