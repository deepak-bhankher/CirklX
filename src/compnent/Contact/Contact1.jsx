import { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

function FormField({ label, placeholder, type = "text", textarea = false }) {
  const [focused, setFocused] = useState(false);

  const baseClasses =
    "w-full rounded-xl bg-white px-4 py-3 text-sm text-[#15140F] placeholder:text-black/30 border outline-none transition-all duration-300";
  const borderClasses = focused
    ? "border-black shadow-[0_0_0_3px_rgba(214,255,1,0.25)]"
    : "border-black/10";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-black/70">{label}</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseClasses} ${borderClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseClasses} ${borderClasses}`}
        />
      )}
    </div>
  );
}

function SendButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97, y: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="self-start flex items-center gap-2 rounded-lg bg-[#D6ff01] px-6 py-3 text-sm font-semibold text-black cursor-pointer
        border border-black/10
        shadow-[0_4px_0_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]
        hover:bg-black hover:text-[#D6ff01] hover:border-[#D6ff01]
        hover:shadow-[0_6px_0_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.15)]
        active:translate-y-[3px] active:shadow-[0_1px_0_rgba(0,0,0,0.2)]
        transition-all duration-200"
    >
      Send Message
      <div className="relative w-[16px] h-[16px] overflow-hidden">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 16, y: -16, opacity: 0 } : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <MdArrowOutward size={16} />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 0, y: 0, opacity: 1 } : { x: -16, y: 16, opacity: 0 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <MdArrowOutward size={16} />
        </motion.span>
      </div>
    </motion.button>
  );
}

function IconBadge({ children, size = "w-12 h-12" }) {
  return (
    <div
      className={`flex items-center justify-center ${size} rounded-xl flex-shrink-0 bg-black`}
    >
      {children}
    </div>
  );
}

function Contact1() {
  return (
    <section className="w-full bg-[#F4F2ED] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-5"
        >
          <span className="border border-black px-3 py-1 text-xs sm:text-sm font-semibold tracking-wide rounded-md hover:text-[#D6ff01] hover:bg-black transition-all duration-300 cursor-pointer">
            CONTACT
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#15140F]"
        >
          Reach Us{" "}
          <span
            className="italic font-light"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Anytime
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-4 text-sm sm:text-base text-black/55"
        >
          Have questions or need help? We're here for you.
        </motion.p>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 sm:gap-6">
        {/* Left: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 flex flex-col gap-5
            shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
        >
          <FormField label="Full Name" placeholder="Johan Robin" />
          <FormField
            label="Email Address"
            placeholder="hello@cirklx.com"
            type="email"
          />
          <FormField label="Subject" placeholder="Regarding Project" />
          <FormField
            label="How may we assist you?"
            placeholder="Tell us more..."
            textarea
          />
          <SendButton />
        </motion.div>

        {/* Right: info cards */}
        <div className="flex flex-col gap-5">
          {/* Stat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-white border border-black/8 p-5 sm:p-6 flex items-center gap-4
              shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] transition-all duration-300"
          >
            <IconBadge size="w-14 h-14">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="2.6"
                  stroke="#D6ff01"
                  strokeWidth="1.6"
                />
                <circle
                  cx="16"
                  cy="10"
                  r="2"
                  stroke="#D6ff01"
                  strokeWidth="1.6"
                />
                <path
                  d="M4 18c0-2.8 2.2-5 5-5s5 2.2 5 5M14.5 14.5c2 .2 3.5 1.7 3.5 3.5"
                  stroke="#D6ff01"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </IconBadge>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#15140F]">
                250%
              </p>
              <p className="text-xs sm:text-sm text-black/50 mt-0.5">
                Average Client Growth
              </p>
            </div>
          </motion.div>

          {/* Email card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-white border border-black/8 p-5 sm:p-6 flex items-center justify-between gap-4
              shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] transition-all duration-300"
          >
            <div>
              <p className="text-xs font-semibold tracking-wide text-black/40 mb-1">
                EMAIL US
              </p>
              <a
                href="mailto:hello@cirklx.com"
                className="text-sm font-semibold text-[#15140F] hover:text-black underline underline-offset-2 transition-colors duration-200"
              >
                hello@cirklx.com
              </a>
            </div>
            <IconBadge size="w-11 h-11">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2.5"
                  stroke="#D6ff01"
                  strokeWidth="1.6"
                />
                <path
                  d="M4 6.5l8 6 8-6"
                  stroke="#D6ff01"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </IconBadge>
          </motion.div>

          {/* Review card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-black p-5 sm:p-6
              shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.svg
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="#D6ff01"
                >
                  <path d="M12 2l3 6.5 7 .9-5.2 4.9 1.4 6.9L12 17.9 5.8 21.2l1.4-6.9L2 9.4l7-.9L12 2Z" />
                </motion.svg>
              ))}
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Within a short time, we saw improvements in lead quality & more —{" "}
              <span className="font-semibold text-[#D6ff01]">
                Client Review.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact1;
