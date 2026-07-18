import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    title: "Social Media Marketing (SMM)",
    image: "/service1.png",
    imagePosition: "right",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
        <path d="M9.5 8.5v7l6-3.5-6-3.5Z" />
      </svg>
    ),
    desc: "Grow your following, the smart way End-to-end management of your Instagram, Facebook & YouTube — content planning, posting, and engagement strategies built to grow real followers and real reach.",
  },
  {
    title: "Social Media Optimization (SMO)",
    image: "/service2.png",
    imagePosition: "left",
    iconBg: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="white" />
      </svg>
    ),
    desc: "Make every profile work harder We optimize your bios, hashtags, posting times, and content structure so your profiles get discovered by the right audience, organically.",
  },
  {
    title: "Search Engine Optimization (SEO)",
    image: "/service3.png",
    imagePosition: "right",
    iconBg: "bg-black",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
        <path d="M16.5 3c.3 2 1.7 3.6 3.7 3.9v2.7c-1.4.1-2.7-.3-3.7-1v6.6c0 3-2.4 5.3-5.4 5.3S5.7 18.2 5.7 15.2c0-2.9 2.2-5.2 5.1-5.3v2.8c-1.3.1-2.3 1.2-2.3 2.5 0 1.4 1.1 2.5 2.5 2.5s2.6-1.1 2.6-2.5V3h2.9Z" />
      </svg>
    ),
    desc: "Get found before your competitors do On-page and local SEO to help your website and business rank higher on Google — more visibility, more traffic, more customers.",
  },
];

function PrimaryCta() {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mt-2 inline-flex items-center gap-2 self-start rounded-lg text-black bg-[#D6ff01] px-6 py-3 text-sm font-semibold
        hover:bg-black hover:text-[#D6ff01] cursor-pointer transition-all hover:shadow-lg duration-300"
    >
      <Link to="/contact">Book A Free Meeting</Link>

      <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
        <path
          d="M7 17 17 7M9 7h8v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

function ServiceCardContent({ service }) {
  const imageFirst = service.imagePosition === "left";

  const textBlock = (
    <div className="flex flex-col justify-center h-full p-8 sm:p-10 md:p-12">
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${service.iconBg} shadow-[0_8px_20px_rgba(0,0,0,0.15)]`}
      >
        {service.icon}
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-[#15140F] mb-4">
        {service.title}
      </h3>
      <p className="text-sm sm:text-base text-black/55 leading-relaxed mb-6 max-w-md">
        {service.desc}
      </p>
      <PrimaryCta />
    </div>
  );

  const imageBlock = (
    <div className="relative w-full h-56 sm:h-full">
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );

  return (
    // Fixed height so every card (regardless of text length) is identical size —
    // this is what stops the next stacked card from "peeking" through.
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:h-[520px]">
      {imageFirst ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

function StackingCard({ service, index, total }) {
  const ref = useRef(null);
  const isLast = index === total - 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    // Each wrapper is exactly 100vh tall — one "page" per card
    <div
      ref={ref}
      className="h-screen sticky top-0"
      style={{ zIndex: index + 1 }}
    >
      <div className="h-full flex items-center justify-center px-4 sm:px-6">
        <motion.div
          style={{
            ...(isLast ? {} : { scale }),
            // Fixes a Chrome bug where border-radius + overflow-hidden + a
            // transform (scale) glitch/clip incorrectly at the corners.
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          }}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden origin-top isolate"
        >
          <ServiceCardContent service={service} />
        </motion.div>
      </div>
    </div>
  );
}

function Service2() {
  return (
    <section className="w-full">
      {SERVICES.map((service, i) => (
        <StackingCard
          key={service.title}
          service={service}
          index={i}
          total={SERVICES.length}
        />
      ))}
    </section>
  );
}

export default Service2;