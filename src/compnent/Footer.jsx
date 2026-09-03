import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// tel: link — click karte hi phone ka dialer number ke saath khul jaata hai.
const PHONE_LINK = "tel:+918053200325";

// `compact` sirf mobile par button ko chhota karta hai, taaki wo social
// icons ke saath ek hi row me fit ho jaaye. sm+ par size bilkul same rehta hai.
// `href` default ab "/contact" hai (internal route) — koi bhi doosra
// external/tel/mailto link caller pass kar sakta hai.
function PrimaryCta({
  children = "Book A Free Meeting",
  compact = false,
  href = "/contact",
  solid = false, // true = lime bg, koi hover color change nahi
}) {
  const sizing = compact
    ? "px-4 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm"
    : "px-6 py-3 text-sm";
  const arrowBox = compact ? "w-5 h-5 sm:w-6 sm:h-6" : "w-6 h-6";
  // solid = hamesha lime bg + dark text, hover par sirf shadow badalta hai.
  const colors = solid
    ? "bg-[#D6FF01] text-[#15140F]"
    : "bg-[#000000] text-[#D6FF01] hover:bg-[#D6FF01] hover:text-[#000000]";

  const isInternal = href.startsWith("/");
  // tel:/mailto: same tab me khulne chahiye, sirf http links naye tab me.
  const isExternal = href.startsWith("http");

  const className = `inline-flex items-center gap-2 sm:gap-2.5 rounded-lg ${colors} ${sizing} font-bold cursor-pointer whitespace-nowrap
    shadow-[0_8px_28px_rgba(214,255,1,0.25)]
    hover:shadow-[0_12px_36px_rgba(214,255,1,0.4)]
    transition-shadow duration-300`;

  const inner = (
    <>
      {children}
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
    </>
  );

  if (isInternal) {
    return (
      <motion.div
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="inline-block"
      >
        <Link to={href} className={className}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={className}
    >
      {inner}
    </motion.a>
  );
}

// Saare social icons ab ek hi brand color (#D6FF01) me hain. react-icons ke
// glyphs isliye use kiye kyunki wo monochrome ke liye bane hain — purane
// hand-drawn SVGs single color me shapeless lagte (Instagram bas ek square).
const SOCIALS = [
  { href: "https://www.instagram.com/cirklx.agency/", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.facebook.com/cirklxagency/?ref=PROFILE_EDIT_xav_ig_profile_page_web#", label: "Facebook", Icon: FaFacebookF },
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

// Contact row ka icon box — teeno jagah same style tha, isliye ek hi jagah.
function ContactIcon({ children }) {
  return (
    <span
      className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg flex-shrink-0"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {children}
    </span>
  );
}

const CONTACT_ROW_CLASS =
  "flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-sm text-white/45 hover:text-[#D6FF01] transition-colors duration-200 min-w-0";

function Footer() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ---- Top: heading + subtitle + CTA — light background.
           data-theme="dark" yahan nahi hai, isliye navbar is hisse par
           black text dikhata hai. ---- */}
      <div className="relative z-10 bg-[#F4F2ED]">
        <div className="max-w-2xl mx-auto text-center px-6 pt-20 sm:pt-24 pb-16 sm:pb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-extrabold text-[#15140F] leading-[1.1] text-4xl sm:text-5xl md:text-6xl"
          >
            Ready to make
            <br />
            <span
              className="italic font-light text-[#FF5722]"
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
            className="mt-6 text-sm sm:text-base text-black/55 max-w-md mx-auto"
          >
            From planning to shoot to scroll-stopping reels — let's build
            content that actually grows your following. Book a free call, no
            commitment needed.
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
      </div>

      {/* ---- Dark half: links + contact + social + bottom bar ---- */}
      <div data-theme="dark" className="relative bg-[#15140F]">
        <div className="relative z-10 border-t border-white/[0.07]">
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
                  <PrimaryCta compact solid href={PHONE_LINK}>
                    Let's Talk
                  </PrimaryCta>
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
                className={CONTACT_ROW_CLASS}
              >
                <ContactIcon>
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
                </ContactIcon>
                <span className="break-all leading-relaxed pt-0.5 sm:pt-1">
                  cirklX.agency@gmail.com
                </span>
              </a>

              <a href="tel:+918053200325" className={CONTACT_ROW_CLASS}>
                <ContactIcon>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
                    <path
                      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z"
                      stroke="#D6FF01"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ContactIcon>
                <span className="leading-relaxed pt-0.5 sm:pt-1 whitespace-nowrap">
                  +91 80532 00325
                </span>
              </a>

              {/* Address — link nahi hai, isliye hover color bhi nahi */}
              <div className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-sm text-white/45 min-w-0">
                <ContactIcon>
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
                </ContactIcon>
                <span className="leading-relaxed pt-0.5 sm:pt-1">
                   DSS 79, Basment, Near Lemon Tree,<br/> Old Court Complex, Hisar, Haryana,
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
              <Link
                to="/blog"
                className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/35 hover:text-[#D6FF01] transition-colors duration-200 tracking-wide"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D6FF01] opacity-70" />
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;