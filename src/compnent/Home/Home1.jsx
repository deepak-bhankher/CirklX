import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaPinterest, FaStar, FaYoutube } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiSparkling2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdSlowMotionVideo } from "react-icons/md";


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
      ? { accent: "#FF5A1F", accent2: "rgba(255,90,31,0.5)", tint: "rgba(255,90,31,0.16)" }
      : tone === "facebook"
        ? { accent: "#1877F2", accent2: "rgba(24,119,242,0.5)", tint: "rgba(24,119,242,0.16)" }
        : tone === "pinterest"
          ? { accent: "#D0002B", accent2: "rgba(208,0,43,0.5)", tint: "rgba(208,0,43,0.16)" }
          : tone === "youtube"
            ? { accent: "#FF0000", accent2: "rgba(255,0,0,0.5)", tint: "rgba(255,0,0,0.16)" }
          : tone === "spark"
            ? { accent: "#D6ff01", accent2: "rgba(214,255,1,0.5)", tint: "rgba(214,255,1,0.16)" }
            : { accent: "#D6ff01", accent2: "rgba(214,255,1,0.4)", tint: "rgba(214,255,1,0.12)" };

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
export default function Home1() {
  const iconSize = useResponsiveIconSize();

  return (
    <section
      data-theme="dark"
      className="relative w-full h-dvh min-h-dvh pt-16 sm:pt-32 md:pt-[140px] pb-10 sm:pb-24 overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[280px] sm:top-[120px] md:top-[130px] w-full max-w-[95vw] sm:max-w-[110vw] md:w-[1100px] md:max-w-[150vw] h-[220px] sm:h-[630px] md:h-[660px] overflow-hidden pointer-events-none">
        <div className="absolute top-[16px] sm:top-[-120px] md:top-[-150px] left-0 w-full h-[190px] sm:h-[650px] md:h-[650px]">
          <svg
            className="absolute inset-0 w-full h-full opacity-60"
            viewBox="0 0 1100 650"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Gradient so the curve line fades away smoothly at both
                  the top-left (where icons emerge) and top-right (where
                  icons go back in) ends, instead of cutting off abruptly.
                  The fade zone is wide/gradual for a premium look, and
                  starts fading well before it reaches the very top. */}
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
          {(() => {
            const icons = [
              {
                tone: "pinterest",
                icon: <FaPinterest size={18} className="text-red-500" />,
              },
              {
                tone: "spark",
                icon: <RiSparkling2Fill size={17} className="text-emerald-500" />,
              },
              {
                tone: "instagram",
                icon: <FaInstagram size={18} className="text-[#cc4b13]" />,
              },
              {
                tone: "facebook",
                icon: <FaFacebook size={18} className="text-[#1877F2]" />,
              },
              {
                tone: "youtube",
                icon: <FaYoutube size={18} className="text-red-700" />,
              },
            ];

            return icons.map((it, iconIdx) => {
              const duration = 7;
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
                    left: CURVE_POINTS.map((p) => p.left),
                    top: CURVE_POINTS.map((p) => p.top),
                    opacity: CURVE_POINTS.map((_, i) => {
                      const n = CURVE_POINTS.length;
                      // Fade both at the start (left-top, just appearing)
                      // and at the end (right-top, just before the loop
                      // restarts). Matching fade zones on both ends mean
                      // the icon is never abruptly visible/invisible —
                      // it fades out completely before the loop resets,
                      // then fades back in just as gradually, so the
                      // "jump" from right-top back to left-top happens
                      // while the icon is invisible.
                      const fadeZone = 5;
                      const distFromStart = i;
                      const distFromEnd = n - 1 - i;
                      if (distFromStart < fadeZone)
                        return Math.pow(distFromStart / fadeZone, 1.5);
                      if (distFromEnd < fadeZone)
                        return Math.pow(distFromEnd / fadeZone, 1.5);
                      return 1;
                    }),
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
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
                    size={iconSize}
                    depth={iconIdx % 2 === 0 ? 1 : 0}
                    opacity={1}
                    rotate={0}
                  />
                </motion.div>
              );
            });
          })()}
        </div>
      </div>

      <div className="relative z-10 md:px-10 h-full flex items-center">
        <div className="md:max-w-5xl md:mx-auto px-6 text-center flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10
              shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-sm font-medium text-black/80"
          >
            <FaStar className="text-[#2ecc40]" size={13} />
           4.9/5 - Hisar`s #1 SMM Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-5 sm:mt-7 font-semibold text-white
              text-[30px] leading-[1.1] xs:text-[36px] sm:text-[52px] md:text-[62px] lg:text-[68px]"
          >
            Agency that makes your
            <br />
            <span className="inline-flex items-center align-middle">
              <span
                className="italic font-light text-[#D6ff01] mr-2"
                style={{ fontFamily: "Instrument Serif , serif" }}
              >
                 reels & content
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                
                className="relative inline-flex items-center justify-center w-[32px] h-[32px] sm:w-[44px] sm:h-[44px] md:w-[56px] md:h-[56px]
                  rounded-xl sm:rounded-2xl overflow-hidden
                  border border-white/15 hover:scale-110 transition-all duration-300 hover:rotate-12"
                style={{
                  background: "rgba(110,110,110,0.45)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Warm glow bleeding through from behind the glass */}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 65%, rgba(255,255,255,0.5), transparent 70%)",
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
                <span className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]" />
                {/* Soft dark fade at the bottom for depth */}
                <span
                  className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                  }}
                />

                <BsInstagram
                  size={16}
                  className="relative z-10 text-[#D6ff01] sm:hidden"
                />
                <BsInstagram
                  size={22}
                  className="relative z-10 text-[#D6ff01] hidden sm:block md:hidden"
                />
                <BsInstagram
                  size={26}
                  className="relative z-10 text-[#D6ff01] hidden md:block"
                />
              </motion.span>

              <span
                className="font-light italic text-[#D6ff01] ml-2"
                style={{ fontFamily: "Instrument Serif , serif" }}
              >
                go 
                viral
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 sm:mt-7 px-3 py-1 text-[13px] sm:text-[15px] md:text-base text-white/80 font-medium"
          >
        Scroll-stopping reels & short-form video editing for Influencers,Creators & Brands across Haryana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3 w-full"
          >
            <PrimaryGlassCta withArrow>
              <Link to="/contact">Book A Free Meeting</Link>
            </PrimaryGlassCta>
            <SecondaryGlassCta>
              <Link to="/contact">View Our Works</Link>
            </SecondaryGlassCta>
          </motion.div>
        </div>
      </div>
    </section>
  );
}