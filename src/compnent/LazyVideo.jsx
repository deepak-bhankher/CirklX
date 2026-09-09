import { useEffect, useRef, useState } from "react";

// src tabhi set hoti hai jab video screen ke paas aata hai. Isse page load
// par browser 16MB ek saath nahi kheenchta — LCP aur TBT dono girte hain.
export default function LazyVideo({ src, poster, className = "", ...rest }) {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || load) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }, // thoda pehle se load, taaki scroll par ready ho
    );

    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      autoPlay
      className={className}
      {...rest}
    />
  );
}