import { motion } from "framer-motion";

const Technology = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen pt-16"
  >
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        Innovation
      </p>
      <h1 className="mt-6 font-serif text-5xl text-foreground">Technology</h1>
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Every VARDEN product undergoes 18 months of research and development. We source
        aerospace-grade titanium, military-spec polymers, and SunPower monocrystalline cells
        to create gear that performs in the harshest environments on Earth.
      </p>
    </section>

    <section className="mx-auto max-w-5xl px-6 pb-32">
      <div className="grid gap-px border border-border sm:grid-cols-3">
        {[
          { stat: "0.01μm", label: "Filtration precision" },
          { stat: "2,000+", label: "Charge cycles" },
          { stat: "MIL-STD", label: "810H certified" },
        ].map((item) => (
          <div key={item.label} className="border border-border px-8 py-12 text-center">
            <p className="font-serif text-3xl text-foreground">{item.stat}</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

export default Technology;
