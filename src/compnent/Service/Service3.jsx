import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    avatar: "/about4.png",
    handle: "@coachmatt_fit",
    followers: "112k Followers",
    quote: "They don't just edit — they understand what works. Every Reel had a strong hook.",
  },
  {
    avatar: "/about4.png",
    handle: "@adam_alvi",
    followers: "34k Followers",
    quote: "Their editing completely changed the game. Exactly what my audience wants.",
  },
  {
    avatar: "/about4.png",
    handle: "@sara_creates",
    followers: "78k Followers",
    quote: "Fast turnaround, sharp hooks, and editing that keeps people watching till the end.",
  },
  {
    avatar: "/about4.png",
    handle: "@zara_growth",
    followers: "55k Followers",
    quote: "Within 2 weeks my Reels were getting 3x more reach. Their hooks are insane.",
  },
  {
    avatar: "/about4.png",
    handle: "@raihan_edits",
    followers: "91k Followers",
    quote: "Professional, fast, and they always deliver more than expected.",
  },
];

function ArrowButton({ direction, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
      className="flex-shrink-0 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.08)] text-black cursor-pointer hover:bg-black hover:text-[#D6ff01] transition-colors duration-300"
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <path
          d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

function CardContent({ review }) {
  return (
    <div className="flex flex-col items-center text-center px-5 py-8 sm:px-6 sm:py-10">
      <img
        src={review.avatar}
        alt={review.handle}
        className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-black/8"
        draggable={false}
      />
      <p className="text-xs sm:text-sm text-[#15140F] leading-relaxed mb-5">
        "{review.quote}"
      </p>
      <p className="text-sm font-semibold text-[#15140F]">{review.handle}</p>
      <p className="text-[11px] text-black/40 mt-0.5">{review.followers}</p>
    </div>
  );
}

function Service3() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = REVIEWS.length;

  const goTo = (newIndex, dir) => {
    setDirection(dir);
    setIndex((newIndex + total) % total);
  };
  const goNext = () => goTo(index + 1, 1);
  const goPrev = () => goTo(index - 1, -1);

  useEffect(() => {
    const timer = setTimeout(goNext, 3500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const prevReview = REVIEWS[(index - 1 + total) % total];
  const nextReview = REVIEWS[(index + 1) % total];

  return (
    <section className="w-full bg-[#F4F2ED] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-4"
        >
          <span className="border border-black px-3 py-1 text-xs sm:text-sm font-semibold tracking-widest rounded-md hover:text-[#D6ff01] hover:bg-black transition-all duration-300 cursor-pointer uppercase">
            Customer Reviews
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#15140F]"
        >
          Loved by{" "}
          <span className="italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
            top creators
          </span>
        </motion.h2>
      </div>

      {/* Carousel */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4">
          <ArrowButton direction="left" onClick={goPrev} />

          <div className="flex-1 grid grid-cols-3 gap-3 sm:gap-5 items-center">

            {/* Left — static blurred */}
            <div
              className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden"
              style={{ filter: "blur(3px)", opacity: 0.4, transform: "scale(0.9)" }}
            >
              <CardContent review={prevReview} />
            </div>

            {/* Center — animated */}
            <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={{
                    enter: (dir) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
                    center: { x: "0%", opacity: 1 },
                    exit: (dir) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                >
                  <CardContent review={REVIEWS[index]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — static blurred */}
            <div
              className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden"
              style={{ filter: "blur(3px)", opacity: 0.4, transform: "scale(0.9)" }}
            >
              <CardContent review={nextReview} />
            </div>

          </div>

          <ArrowButton direction="right" onClick={goNext} />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-7">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "w-6 h-2 bg-black" : "w-2 h-2 bg-black/20"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service3;
