import { motion } from "framer-motion";

// Trusted-by brand logos. Replace the label/icon markup with real SVG
// logos whenever you have them — kept as styled text + small marks here so
// the row works immediately without extra image assets.
// 21 logo files — array haath se likhne ki jagah generate kar liya.
const BRANDS = Array.from({ length: 21 }, (_, i) => `/logo${i + 1}.png`);

function BrandMarquee() {
  // List 2x duplicate — x ko 0% se -50% linear infinite animate karne par
  // doosra half pehle ke exactly upar aata hai, isliye loop point par jump
  // nahi dikhta aur flow continuous lagta hai.
  const track = [...BRANDS, ...BRANDS];

  return (
    <div className="relative w-full overflow-hidden py-8 sm:py-12">
      <p className="text-center text-xs sm:text-sm text-black/50 font-medium mb-6 sm:mb-8">
        Trusted by 10,000+ founders &amp; business owners
      </p>

      <motion.div
        className="flex w-max items-center gap-10 sm:gap-14 md:gap-16"
        animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {track.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            // h-* fix, w-auto — har logo apna aspect ratio rakhta hai.
            // object-contain se koi bhi logo crop nahi hota.
            className="flex-shrink-0 h-16 sm:h-20 md:h-24 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </motion.div>

      {/* Soft fade at both edges so logos appear to emerge/dissolve rather
          than hard-cut at the container boundary. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#F4F2ED] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#F4F2ED] to-transparent" />
    </div>
  );
}

function About2() {
  return (
    <section className="w-full bg-[#F4F2ED]">
      <BrandMarquee />

      <div className="max-w-6xl mx-auto px-6 sm:px-16 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---- Left: story text ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            <span className="inline-flex items-center rounded-lg transition-all duration-300 cursor-pointer hover:bg-black hover:text-[#D6ff01] border border-black/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70 mb-6">
              OUR STORY
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#15140F] leading-[1.05] mb-6">
              How it's started
            </h2>

            <p className="text-sm sm:text-base text-black/60 leading-relaxed mb-5">
              CirklX started in February 2026 in Hisar, with a simple belief —
              every brand and creator deserves content that actually gets
              noticed, not just posted. What began as one person's vision
              quickly grew into a full creative team, each person owning a piece
              of the puzzle: strategy, shooting, and editing.
            </p>

            <p className="text-sm sm:text-base text-black/60 leading-relaxed">
              Today, CirklX is built on three pillars — planning and management,
              production and direction, and editing and creative execution —
              working together to turn ordinary content into scroll-stopping
              Reels and Shorts. No outsourcing, no guesswork — just a dedicated
              team that treats your brand's growth like our own.
            </p>
          </motion.div>

          {/* ---- Right: image ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="w-full"
          >
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-black/5">
              <img
                src="/about4.png"
                alt="Clipzy editing workspace"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About2;
