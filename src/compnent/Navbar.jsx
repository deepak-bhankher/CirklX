import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import MobileBottomNav from "./Mobilebottomnav";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Service", path: "/service" },
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" },
];

const WHATSAPP_NUMBER = "+918053200325"; // <-- apna number daal

const WHATSAPP_MSG = "Hi CirklX! I want to book a free meeting.";

function useDarkSection() {
  const [isDark, setIsDark] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    let darkSections = []; // cached — sirf resize/route change pe re-query hoga
    let ticking = false; // rAF throttle flag

    function queryDarkSections() {
      darkSections = Array.from(
        document.querySelectorAll('[data-theme="dark"]'),
      );
    }

    function checkSection() {
      const nav = document.querySelector("nav");
      const navBottom = nav ? nav.getBoundingClientRect().bottom : 70;
      const checkY = navBottom

      let foundDark = false;
      for (let i = 0; i < darkSections.length; i++) {
        const rect = darkSections[i].getBoundingClientRect();
        if (rect.top <= checkY && rect.bottom >= checkY) {
          foundDark = true;
          break; // pehla match milte hi ruk jao, baaki check karne ki zarurat nahi
        }
      }

      setIsDark((prev) => (prev === foundDark ? prev : foundDark)); // same value pe re-render skip
      ticking = false;
    }

    // Scroll ko requestAnimationFrame se throttle karo —
    // ab checkSection() max 1 baar per frame hi chalega, har scroll pixel pe nahi
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkSection);
      }
    }

    function onResize() {
      queryDarkSections(); // layout badla to sections dobara naap lo
      checkSection();
    }

    function onSectionsUpdated() {
      queryDarkSections();
      checkSection();
    }

    queryDarkSections();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("sections-updated", onSectionsUpdated);

    checkSection();

    // Route change ke baad DOM/video turant paint nahi hota,
    // isliye thoda delay dekar dobara query + check karo
    const raf = requestAnimationFrame(() => {
      queryDarkSections();
      checkSection();
    });
    const timeout = setTimeout(() => {
      queryDarkSections();
      checkSection();
    }, 300);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("sections-updated", onSectionsUpdated);
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return isDark;
}

function NavItem({ label, path, isDark }) {
  const { pathname } = useLocation();
  const isActive = pathname === path;
  const [hovered, setHovered] = useState(false);
  const active = hovered || isActive;
  const defaultColor = isDark ? "#ffffff" : "#15140F";
  const underlineColor = isDark ? "#D6ff01" : "#15140F";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-2 lg:px-4 py-2 cursor-pointer"
    >
      <motion.span
        animate={{
          color: active ? (isDark ? "#ffffff" : "#000000") : defaultColor,
        }}
        transition={{ duration: 0.2 }}
        className="relative text-[13px] lg:text-sm font-medium tracking-wide whitespace-nowrap"
      >
        {label}
      </motion.span>
      <motion.span
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ backgroundColor: underlineColor, originX: 0.5 }}
        className="absolute left-2 right-2 lg:left-4 lg:right-4 -bottom-0.5 h-[1.5px] rounded-full"
      />
    </div>
  );
}

function CtaButton() {
  const [hovered, setHovered] = useState(false);

  // encodeURIComponent zaruri hai — warna space aur ! wale characters
  // URL me toot jaate hain aur message adhoora khulta hai.
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="px-5 py-2 flex gap-1.5 items-center rounded-lg text-sm font-semibold text-black cursor-pointer
        bg-[#D6ff01] border border-black/10
        hover:bg-black hover:text-[#D6ff01] hover:border-[#D6ff01]
        hover:shadow-[0_0_22px_rgba(214,255,1,0.5)]
        transition-all duration-300"
    >
      Book A Free Meeting

      <div className="relative w-[17px] h-[17px] overflow-hidden">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 17, y: -17, opacity: 0 } : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <MdArrowOutward size={17} />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 0, y: 0, opacity: 1 } : { x: -17, y: 17, opacity: 0 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <MdArrowOutward size={17} />
        </motion.span>
      </div>
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const isDark = useDarkSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4"
      >
        <div
          className={`max-w-5xl mx-auto rounded-2xl px-5 transition-all duration-500 ${
            scrolled
              ? isDark
                ? "bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                : "bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              : isDark
                ? "bg-white/[0.03] backdrop-blur-sm border border-white/[0.07]"
                : "bg-white/5 backdrop-blur-sm border border-white/10"
          }`}
        >
          {/* Mobile par ab sirf logo — navigation neeche wale bar me hai. */}
          <div className="flex items-center justify-between md:justify-between h-[56px] md:h-[62px]">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <motion.img
                  src={isDark ? "/white.png" : "/black.png"}
                  alt="CirklX"
                  className="w-7 h-7 md:w-8 md:h-8 object-contain"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={{ color: isDark ? "#ffffff" : "#15140F" }}
                  transition={{ duration: 0.3 }}
                  className="font-bold text-[16px] md:text-[17px] tracking-tight"
                >
                  CirklX
                </motion.span>
              </motion.div>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                  className="list-none"
                >
                  <Link to={link.path}>
                    <NavItem
                      label={link.name}
                      path={link.path}
                      isDark={isDark}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="hidden md:block"
            >
              <CtaButton />
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile navigation — screen ke bottom par */}
      <MobileBottomNav />
    </>
  );
}