import { useEffect } from "react";

const SITE_NAME = "CirklX";
const SITE_URL = "https://papaya-maamoul-bd89e6.netlify.app"; // <-- apna asli domain daal

// <head> me ek meta tag set karta hai. Pehle se maujood ho to update,
// warna naya bana deta hai.

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Har page ka title, description, canonical URL aur social share cards set
 * karta hai. React SPA me har route ka apna <head> nahi hota — ye hook wahi
 * kaam karta hai jo server-rendered site me automatic hota.
 *
 * `schema` me JSON-LD object bhej sakte ho (Article, FAQPage, etc.) —
 * Google usi se rich results banata hai.
 */
export function useSeo({
  title,
  description,
  image,
  path,
  type = "website",
  schema,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title}` : SITE_NAME;
    const url = path ? `${SITE_URL}${path}` : SITE_URL;
    const img = image ? `${SITE_URL}${image}` : `${SITE_URL}/logo.png`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setLink("canonical", url);

    // Open Graph — WhatsApp, Facebook, LinkedIn ke share preview ke liye
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);
    setMeta("property", "og:site_name", SITE_NAME);

    // Twitter/X card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);
  }, [title, description, image, path, type]);

  // Structured data alag effect me — route badalne par purana script hatana
  // zaruri hai, warna Google ko do conflicting schemas dikhte hain.
  useEffect(() => {
    if (!schema) return;

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);

    return () => el.remove();
  }, [schema]);
}

export { SITE_URL, SITE_NAME };