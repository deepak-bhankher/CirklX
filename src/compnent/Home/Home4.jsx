import { motion } from "framer-motion";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { TbBrandAdobePhotoshop } from "react-icons/tb";

// Saare icons ab ek hi responsive size use karte hain — mobile par bada,
// sm+ par chhota. react-icons ke `size` prop ki jagah Tailwind w/h classes,
// kyunki attribute fixed hota hai aur breakpoint par badal nahi sakta.
const ICON_CLASS = "w-[32px] h-[32px] sm:w-[26px] sm:h-[26px]";

// First 3 cards: platform icon + 2-line title.
// Each card carries an `accent` rgba used for the glow shadow under the
// glass sheen, tone-matched to the icon's own gradient.
const PLATFORM_CARDS = [
  {
    title: ["Instagram", "Reels"],
    iconBg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    accent: "rgba(236,72,153,0.45)",
    icon: <AiOutlineInstagram className={`${ICON_CLASS} text-white`} />,
  },
  {
    title: ["Youtube", "Shots"],
    iconBg: "bg-gradient-to-br from-red-500 to-red-700",
    accent: "rgba(220,38,38,0.45)",
    icon: <AiOutlineYoutube className={`${ICON_CLASS} text-white`} />,
  },
  {
    title: ["Graphic", "Design"],
    iconBg: "bg-gradient-to-br from-[#001E36] via-[#002B4F] to-[#31A8FF]",
    accent: "rgba(49,168,255,0.35)",
    icon: <TbBrandAdobePhotoshop className={`${ICON_CLASS} text-[#31A8FF]`} />,
  },
];

// Badge size/radius dono rows me ek jaisa — mobile par bada centered,
// sm+ par chhota top-left.
const BADGE_SIZE = "w-20 h-20 sm:w-14 sm:h-14";
const BADGE_RADIUS = "rounded-3xl sm:rounded-2xl";

const SERVICE_CARDS = [
  {
    title: ["Video Edits"],
    iconBg: "bg-gradient-to-br from-violet-500 to-indigo-600",
    accent: "rgba(109,40,217,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" className={ICON_CLASS} fill="none">
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
    title: ["Motion Graphics"],
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600",
    accent: "rgba(16,185,129,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" className={ICON_CLASS} fill="none">
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

function GlassBadge({ children, iconBg, accent, sizeClass, radiusClass }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${sizeClass} ${radiusClass} ${iconBg}`}
      style={{
        boxShadow: `0 10px 28px ${accent}, 0 2px 6px rgba(0,0,0,0.15)`,
      }}
    >
      {/* top rim glow, tinted to the icon's own accent */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{
          background: `radial-gradient(60% 90% at 50% -10%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 45%, transparent 75%)`,
        }}
      />
      {/* diagonal glass sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      {/* thin glass border for edge definition */}
      <div
        className={`absolute inset-0 pointer-events-none ${radiusClass}`}
        style={{ border: "1px solid rgba(255,255,255,0.35)" }}
      />
      {/* icon */}
      <div className="relative z-10">{children}</div>
      {/* soft bottom dark fade for depth */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.22), transparent)",
        }}
      />
    </div>
  );
}

function PlatformCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-center sm:justify-between bg-white rounded-3xl p-6 sm:p-7 min-h-[190px] sm:min-h-[230px]
        shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)]
        transition-shadow duration-300"
    >
      {/* Mobile: badge centered. sm+: top-left, service cards jaisa. */}
      <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.15,
            ease: "easeOut",
          }}
        >
          <GlassBadge
            iconBg={card.iconBg}
            accent={card.accent}
            sizeClass={BADGE_SIZE}
            radiusClass={BADGE_RADIUS}
          >
            {card.icon}
          </GlassBadge>
        </motion.div>
      </div>

      <h3 className="text-2xl sm:text-[1.6rem] font-medium text-[#15140F] leading-tight text-center sm:text-left mt-0 sm:mt-7">
        {card.title[0]}{" "}
        {/* Mobile par title ek hi line me — line break sirf sm+ par. */}
        <br className="hidden sm:inline" />
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
      className="relative flex flex-col justify-center sm:justify-between bg-white rounded-3xl p-6 sm:p-7 min-h-[190px] sm:min-h-[230px] overflow-hidden
        shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)]
        transition-shadow duration-300"
    >
      {/* decorative blurred circle */}
      <div
        className={`absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-[0.07] ${card.iconBg}`}
      />

      <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.3 + index * 0.1 + 0.1,
            ease: "easeOut",
          }}
        >
          <GlassBadge
            iconBg={card.iconBg}
            accent={card.accent}
            sizeClass={BADGE_SIZE}
            radiusClass={BADGE_RADIUS}
          >
            {card.icon}
          </GlassBadge>
        </motion.div>
      </div>

      <h3 className="text-2xl font-medium text-[#15140F] leading-tight mt-0 sm:mt-7 text-center sm:text-left">
        {card.title[0]}{" "}
        {/* Mobile par title ek hi line me — line break sirf sm+ par. */}
        <br className="hidden sm:inline" />
        <span className="text-black/40">{card.title[1]}</span>
      </h3>
    </motion.div>
  );
}

function Home4() {
  return (
    <section className="w-full bg-[#F4F2ED] py-16 sm:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ---- Header ---- */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-5"
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {PLATFORM_CARDS.map((card, i) => (
            <PlatformCard key={card.title.join("-")} card={card} index={i} />
          ))}
        </div>

        {/* ---- Bottom row: 2 service cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {SERVICE_CARDS.map((card, i) => (
            <ServiceCard key={card.title.join("-")} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home4;