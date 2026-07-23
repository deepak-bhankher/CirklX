import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";

// Each reel: video src + thumbnail image + instagram handle.
const REELS = [
  { video: "/video1.mp4", thumb: "/thumb1.png", handle: "@logicgpt" },
  { video: "/video2.mp4", thumb: "/thumb3.png", handle: "@mr_techog" },
  { video: "/video3.mp4", thumb: "/thumb4.png", handle: "@logicgpt" },
  { video: "/video4.mp4", thumb: "/thumb2.png", handle: "@mr_techog" },
  { video: "/video5.mp4", thumb: "/thumb3.png", handle: "@uditgpt" },
  { video: "/video6.mp4", thumb: "/thumb6.png", handle: "@dr.himanshu_grover_" },
  { video: "/video7.mp4", thumb: "/thumb7.png", handle: "@fit.niya" },
  { video: "/video8.mp4", thumb: "/thumb5.png", handle: "@dr.himanshu_grover_" },
  { video: "/video9.mp4", thumb: "/thumb9.png", handle: "@houseofbinti" },
  { video: "/video10.mp4", thumb: "thumb8.png", handle: "@fit.niya" },
];

// Instagram glyph badge
function InstagramIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-sm">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

function MuteIcon({ muted }) {
  return muted ? (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <line x1="16" y1="9" x2="22" y2="15" />
      <line x1="22" y1="9" x2="16" y2="15" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 6a9 9 0 0 1 0 12" />
    </svg>
  );
}

function ReelCard({ reel, index, registerVideo, onPlay, onPause }) {
  const videoRef = useRef(null);
  // "started" = video element ab DOM me mount ho chuka hai (lazy mount)
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [thumbLoaded, setThumbLoaded] = useState(false);

  // Video mount hone ke baad hi ref registered hota hai + turant autoplay
  useEffect(() => {
    if (started && videoRef.current) {
      registerVideo(index, videoRef.current);
      videoRef.current.play().catch(() => {});
    }
  }, [started, index, registerVideo]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!started) {
      // Pehli baar click → video ko lazily mount karo, marquee bhi rok do
      onPlay(index);
      setStarted(true);
      return;
    }
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      onPlay(index);
      vid.play();
    } else {
      vid.pause();
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (vid && vid.duration) setProgress((vid.currentTime / vid.duration) * 100);
  };

  const handlePauseEvent = () => {
    setIsPlaying(false);
    onPause(index);
    // Video pause hote hi wapas thumbnail pe switch — heavy decode free ho jata hai
    setStarted(false);
    setProgress(0);
    registerVideo(index, null);
  };

  return (
    <motion.div
      onClick={togglePlay}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px] aspect-[3/4] rounded-[22px] overflow-hidden bg-[#0c0c0c] cursor-pointer
        ring-1 ring-black/5
        shadow-[0_4px_20px_rgba(0,0,0,0.10)]
        transition-shadow duration-300
        ${isPlaying ? "shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-white/20" : "hover:shadow-[0_16px_40px_rgba(0,0,0,0.20)]"}
      `}
    >
      {/* Lightweight thumbnail — always in DOM, near-zero cost */}
      <img
        src={reel.thumb}
        alt={reel.handle}
        loading="lazy"
        draggable={false}
        onLoad={() => setThumbLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
          started ? "opacity-0 scale-105" : thumbLoaded ? "opacity-100 scale-100 group-hover:scale-105" : "opacity-0"
        }`}
      />
      {/* Soft skeleton shimmer while thumbnail loads */}
      {!thumbLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent animate-pulse" />
      )}

      {/* Video mounts ONLY once user clicks play — preload="none" so it never
          silently loads data in the background while just sitting as a card */}
      {started && (
        <video
          ref={videoRef}
          src={reel.video}
          preload="none"
          loop
          muted
          playsInline
          onPause={handlePauseEvent}
          onPlay={() => setIsPlaying(true)}
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      )}

      {/* Permanent vignette + bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/75 pointer-events-none" />

      {/* Premium glass edge ring on hover */}
      <div className="absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/0 group-hover:ring-white/15 transition-all duration-300 pointer-events-none" />

      {/* Center play / pause button */}
      <motion.div
        initial={false}
        animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.85 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </motion.div>

      {/* Mute toggle — visible only while playing */}
      <motion.button
        onClick={toggleMute}
        initial={false}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-black/35 backdrop-blur-md text-white ring-1 ring-white/15 hover:bg-black/50 transition-colors"
      >
        <MuteIcon muted={isMuted} />
      </motion.button>

      {/* Bottom-left: instagram icon + username */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex items-center gap-2">
        <InstagramIcon />
        <p className="text-sm font-semibold text-white tracking-tight drop-shadow-sm">{reel.handle}</p>
      </div>

      {/* Thin progress bar — only meaningful once playback starts */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <div
          className="h-full bg-white/80 transition-[width] duration-150 ease-linear"
          style={{ width: `${isPlaying ? progress : 0}%` }}
        />
      </div>
    </motion.div>
  );
}

const CARD_WIDTH = 280;
const GAP = 24;

function Work2() {
  const trackRef = useRef(null);
  const controls = useAnimationControls();
  const xRef = useRef(0);
  const videosRef = useRef({}); // index -> HTMLVideoElement
  const activeIndexRef = useRef(null);
  const anyPlayingRef = useRef(false);

  const track = [...REELS, ...REELS];
  const fullPassWidth = REELS.length * (CARD_WIDTH + GAP);

  const playFrom = (fromX) => {
    const remaining = Math.abs(fromX) / fullPassWidth;
    const remainingDuration = 30 * (1 - remaining);

    controls
      .start({
        x: -fullPassWidth,
        transition: { duration: remainingDuration, ease: "linear" },
      })
      .then(() => {
        if (anyPlayingRef.current) return;
        controls.set({ x: 0 });
        xRef.current = 0;
        playFrom(0);
      });
  };

  useEffect(() => {
    playFrom(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readCurrentX = () => {
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

  const handlePause = () => {
    controls.stop();
    readCurrentX();
  };

  const handleResume = () => {
    if (anyPlayingRef.current) return;
    playFrom(xRef.current);
  };

  const registerVideo = useCallback((index, el) => {
    videosRef.current[index] = el;
  }, []);

  const handlePlay = useCallback((index) => {
    Object.entries(videosRef.current).forEach(([i, el]) => {
      if (Number(i) !== index && el && !el.paused) el.pause();
    });
    activeIndexRef.current = index;
    anyPlayingRef.current = true;
    controls.stop();
    readCurrentX();
  }, [controls]);

  const handleVideoPause = useCallback((index) => {
    if (activeIndexRef.current === index) {
      activeIndexRef.current = null;
      anyPlayingRef.current = false;
      playFrom(xRef.current);
    }
  }, []);

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
          style={{ willChange: "transform" }}
        >
          {track.map((reel, i) => (
            <ReelCard
              key={i}
              reel={reel}
              index={i}
              registerVideo={registerVideo}
              onPlay={handlePlay}
              onPause={handleVideoPause}
            />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#F4F2ED] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#F4F2ED] to-transparent" />
      </div>
    </section>
  );
}

export default Work2;