import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

// Each reel: video src (poster shown until played), platform icon
// (emoji/text placeholder — swap for real SVG logos), handle, and quote.
const REELS = [
  {
    video: "/reels/reel1.mp4",
    poster: "/reels/reel1-poster.jpg",
    platform: "reels",
    handle: "@wellnesscoach",
    quote: "Gained 10k followers from this reel",
  },
  {
    video: "/reels/reel2.mp4",
    poster: "/reels/reel2-poster.jpg",
    platform: "tiktok",
    handle: "@gymm_trainer",
    quote: "I gained 5k Followers in the last month",
  },
  {
    video: "/reels/reel3.mp4",
    poster: "/reels/reel3-poster.jpg",
    platform: "reels",
    handle: "@wellnesscoach",
    quote: "Gained 10k followers from this reel",
  },
  {
    video: "/reels/reel4.mp4",
    poster: "/reels/reel4-poster.jpg",
    platform: "tiktok",
    handle: "@gymm_trainer",
    quote: "I gained 5k Followers in the last month",
  },
  {
    video: "/reels/reel5.mp4",
    poster: "/reels/reel5-poster.jpg",
    platform: "reels",
    handle: "@wellnesscoach",
    quote: "Gained 10k followers from this reel",
  },
  {
    video: "/reels/reel6.mp4",
    poster: "/reels/reel6-poster.jpg",
    platform: "tiktok",
    handle: "@gymm_trainer",
    quote: "I gained 5k Followers in the last month",
  },
];

// Small platform badge in the corner. Swap the emoji for a real SVG logo
// whenever you have brand assets — kept lightweight here so the card works
// without extra image files.
function PlatformIcon({ platform }) {
  if (platform === "tiktok") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white text-sm">
        ♪
      </span>
    );
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 text-white text-sm">
      ▶
    </span>
  );
}

function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={togglePlay}
      className="group relative flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden bg-black cursor-pointer
        shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)]
        transition-shadow duration-300"
    >
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.poster}
        loop
        muted
        playsInline
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Bottom gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Center play / pause button */}
      <motion.div
        initial={false}
        animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.8 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm text-white">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </motion.div>

      {/* Bottom-left platform icon + handle + quote */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2">
        <PlatformIcon platform={reel.platform} />
        <p className="text-sm font-semibold text-white">{reel.handle};</p>
        <p className="text-xs text-white/80 leading-snug">"{reel.quote}"</p>
      </div>
    </div>
  );
}

// Width (in px) of one full pass through the track (all unique cards +
// their gaps), used to compute how far -50% actually is and how long the
// remaining distance takes when resuming mid-scroll.
const CARD_WIDTH = 280; // matches the widest (md:) card width below
const GAP = 24; // matches gap-6

function Work2() {
  const trackRef = useRef(null);
  const controls = useAnimationControls();
  const xRef = useRef(0); // current x position (px, always <= 0)

  // Track is duplicated so it's exactly 2x one full pass. Animating x from
  // 0 to -fullPassWidth on an infinite linear loop, then resetting to 0,
  // makes the second half line up perfectly with the first — seamless,
  // no visible jump.
  const track = [...REELS, ...REELS];
  const fullPassWidth = REELS.length * (CARD_WIDTH + GAP);

  // Starts (or resumes) the loop from whatever x the track is currently
  // at, animating linearly to -fullPassWidth, then jumping back to 0 and
  // repeating — so pausing and resuming never causes a jump, it always
  // continues from exactly where it stopped.
  const playFrom = (fromX) => {
    const remaining = Math.abs(fromX) / fullPassWidth; // 0..1 progress
    const remainingDuration = 30 * (1 - remaining);

    controls
      .start({
        x: -fullPassWidth,
        transition: { duration: remainingDuration, ease: "linear" },
      })
      .then(() => {
        // Reset instantly to 0 (visually identical to -fullPassWidth
        // since the track is duplicated) and loop again from the top.
        controls.set({ x: 0 });
        xRef.current = 0;
        playFrom(0);
      });
  };

  useEffect(() => {
    playFrom(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePause = () => {
    controls.stop();
    // Read back the actual current x from the DOM transform so resuming
    // continues from the exact pixel it stopped at.
    const el = trackRef.current;
    if (el) {
      const transform = window.getComputedStyle(el).transform;
      if (transform && transform !== "none") {
        const match = transform.match(/matrix\(([^)]+)\)/);
        if (match) {
          const parts = match[1].split(",").map(Number);
          xRef.current = parts[4] || 0;
        }
      }
    }
  };

  const handleResume = () => {
    playFrom(xRef.current);
  };

  return (
    <section className="w-full bg-[#F4F2ED] py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-4xl sm:text-5xl font-bold text-[#15140F] mb-12 sm:mb-14"
        >
          Featured Reels
        </motion.h2>
      </div>

      {/* ---- Right-to-left infinite marquee, pauses on hover ----
          Outer div clips overflow so only the visible row shows, running
          full-bleed (not constrained to max-w-6xl) so the marquee runs
          edge to edge. Inner motion.div holds the duplicated track;
          animation is driven by `controls` (useAnimationControls) instead
          of a declarative animate prop, so it can be stopped and resumed
          from the exact current pixel position with no jump — hovering
          any card freezes the whole row in place, moving the cursor away
          continues the scroll from there. */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 w-max px-6"
          animate={controls}
          initial={{ x: 0 }}
        >
          {track.map((reel, i) => (
            <ReelCard key={i} reel={reel} />
          ))}
        </motion.div>

        {/* Soft fade at both edges so cards emerge/dissolve rather than
            hard-cut at the viewport boundary. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#F4F2ED] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#F4F2ED] to-transparent" />
      </div>
    </section>
  );
}

export default Work2;