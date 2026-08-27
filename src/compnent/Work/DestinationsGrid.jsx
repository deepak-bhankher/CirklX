import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ACCENT = "#D6ff01";

const SECTIONS = [
  {
    id: "product",
    label: "Product",
    desc: "Stunning product visuals that convert",
    items: [
      {
        name: "Minimal Watch",
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=70&w=500&auto=format&fit=crop",
        tag: "3D Render",
      },
      {
        name: "Sneaker Drop",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=70&w=500&auto=format&fit=crop",
        tag: "Photography",
      },
      {
        name: "Perfume Bottle",
        img: "https://images.unsplash.com/photo-1541643600914-78b084683702?q=70&w=500&auto=format&fit=crop",
        tag: "Lifestyle",
      },
      {
        name: "Tech Gadget",
        img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=70&w=500&auto=format&fit=crop",
        tag: "Studio",
      },
    ],
  },
  {
    id: "logo",
    label: "Logo",
    desc: "Brand marks that leave a lasting impression",
    items: [
      {
        name: "Command",
        img: "logo22.jpeg",
        tag: "Command",
      },
      {
        name: "Mangal",
        img: "logo23.jpeg",
        tag: "Mangal",
      },
      {
        name: "Burger Wings.",
        img: "logo24.jpeg",
        tag: "Burger Wings",
      },
    ],
  },  
  {
    id: "branding",
    label: "Branding",
    desc: "Complete identity systems built to scale",
    items: [
      {
        name: "Luxe Packaging",
        img: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f9a?q=70&w=500&auto=format&fit=crop",
        tag: "Packaging",
      },
      {
        name: "Brand Guide",
        img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=70&w=500&auto=format&fit=crop",
        tag: "Guidelines",
      },
      {
        name: "Stationery Set",
        img: "https://images.unsplash.com/photo-1568667256549-094345857637?q=70&w=500&auto=format&fit=crop",
        tag: "Print",
      },
      {
        name: "Brand Identity",
        img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=70&w=500&auto=format&fit=crop",
        tag: "Full Identity",
      },
    ],
  },
];

// Grid ab section ke item count se banti hai. 3 items ke liye lg:grid-cols-3,
// warna 4 columns me teesra card ke baad ek khaali khaana reh jaata tha.
function gridClass(count) {
  return count === 3
    ? "grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
    : "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5";
}

function ItemCard({ item, isBranding, isGraphics }) {
  if (isGraphics) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-[28px] cursor-pointer"
        style={{
          height: "380px",
          boxShadow:
            "0 12px 32px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <img
          src={item.img}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        {/* Gradient image ke upar hai, isliye ye dono light theme me bhi
            dark hi rehte hain — warna white text image par padh nahi aata. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <span className="absolute top-4 left-4 text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full text-white bg-black/60 backdrop-blur-sm">
          {item.tag}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-xl font-bold text-white tracking-tight leading-none mb-4">
            {item.name}
          </h3>
          <div className="flex items-center justify-between rounded-2xl pl-4 pr-1.5 py-1.5 border border-white/15 bg-white/10 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/20">
            <span className="text-xs font-semibold text-white">
              Explore Now
            </span>
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rounded-2xl"
              style={{ background: ACCENT, color: "#000" }}
            >
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isBranding) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative rounded-[20px] overflow-hidden border border-black/[0.06] bg-white cursor-pointer"
        style={{ boxShadow: "0 8px 28px -10px rgba(0,0,0,0.15)" }}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <span
            className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full text-black"
            style={{ background: ACCENT }}
          >
            {item.tag}
          </span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#15140F]">
            {item.name}
          </span>
          <span
            className="w-7 h-7 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: ACCENT, color: "#000" }}
          >
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-[20px] overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 8px 28px -10px rgba(0,0,0,0.15)" }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white">
          {item.tag}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <span className="text-sm font-semibold text-white">{item.name}</span>
          <span
            className="w-7 h-7 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
            style={{ background: ACCENT, color: "#000" }}
          >
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Ab ye section hamesha page par rehta hai — na koi toggle button, na Close.
// Isliye `onClose` prop, entry/exit animation aur AnimatePresence sab hata diye.
// Sections ke scroll-reveal animations waise ke waise hain.
export default function DestinationsGrid() {
  useEffect(() => {
    // Navbar apne dark/light detection ke liye sections dobara naapta hai.
    window.dispatchEvent(new Event("sections-updated"));
  }, []);

  return (
    // data-theme="dark" hata diya — ab navbar is section par black text dikhata hai.
        <section className="relative w-full bg-[#F4F2ED] pt-24 sm:pt-28 pb-20 sm:pb-28 overflow-hidden">
      {/* subtle top border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)`,
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-10">
        {/* 4 Sections */}
        <div className="flex flex-col gap-20 sm:gap-28">
          {SECTIONS.map((section, si) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: si * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full text-black"
                      style={{ background: ACCENT }}
                    >
                      0{si + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#15140F] tracking-tight">
                      {section.label}
                    </h3>
                  </div>
                  <p className="text-sm text-black/45 ml-10">{section.desc}</p>
                </div>
              </div>

              {/* Cards grid — column count item count se aata hai */}
              <div className={gridClass(section.items.length)}>
                {section.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: ii * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ItemCard
                      item={item}
                      isBranding={section.id === "branding"}
                      isGraphics={section.id === "graphics"}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}