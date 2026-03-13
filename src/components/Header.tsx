import { Link } from "react-router-dom";
import { ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { openCart, itemCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-xl tracking-[0.3em] text-foreground">
          <span>VAR</span><span className="text-[hsl(var(--copper))]">D</span><span>EN</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {["Shop", "Technology", "Our Story"].map((label) => (
            <Link
              key={label}
              to={label === "Shop" ? "/" : `/${label.toLowerCase().replace(" ", "-")}`}
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button className="text-muted-foreground transition-colors hover:text-foreground">
            <User className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={openCart}
            className="relative text-muted-foreground transition-colors hover:text-foreground"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-primary text-[9px] font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
