import { useRevealGroup } from "../useReveal";

const STEPS = [
  {
    number: "01", // first step has no visible number badge in the reference
    title: "We Plan & Shoot Your Content",
    desc: "Every reel starts with a strategy. We study your brand and trends, then shoot professional content — on-location or studio — built to perform.",
    image: "Home1.png",
  },
  {
    number: "02",
    title: "Our Editors Bring It to Life",
    desc: "Raw footage becomes scroll-stopping reels — cut, styled, and optimized for Instagram, YouTube Shorts & Facebook, with fast turnaround.",
    image: "Home2.png",
  },
  {
    number: "03",
    title: "We Upload & Track Growth",
    desc: "We post at the right time with the right hashtags, then track views and engagement to keep improving your results.",
    image: "Home3.png",
  },
];

// Har card ka stagger — pehle framer ka `delay: index * 0.15` tha,
// ab CSS transition-delay class se.
const DELAY_CLASS = ["", "reveal-d2", "reveal-d4"];

function StepCard({ step, index, isLast }) {
  return (
    <div
      className={`reveal reveal-lg ${DELAY_CLASS[index]} relative flex flex-col px-8 sm:px-16 py-2 ${
        !isLast ? "sm:border-r sm:border-black/10" : ""
      } ${index > 0 ? "border-t sm:border-t-0 border-black/10 pt-10 sm:pt-2" : ""}`}
    >
      {step.number && (
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-black/15 text-sm font-semibold text-black/70 mb-5">
          {step.number}
        </span>
      )}

      <h3 className="text-2xl sm:text-[1.7rem] font-bold text-[#15140F] leading-tight mb-4 max-w-[280px]">
        {step.title}
      </h3>

      <p className="text-sm text-black/55 leading-relaxed mb-7 max-w-[300px]">
        {step.desc}
      </p>

      {/* hover:-translate-y-1 — pehle framer ka whileHover={{ y: -4 }} tha */}
      <div
        className="w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden bg-black/5
          shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300
          hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
}

function Home2() {
  const groupRef = useRevealGroup();

  return (
    <section ref={groupRef} className="w-full bg-[#F4F2ED] py-16 sm:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex justify-center mb-8">
          <span className="inline-flex items-center rounded-lg border border-black/20 hover:bg-black hover:text-[#D6ff01] transition-all duration-300 cursor-pointer px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
            OUR PROCESS
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 mt-12 sm:mt-16">
        {STEPS.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            index={i}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

export default Home2;