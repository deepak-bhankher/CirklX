import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ICONS = [
  {
    name: "Facebook",
    tone: "facebook",
    node: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M14 8.5h-1.3c-.7 0-1.2.5-1.2 1.3v1.4H14l-.3 2H11.5V18h-2v-4.8H8v-2h1.5V9.5C9.5 7.7 10.7 6.5 12.4 6.5H14v2Z"
          fill="#1877F2"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    tone: "tiktok",
    node: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M16.5 3c.3 2 1.7 3.6 3.7 3.9v2.7c-1.4.1-2.7-.3-3.7-1v6.6c0 3-2.4 5.3-5.4 5.3S5.7 18.2 5.7 15.2c0-2.9 2.2-5.2 5.1-5.3v2.8c-1.3.1-2.3 1.2-2.3 2.5 0 1.4 1.1 2.5 2.5 2.5s2.6-1.1 2.6-2.5V3h2.9Z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    tone: "instagram",
    node: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="6"
          fill="url(#igGrad)"
        />
        <defs>
          <linearGradient id="igGrad" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="40%" stopColor="#d62976" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.3" fill="white" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    tone: "youtube",
    node: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
        <path d="M10 9l5 3-5 3V9Z" fill="white" />
      </svg>
    ),
  },
];

const R = 520;
const VISIBLE_HEIGHT = 130;
const ROTATION_DURATION = 36;
const ICON_SPACING_DEG = 90;

