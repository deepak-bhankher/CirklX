import { motion } from "framer-motion";

function Service1() {
  return (
    <section className="w-full lg:h-dvh lg:min-h-dvh bg-[#F4F2ED] pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-7"
        >
          <span className="inline-flex items-center rounded-lg hover:bg-black hover:text-[#D6ff01] cursor-pointer transition-all duration-300 border border-black px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
            OUR SERVICE
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-extrabold text-[#15140F] leading-[1.05] text-3xl sm:text-5xl md:text-6xl"
        >
          Our{" "}
          <span
            className="italic font-light"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Services
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-4 text-sm sm:text-base text-black/55 max-w-lg mx-auto px-2 sm:px-0"
        >
          From TikTok to Reels to Shorts — we turn raw clips into viral-ready
          videos with hooks, captions, emojis, and energy.
        </motion.p>
      </div>
    </section>
  );
}

export default Service1;