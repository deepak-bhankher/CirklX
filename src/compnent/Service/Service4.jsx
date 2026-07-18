import React from "react";
import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  Compass,
  LayoutTemplate,
  PenTool,
  Lightbulb,
  Columns3,
  UserRound,
  Palette,
  Grid2x2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Google My Business (GMB)",
    desc: " Management Own your spot on Google Maps We set up and optimize your GMB profile — reviews, photos, posts, and local keywords — so customers find you first when searching nearby.",
  },
  {
    icon: Compass,
    title: "Shopify Website Development",
     desc: "Your store, built to convert Custom Shopify stores designed for speed, mobile shopping, and easy checkout — built to turn visitors into paying customers.",
  },
  {
    icon: LayoutTemplate,
    title: "AI-Powered Videos",
    desc: "The future of content, today AI-generated and AI-enhanced videos — faster production, unique visuals, and content styles that stand out from typical edits.",
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    desc: "Visuals that stop the scroll Posts, carousels, banners, and brand visuals — designed to match your brand identity and grab attention instantly.",
  },
  {
    icon: Lightbulb,
    title: "Video Editing",
    desc: "Raw footage, reel-ready results Fast, trend-driven editing with hooks, captions, transitions, and sound — turning your footage into scroll-stopping content.",
  },
  {
    icon: Columns3,
    title: "Branding",
    desc: "Build a brand people remember Logo, color palette, tone of voice, and visual identity — we craft a brand that's consistent, recognizable, and built to last.",
  },
  {
    icon: UserRound,
    title: "Product Photoshoot",
    desc: "Make your products impossible to ignore Professional product photography that highlights every detail — perfect for e-commerce, catalogs, and social media.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Design that feels as good as it looks Website and app interfaces designed for smooth navigation and better user experience — because good design keeps people coming back.",
  },
  {
    icon: Grid2x2,
    title: "Video Shoot",
    desc: "Content starts with a great shoot Professional video shoots — DSLR or mobile — for brand content, influencer collabs, product features, and social media reels.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Service4() {
  return (
    <section className="relative bg-white py-20 md:py-28 px-4 sm:px-6 md:px-10 overflow-hidden">
      {/* faint ghost text backdrop */}
      <span className="pointer-events-none select-none absolute top-6 left-1/2 -translate-x-1/2 text-[13vw] md:text-[9vw] font-extrabold text-black/[0.04] tracking-tight whitespace-nowrap">
        SERVICESss
      </span>

      <div className="relative max-w-5xl mx-auto">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-5"
        >
          <span className="inline-flex items-center rounded-lg hover:bg-black hover:text-[#D6ff01] cursor-pointer transition-all duration-300 border border-black px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
            My Specialization
          </span>
        </motion.div>

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center text-3xl md:text-5xl font-bold text-black mb-16"
        >
          <span className="text-[#B9D600]">Services</span> I Provide
        </motion.h2>

        {/* grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className="group relative rounded-2xl border border-black/5 bg-[#F6F6F6] p-7 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              {/* left accent bar */}
              <span className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-[#D6FF01]" />

              <div className="pl-3">
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6 relative">
                  <Icon className="w-6 h-6 text-[#D6FF01]" strokeWidth={1.75} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-sm bg-[#D6FF01]" />
                </div>

                <h4 className="text-lg font-semibold text-black mb-2">
                  {title}
                </h4>
                <p className="text-sm text-black/50 leading-relaxed mb-5">
                  {desc}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-black/80 hover:text-black transition-colors"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 text-[#B9D600] transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}