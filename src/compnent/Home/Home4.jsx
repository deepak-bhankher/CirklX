import { motion } from "framer-motion";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTikTok } from "react-icons/ai";

// First 3 cards: big centered platform icon + 2-line title.
const PLATFORM_CARDS = [
  {
    title: ["Youtube", "Shots"],
    iconBg: "bg-gradient-to-br from-red-500 to-red-700",
    shadow: "shadow-[0_10px_28px_rgba(220,38,38,0.45)]",
    icon: <AiOutlineYoutube size={52} className="text-white" />,
  },
  {
    title: ["Instagram", "Reels"],
    iconBg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    shadow: "shadow-[0_10px_28px_rgba(236,72,153,0.45)]",
    icon: <AiOutlineInstagram size={52} className="text-white" />,
  },
  {
    title: ["TikTok", "Videos"],
    iconBg: "bg-[#010101]",
    shadow: "shadow-[0_10px_28px_rgba(0,0,0,0.35)]",
    icon: <AiOutlineTikTok size={52} className="text-white" />,
  },
];

// Last 2 cards: small icon badge top-left + 2-line title bottom.
const SERVICE_CARDS = [
  {
    title: ["Video Edits", "& Content Creation"],
    iconBg: "bg-gradient-to-br from-violet-500 to-indigo-600",
    shadow: "shadow-[0_8px_20px_rgba(109,40,217,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <rect
          x="2"
          y="5"
          width="15"
          height="14"
          rx="2.5"
          stroke="white"
          strokeWidth="1.7"
        />
        <path
          d="M17 9.5 22 7v10l-5-2.5"
          stroke="white"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M6 10h6M6 14h4"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: ["Motion Graphics", "& Animation Design"],
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600",
    shadow: "shadow-[0_8px_20px_rgba(16,185,129,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <circle cx="12" cy="12" r="3" fill="white" />
        <path
          d="M12 3v3M12 18v3M3 12h3M18 12h3"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M6.34 6.34l2.12 2.12M15.54 15.54l2.12 2.12M6.34 17.66l2.12-2.12M15.54 8.46l2.12-2.12"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function PlatformCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between bg-white rounded-3xl p-8 sm:p-10 min-h-[340px] sm:min-h-[380px]
        shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)]
        transition-shadow duration-300"
    >
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.15,
            ease: "easeOut",
          }}
          className={`flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl ${card.iconBg} ${card.shadow}`}
        >
          {card.icon}
        </motion.div>
      </div>
      <h3 className="text-2xl sm:text-[1.7rem] font-medium text-[#15140F] leading-tight">
        {card.title[0]}
        <br />
        {card.title[1]}
      </h3>
    </motion.div>
  );
}

function ServiceCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative flex flex-col justify-between bg-white rounded-3xl p-8 sm:p-10 min-h-[220px] sm:min-h-[260px] overflow-hidden
        shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)]
        transition-shadow duration-300"
    >
      {/* decorative blurred circle */}
      <div
        className={`absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-[0.07] ${card.iconBg}`}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.3 + index * 0.1 + 0.1,
          ease: "easeOut",
        }}
        className={`flex items-center justify-center w-14 h-14 rounded-2xl ${card.iconBg} ${card.shadow}`}
      >
        {card.icon}
      </motion.div>

      <h3 className="text-xl sm:text-2xl font-medium text-[#15140F] leading-tight mt-8">
        {card.title[0]}
        <br />
        <span className="text-black/40">{card.title[1]}</span>
      </h3>
    </motion.div>
  );
}

function Home4() {
  return (
    <section className="w-full bg-[#F4F2ED] py-20 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ---- Header ---- */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center rounded-lg border border-black/20 hover:bg-black hover:text-[#D6ff01] transition-all duration-300 cursor-pointer px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
              SERVICES WE OFFER
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-[#15140F] leading-[1.1]"
          >
            Everything you need
            <br />
            for views
          </motion.h2>
        </div>

        {/* ---- Top row: 3 platform cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {PLATFORM_CARDS.map((card, i) => (
            <PlatformCard key={card.title.join("-")} card={card} index={i} />
          ))}
        </div>

        {/* ---- Bottom row: 2 service cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {SERVICE_CARDS.map((card, i) => (
            <ServiceCard key={card.title.join("-")} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home4;
