import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

const REVIEWS = [
  {
    avatar: "/about4.png",
    handle: " Video Production & Creativity*",
    followers: "112k Followers",
    quote:
      "CirklX is one of the most creative digital marketing agencies in Hisar. Their video shoots are professionally planned, and the editing quality is excellent. The team understands the brand before creating content, which makes every reel look unique and engaging.",
  },
  {
    avatar: "/about4.png",
    handle: "Social Media Marketing",
    followers: "34k Followers",
    quote:
      "We had a great experience working with CirklX for social media marketing in Hisar. Their team helped us with content planning, creative ideas, reels, and overall social media management. Very professional, responsive, and creative team.",
  },
  {
    avatar: "/about4.png",
    handle: "Professional Video Shoots",
    followers: "78k Followers",
    quote:
      "If you are looking for professional video shoots in Hisar, CirklX is a great choice. From shoot planning and camera work to final video editing, everything was handled professionally. The final videos looked premium and perfect for social media.",
  },
  {
    avatar: "/about4.png",
    handle: "Reels & Video Editing",
    followers: "55k Followers",
    quote:
      "Really impressed with CirklX's video editing services. Their reel edits are clean, modern, and engaging without looking over-edited. They understand current social media trends while still keeping the content aligned with the brand.",
  },
  {
    avatar: "/about4.png",
    handle: " Creative Agency in Hisar",
    followers: "91k Followers",
    quote:
      "CirklX is not just another marketing agency in Hisar. Their biggest strength is creativity. They come up with fresh concepts for shoots, reels, and social media content instead of repeating the same ideas everyone else is using.",
  },

  {
    avatar: "/about4.png",
    handle: " Complete Content Creation",
    followers: "91k Followers",
    quote:
      "We approached CirklX for content creation and social media, and the experience was excellent. They handled everything from creative concepts and video shoots to editing and posting strategy. A reliable team for brands looking to improve their online presence.",
  },
  {
    avatar: "/about4.png",
    handle: " Brand-Focused SMM",
    followers: "91k Followers",
    quote:
      "One of the best things about CirklX is that their social media marketing doesn't feel generic. They understand your business, audience, and brand style before planning the content. Their creative reels and video shoots helped give our social media a much more professional look.",
  },
  {
    avatar: "/about4.png",
    handle: " Video Editing & Reels",
    followers: "91k Followers",
    quote:
      "Highly recommended for video editing and reel production in Hisar. The CirklX team has a strong understanding of pacing, transitions, storytelling, and social media content. They turned our raw footage into professional and engaging videos.",
  },
  {
    avatar: "/about4.png",
    handle: "Digital Marketing Agency",
    followers: "91k Followers",
    quote:
      "A professional and creative digital marketing agency in Hisar. CirklX offers a good combination of social media marketing, content creation, video shoots, and editing. Communication is smooth, ideas are fresh, and the overall execution is impressive.",
  },
  {
    avatar: "/about4.png",
    handle: " Overall Agency Experience",
    followers: "91k Followers",
    quote:
      "Great experience working with CirklX Agency. Their team is young, creative, and understands what works on social media today. From video production and editing to SMM and creative strategy, they provide a complete solution for businesses looking to grow digitally in Hisar.",
  },
];

const AUTOPLAY_MS = 3800;
const SLIDE_MS = 0.9;

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
    <div className="flex flex-col items-center text-center h-full px-5 py-8 sm:px-6 sm:py-10">
      <img
        src={review.avatar}
        alt={review.handle}
        className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-black/8"
        draggable={false}
      />
      <p className="text-xs sm:text-sm text-[#15140F] leading-relaxed mb-5">
        "{review.quote}"
      </p>
      <p className="text-sm font-semibold text-[#15140F] mt-auto">
        {review.handle}
      </p>
      <p className="text-[11px] text-black/40 mt-0.5">{review.followers}</p>
    </div>
  );
}

