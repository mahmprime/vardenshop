import React, { createContext, useContext, useState, useCallback } from "react";

// Tip za proizvod iz Shopify-a
export interface ShopifyProduct {
  id: string;           // globalni product ID, npr. gid://shopify/Product/7469572980807
  title: string;
  price: number;        // u broju, npr. 49.99
  image: string;
  productType?: string;
  variantId: string;    // ključ za Shopify cart
}

export interface CartItem {
  product: ShopifyProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: ShopifyProduct) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: ShopifyProduct) => {
    // Provjeri da li proizvod ima variantId
    if (!product.variantId) {
      console.warn(`Product ${product.title} nema variantId i neće biti dodan u cart`);
      return;
    }

    setItems(prev => {
      const existing = prev.find(i => i.product.variantId === product.variantId);
      if (existing) {
        return prev.map(i =>
          i.product.variantId === product.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setItems(prev => prev.filter(i => i.product.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.variantId !== variantId));
    } else {
      setItems(prev =>
        prev.map(i =>
          i.product.variantId === variantId ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};