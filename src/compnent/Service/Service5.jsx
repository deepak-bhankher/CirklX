import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const tags = [
  { text: "Design System", variant: "ghost", tilt: -8, baseY: 6 },
  { text: "Wireframe Design", variant: "ghost", tilt: -4, baseY: 14 },
  { text: "Mobile App Design", variant: "solid", tilt: 5, baseY: -4 },
  { text: "Website Design", variant: "ghost", tilt: -6, baseY: 10 },
  { text: "UX/UI Design", variant: "ghost", tilt: -5, baseY: 4 },
  { text: "Brand Identity", variant: "solid", tilt: 6, baseY: -8 },
  { text: "Landing Page", variant: "ghost", tilt: -7, baseY: 12 },
  { text: "Dashboard", variant: "solid", tilt: 5, baseY: -12 },
  { text: "UI Design", variant: "ghost", tilt: -4, baseY: 8 },
  { text: "Product Design", variant: "solid", tilt: 6, baseY: -6 },
  { text: "Video Shoot", variant: "solid", tilt: -6, baseY: 9 },
  { text: "Video Editing", variant: "ghost", tilt: 5, baseY: -11 },
  { text: "Photo Shoot", variant: "solid", tilt: -5, baseY: 13 },
  { text: "Product Photoshoot", variant: "ghost", tilt: 7, baseY: -7 },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
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

// A single tag that dodges the cursor when it gets close, then
// eases back to its resting spot. The escape distance is capped
// so it always stays close to home, never flies off elsewhere.
function DodgingTag({ tag }) {
  const wrapRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.6 });

  useEffect(() => {
    const AVOID_RADIUS = 110; // how close the cursor needs to be to trigger a dodge
    const MAX_PUSH = 42; // max distance the tag is allowed to run away

    function handleMouseMove(e) {
      const el = wrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = centerX - e.clientX;
      const dy = centerY - e.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < AVOID_RADIUS) {
        const strength = (AVOID_RADIUS - distance) / AVOID_RADIUS; // 0 -> 1
        const angle = Math.atan2(dy, dx);
        x.set(Math.cos(angle) * MAX_PUSH * strength);
        y.set(Math.sin(angle) * MAX_PUSH * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      variants={tagEnter}
      style={{ y: tag.baseY, rotate: tag.tilt }}
      className="inline-block"
    >
      <motion.span
        ref={wrapRef}
        style={{ x: springX, y: springY }}
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
  );
}

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
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-black leading-tight mb-20 md:mb-24"
        >
          Let's Create an{" "}
          <span className="text-[#8FCC00]">Amazing</span>
          <br className="hidden sm:block" />
          <span className="text-[#8FCC00]">Project Together!</span>
        </motion.h2>

        {/* cursor-shy tag cloud */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 max-w-4xl mx-auto"
        >
          {tags.map((tag, i) => (
            <DodgingTag key={`${tag.text}-${i}`} tag={tag} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}