function Home8() {
  const total = REVIEWS.length;

  // 3 copies — hum hamesha beech wali copy me rehte hain, isliye dono taraf
  // hamesha cards maujood rehte hain aur loop point par khaali slot nahi aata.
  const track = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  const viewportRef = useRef(null);
  const [dims, setDims] = useState({ slot: 0, gap: 20, center: 1 });
  const [index, setIndex] = useState(total); // sirf styling/dots ke liye
  const indexRef = useRef(total); // asli source of truth
  const dimsRef = useRef(dims);
  const animRef = useRef(null);

  // x ab React state se nahi, motion value se chalti hai. Isi wajah se
  // wrap ke waqt hone wala re-render position ko dobara animate nahi karta —
  // pehle wahi jhatka de raha tha.
  const x = useMotionValue(0);

  const offsetFor = (i) => {
    const d = dimsRef.current;
    return -(i - d.center) * (d.slot + d.gap);
  };

  // Slot width JS se naapte hain kyunki transform ka % track ki apni width
  // par lagta hai, container ki nahi — isliye exact px chahiye.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.getBoundingClientRect().width;
      const wide = window.matchMedia("(min-width: 640px)").matches;
      const visible = wide ? 3 : 1;
      const gap = wide ? 20 : 12;

      const next = {
        slot: (w - gap * (visible - 1)) / visible,
        gap,
        center: wide ? 1 : 0, // desktop par center slot doosra hai
      };

      dimsRef.current = next;
      setDims(next);
      x.set(offsetFor(indexRef.current)); // resize par slide nahi, seedha jagah par
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (delta) => {
    if (!dimsRef.current.slot) return;

    const target = indexRef.current + delta;
    indexRef.current = target;
    setIndex(target);

    animRef.current?.stop();
    animRef.current = animate(x, offsetFor(target), {
      duration: SLIDE_MS,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        // Slide poora hone ke baad agar bahar wali copy me pahunch gaye to
        // chupke se beech wali copy me laut aate hain. Cards identical hain
        // aur x seedha set hoti hai, isliye ye reposition dikhta hi nahi.
        let norm = indexRef.current;
        if (norm >= total * 2) norm -= total;
        else if (norm < total) norm += total;

        if (norm !== indexRef.current) {
          indexRef.current = norm;
          setIndex(norm);
          x.set(offsetFor(norm));
        }
      },
    });
  };

  useEffect(() => {
    if (!dims.slot) return;
    const timer = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, dims.slot]);

  useEffect(() => () => animRef.current?.stop(), []);

  const activeDot = ((index % total) + total) % total;

  const goToDot = (i) => {
    let diff = i - activeDot;
    // loop ke around chhota raasta chuno
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    if (diff !== 0) go(diff);
  };

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
          <span
            className="italic font-light"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            top creators
          </span>
        </motion.h2>
      </div>

      {/* Carousel */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4">
          <ArrowButton direction="left" onClick={() => go(-1)} />

          {/* py-5 se shadow ko saans lene ki jagah milti hai, warna
              overflow-hidden use upar-neeche se kaat deta hai. */}
          <div ref={viewportRef} className="flex-1 overflow-hidden py-5">
            {dims.slot > 0 && (
              <motion.div
                className="flex items-stretch"
                style={{ x, gap: dims.gap, willChange: "transform" }}
              >
                {track.map((review, i) => {
                  const isCenter = i === index;

                  return (
                    <div
                      key={i}
                      style={{ width: dims.slot }}
                      className={`flex-shrink-0 transition-all duration-700 ease-out ${
                        isCenter
                          ? "opacity-100 blur-0 scale-100"
                          : "sm:opacity-40 sm:blur-[3px] sm:scale-90"
                      }`}
                    >
                      <div
                        className={`h-full bg-white rounded-2xl overflow-hidden transition-shadow duration-700 ${
                          isCenter
                            ? "shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                            : "shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                        }`}
                      >
                        <CardContent review={review} />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>

          <ArrowButton direction="right" onClick={() => go(1)} />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-7">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToDot(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeDot ? "w-6 h-2 bg-black" : "w-2 h-2 bg-black/20"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home8;
