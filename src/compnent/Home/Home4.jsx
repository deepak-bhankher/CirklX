import { useRevealGroup } from "../useReveal";

// Ab koi gradient/glass badge nahi — bas image seedha dikhegi.
// src me apni original icon/image ka path daal dena (Instagram, Youtube, Photoshop, etc).
const ICON_CLASS = "w-20 h-20 sm:w-14 sm:h-14 object-contain";

// First 3 cards: platform icon + 2-line title.
const PLATFORM_CARDS = [
  {
    title: ["Instagram", "Reels"],
    icon: <img src="icon3.png" alt="Instagram" className={ICON_CLASS} />,
  },
  {
    title: ["Youtube", "Shots"],
    // Youtube ke PNG me apne aap extra white padding hai isliye box
    // ke andar chhota dikhta hai — scale-150 se sirf isi image ko
    // bada kiya hai taaki Photoshop/Illustrator jaise hi dikhe.
    icon: (
      <img
        src="icon4.png"
        alt="Youtube"
        className={`${ICON_CLASS} scale-150`}
      />
    ),
  },
  {
    title: ["Graphic", "Design"],
    icon: <img src="icon5.png" alt="Photoshop" className={ICON_CLASS} />,
  },
];

// Stagger delays — pehle framer ke `delay: index * 0.1` se aate the.
const DELAY_CLASS = ["", "reveal-d1", "reveal-d2", "reveal-d3", "reveal-d4"];

const SERVICE_CARDS = [
  {
    title: ["Video Edits"],
    icon: <img src="icon1.png" alt="Video Edits" className={ICON_CLASS} />,
  },
  {
    title: ["Motion Graphics"],
    icon: <img src="icon2.png" alt="Motion Graphics" className={ICON_CLASS} />,
  },
];

function PlatformCard({ card, index }) {
  return (
    <div
      className={`reveal reveal-lg ${DELAY_CLASS[index]} flex flex-col justify-center sm:justify-between bg-white rounded-3xl p-6 sm:p-7 min-h-[190px] sm:min-h-[180px]
        shadow-[0_2px_16px_rgba(0,0,0,0.03)] transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)]`}
    >
      {/* Mobile: image centered. sm+: top-left, service cards jaisa. */}
      <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
        {card.icon}
      </div>

      <h3 className="text-2xl sm:text-[1.6rem] font-medium text-[#15140F] leading-tight text-center sm:text-left mt-0 sm:mt-7">
        {/* join se dono words ek hi line me — bottom cards jaisa */}
        {card.title.join(" ")}
      </h3>
    </div>
  );
}

function ServiceCard({ card, index }) {
  return (
    <div
      className={`reveal reveal-lg ${DELAY_CLASS[index + 3]} relative flex flex-col justify-center sm:justify-between bg-white rounded-3xl p-6 sm:p-7 min-h-[190px] sm:min-h-[180px] overflow-hidden
        shadow-[0_2px_16px_rgba(0,0,0,0.03)] transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)]`}
    >
      <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
        {card.icon}
      </div>

      <h3 className="text-2xl font-medium text-[#15140F] leading-tight mt-0 sm:mt-7 text-center sm:text-left">
        {card.title[0]}{" "}
        {/* Mobile par title ek hi line me — line break sirf sm+ par. */}
        <br className="hidden sm:inline" />
        <span className="text-black/40">{card.title[1]}</span>
      </h3>
    </div>
  );
}

function Home4() {
  const groupRef = useRevealGroup();

  return (
    <section ref={groupRef} className="w-full bg-[#F4F2ED] pt-8 pb-16 sm:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ---- Header ---- */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="reveal flex justify-center mb-5">
            <span className="inline-flex items-center rounded-lg border border-black/20 hover:bg-black hover:text-[#D6ff01] transition-all duration-300 cursor-pointer px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
              SERVICES WE OFFER
            </span>
          </div>

          <h2 className="reveal reveal-d1 text-4xl sm:text-5xl font-bold text-[#15140F] leading-[1.1]">
            Everything you need
            <br />
            for views
          </h2>
        </div>

        {/* ---- Top row: 3 platform cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {PLATFORM_CARDS.map((card, i) => (
            <PlatformCard key={card.title.join("-")} card={card} index={i} />
          ))}
        </div>

        {/* ---- Bottom row: 2 service cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {SERVICE_CARDS.map((card, i) => (
            <ServiceCard key={card.title.join("-")} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home4;