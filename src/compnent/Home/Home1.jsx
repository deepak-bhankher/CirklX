import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaPinterest,
  FaStar,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiSparkling2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdSlowMotionVideo } from "react-icons/md";

// Small helper hook to get a responsive icon size for the orbiting
// social icons, so they don't look oversized on small mobile screens.
function useResponsiveIconSize() {
  const [iconSize, setIconSize] = useState(44);

  useEffect(() => {
    function updateSize() {
      const w = window.innerWidth;
      if (w < 480) setIconSize(32);
      else if (w < 768) setIconSize(38);
      else setIconSize(44);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return iconSize;
}

function useHeadlineIconSize() {
  const [size, setSize] = useState(56);

  useEffect(() => {
    function updateSize() {
      const w = window.innerWidth;
      if (w < 400) setSize(14);
      else if (w < 640) setSize(16);
      else if (w < 768) setSize(22);
      else setSize(26);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

function useHeadlineBadgeBoxSize() {
  const [size, setSize] = useState(56);

  useEffect(() => {
    function updateSize() {
      const w = window.innerWidth;
      if (w < 400) setSize(28);
      else if (w < 640) setSize(32);
      else if (w < 768) setSize(44);
      else setSize(56);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

const CURVE_POINTS = [
  { left: "1.8%", top: "3.1%" },
  { left: "2.3%", top: "20.4%" },
  { left: "3.7%", top: "35.6%" },
  { left: "5.9%", top: "48.7%" },
  { left: "8.9%", top: "59.8%" },
  { left: "12.5%", top: "69.2%" },
  { left: "16.7%", top: "76.9%" },
  { left: "21.4%", top: "83.1%" },
  { left: "26.6%", top: "87.9%" },
  { left: "32.1%", top: "91.3%" },
  { left: "37.9%", top: "93.7%" },
  { left: "43.9%", top: "95.0%" },
  { left: "50.0%", top: "95.4%" },
  { left: "56.1%", top: "95.0%" },
  { left: "62.1%", top: "93.7%" },
  { left: "67.9%", top: "91.3%" },
  { left: "73.4%", top: "87.9%" },
  { left: "78.6%", top: "83.1%" },
  { left: "83.3%", top: "76.9%" },
  { left: "87.5%", top: "69.2%" },
  { left: "91.1%", top: "59.8%" },
  { left: "94.1%", top: "48.7%" },
  { left: "96.3%", top: "35.6%" },
  { left: "97.7%", top: "20.4%" },
  { left: "98.2%", top: "3.1%" },
  { left: "1.8%", top: "3.1%" }, // loop back to the exact start point
];

// Mobile-only arc: much shallower + wider than the desktop one, sampled from
// the SVG path "M10 12 C 60 100, 130 128, 200 130 C 270 128, 340 100, 390 12"
// inside a 400x140 viewBox, so the icons sit exactly on the drawn line.
const MOBILE_CURVE_POINTS = [
  { left: "2.5%", top: "8.6%" },
  { left: "7.4%", top: "30.2%" },
  { left: "12.7%", top: "48.1%" },
  { left: "18.4%", top: "62.5%" },
  { left: "24.4%", top: "73.8%" },
  { left: "30.6%", top: "82.1%" },
  { left: "37.0%", top: "87.9%" },
  { left: "43.4%", top: "91.4%" },
  { left: "50.0%", top: "92.9%" },
  { left: "56.6%", top: "91.4%" },
  { left: "63.0%", top: "87.9%" },
  { left: "69.4%", top: "82.1%" },
  { left: "75.6%", top: "73.8%" },
  { left: "81.6%", top: "62.5%" },
  { left: "87.3%", top: "48.1%" },
  { left: "92.6%", top: "30.2%" },
  { left: "97.5%", top: "8.6%" },
  { left: "2.5%", top: "8.6%" }, // loop back to the exact start point
];

function GlassIconCard({
  icon,
  tone = "default",
  style,
  className = "",
  size = 44,
  depth = 0,
  opacity = 1,
  rotate = 0,
}) {
  const toneStyles =
    tone === "instagram"
      ? {
          accent: "#FF5A1F",
          accent2: "rgba(255,90,31,0.5)",
          tint: "rgba(255,90,31,0.16)",
        }
      : tone === "facebook"
        ? {
            accent: "#1877F2",
            accent2: "rgba(24,119,242,0.5)",
            tint: "rgba(24,119,242,0.16)",
          }
        : tone === "pinterest"
          ? {
              accent: "#D0002B",
              accent2: "rgba(208,0,43,0.5)",
              tint: "rgba(208,0,43,0.16)",
            }
          : tone === "youtube"
            ? {
                accent: "#FF0000",
                accent2: "rgba(255,0,0,0.5)",
                tint: "rgba(255,0,0,0.16)",
              }
            : tone === "spark"
              ? {
                  accent: "#D6ff01",
                  accent2: "rgba(214,255,1,0.5)",
                  tint: "rgba(214,255,1,0.16)",
                }
              : {
                  accent: "#D6ff01",
                  accent2: "rgba(214,255,1,0.4)",
                  tint: "rgba(214,255,1,0.12)",
                };

  return (
    <motion.div
      className={`absolute select-none pointer-events-none flex items-center justify-center rounded-2xl ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        transform: `translate(-50%, -50%) translateZ(0) rotate(${rotate}deg)`,
        filter: "saturate(1.15)",
        ...style,
      }}
      initial={false}
      animate={false}
    >
      {/* Opaque backing so the flow-curve line (and anything else) never
          shows through the glass under the icon — the glass layers below
          are stacked on top of this solid base, so the icon still looks
          glassy but the line stays hidden exactly where the icon sits. */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: "rgba(18,18,20,0.94)" }}
      />
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(160deg, rgba(255,255,255,0.32) 0%, ${toneStyles.tint} 45%, rgba(255,255,255,0.06) 100%)`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${toneStyles.accent2}`,
          boxShadow:
            depth > 0
              ? `0 10px 24px rgba(0,0,0,0.22), 0 0 26px ${toneStyles.accent2}`
              : `0 8px 18px rgba(0,0,0,0.16), 0 0 16px ${toneStyles.accent2}`,
        }}
      />

      {/* top rim + glow, tinted by the icon's own accent color */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
        style={{
          background: `radial-gradient(65% 95% at 50% -10%, ${toneStyles.accent2} 0%, ${toneStyles.tint} 45%, transparent 75%)`,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      {/* glass sheen */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.12) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* icon */}
      <div className="relative z-10">{icon}</div>

      {/* soft tinted base for depth, no harsh black */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl"
        style={{
          background: `linear-gradient(to top, ${toneStyles.tint}, transparent)`,
        }}
      />

      {/* thin bright inner rim to keep the glass edge crisp */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] pointer-events-none" />
    </motion.div>
  );
}

/**
 * Icons that continuously flow along a curve.
 *
 * Pehle ye logic sirf desktop wale block ke andar inline tha. Ab isko ek
 * component me nikal diya hai taaki mobile wala curve bhi bilkul same
 * animation reuse kar sake — sirf points, box size aur glyph size alag.
 * Desktop par jo values pehle thi wahi defaults hain, isliye desktop ka
 * output byte-for-byte same rehta hai.
 */
function FlowingIcons({
  points,
  boxSize,
  glyphSize = 18,
  duration = 7,
  fadeZone = 5,
}) {
  const icons = [
    {
      tone: "pinterest",
      icon: <FaPinterest size={glyphSize} className="text-red-500" />,
    },
    {
      tone: "spark",
      icon: (
        <RiSparkling2Fill size={glyphSize - 1} className="text-emerald-500" />
      ),
    },
    {
      tone: "instagram",
      icon: <FaInstagram size={glyphSize} className="text-[#cc4b13]" />,
    },
    {
      tone: "facebook",
      icon: <FaFacebook size={glyphSize} className="text-[#1877F2]" />,
    },
    {
      tone: "youtube",
      icon: <FaYoutube size={glyphSize} className="text-red-700" />,
    },
  ];

  // ---- ASLI FIX ----
  // Points array ke end me point 0 ka duplicate tha ("loop back to start").
  // Uski wajah se icon right-top se left-top tak ek normal animated segment
  // ki tarah travel karta tha — yaani poori screen ke upar se right-to-left
  // jaata hua saaf dikhta tha.
  //
  // Framer Motion khud hi `repeat: Infinity` par aakhri keyframe se pehle
  // keyframe par instantly jump karta hai (bina interpolate kiye), isliye wo
  // duplicate point chahiye hi nahi tha. Use hata dene se wapasi 0ms me hoti
  // hai, aur dono sire par opacity exact 0 hone ki wajah se aankh ko kuch
  // dikhta hi nahi — icon right par poori tarah gayab, phir left se nikalta hai.
  const pts =
    points.length > 1 &&
    points[points.length - 1].left === points[0].left &&
    points[points.length - 1].top === points[0].top
      ? points.slice(0, -1)
      : points;

  const last = pts.length - 1;

  // Curve ke dono sire par exact 0 opacity, beech me full.
  const opacityFrames = pts.map((_, i) => {
    const distFromStart = i;
    const distFromEnd = last - i;
    if (distFromStart < fadeZone)
      return Math.pow(distFromStart / fadeZone, 1.5);
    if (distFromEnd < fadeZone) return Math.pow(distFromEnd / fadeZone, 1.5);
    return 1;
  });

  return icons.map((it, iconIdx) => {
    // Evenly space every icon around the loop instead of a fixed
    // 1.2s step — with a fixed step, adding a 5th icon (youtube)
    // left an uneven gap so it trailed right behind pinterest.
    // Dividing the full loop duration by the icon count keeps
    // the spacing equal no matter how many icons are flowing.
    const delay = iconIdx * (duration / icons.length);

    return (
      <motion.div
        key={it.tone}
        className="absolute left-0 top-0"
        initial={{ opacity: 0 }}
        animate={{
          left: pts.map((p) => p.left),
          top: pts.map((p) => p.top),
          opacity: opacityFrames,
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay,
        }}
        style={{
          transform: "translate(-50%, -50%) translateZ(0)",
          willChange: "transform, left, top, opacity",
          zIndex: 30,
        }}
      >
        <GlassIconCard
          icon={it.icon}
          tone={it.tone}
          size={boxSize}
          depth={iconIdx % 2 === 0 ? 1 : 0}
          opacity={1}
          rotate={0}
        />
      </motion.div>
    );
  });
}

function AnimatedArrow({ hovered, size = 16 }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: size + 1, height: size + 1 }}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        animate={
          hovered
            ? { x: size + 1, y: -(size + 1), opacity: 0 }
            : { x: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <MdArrowOutward size={size} />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        animate={
          hovered
            ? { x: 0, y: 0, opacity: 1 }
            : { x: -(size + 1), y: size + 1, opacity: 0 }
        }
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <MdArrowOutward size={size} />
      </motion.span>
    </div>
  );
}

function GlassButtonBase({
  children,
  withArrow,
  background,
  glowOpacity = 0.55,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97, y: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 flex gap-2 sm:gap-2.5 justify-center items-center rounded-full
        text-sm sm:text-base font-semibold text-white cursor-pointer whitespace-nowrap
        overflow-hidden border border-white/10
        shadow-[0_10px_26px_rgba(0,0,0,0.6)]
        hover:shadow-[0_14px_32px_rgba(0,0,0,0.65)]
        transition-shadow duration-300"
      style={{ background }}
    >
      {/* Strong top-down vertical glow, centered, falling off sharply */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 70% at 50% -10%, rgba(255,255,255,${glowOpacity}) 0%, rgba(255,255,255,${glowOpacity * 0.33}) 45%, transparent 75%)`,
        }}
      />
      {/* Faint dimmer glows at the left and right edges */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(25% 80% at 6% 50%, rgba(255,255,255,0.12), transparent 70%), radial-gradient(25% 80% at 94% 50%, rgba(255,255,255,0.12), transparent 70%)",
        }}
      />
      {/* Bright rim tracing the rounded top arc specifically */}
      <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.5)]" />
      {/* Very dark base toward the bottom for contrast against the glow */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-full"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
        }}
      />

      <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
        {children}
        {withArrow && <AnimatedArrow hovered={hovered} size={16} />}
      </span>
    </motion.button>
  );
}

// ---- Primary: lighter glass, brighter top glow ----
function PrimaryGlassCta({ children, withArrow = false }) {
  return (
    <GlassButtonBase
      withArrow={withArrow}
      background="rgb(55,55,55)"
      glowOpacity={0.75}
    >
      {children}
    </GlassButtonBase>
  );
}

// ---- Secondary: darker glass, dimmer top glow ----
function SecondaryGlassCta({ children, withArrow = false }) {
  return (
    <GlassButtonBase
      withArrow={withArrow}
      background="rgb(16,16,16)"
      glowOpacity={0.4}
    >
      <span className="flex items-center gap-2">
        {children}

        <MdSlowMotionVideo size={20} />
      </span>
    </GlassButtonBase>
  );
}

// Icons that cycle inside the headline glass badge — Insta -> Facebook -> Twitter -> TikTok,
// switching every 2 seconds.
const HEADLINE_ICONS = [
  { key: "insta", Icon: BsInstagram },
  { key: "facebook", Icon: FaFacebook },
  { key: "twitter", Icon: FaXTwitter },
  { key: "tiktok", Icon: FaTiktok },
];

export default function Home1() {
  const iconSize = useResponsiveIconSize();
  const headlineIconSize = useHeadlineIconSize();
  const headlineBadgeBoxSize = useHeadlineBadgeBoxSize();

  const [headlineIconIndex, setHeadlineIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIconIndex((prev) => (prev + 1) % HEADLINE_ICONS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const CurrentHeadlineIcon = HEADLINE_ICONS[headlineIconIndex].Icon;

  return (
    <section
      data-theme="dark"
      className="relative w-full lg:h-dvh lg:min-h-dvh pt-32 sm:pt-36 md:pt-[140px] pb-24 sm:pb-28 lg:pb-32 overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ minHeight: "100%", minWidth: "100%" }}
      >
        <source src="/video-opt.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/20 sm:bg-black/40" />

      {/* ===== DESKTOP / TABLET (md and up) — untouched ===== */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[380px] sm:top-[240px] md:top-[260px] lg:top-[220px] xl:top-[190px] w-full max-w-[95vw] sm:max-w-[110vw] md:w-[1100px] md:max-w-[150vw] lg:w-[1320px] lg:max-w-[92vw] xl:w-[1480px] xl:max-w-[95vw] h-[220px] sm:h-[630px] md:h-[660px] lg:h-[760px] xl:h-[840px] overflow-hidden pointer-events-none">
        <div className="absolute top-[16px] sm:top-[-120px] md:top-[-150px] lg:top-[-180px] xl:top-[-200px] left-0 w-full h-[190px] sm:h-[650px] md:h-[650px] lg:h-[760px] xl:h-[840px]">
          <svg
            className="absolute inset-0 w-full h-full opacity-60"
            viewBox="0 0 1100 650"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curveFade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="18%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="82%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M20 20 C 20 500, 280 620, 550 620 C 820 620, 1080 500, 1080 20"
              stroke="url(#curveFade)"
              strokeOpacity="0.33"
              strokeWidth="1"
            />
          </svg>

          {/* Flow-only animation: icons curve points par continuously move honge.
              Rotation ko ab fixed step me di hui style se lock rakha hai (as per feedback rotation nahi chahiye).
              Opacity ab ek bada fadeZone aur ease curve use karta hai taaki fade smooth/gradual lage,
              ek dum se gayab hone jaisa na lage. */}
          <FlowingIcons
            points={CURVE_POINTS}
            boxSize={iconSize}
            glyphSize={18}
            duration={7}
            fadeZone={5}
          />
        </div>
      </div>

      <div className="relative z-10 md:px-10 h-full flex items-center">
        <div className="md:max-w-5xl md:mx-auto px-6 text-center flex flex-col items-center w-full gap-1 sm:gap-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white border border-black/10
    shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-[10px] sm:text-xs md:text-[13px] leading-none
    tracking-tight sm:tracking-normal font-medium text-black/80 whitespace-nowrap"
          >
            <FaStar className="text-[#2ecc40] shrink-0 text-[9px] sm:text-[11px] md:text-xs" />
            4.9/5 - Hisar's #1 SMM Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 sm:mt-7 font-semibold text-white text-center
              text-[35px] leading-[1.25] xs:text-[36px] xs:leading-[1.15] sm:text-[56px] sm:leading-[1.1] md:text-[66px] lg:text-[80px]"
          >
            Agency that makes your <br />
            <span className="inline">
              <span
                className="italic font-light text-[#D6ff01]"
                style={{ fontFamily: "Instrument Serif , serif" }}
              >
                reels & content
              </span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                className="relative inline-flex items-center justify-center align-middle
                  rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden mx-0.5
                  border border-white/15 hover:scale-110 transition-all duration-300 hover:rotate-12
                  shadow-[0_0_22px_rgba(255,255,255,0.),0_8px_20px_rgba(255,255,255,0.4)]"
                style={{
                  width: headlineBadgeBoxSize,
                  height: headlineBadgeBoxSize,
                  background: "rgba(110,110,110,0.45)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Warm glow bleeding through from behind the glass */}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 65%, rgba(255,255,255,0.4), transparent 70%)",
                  }}
                />
                {/* Diagonal glass sheen — same direction as PrimaryGlassCta */}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 45%, transparent 70%)",
                  }}
                />
                {/* Bright top rim */}
                <span className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]" />
                {/* Soft dark fade at the bottom for depth */}
                <span
                  className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                  }}
                />

                {/* Cycling social icon: Instagram -> Facebook -> Twitter -> TikTok, every 2s */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={HEADLINE_ICONS[headlineIconIndex].key}
                    initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative z-10 flex items-center justify-center"
                  >
                    <CurrentHeadlineIcon
                      size={headlineIconSize}
                      className="text-[#D6ff01]"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.span>{" "}
              <span
                className="font-light italic text-[#D6ff01]"
                style={{ fontFamily: "Instrument Serif , serif" }}
              >
                go viral
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 sm:mt-8 px-3 py-1 text-[13px] sm:text-[15px] md:text-base text-white/80 font-medium leading-relaxed"
          >
            Scroll-stopping reels & short-form video editing for
            Influencers,Creators & Brands across Haryana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 w-full pb-4 sm:pb-0"
          >
            <PrimaryGlassCta withArrow>
              <Link to="/contact">Book A Free Meeting</Link>
            </PrimaryGlassCta>
            <SecondaryGlassCta>
              <Link to="/contact">View Our Works</Link>
            </SecondaryGlassCta>
          </motion.div>

          {/* ===== MOBILE ONLY (below md) — flowing icons curve under the CTAs =====
              Ye block sirf mobile/small screens par render hota hai. Desktop wale
              absolute curve ko chhua nahi gaya, isliye md+ ka UI bilkul same hai.
              Yaha curve normal document flow me hai (absolute nahi), isliye ye
              buttons ke neeche baithta hai aur kisi text ke upar overlap nahi karta.
              -mx-6 se ye page ke horizontal padding ko cancel karke edge-to-edge
              jaata hai, jaisa reference screenshot me dikh raha hai. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
                        className="md:hidden relative -mx-6 -mt-6 sm:-mt-3 w-[calc(100%+3rem)] h-[150px] sm:h-[180px] pointer-events-none overflow-visible"
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-60"
              viewBox="0 0 400 140"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="curveFadeMobile"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="18%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="82%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M10 12 C 60 100, 130 128, 200 130 C 270 128, 340 100, 390 12"
                stroke="url(#curveFadeMobile)"
                strokeOpacity="0.4"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <FlowingIcons
              points={MOBILE_CURVE_POINTS}
              boxSize={iconSize}
              glyphSize={15}
              duration={8}
              fadeZone={4}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
