import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import DestinationsGrid from "./DestinationsGrid";

const ACCENT = "#D6ff01";

const DESTINATIONS = [
  { id: 1, city: "Istanbul", image: "work1.jpeg" },
  { id: 2, city: "Bali", image: "work2.jpeg" },
  { id: 3, city: "UAE", image: "work3.jpeg" },
  { id: 4, city: "Ha Long", image: "work4.jpeg" },
  { id: 5, city: "Marrakech", image: "work5.jpeg" },
  { id: 6, city: "Kyoto", image: "work6.jpeg" },
  { id: 7, city: "Santorini", image: "work7.jpeg" },
  { id: 8, city: "Santorini", image: "work8.jpeg" },
  { id: 9, city: "Santorini", image: "work9.jpeg" },
  { id: 10, city: "Santorini", image: "work10.jpeg" },
  { id: 11, city: "Santorini", image: "work11.jpeg" },
  { id: 12, city: "Santorini", image: "work12.jpeg" },
  { id: 13, city: "Santorini", image: "work13.jpeg" },
  { id: 14, city: "Santorini", image: "work14.jpeg" },
  { id: 15, city: "Santorini", image: "work15.jpeg" },
];

/* ── Single Card — image only + small username below ────────── */
function DestinationCard({ d }) {
  return (
    <div className="group shrink-0 flex flex-col items-center gap-2.5" style={{ width: "280px" }}>
      <div
        className="relative overflow-hidden rounded-[28px]"
        style={{
          width: "280px",
          height: "380px",
          boxShadow: `0 20px 48px -14px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`,
          transform: "translateZ(0)",
        }}
      >
        <img
          src={d.image}
          alt={d.country}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <span className="text-[11px] font-medium text-white/40 tracking-wide">
        {d.city}
      </span>
    </div>
  );
}

/* ── Main Export ─────────────────────────────────────────────── */
export default function Work5() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], ["0px", "-30px"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.5]);

  // Duplicate for seamless loop
  const LOOP = [...DESTINATIONS, ...DESTINATIONS];
  const [showGrid, setShowGrid] = useState(false);

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        .marquee-track {
          animation: marquee 38s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        data-theme="dark"
        className="relative w-full bg-[#070707] overflow-hidden py-24 sm:py-32"
      >
        {/* ── Background glows ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(214,255,1,0.05) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full blur-[110px]"
            style={{ background: "rgba(80,40,180,0.035)" }}
          />
          <div
            className="absolute -bottom-20 left-0 w-[400px] h-[400px] rounded-full blur-[90px]"
            style={{ background: "rgba(0,120,80,0.03)" }}
          />
        </div>

        {/* ── Grid ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        {/* ── Header ── */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative max-w-[1320px] mx-auto px-5 sm:px-10 mb-14 sm:mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            {/* Left */}
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 mb-5"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 0 12px ${ACCENT}`,
                  }}
                />
                <span
                  className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase"
                  style={{ color: ACCENT }}
                >
                  Top Destinations
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-white leading-[1.04] tracking-tight"
              >
                Where the world
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(130deg, #fff 20%, ${ACCENT} 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  is booking now
                </span>
              </motion.h2>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-3 sm:items-end"
            >
              <p className="text-sm sm:text-[15px] text-white/38 max-w-[270px] sm:text-right leading-relaxed">
                Live counts from this week's hottest packages across our top
                markets.
              </p>
              <div className="flex items-center sm:justify-end gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
                <span className="text-[11px] text-white/28 font-medium tracking-wide">
                  Live · Updated now
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Infinite Marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden"
        >
          {/* Left fade mask */}
          <div
            className="absolute left-0 top-0 h-full w-24 sm:w-40 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, #070707 0%, transparent 100%)",
            }}
          />
          {/* Right fade mask */}
          <div
            className="absolute right-0 top-0 h-full w-24 sm:w-40 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to left, #070707 0%, transparent 100%)",
            }}
          />

          {/* Track */}
          <div
            className="marquee-track flex gap-5 sm:gap-6 py-4 px-3"
            style={{ width: "max-content" }}
          >
            {LOOP.map((d, i) => (
              <DestinationCard key={`${d.id}-${i}`} d={d} />
            ))}
          </div>
        </motion.div>

        {/* ── Bottom stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[1320px] mx-auto px-5 sm:px-10 mt-14 sm:mt-16"
        >
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] px-6 sm:px-10 py-5 sm:py-6 border border-white/[0.07] bg-[#0e0e0e]">
            {[
              { value: "7,000+", label: "Hotels worldwide" },
              { value: "199+", label: "Active packages" },
              { value: "4.8★", label: "Average rating" },
              { value: "2M+", label: "Happy travellers" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-0.5"
              >
                <span
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: ACCENT }}
                >
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm text-white/35 font-medium">
                  {s.label}
                </span>
              </motion.div>
            ))}

            {/* CTA */}
            <AnimatePresence>
              {!showGrid && (
                <motion.button
                  key="cta-btn"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowGrid(true)}
                  className="flex items-center cursor-pointer gap-2.5 px-5 py-2.5 rounded-2xl text-black text-sm font-bold tracking-tight shrink-0 transition-shadow duration-300"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 8px 30px -8px ${ACCENT}70`,
                  }}
                >
                  View all destinations
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showGrid && <DestinationsGrid onClose={() => setShowGrid(false)} />}
      </AnimatePresence>
    </>
  );
}