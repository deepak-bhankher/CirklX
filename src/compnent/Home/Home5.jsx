import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PLANS = [
  {
    name: "Trial Pack",
    tagline: "Perfect for first-timers",
    price: "3,000",
    period: "/week",
    badge: null,
    features: [
      "Content planning + professional shoot",
      "3 fully edited short videos",
      "2 custom graphic designs",
      "Full SMM (social media management) for the week",
      "No long-term commitment — test us risk-free",
    ],
    cta: "Get Started Now",
  },
  {
    name: "Growth Pack",
    tagline: "For brands ready to grow consistently",
    price: "15,000",
    period: "/month",
    badge: { label: "Most Popular", tone: "popular" },
    features: [
      "Complete content planning & strategy",
      "Professional shoot for all content",
      "15 edited videos per month",
      "5 custom graphics (as per requirement)",
      "Full SMM (social media management)",
      "SMO (social media optimization)",
      "SEO support included",
    ],
    cta: "Get Started Now",
  },
  {
    name: "Pro Pack",
    tagline: "For brands scaling long-term",
    price: "40,000",
    period: "/3 months",
    badge: { label: "Best Value — Save ₹5,000", tone: "value" },
    features: [
      "Everything in Growth Pack, scaled across 3 months",
      "Dedicated shoot days planned every month",
      "Priority content strategy calls",
      "Dedicated support throughout the quarter",
      "Save ₹5,000 vs paying monthly",
    ],
    cta: "Book A Meeting",
  },
];

function PrimaryCta({ children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-lg hover:shadow-[0_0_20px_rgba(214,255,1,0.45)] bg-[#D6ff01] cursor-pointer border border-gray-300 px-4 py-2 text-sm font-semibold text-black
        hover:bg-[#000000] hover:text-[#D6ff01] hover:border hover:border-[#D6ff01] transition-all duration-300 whitespace-nowrap"
    >
      <Link to="/contact">{children}</Link>
    </motion.button>
  );
}

function Badge({ badge }) {
  if (!badge) return null;

  const isPopular = badge.tone === "popular";

  return (
    <span
      className={`absolute -top-3 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0
        inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold whitespace-nowrap shadow-sm
        ${isPopular ? "bg-[#15140F] text-[#D6ff01]" : "bg-[#FF5722] text-white"}`}
    >
      {isPopular ? "⭐" : "💎"} {badge.label}
    </span>
  );
}

function PlanCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="flex flex-col"
    >
      {/* Top card: name, tagline, price, CTA */}
      <div className="pb-6 border-b border-black/[0.07]">
        <h3 className="text-xl font-bold text-[#15140F] mb-1.5">{plan.name}</h3>
        <p className="text-sm text-black/50 mb-6">{plan.tagline}</p>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="flex items-baseline gap-1">
            <motion.span
              key={`${plan.name}-${plan.price}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-3xl font-bold text-[#15140F]"
            >
              ₹{plan.price}
            </motion.span>
            <span className="text-xs text-black/45">{plan.period}</span>
          </span>

          <PrimaryCta>{plan.cta}</PrimaryCta>
        </div>
      </div>

      {/* Divider + feature list */}
      <div className="pt-6">
        <ul className="flex flex-col gap-3.5">
          {plan.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.12 + 0.15 + i * 0.06,
                ease: "easeOut",
              }}
              className="flex items-start gap-2.5 text-sm text-black/65"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function Home5() {
  return (
    <section className="w-full bg-[#F4F2ED] py-20 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ---- Header ---- */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#15140F] leading-tight"
          >
            Pay Weekly, Monthly
            <span
              className="italic font-normal text-[#FF5722]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {" "}— Your Call
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-5 text-sm sm:text-base text-black/55 max-w-lg mx-auto"
          >
            End-to-end content — planning, shooting, editing & posting — with full SMM support built for brands at every stage.
          </motion.p>
        </div>

        {/* ---- Plan cards ---- */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 items-start">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl shadow-[0_2px_24px_rgba(0,0,0,0.06)] p-6 sm:p-8
                ${plan.badge ? "ring-2 ring-[#D6ff01] sm:scale-[1.03]" : ""}`}
            >
              <Badge badge={plan.badge} />
              <PlanCard plan={plan} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home5;