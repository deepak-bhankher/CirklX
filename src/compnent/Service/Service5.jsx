import React from "react";
import { motion } from "framer-motion";

const tags = [
  { text: "Design System", variant: "ghost", rotate: -6 },
  { text: "Prototype", variant: "solid", rotate: 5 },
  { text: "Wireframe Design", variant: "ghost", rotate: -3 },
  { text: "Mobile App Design", variant: "solid", rotate: 4 },
  { text: "Website Design", variant: "ghost", rotate: -5 },
  { text: "Illustration", variant: "solid", rotate: 6 },
  { text: "UX/UI Design", variant: "ghost", rotate: -4 },
  { text: "Brand Identity", variant: "solid", rotate: 5 },
  { text: "Landing Page", variant: "ghost", rotate: -6 },
  { text: "Dashboard", variant: "solid", rotate: 6 },
  { text: "UI Design", variant: "ghost", rotate: -3 },
  { text: "Product Design", variant: "solid", rotate: 4 },
  { text: "Brand Identity", variant: "ghost", rotate: -5 },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const tagEnter = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Service5() {
  return (
    <section className="relative bg-white py-24 md:py-32 px-6 overflow-hidden">
      {/* soft ambient lime glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#D6FF01]/20 blur-[120px]" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-black leading-tight mb-16 md:mb-20"
        >
          Let's Create an{" "}
          <span className="text-[#8FCC00]">Amazing</span>
          <br className="hidden sm:block" />
          <span className="text-[#8FCC00]">Project Together!</span>
        </motion.h2>

        {/* floating tag cloud */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {tags.map((tag, i) => (
            <motion.div
              key={`${tag.text}-${i}`}
              variants={tagEnter}
              custom={i}
              className="inline-block"
            >
              <motion.span
                animate={{
                  y: [0, -10, 0, 8, 0],
                  rotate: [tag.rotate, tag.rotate + 4, tag.rotate, tag.rotate - 4, tag.rotate],
                }}
                transition={{
                  duration: 5 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
                whileHover={{ scale: 1.08, y: -6 }}
                className={
                  "inline-block px-5 py-2.5 rounded-full text-sm sm:text-base font-medium whitespace-nowrap cursor-default select-none shadow-sm transition-shadow duration-300 hover:shadow-lg " +
                  (tag.variant === "solid"
                    ? "bg-[#D6FF01] text-black"
                    : "bg-[#F2F2F2] text-black/70 border border-black/5")
                }
              >
                {tag.text}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}