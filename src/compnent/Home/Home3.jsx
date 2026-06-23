
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  {
    to: 140,
    prefix: "",
    suffix: "M+",
    title: "Total Views for Clients",
    desc: "Operating in more than countries to support underserved communities",
  },
  {
    to: 8,
    prefix: "",
    suffix: "k+",
    title: "Videos Edited for Clients",
    desc: "On a mission to uplift underserved communities in over countries worldwide.",
  },
  {
    to: 32,
    prefix: "",
    suffix: "M+",
    title: "Revenue Generated for Clients",
    desc: "Partnering with communities in over 50 countries to create lasting, inclusive change.",
  },
];

// Counts up from 0 to `to` once the element scrolls into view, then holds
// at the final value (matches the count-up used in Work1).
function CountUp({ to, prefix = "", suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  const display = Number.isInteger(to) ? Math.round(value) : value.toFixed(1);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function Home3() {
  return (
    <section className="w-full bg-[#F4F2ED] py-16 sm:py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.05)]
          px-6 sm:px-10 md:px-14 py-12 sm:py-16"
      >
        {/* ---- Badge ---- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center rounded-lg border border-black/20 hover:bg-black hover:text-[#D6ff01] transition-all duration-300   cursor-pointer px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
            OUR SHORT STORY
          </span>
        </motion.div>

        {/* ---- Heading with highlighted words ---- */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-center text-2xl sm:text-3xl md:text-[2.1rem] font-medium text-[#15140F] leading-snug max-w-3xl mx-auto"
        >
          We're a <span className="text-[#FF5722] font-semibold">short-form</span>{" "}
          video editing agency helping creators and brands turn raw clips into{" "}
          <span className="text-[#FF5722] font-semibold">viral Reels</span>,
          Shorts, and{" "}
          <span className="text-[#FF5722] font-semibold">TikToks</span> — fast,
          engaging, and tailored to trends that perform.
        </motion.h2>

        {/* ---- Stats ---- */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: "easeOut" }}
              className="text-left"
            >
              <p className="text-4xl sm:text-5xl font-extrabold text-[#15140F] leading-none mb-4 tracking-tight">
                <CountUp
                  to={stat.to}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={1.6 + i * 0.2}
                />
              </p>
              <h3 className="text-sm font-bold text-[#15140F] mb-2">
                {stat.title}
              </h3>
              <p className="text-xs text-black/50 leading-relaxed max-w-[240px]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Home3;