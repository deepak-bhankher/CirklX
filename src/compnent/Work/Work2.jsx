import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";

// Each reel: video src (poster shown until played) + instagram handle.
const REELS = [
  { video: "/video1.mp4", poster: "/reels/reel1-poster.jpg", handle: "@logicgpt" },
  { video: "/video2.mp4", poster: "/reels/reel2-poster.jpg", handle: "@mr_techog" },
  { video: "/video3.mp4", poster: "/reels/reel3-poster.jpg", handle: "@logicgpt" },
  { video: "/video4.mp4", poster: "/reels/reel4-poster.jpg", handle: "@mr_techog" },
  { video: "/video5.mp4", poster: "/reels/reel5-poster.jpg", handle: "@uditgpt" },
  { video: "/video6.mp4", poster: "/reels/reel6-poster.jpg", handle: "@dr.himanshu_grover_" },
  { video: "/video7.mp4", poster: "/reels/reel7-poster.jpg", handle: "@fit.niya" },
  { video: "/video8.mp4", poster: "/reels/reel8-poster.jpg", handle: "@dr.himanshu_grover_" },
  { video: "/video9.mp4", poster: "/reels/reel9-poster.jpg", handle: "@houseofbinti" },
  { video: "/video10.mp4", poster: "/reels/reel10-poster.jpg", handle: "@fit.niya" },
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    registerVideo(index, videoRef.current);
  }, [index, registerVideo]);

  const togglePlay = (e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      onPlay(index); // pauses every other card first
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

  return (
    <motion.div
      onClick={togglePlay}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px] aspect-[3/4] rounded-[22px] overflow-hidden bg-black cursor-pointer
        ring-1 ring-black/5
        shadow-[0_4px_20px_rgba(0,0,0,0.10)]
        transition-shadow duration-300
        ${isPlaying ? "shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-white/20" : "hover:shadow-[0_16px_40px_rgba(0,0,0,0.20)]"}
      `}
    >
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.poster}
        loop
        muted
        playsInline
        onPause={() => { setIsPlaying(false); onPause(index); }}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Subtle permanent vignette + stronger bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/70 pointer-events-none" />

      {/* Soft ring highlight on hover — premium glass edge */}
      <div className="absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/0 group-hover:ring-white/15 transition-all duration-300 pointer-events-none" />

      {/* Center play / pause button */}
      <motion.div
        initial={false}
        animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.85 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </motion.div>

      {/* Mute toggle — top right, only visible once playing / on hover */}
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
        <p className="text-sm font-semibold text-white tracking-tight">{reel.handle}</p>
      </div>

      {/* Thin progress bar, premium detail — only shows once playback starts */}
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
        if (anyPlayingRef.current) return; // don't loop-reset while a video is open
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
    if (anyPlayingRef.current) return; // stay paused while a video is playing
    playFrom(xRef.current);
  };

  const registerVideo = useCallback((index, el) => {
    videosRef.current[index] = el;
  }, []);

  // Pause every other video, freeze the marquee, and mark this one active
  const handlePlay = useCallback((index) => {
    Object.entries(videosRef.current).forEach(([i, el]) => {
      if (Number(i) !== index && el && !el.paused) el.pause();
    });
    activeIndexRef.current = index;
    anyPlayingRef.current = true;
    controls.stop();
    readCurrentX();
  }, [controls]);

  // Resume the marquee only once nothing is playing anymore
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