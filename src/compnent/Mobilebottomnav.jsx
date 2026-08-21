import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiGrid, FiPlayCircle, FiMail } from "react-icons/fi";

const ITEMS = [
  { name: "Home", path: "/", Icon: FiHome },
  { name: "About", path: "/about", Icon: FiUser },
  { name: "Service", path: "/service", Icon: FiGrid },
  { name: "Work", path: "/work", Icon: FiPlayCircle },
  { name: "Contact", path: "/contact", Icon: FiMail },
];

// ---- Bar geometry (px) ----
const H = 62; // bar ki height
const R = 31; // pill radius = H / 2
const NOTCH_HALF = 38; // notch ek taraf se kitni chaudi hai
const NOTCH_DEPTH = 28; // notch kitni gehri utarti hai
const CIRCLE = 44; // uthe hue lime circle ka diameter
const CIRCLE_LIFT = 19; // circle bar ke top se kitna upar uthta hai

/**
 * Poore bar ka shape ek hi SVG path me — pill + `cx` par carve kiya hua notch.
 * Sirf numbers badalte hain, commands wahi ke wahi rehte hain, isliye ek
 * position se doosri par interpolate karna bilkul smooth rehta hai.
 */
function buildPath(cx, w) {
  return [
    `M 0,${R}`,
    `A ${R},${R} 0 0 1 ${R},0`,
    `L ${cx - NOTCH_HALF},0`,
    `C ${cx - 20},0 ${cx - 26},${NOTCH_DEPTH} ${cx},${NOTCH_DEPTH}`,
    `C ${cx + 26},${NOTCH_DEPTH} ${cx + 20},0 ${cx + NOTCH_HALF},0`,
    `L ${w - R},0`,
    `A ${R},${R} 0 0 1 ${w},${R}`,
    `A ${R},${R} 0 0 1 ${w - R},${H}`,
    `L ${R},${H}`,
    `A ${R},${R} 0 0 1 0,${R}`,
    "Z",
  ].join(" ");
}

export default function MobileBottomNav() {
  const { pathname } = useLocation();
  const wrapRef = useRef(null);
  const widthRef = useRef(0);
  const initialised = useRef(false);
  const [width, setWidth] = useState(0);

  const activeIndex = Math.max(
    0,
    ITEMS.findIndex((item) => item.path === pathname),
  );
  const active = ITEMS[activeIndex];

  // Bar ki asli width naapo — path px coordinates me banti hai, isliye viewBox
  // ko stretch nahi karna padta (warna notch ka curve bigad jaata).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  widthRef.current = width;

  // Sirf ek number animate hota hai — notch ka center x. Path aur circle dono
  // usi se derive hote hain, isliye wo hamesha perfectly sync me chalte hain.
  const notchX = useMotionValue(0);
  const smoothX = useSpring(notchX, {
    stiffness: 260,
    damping: 28,
    mass: 0.9,
  });

  useEffect(() => {
    if (!width) return;
    const target = (width / ITEMS.length) * (activeIndex + 0.5);

    if (!initialised.current) {
      // Pehli baar bina animation ke set karo, warna page khulte hi notch
      // left se slide karta hua aayega.
      notchX.set(target);
      smoothX.set(target);
      initialised.current = true;
    } else {
      notchX.set(target);
    }
  }, [activeIndex, width, notchX, smoothX]);

  const path = useTransform(smoothX, (cx) =>
    widthRef.current ? buildPath(cx, widthRef.current) : "",
  );
  const circleLeft = useTransform(smoothX, (cx) => cx - CIRCLE / 2);

  return (
    <motion.nav
      initial={{ y: 110, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="md:hidden fixed inset-x-4 z-50"
      // env(safe-area-inset-bottom) — iPhone ke home indicator ke liye
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div ref={wrapRef} className="relative" style={{ height: H }}>
        {/* Bar ka background — notch ke saath */}
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          width={width || "100%"}
          height={H}
          style={{ filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.45))" }}
        >
          <motion.path
            d={path}
            fill="#15140F"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
        </svg>

        {/* Circle ke peeche lime ki halki roshni */}
        <motion.span
          className="absolute pointer-events-none rounded-full"
          style={{
            left: circleLeft,
            top: -CIRCLE_LIFT,
            width: CIRCLE,
            height: CIRCLE,
            background:
              "radial-gradient(circle, rgba(214,255,1,0.45) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        {/* Active item ka uthe hua circle */}
        <motion.div
          className="absolute pointer-events-none flex items-center justify-center rounded-full bg-[#D6ff01]"
          style={{
            left: circleLeft,
            top: -CIRCLE_LIFT,
            width: CIRCLE,
            height: CIRCLE,
            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active.name}
              initial={{ opacity: 0, scale: 0.55, rotate: -35 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.55, rotate: 35 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <active.Icon
                size={20}
                strokeWidth={2.2}
                className="text-[#15140F]"
              />
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Tappable items. Active icon yahan chhupa rehta hai kyunki wo upar
            wale circle ke andar dikhta hai — spacing bani rehti hai. */}
        <div className="absolute inset-0 flex items-center">
          {ITEMS.map((item, i) => {
            const isActive = i === activeIndex;

            return (
              <Link
                key={item.name}
                to={item.path}
                aria-label={item.name}
                aria-current={isActive ? "page" : undefined}
                className="flex-1 h-full flex items-center justify-center"
              >
                <motion.span
                  animate={{ opacity: isActive ? 0 : 1, y: isActive ? -6 : 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  <item.Icon
                    size={20}
                    strokeWidth={1.8}
                    className="text-white/55"
                  />
                </motion.span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}