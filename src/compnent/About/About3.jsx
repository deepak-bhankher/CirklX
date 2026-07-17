import { motion } from "framer-motion";

const values = [
  {
    title: "Speed Matters",
    desc: "Trends move fast — we deliver content even faster, so you're never posting yesterday's moment.",
  },
  {
    title: "Creativity Wins",
    desc: "Every reel, post, and caption is crafted to grab attention, hold it, and convert.",
  },
  {
    title: "Consistency is Key",
    desc: "Growth comes from showing up — with great content, on schedule, every single time.",
  },
  {
    title: "Platform-Native Thinking",
    desc: "We create content that feels natural on Instagram and YouTube Shorts — not repurposed, not forced.",
  },
  {
    title: "Client Obsession",
    desc: "Your growth is our growth. Every strategy is personalized — no cookie-cutter templates.",
  },
  {
    title: "Data-Backed Decisions",
    desc: "We follow what's actually trending and performing — not just what looks good on paper.",
  },
];

function About3() {
  return (
    <section className="bg-gray-50 py-14 sm:py-16 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <span className="border border-black px-3 py-1 text-xs sm:text-sm font-semibold tracking-wide rounded-md hover:text-[#D6ff01] hover:bg-black transition-all duration-300 cursor-pointer">
            VALUES
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-2xl sm:text-3xl mt-4 sm:mt-5 md:text-4xl lg:text-5xl font-bold text-gray-900"
        >
          What we believe in
        </motion.h2>
      </div>

      <ul className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {values.map((val, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group bg-white cursor-pointer rounded-xl shadow-md p-5 sm:p-6 md:p-7 text-left
              transition-colors duration-300 hover:bg-black hover:shadow-xl"
          >
          <div
  className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-black transition-colors duration-300
    group-hover:text-[#D6ff01]"
>
  {String(i + 1).padStart(2, "0")}
</div>

            <h3
              className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 transition-colors duration-300
                group-hover:text-[#D6ff01]"
            >
              {val.title}
            </h3>

            <p
              className="text-sm leading-relaxed text-gray-600 transition-colors duration-300
                group-hover:text-white/70"
            >
              {val.desc}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default About3;
