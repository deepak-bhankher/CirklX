import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";


const STATS = [
 {
    to: 5,
    prefix: "",
    suffix: "M+",
    title: "Total Views for Clients",
    desc: "Generated across Reels, Shorts & Posts for brands and creators we've worked with.",
  },
  {
    to: 2.5,
    prefix: "",
    suffix: "k  +",
    title: "Videos Edited for Clients",
    desc: "Cut, styled, and optimized to perform — built for how people actually scroll today.",
  },
  {
    to: 100,
    prefix: "",
    suffix: "+",
    title: "Brands & Creators Served",
    desc: "From local Hisar businesses to creators — trusted to grow their presence online.",
  },
];

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

function Work1() {
  return (
    <section className="w-full bg-[#F4F2ED] py-20 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* ---- Badge ---- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-7"
        >
          <span className="inline-flex items-center rounded-lg hover:bg-black hover:text-[#D6ff01] cursor-pointer transition-all duration-300 border border-black px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
            OUR WORKS
          </span>
        </motion.div>

        {/* ---- Heading ---- */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-extrabold text-[#15140F] leading-[1.05]
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          We've generated
          <br />
          <span
            className="italic font-light"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            value for our clients
          </span>
        </motion.h2>

        {/* ---- Subtitle ---- */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mt-6 sm:mt-7 max-w-xl mx-auto text-sm sm:text-base text-black/55"
        >
          We've helped creators, coaches, and brands go viral, grow fast, and
          look great doing it. Here's a glimpse of what we do.
        </motion.p>

        {/* ---- Stats ---- */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 md:gap-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              className={`relative text-left px-2 sm:px-6 ${
                i > 0
                  ? "sm:border-l sm:border-black/10 pt-10 sm:pt-0 border-t sm:border-t-0 border-black/10"
                  : ""
              }`}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-none mb-4">
                <CountUp
                  to={stat.to}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={1.6 + i * 0.2}
                />
              </p>
              <h3 className="text-sm sm:text-base font-bold text-[#15140F] mb-2">
                {stat.title}
              </h3>
              <p className="text-xs sm:text-sm text-black/50 leading-relaxed max-w-[220px]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work1;