function GlassIconCard({ icon, tone = "default", size = 56 }) {
  const toneMap = {
    instagram: {
      accent: "rgba(214,41,118,0.55)",
      glow: "rgba(214,41,118,0.3)",
    },
    facebook: { accent: "rgba(24,119,242,0.55)", glow: "rgba(24,119,242,0.3)" },
    tiktok: {
      accent: "rgba(255,255,255,0.35)",
      glow: "rgba(255,255,255,0.15)",
    },
    youtube: { accent: "rgba(255,0,0,0.55)", glow: "rgba(255,0,0,0.3)" },
  };
  const { accent, glow } = toneMap[tone] ?? {
    accent: "rgba(214,255,1,0.4)",
    glow: "rgba(214,255,1,0.2)",
  };

  return (
    <div
      className="relative flex items-center justify-center rounded-2xl"
      style={{ width: size, height: size }}
    >
      {/* base glass layer */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 28px ${glow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
        }}
      />

      {/* brand color rim glow */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
        style={{
          background: `radial-gradient(70% 100% at 50% 0%, ${accent} 0%, transparent 70%)`,
        }}
      />

      {/* sheen highlight */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />
      {/* icon */}
      <div className="relative z-10 drop-shadow-lg">{icon}</div>

      {/* bottom depth shadow */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 rounded-b-2xl pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
        }}
      />
    </div>
  );
}

function ArcTrack() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `${VISIBLE_HEIGHT}px` }}
    >
      {/* soft top fade so icons dissolve in/out smoothly */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{
          height: "48px",
          background:
            "linear-gradient(to bottom, #15140F 0%, transparent 100%)",
        }}
      />
      {/* soft bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: "32px",
          background: "linear-gradient(to top, #15140F 0%, transparent 100%)",
        }}
      />

      {/* subtle arc rail glow */}
      <div
        className="absolute inset-x-0 pointer-events-none z-0"
        style={{
          bottom: "8px",
          height: "1px",
          background:
            "radial-gradient(ellipse 50% 1px at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 100%)",
        }}
      />

      <div
        className="absolute left-1/2"
        style={{
          width: `${R * 2}px`,
          height: `${R * 2}px`,
          top: `${VISIBLE_HEIGHT - R * 2}px`,
          marginLeft: `-${R}px`,
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: ROTATION_DURATION,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {ICONS.map((icon, i) => {
            const angle = 90 + ICON_SPACING_DEG * i;
            return (
              <div
                key={icon.name}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: 0,
                  height: 0,
                  transform: `rotate(${angle}deg) translate(${R}px)`,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                  }}
                >
                  <GlassIconCard icon={icon.node} tone={icon.tone} size={64} />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

// `compact` sirf mobile par button ko chhota karta hai, taaki wo social
// icons ke saath ek hi row me fit ho jaaye. sm+ par size bilkul same rehta hai.
function PrimaryCta({ children = "Book A Free Meeting", compact = false }) {
  const sizing = compact
    ? "px-4 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm"
    : "px-6 py-3 text-sm";
  const arrowBox = compact ? "w-5 h-5 sm:w-6 sm:h-6" : "w-6 h-6";

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`inline-flex items-center gap-2 sm:gap-2.5 rounded-lg hover:text-[#D6ff01] hover:border hover:border-[#D6ff01] hover:bg-black bg-[#D6FF01] ${sizing} font-bold text-[#15140F] cursor-pointer whitespace-nowrap
        shadow-[0_8px_28px_rgba(214,255,1,0.25)]
        hover:shadow-[0_12px_36px_rgba(214,255,1,0.4)]
        transition-shadow duration-300`}
    >
      <Link to="/contact">{children}</Link>

      <span
        className={`flex items-center justify-center ${arrowBox} rounded-full bg-[#15140F]`}
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
          <path
            d="M7 17 17 7M9 7h8v8"
            stroke="#D6FF01"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.button>
  );
}

// Saare social icons ab ek hi brand color (#D6FF01) me hain. react-icons ke
// glyphs isliye use kiye kyunki wo monochrome ke liye bane hain — purane
// hand-drawn SVGs single color me shapeless lagte (Instagram bas ek square).
const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://twitter.com", label: "Twitter / X", Icon: FaXTwitter },
  { href: "https://tiktok.com", label: "TikTok", Icon: FaTiktok },
  { href: "https://youtube.com", label: "YouTube", Icon: FaYoutube },
];

// Small reusable label above each footer column, so Navigation and
// Get In Touch line up perfectly when they sit side by side on mobile.
function ColumnLabel({ children }) {
  return (
    <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-1">
      {children}
    </p>
  );
}

function Footer() {
  return (
    <section
      data-theme="dark"
      className="relative w-full bg-[#15140F] overflow-hidden"
    >
      {/* ---- Top: heading + subtitle + CTA ---- */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-extrabold text-white leading-[1.1] text-4xl sm:text-5xl md:text-6xl"
        >
          Ready to make
          <br />
          <span
            className="italic font-light text-[#D6ff01]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            your videos go viral?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-sm sm:text-base text-white/50 max-w-md mx-auto"
        >
          From planning to shoot to scroll-stopping reels — let's build content
          that actually grows your following. Book a free call, no commitment
          needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex justify-center"
        >
          <PrimaryCta />
        </motion.div>
      </div>

      {/* ---- Large semicircle, only the bottom arc visible ---- */}
      <ArcTrack />

      {/* ---- Footer Links + Contact + Social ---- */}
      <div className="relative z-10 border-t border-white/[0.07] mt-2">
        {/* MOBILE: 2-column grid. Brand block spans both columns on top, then
            Navigation aur Get In Touch ek hi row me side-by-side aate hain.
            sm+ par wahi purana 3-column layout — desktop kuch nahi badla. */}
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-14 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10 sm:gap-12">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/white.png"
                alt="CirklX"
                className="w-7 h-7 object-contain"
              />
              <span className="font-bold text-white text-[17px] tracking-tight">
                CirklX
              </span>
            </div>
            <p className="text-white/35 text-xs leading-relaxed max-w-[220px]">
              Premium video editing for creators who want to go viral.
            </p>
            {/* Mobile: social icons aur "Let's Talk" ek hi row me, aamne-saamne.
                sm+: wrapper block ban jaata hai to icons upar aur button neeche —
                bilkul purana desktop layout. */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-1 sm:block">
              {/* Social icons — sab ek hi lime color me */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl shrink-0
                      text-[#D6FF01] bg-white/[0.06] border border-white/10
                      hover:bg-[#D6FF01] hover:text-[#15140F] hover:border-[#D6FF01]
                      transition-colors duration-300"
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>

              <motion.div className="sm:mt-6">
                <PrimaryCta compact>Let's Talk</PrimaryCta>
              </motion.div>
            </div>
          </div>

          {/* Nav links col */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <ColumnLabel>Navigation</ColumnLabel>
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Service", path: "/service" },
              { name: "Work", path: "/work" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[13px] sm:text-sm text-white/45 hover:text-[#D6FF01] transition-colors duration-200 w-fit"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact col */}
          <div className="flex flex-col gap-3 min-w-0">
            <ColumnLabel>Get In Touch</ColumnLabel>
            <a
              href="mailto:cirklX.agency@gmail.com"
              className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-sm text-white/45 hover:text-[#D6FF01] transition-colors duration-200 min-w-0"
            >
              <span
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="3"
                    stroke="#D6FF01"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M2 8l10 7 10-7"
                    stroke="#D6FF01"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="break-all leading-relaxed pt-0.5 sm:pt-1">
                cirklX.agency@gmail.com
              </span>
            </a>
            <a
              href="tel:+918053200325"
              className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-sm text-white/45 hover:text-[#D6FF01] transition-colors duration-200 min-w-0"
            >
              <span
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z"
                    stroke="#D6FF01"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="leading-relaxed pt-0.5 sm:pt-1 whitespace-nowrap">
                +91 80532 00325
              </span>
            </a>
            {/* Address */}
            <div className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-sm text-white/45 min-w-0">
              <span
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
                    stroke="#D6FF01"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="9"
                    r="2.5"
                    stroke="#D6FF01"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>
              <span className="leading-relaxed pt-0.5 sm:pt-1">
                Hisar, Haryana,
                <br />
                India — 125001
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ----
          Mobile par links pehle, copyright neeche — dono centered, aur links
          wrap hokar bhi saaf dikhein isliye flex-wrap + gap. Dividers sirf
          desktop par, kyunki mobile par wrap hone se wo bekaar lagte the. */}
      <div className="border-t border-white/[0.06] py-6 pb-28 md:pb-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs text-white/25 tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} CirklX. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-4">
            <Link
              to="/terms"
              className="text-[11px] sm:text-xs text-white/35 hover:text-[#D6FF01] transition-colors duration-200 tracking-wide"
            >
              Terms &amp; Conditions
            </Link>
            <span className="hidden sm:inline-block w-px h-3 bg-white/15" />
            <Link
              to="/privacy"
              className="text-[11px] sm:text-xs text-white/35 hover:text-[#D6FF01] transition-colors duration-200 tracking-wide"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline-block w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/35 tracking-wide">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D6FF01] opacity-70" />
              Blog
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Footer;