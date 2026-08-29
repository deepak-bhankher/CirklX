import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

const ACCENT = "#D6ff01";
const COPIES = 3; // drag ke liye dono taraf buffer chahiye, isliye 2 ki jagah 3
const SPEED = 120; // auto-scroll ki raftaar, px per second (pehle 38s/pass tha)

const DESTINATIONS = [
  { id: 1, name: "Gearix", image: "/work1.webp" },
  { id: 2, name: "Easter Collection", image: "/work2.webp" },
  { id: 3, name: "Geeta Syrup", image: "/work3.webp" },
  { id: 4, name: "Easter Decor", image: "/work4.webp" },
  { id: 5, name: "Burger Wings", image: "/work5.webp" },
  { id: 6, name: "Geeta Syrup", image: "/work6.webp" },
  { id: 7, name: "Gearix", image: "/work7.webp" },
  { id: 8, name: "Geeta Syrup", image: "/work8.webp" },
  { id: 9, name: "Geeta Syrup", image: "/work9.webp" },
  { id: 10, name: "Burger Wings", image: "/work10.webp" },
  { id: 11, name: "Easter", image: "/work11.webp" },
  { id: 12, name: "Geeta Syrup", image: "/work12.webp" },
  { id: 13, name: "Gearix", image: "/work13.webp" },
  { id: 14, name: "Easter", image: "/work14.webp" },
  { id: 15, name: "Burger Wings", image: "/work15.webp" },
  { id: 16, name: "BSM Uniex salon", image: "/work16.webp" },
  { id: 18, name: "Hydra Facial", image: "/work18.webp" },

  { id: 26, name: "HOB", image: "/work26.jpeg" },
  { id: 20, name: "Kavya", image: "/work20.webp" },
  { id: 24, name: "CirklX", image: "/work24.webp" },
  { id: 19, name: "Jewellery Box", image: "/work19.webp" },
  { id: 25, name: "HOB", image: "/work25.jpeg" },
  { id: 22, name: "Tsuki", image: "/work22.webp" },
  { id: 23, name: "Hisar Collage", image: "/work23.webp" },
  { id: 21, name: "Tsuki", image: "/work21.webp" },
  { id: 17, name: "Haircut & Beard", image: "/work17.webp" },

  { id: 27, name: "HOB", image: "/work27.jpeg" },
];

/* ── Single Card — image only + small username below ────────── */
function DestinationCard({ d }) {
  return (
    <div
      className="group shrink-0 flex flex-col items-center gap-2.5"
      style={{ width: "280px" }}
    >
      <div
        className="relative overflow-hidden rounded-[28px]"
        style={{
          width: "280px",
          height: "380px",
          boxShadow: `none`,
          transform: "translateZ(0)",
        }}
      >
        <img
          src={d.image}
          alt={d.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <span className="text-[11px] font-medium text-black tracking-wide">
        {d.name}
      </span>
    </div>
  );
}

/* ── Main Export ─────────────────────────────────────────────── */
export default function Work5() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const draggingRef = useRef(false);

  const [passWidth, setPassWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], ["0px", "-30px"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.9]);

  const LOOP = Array.from({ length: COPIES }, () => DESTINATIONS).flat();

  // `drive` bina kisi limit ke chalta rehta hai — drag aur auto dono isi ko
  // aage badhate hain. Track uska wrapped version use karta hai, isliye loop
  // ke end par koi reset ya jump hota hi nahi.
  const drive = useMotionValue(0);

  const offset = useTransform(drive, (v) => {
    if (!passWidth) return 0;
    const m = ((v % passWidth) + passWidth) % passWidth; // [0, passWidth)
    // Outer wrapper khud `drive` se move hota hai, isliye yahan se usko ghata
    // dete hain — net translation sirf wrapped value ke barabar bachta hai.
    return m - passWidth - v;
  });

  // Ek "pass" ki asli width DOM se naapo, taaki gap ya card size badalne par
  // bhi loop exactly seamless rahe.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const kids = el.children;
      if (kids.length > DESTINATIONS.length) {
        setPassWidth(kids[DESTINATIONS.length].offsetLeft - kids[0].offsetLeft);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stopAuto = useCallback(() => {
    animRef.current?.stop();
    animRef.current = null;
  }, []);

  const startAuto = useCallback(() => {
    if (!passWidth || draggingRef.current) return;
    // Pehle ye CSS media query se handle hota tha, ab JS me.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    stopAuto();
    const run = () => {
      animRef.current = animate(drive, drive.get() - passWidth, {
        duration: passWidth / SPEED,
        ease: "linear",
        onComplete: run, // agla segment — wrapping offset khud sambhal leta hai
      });
    };
    run();
  }, [passWidth, drive, stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  useEffect(() => {
    window.dispatchEvent(new Event("sections-updated"));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F2ED] overflow-hidden pt-24 sm:pt-32 pb-10 sm:pb-14"
    >
      {/* ── Background glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(214,255,1,0.05) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full blur-[110px]"
          style={{ background: "rgba(80,40,180,0.035)" }}
        />
        <div
          className="absolute -bottom-20 left-0 w-[400px] h-[400px] rounded-full blur-[90px]"
          style={{ background: "rgba(0,120,80,0.03)" }}
        />
      </div>

      {/* ── Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
          backgroundSize: "90px 90px",
        }}
      />

      <div className=" z-0 max-w-[1320px]  mx-auto px-5 sm:px-10 -mt-10 sm:-mt-14 mb-8 sm:mb-10">
        <h2
          className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-center leading-[1.04] tracking-tight"
          style={{ color: "#000000" }}
        >
          Graphics
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        {/* Drag layer. Framer ka drag="x" touch par pan-y allow karta hai,
            isliye page ka vertical scroll waise ka waisa chalta rehta hai. */}
        <motion.div
          drag="x"
          style={{ x: drive }}
          dragMomentum={false}
          onDragStart={() => {
            draggingRef.current = true;
            stopAuto();
          }}
          onDragEnd={() => {
            draggingRef.current = false;
            startAuto();
          }}
          className="w-max cursor-grab active:cursor-grabbing"
        >
          <motion.div
            ref={trackRef}
            className="flex gap-5 sm:gap-6 py-4 px-3 w-max"
            style={{ x: offset, willChange: "transform" }}
          >
            {LOOP.map((d, i) => (
              <DestinationCard key={`${d.id}-${i}`} d={d} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
