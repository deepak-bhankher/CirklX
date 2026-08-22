import { useEffect, useId, useRef, useState } from "react";
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
const H = 60; // bar ki height
const R = 24; // bar ke corners ka radius
const CIRCLE = 42; // uthe hue lime circle ka diameter
const CIRCLE_LIFT = 18; // circle bar ke top se kitna upar uthta hai
const CUT_R = 25; // notch ka radius — circle se thoda bada, taaki gap dikhe
const PAD = 28; // items row ka side inset

// Lime circle aur notch dono ka vertical center — ek hi value, isliye notch
// hamesha circle ke around perfectly baithti hai.
const CENTER_Y = CIRCLE / 2 - CIRCLE_LIFT;

export default function MobileBottomNav() {
  const { pathname } = useLocation();
  const wrapRef = useRef(null);
  const initialised = useRef(false);
  const [width, setWidth] = useState(0);

  // useId me colon aate hain jo SVG url(#id) me reliable nahi, isliye hata do.
  const maskId = `nav-notch-${useId().replace(/:/g, "")}`;

  const activeIndex = Math.max(
    0,
    ITEMS.findIndex((item) => item.path === pathname),
  );
  const active = ITEMS[activeIndex];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Sirf ek number animate hota hai — notch ka center x. Mask circle aur lime
  // circle dono usi se chalte hain, isliye wo kabhi out of sync nahi hote.
  const notchX = useMotionValue(0);
  const smoothX = useSpring(notchX, { stiffness: 260, damping: 28, mass: 0.9 });

  useEffect(() => {
    if (!width) return;

    // Item centers PAD ke andar evenly baante jaate hain — yahi values items
    // row ke flex layout se match karti hain (usme bhi wahi PAD lagta hai).
    const step = (width - PAD * 2) / ITEMS.length;
    const target = PAD + step * (activeIndex + 0.5);

    if (!initialised.current) {
      // Pehli baar bina animation ke, warna page khulte hi notch left se
      // slide karta hua aayega.
      notchX.set(target);
      smoothX.set(target);
      initialised.current = true;
    } else {
      notchX.set(target);
    }
  }, [activeIndex, width, notchX, smoothX]);

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
        {/* Bar ka background. Shape = rounded rect MINUS ek circle (mask se).
            Pehle poora outline ek SVG path se banta tha, par first/last item
            par notch corner ke peeche chali jaati thi aur wahi ulta hissa
            black wedge ban ke dikhta tha. Circle subtract karne me aisa ho
            hi nahi sakta — wo bas corner ko kaat deta hai, kabhi bahar nahi
            nikalta. */}
        {width > 0 && (
          <svg
            className="absolute inset-0 pointer-events-none overflow-visible"
            width={width}
            height={H}
            style={{ filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.45))" }}
          >
            <defs>
              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                x={0}
                y={-CIRCLE_LIFT - 20}
                width={width}
                height={H + CIRCLE_LIFT + 20}
              >
                {/* safed = dikhega, kaala = kata hua */}
                <rect width={width} height={H} rx={R} fill="#fff" />
                <motion.circle cx={smoothX} cy={CENTER_Y} r={CUT_R} fill="#000" />
              </mask>
            </defs>

            <rect
              width={width}
              height={H}
              rx={R}
              fill="#15140F"
              mask={`url(#${maskId})`}
            />
          </svg>
        )}

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
                size={19}
                strokeWidth={2.2}
                className="text-[#15140F]"
              />
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Tappable items. PAD yahan bhi wahi hai jo notch position calculate
            karte waqt use hota hai, warna circle icon ke upar nahi baithega. */}
        <div
          className="absolute inset-0 flex items-center"
          style={{ paddingLeft: PAD, paddingRight: PAD }}
        >
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
                    size={19}
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