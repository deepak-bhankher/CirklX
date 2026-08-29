import { ArrowUpRight } from "lucide-react";
import { useRevealGroup } from "../useReveal";
import { useEffect, useRef } from "react";

const ACCENT = "#D6ff01";

const SECTIONS = [
  {
    id: "product",
    label: "Product",
    desc: "Stunning product visuals that convert",
    marquee: true,
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
    marquee: true,
    // Logo images crop nahi honi chahiye — poori dikhni chahiye
    contain: true,
    items: [
      { name: "Command", img: "logo22.jpeg", tag: "Command" },
      { name: "Mangal", img: "logo23.jpeg", tag: "Mangal" },
      { name: "Burger Wings.", img: "logo24.jpeg", tag: "Burger Wings" },
    ],
  },
  {
    id: "branding",
    label: "Branding",
    desc: "Complete identity systems built to scale",
    // Ye section marquee me chalta hai, grid me nahi.
    marquee: true,
    items: [
      { img: "brand1.png", tag: "DJ Mirchi" },
      { img: "brand2.png", tag: "Jeera Lemon" },
      { img: "brand3.png", tag: "Burger Wings" },
      { img: "brand4.png", tag: "Burger Wings" },
      { img: "brand5.png", tag: "Mangal" },
      { img: "brand6.png", tag: "Jeera Lemon" },
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

// Branding ka card — sirf image aur tag. Neeche wali white patti aur arrow
// Branding ka card — sirf image aur tag. Neeche wali white patti aur arrow
// hata diye, isliye image poori dikhti hai.
// `contain` wale sections (jaise Logo) me image crop nahi hoti — poori
// dikhti hai aur bacha hua area bg se bhar jaata hai.
function BrandCard({ item, contain = false }) {
  return (
    <div
      className={`group relative shrink-0 rounded-[20px] overflow-hidden ${
        contain
          ? "w-[320px] sm:w-[440px]"
          : "w-[240px] sm:w-[320px] h-[180px] sm:h-[240px]"
      }`}
      style={{ boxShadow: "0 8px 28px -10px rgba(0,0,0,0.15)" }}
    >
      <img
        src={item.img}
        alt={item.tag}
        className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
          contain ? "object-contain" : "object-cover"
        }`}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <span
        className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full text-black"
        style={{ background: ACCENT }}
      >
        {item.tag}
      </span>
    </div>
  );
}

const BRAND_SPEED = 70; // px per second

function BrandMarquee({ items, speed = BRAND_SPEED, contain = false }) {
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  // 3 copies — hum hamesha beech wali copy me rehte hain, isliye user dono
  // taraf kheench sakta hai aur kabhi kinara nahi aata.
  const copies = items.length >= 6 ? 3 : items.length >= 4 ? 5 : 9;
  const track = Array.from({ length: copies }, () => items).flat();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // scrollWidth se divide karna galat tha — images load hone se pehle wo
    // chhota hota hai, aur wrap galat jagah reset kar deta tha. Ab ek copy
    // ki width seedha cards se naapte hain, jinki width CSS se fixed hai.
    const measure = () => {
      const kids = el.firstElementChild?.children;
      if (!kids || kids.length <= items.length) return 0;
      return kids[items.length].offsetLeft - kids[0].offsetLeft;
    };

    let w = measure();
    if (!w) return;

    const mid = w * Math.floor(copies / 2);
    el.scrollLeft = mid;

    let visible = false;
    let last = performance.now();
    let raf;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      // Tab wapas aane par dt bahut bada na ho jaaye.
      last = performance.now();
    });
    io.observe(el);

    const ro = new ResizeObserver(() => {
      const next = measure();
      if (next) w = next;
    });
    ro.observe(el);

    const step = (now) => {
      const dt = Math.min(now - last, 50); // tab switch par bada jump na ho
      last = now;

      if (visible && !pausedRef.current) {
        el.scrollLeft += (speed * dt) / 1000;
      }

      // Wrap dono taraf. Copies identical hain isliye ye jump dikhta hi nahi.
      const m = w * Math.floor(copies / 2);
      if (el.scrollLeft >= m + w) el.scrollLeft -= w;
      else if (el.scrollLeft < m - w) el.scrollLeft += w;

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [copies, speed, items.length]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  // Desktop par mouse se pakad ke kheenchne ke liye. Touch par browser ka
  // apna native scroll pehle se chalta hai, isliye wahan ye skip karte hain.
  const dragRef = useRef(null);

  const handlePointerDown = (e) => {
    pause();
    if (e.pointerType === "touch") return;
    dragRef.current = { x: e.clientX, left: scrollRef.current.scrollLeft };
    scrollRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    scrollRef.current.scrollLeft = dragRef.current.left - dx;
  };

  const handlePointerUp = () => {
    dragRef.current = null;
    resume();
  };

  return (
    // overflow-x-auto = native touch drag + momentum, sab browser handle karta hai.
    // Scrollbar chhupa di hai; overscroll-x-contain se page ka back gesture nahi chalta.
    <div
      ref={scrollRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={pause}
      onMouseLeave={handlePointerUp}
      className="relative left-1/2 w-screen -ml-[50vw] overflow-x-auto overflow-y-hidden overscroll-x-contain
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        cursor-grab active:cursor-grabbing"
    >
      <div className="flex w-max gap-4 sm:gap-5 py-2">
        {track.map((item, i) => (
          <BrandCard key={i} item={item} contain={contain} />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item }) {
  return (
    <div
      className="group relative rounded-[20px] overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
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
    </div>
  );
}

export default function DestinationsGrid() {
  const groupRef = useRevealGroup();

  useEffect(() => {
    // Navbar apne dark/light detection ke liye sections dobara naapta hai.
    window.dispatchEvent(new Event("sections-updated"));
  }, []);

  return (
    // data-theme="dark" hata diya — ab navbar is section par black text dikhata hai.
    <section
      ref={groupRef}
      className="relative w-full bg-[#F4F2ED] pt-24 sm:pt-28 pb-20 sm:pb-28 overflow-hidden"
    >
      {/* subtle top border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)`,
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-10">
        <div className="flex flex-col gap-20 sm:gap-28">
          {SECTIONS.map((section, si) => (
            <div key={section.id} className="reveal reveal-lg">
              <div
                className={`mb-8 sm:mb-10 ${section.marquee ? "text-center" : ""}`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-[#15140F] tracking-tight mb-2">
                  {section.label}
                </h3>
                <p className="text-sm text-black/45">{section.desc}</p>
              </div>

              {section.marquee ? (
                <BrandMarquee items={section.items} contain={section.contain} />
              ) : (
                <div className={gridClass(section.items.length)}>
                  {section.items.map((item) => (
                    <ItemCard key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
