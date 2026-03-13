import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="font-serif text-xl tracking-[0.3em] text-foreground">
              <span>VAR</span><span className="text-[hsl(var(--copper))]">D</span><span>EN</span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Premium survival gear engineered from aerospace-grade materials. Built for those who refuse to compromise.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground">Shop</p>
            <ul className="mt-4 space-y-3">
              {["Water Purification", "Solar Energy", "Portable Power"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground">Company</p>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Technology", to: "/technology" },
                { label: "Our Story", to: "/our-story" },
                { label: "Contact", to: "/" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground">Support</p>
            <ul className="mt-4 space-y-3">
              {["Warranty", "Returns", "Shipping", "FAQ"].map((item) => (
                <li key={item}>
                  <span className="text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} VARDEN. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span key={item} className="text-[10px] tracking-[0.1em] text-muted-foreground hover:text-foreground cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
