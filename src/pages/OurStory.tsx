import { motion } from "framer-motion";

const OurStory = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen pt-16"
  >
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        Since 2019
      </p>
      <h1 className="mt-6 font-serif text-5xl text-foreground">Our Story</h1>
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        VARDEN was founded by a team of expedition engineers who were tired of gear that
        failed when it mattered most. We set out to create survival equipment with the
        same standards applied to aerospace and defense — uncompromising materials,
        relentless testing, and design that respects the seriousness of the mission.
      </p>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Every product carries our name because we stake our reputation on it. From the
        raw materials to the final quality inspection, nothing leaves our facility until
        it meets the VARDEN standard.
      </p>
    </section>
  </motion.div>
);

export default OurStory;
