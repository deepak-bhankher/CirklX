import { useEffect, useRef } from "react";

/**
 * Scroll-reveal — element screen par aate hi `.is-visible` class laga deta hai.
 *
 * Framer ke `whileInView` ki jagah ye isliye, kyunki framer har element ke
 * liye apna tracker aur animation loop banata hai (JS, main thread par),
 * jabki yahan sirf ek IntersectionObserver hai aur baaki kaam CSS/GPU karta hai.
 *
 * Ek hi observer sabhi elements ke liye — 100 alag observers ki jagah.
 */

let observer = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Ek baar dikhne ke baad dobara track karne ki zarurat nahi.
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -60px 0px" }, // thoda andar aane par trigger
  );

  return observer;
}

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return ref;
}

/**
 * Jab ek container ke andar kai elements reveal karne hon (jaise cards ki
 * grid), tab har card par alag hook lagane ki jagah ye use karo — ye
 * container ke andar saare `.reveal` elements ko ek saath observe kar leta hai.
 */
export function useRevealGroup() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = getObserver();
    const items = el.querySelectorAll(".reveal");
    items.forEach((item) => io.observe(item));

    return () => items.forEach((item) => io.unobserve(item));
  }, []);

  return ref;
}