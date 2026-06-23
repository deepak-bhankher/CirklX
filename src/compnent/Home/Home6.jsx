import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "How can I donate to your organization?",
    answer:
      "You can donate directly through our website using a card, UPI, or bank transfer — it only takes a minute.",
  },
  {
    question: "Where does my donation go?",
    answer:
      "Every rupee is allocated to active programs, with a small portion covering essential operational costs.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes, all donations are eligible for tax deductions and you'll receive a receipt for your records.",
  },
  {
    question: "Can I support a specific cause or project?",
    answer:
      "Absolutely — you can choose a specific project at checkout, or reach out and we'll guide you to one that fits.",
  },
  {
    question: "How do I know my donation is making a difference?",
    answer:
      "We share regular impact reports and updates so you can see exactly how your contribution is being used.",
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