import { useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
const  HIT = 68;

// Lime circle aur notch dono ka vertical center — ek hi value.
const CENTER_Y = CIRCLE / 2 - CIRCLE_LIFT;

// Notch ab CSS mask se katta hai (SVG mask se nahi), kyunki backdrop-filter
// sirf real DOM element par chalta hai — SVG <rect> par nahi. Center ki x
// position --notch-x variable se aati hai jo spring se live update hoti hai.
const NOTCH_MASK = `radial-gradient(circle at var(--notch-x) ${CENTER_Y}px, transparent ${CUT_R}px, #000 ${CUT_R + 1}px)`;

export default function MobileBottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const initialised = useRef(false);
  const draggingRef = useRef(false);
  const [width, setWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  // Drag ke dauraan circle me hovered item ka icon dikhta hai, active ka nahi.
  const [previewIndex, setPreviewIndex] = useState(null);
    const previewRef = useRef(null); // haptic ko double-fire hone se rokta hai

  const activeIndex = Math.max(
    0,
    ITEMS.findIndex((item) => item.path === pathname),
  );
  const shownIndex = previewIndex ?? activeIndex;
  const shown = ITEMS[shownIndex];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Sirf ek number animate hota hai — notch ka center x. Mask aur lime circle
  // dono usi se chalte hain, isliye wo kabhi out of sync nahi hote.
  const notchX = useMotionValue(0);
  const smoothX = useSpring(notchX, { stiffness: 260, damping: 28, mass: 0.9 });

  // Kisi index ka center x — slot width PAD ke andar barabar bantti hai.
  const slotFor = (i) => {
    const step = (width - PAD * 2) / ITEMS.length;
    return PAD + step * (i + 0.5);
  };

  // Ulta hisaab: finger ki x position kis item ke slot me girti hai.
  const indexForX = (x) => {
    const step = (width - PAD * 2) / ITEMS.length;
    const raw = Math.round((x - PAD) / step - 0.5);
    return Math.min(ITEMS.length - 1, Math.max(0, raw));
  };

  useEffect(() => {
    if (!width) return;
    // Drag ke beech route badla to position ko haath se mat cheeno.
    if (draggingRef.current) return;

    const target = slotFor(activeIndex);

    if (!initialised.current) {
      notchX.set(target);
      smoothX.set(target);
      initialised.current = true;
    } else {
      notchX.set(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, width]);

  const circleLeft = useTransform(smoothX, (cx) => cx - CIRCLE / 2);
    const hitLeft = useTransform(smoothX, (cx) => cx - HIT / 2);
  // CSS variable ko px string chahiye, plain number se calc fail hota hai.
  const notchXpx = useTransform(smoothX, (cx) => `${cx}px`);

  // ---- Drag handling ----
  // Framer ka drag="x" yahan kaam nahi karta: wo transform badalta hai jabki
  // circle `left` motion value se position hota hai — dono desync ho jaate.
  // Isliye pointer events se seedha notchX chalate hain.

  const clampX = (x) =>
    Math.min(slotFor(ITEMS.length - 1), Math.max(slotFor(0), x));

  const localX = (clientX) => {
    const rect = wrapRef.current.getBoundingClientRect();
    return clientX - rect.left;
  };

  const handlePointerDown = (e) => {
    if (!width) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setDragging(true);
  };

    const handlePointerMove = (e) => {
    if (!draggingRef.current || !wrapRef.current) return;

    const x = clampX(localX(e.clientX));
    // Dono set karte hain taaki circle bilkul finger ke saath chale —
    // sirf notchX set karne par spring peeche reh jaata aur laggy lagta.
    notchX.set(x);
    smoothX.set(x);

    const idx = indexForX(x);
    if (idx !== previewRef.current) {
      previewRef.current = idx;
      setPreviewIndex(idx);
      // Naye slot me ghusne par halka sa haptic — physical feel deta hai.
      if (navigator.vibrate) navigator.vibrate(8);
    }
  };


  const handlePointerUp = (e) => {
    if (!draggingRef.current || !wrapRef.current) return;
    draggingRef.current = false;
    setDragging(false);

    const idx = indexForX(clampX(localX(e.clientX)));
        previewRef.current = null;
    setPreviewIndex(null);

    // Spring ki jagah seedha animate — release par circle jahan hai wahan se
    // us item ki jagah tak smoothly glide karta hai, koi jhatka nahi.
    notchX.set(slotFor(idx));
    animate(smoothX, slotFor(idx), {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    });

    if (idx !== activeIndex) navigate(ITEMS[idx].path);
  };

  return (
    <motion.nav
      initial={{ y: 110, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="md:hidden fixed inset-x-4 z-50"
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div ref={wrapRef} className="relative" style={{ height: H }}>
        {/* Drop shadow alag layer par. Glass wali div masked hai aur mask
            uske bahar ka shadow bhi kaat deti hai, isliye shadow yahan. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: R,
            boxShadow: "0 14px 34px rgba(0,0,0,0.30)",
          }}
        />

        {/* Glass bar — blur + halka dark tint + upar white rim highlight.
            Mask se beech me notch cut hoti hai. */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            "--notch-x": notchXpx,
            borderRadius: R,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.02) 100%), rgba(21,20,15,0.55)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 -12px 26px rgba(0,0,0,0.18)",
            maskImage: NOTCH_MASK,
            WebkitMaskImage: NOTCH_MASK,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />

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

        {/* Active item ka uthe hua circle — yahi drag handle bhi hai.
            touchAction: none zaruri hai, warna browser page scroll karne
            lagta hai aur drag beech me toot jaata. */}
              {/* Invisible hit area — asli touch target. Circle sirf 42px ka hai
            jo ungli ke liye kam padta hai, isliye 68px ka wrapper. */}
        <motion.div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            left: hitLeft,
            top: -CIRCLE_LIFT - (HIT - CIRCLE) / 2,
            width: HIT,
            height: HIT,
            touchAction: "none",
          }}
        >
          {/* Dikhne wala lime circle */}
          <motion.div
            animate={{ scale: dragging ? 1.12 : 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-center justify-center rounded-full bg-[#D6ff01] pointer-events-none"
            style={{
              width: CIRCLE,
              height: CIRCLE,
              boxShadow: dragging
                ? "0 10px 26px rgba(0,0,0,0.45)"
                : "0 6px 18px rgba(0,0,0,0.35)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={shown.name}
                initial={{ opacity: 0, scale: 0.55, rotate: -35 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.55, rotate: 35 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <shown.Icon
                  size={19}
                  strokeWidth={2.2}
                  className="text-[#15140F]"
                />
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Tappable items */}
        <div
          className="absolute inset-0 flex items-center"
          style={{ paddingLeft: PAD, paddingRight: PAD }}
        >
          {ITEMS.map((item, i) => {
            // Drag ke waqt jo item circle ke neeche hai wo bhi chhup jaaye.
            const hidden = i === shownIndex;

            return (
              <Link
                key={item.name}
                to={item.path}
                aria-label={item.name}
                aria-current={i === activeIndex ? "page" : undefined}
                className="flex-1 h-full flex items-center justify-center"
              >
                <motion.span
                  animate={{ opacity: hidden ? 0 : 1, y: hidden ? -6 : 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  <item.Icon
                    size={19}
                    strokeWidth={1.8}
                    className="text-white/70"
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