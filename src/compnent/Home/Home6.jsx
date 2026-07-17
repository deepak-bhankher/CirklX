import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "What does CirklX actually do?",
    answer:
      "We're a full-service social media marketing agency in Hisar. We plan, shoot, edit, and post content — Reels, Shorts & Posts — and manage your entire social media presence so your brand grows consistently.",
  },

  {
    question: "Which platforms do you manage?",
    answer:
      "We specialize in Instagram, YouTube Shorts, and Facebook — the platforms driving the most reach and engagement for brands right now.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients start seeing improved engagement within the first 2–4 weeks. Real follower and reach growth typically builds month over month as we refine your content strategy.",
  },
  {
    question: "What's included in the monthly package vs the trial pack?",
    answer:
      "The Trial Pack (₹3,000/week) is great for testing us out with 3 videos + 2 graphics. The Growth Pack (₹15,000/month) includes full SMM, SMO, SEO support, and 15 videos + 5 graphics — built for consistent, long-term growth.",
  },
  {
    question: "Do I need to arrange my own shoot setup or equipment?",
    answer:
      "Not at all. Our team handles planning, shoot direction, and equipment — DSLR or phone, we make it work. You just need to be available for the shoot day.",
  },
  {
    question: "Can I request a specific type of content or campaign theme?",
    answer:
      "Absolutely. All our packages include planning calls where you can share your goals, campaign ideas, or specific content requests — we build the strategy around what you need.",
  },
  {
    question:
      "Do you only work with businesses, or do you work with individual creators too?",
    answer:
      "Yes, we work with both! Whether you're a brand looking for full SMM support or an individual creator who just needs content shot, edited, and posted — we've got a package that fits.",
  },
];

function PlusIcon({ isOpen }) {
  return (
    <motion.div
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-shrink-0 flex items-center justify-center w-6 h-6"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path
          d="M12 5v14M5 12h14"
          stroke="#15140F"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 sm:px-7 py-5 sm:py-6 text-left cursor-pointer"
      >
        <span className="text-sm sm:text-base font-medium text-[#15140F]">
          {item.question}
        </span>
        <PlusIcon isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 sm:px-7 pb-5 sm:pb-6 text-sm text-black/55 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Home6() {
  // Only one FAQ open at a time: storing the open index (or null) instead
  // of a per-item boolean means setting a new index automatically closes
  // whichever one was open before.
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-[#F4F2ED] py-20 sm:py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* ---- Header ---- */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center rounded-lg border border-black/20 hover:bg-black hover:text-[#D6ff01] cursor-pointer duration-300 transition-all px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
              FREQUENTLY ASKED QUESTION
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#15140F] leading-tight"
          >
            Everything You{" "}
            <span
              className="italic font-light text-[#FF5722]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Need to Know
            </span>
          </motion.h2>
        </div>

        {/* ---- Accordion list ---- */}
        <div className="flex flex-col gap-4">
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home6;
