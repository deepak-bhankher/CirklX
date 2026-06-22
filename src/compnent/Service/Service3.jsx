import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    reelTitle: "Facts about procrastination",
    reelMedia: "/about1.png",
    avatar: "/about4.png",
    handle: "@coachmatt_fit",
    followers: "112k Followers",
    quote:
      "They don't just edit — they understand what works. Every Reel had a strong hook, clean transitions, and it performed.",
    stat1Value: "45 Million+",
    stat1Label: "Views gained",
    stat2Value: "20000+",
    stat2Label: "Followers gained",
  },
  {
    reelTitle: "3 APPS THAT FEEL ILLEGAL TO KNOW",
    reelMedia: "/about2.png",
    avatar: "/about4.png",
    handle: "@adam_alvi",
    followers: "34k Followers",
    quote:
      "Their editing completely changed the game. The Reels they deliver feel on-trend and exactly what my audience wants.",
    stat1Value: "20 Million+",
    stat1Label: "Views gained",
    stat2Value: "10000+",
    stat2Label: "Followers gained",
  },
  {
    reelTitle: "How I doubled my engagement",
    reelMedia: "/about3.png",
    avatar: "/about4.png",
    handle: "@sara_creates",
    followers: "78k Followers",
    quote:
      "Fast turnaround, sharp hooks, and the kind of editing that actually keeps people watching till the end.",
    stat1Value: "32 Million+",
    stat1Label: "Views gained",
    stat2Value: "15000+",
    stat2Label: "Followers gained",
  },
  {
    reelTitle: "My views exploded overnight",
    reelMedia: "/about1.png",
    avatar: "/about4.png",
    handle: "@zara_growth",
    followers: "55k Followers",
    quote:
      "Within 2 weeks of working with CirklX, my Reels were getting 3x more reach. Their hooks are insane.",
    stat1Value: "18 Million+",
    stat1Label: "Views gained",
    stat2Value: "8000+",
    stat2Label: "Followers gained",
  },
  {
    reelTitle: "Best investment for my brand",
    reelMedia: "/about2.png",
    avatar: "/about4.png",
    handle: "@raihan_edits",
    followers: "91k Followers",
    quote:
      "Professional, fast, and they always deliver more than expected. My engagement doubled in a month.",
    stat1Value: "27 Million+",
    stat1Label: "Views gained",
    stat2Value: "12000+",
    stat2Label: "Followers gained",
  },
  {
    reelTitle: "Content that converts",
    reelMedia: "/about3.png",
    avatar: "/about4.png",
    handle: "@brand_visuals",
    followers: "43k Followers",
    quote:
      "They nailed our brand tone from day one. Every edit feels like it was made exactly for our audience.",
    stat1Value: "15 Million+",
    stat1Label: "Views gained",
    stat2Value: "6500+",
    stat2Label: "Followers gained",
  },
];

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Reel image — full width on mobile, fixed sidebar on sm+ */}
        <div className="relative w-full sm:w-[200px] md:w-[240px] flex-shrink-0 aspect-[3/2] sm:aspect-auto sm:min-h-full">
          <img
            src={review.reelMedia}
            alt={review.reelTitle}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* dark gradient so title text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          <p className="absolute top-0 inset-x-0 p-4 text-sm sm:text-base font-bold text-white leading-snug">
            {review.reelTitle}
          </p>
        </div>

        {/* Review content */}
        <div className="flex flex-col flex-1 p-5 sm:p-7 md:p-8">
          {/* Avatar + handle */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={review.avatar}
              alt={review.handle}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              draggable={false}
            />
            <div>
              <p className="text-sm font-semibold text-[#15140F]">{review.handle}</p>
              <p className="text-xs text-black/45">{review.followers}</p>
            </div>
          </div>

          {/* Quote */}
          <p className="text-sm sm:text-base md:text-lg text-[#15140F] leading-relaxed flex-1 mb-6">
            "{review.quote}"
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 border-t border-black/8 pt-4">
            <div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#D6ff01] bg-black inline-block px-3 py-0.5 rounded-lg">
                {review.stat1Value}
              </p>
              <p className="text-xs text-black/45 mt-1">{review.stat1Label}</p>
            </div>
            <div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#D6ff01] bg-black inline-block px-3 py-0.5 rounded-lg">
                {review.stat2Value}
              </p>
              <p className="text-xs text-black/45 mt-1">{review.stat2Label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ direction, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-black/10
        shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-black cursor-pointer hover:bg-black hover:text-[#D6ff01]
        transition-colors duration-300"
      aria-label={direction === "left" ? "Previous review" : "Next review"}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path
          d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

function Service3() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (newIndex, dir) => {
    setDirection(dir);
    setIndex((newIndex + REVIEWS.length) % REVIEWS.length);
  };

  const goNext = () => goTo(index + 1, 1);
  const goPrev = () => goTo(index - 1, -1);

  useEffect(() => {
    const timer = setTimeout(goNext, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section className="w-full bg-[#F4F2ED] py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-5"
        >
          <span className="border border-black px-3 py-1 text-xs sm:text-sm font-semibold tracking-wide rounded-md hover:text-[#D6ff01] hover:bg-black transition-all duration-300 cursor-pointer">
            CUSTOMER REVIEWS
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
          <span
            className="italic font-light"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
        top creators
          </span>
        </motion.h2>
      </div>

      {/* Carousel */}
      <div className="max-w-4xl mx-auto overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ReviewCard review={REVIEWS[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <ArrowButton direction="left" onClick={goPrev} />

        {/* Dot indicators */}
        <div className="flex gap-2 px-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "w-6 h-2.5 bg-black" : "w-2.5 h-2.5 bg-black/20"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        <ArrowButton direction="right" onClick={goNext} />
      </div>
    </section>
  );
}

export default Service3;
