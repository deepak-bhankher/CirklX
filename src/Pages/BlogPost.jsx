import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { getPostBySlug } from "../data/blogPosts";
import { useSeo, SITE_URL, SITE_NAME } from "../compnent/useSeo";

// **bold** wale hisson ko <strong> me badalta hai. Poora markdown parser
// nahi chahiye — sirf yahi ek pattern content me use hota hai.
function renderText(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-[#15140F] font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

// Article body ke blocks render karta hai.
function ContentBlock({ block }) {
  if (block.type === "h") {
    return (
      <h2 className="text-[#15140F] font-bold text-xl sm:text-2xl mt-10 mb-4 leading-snug">
        {block.text}
      </h2>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        className="my-8 pl-5 sm:pl-6 border-l-2 border-[#FF5722] text-lg sm:text-xl text-[#FF5722] italic font-light leading-relaxed"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {block.text}
      </blockquote>
    );
  }

  if (block.type === "img") {
    return (
      <figure className="my-8">
        <img
          src={block.src}
          // alt Google image search ke liye zaruri hai — isme keyword hona chahiye
          alt={block.alt}
          loading="lazy"
          decoding="async"
          className="w-full rounded-2xl"
        />
        {block.caption && (
          <figcaption className="mt-3 text-xs sm:text-sm text-black/40 text-center">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="mb-5 space-y-2.5">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-black/60 text-[15px] sm:text-base leading-relaxed"
          >
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FF5722] shrink-0" />
            <span>{renderText(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-black/60 text-[15px] sm:text-base leading-relaxed sm:leading-loose mb-5">
      {renderText(block.text)}
    </p>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  // Google ko batata hai ki ye ek Article hai — author, date, image sab.
  // Isi se search result me rich snippet banta hai.
  const schema = post
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            headline: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            image: post.cover?.startsWith("http")
              ? post.cover
              : `${SITE_URL}${post.cover}`,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Person", name: post.author.name },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo.png`,
              },
            },
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          },
          // FAQ schema — isse Google search result me sawaal-jawab dikhte hain
          ...(post.faqs?.length
            ? [
                {
                  "@type": "FAQPage",
                  mainEntity: post.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                },
              ]
            : []),
        ],
      }
    : null;

  useSeo({
    title: post?.metaTitle || post?.title,
    description: post?.metaDescription || post?.excerpt,
    image: post?.cover,
    path: `/blog/${slug}`,
    type: "article",
    schema,
  });

  // Galat / purana link -> blog listing par bhej do, 404 pe atkao mat.
  if (!post) return <Navigate to="/blog" replace />;

  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative w-full bg-[#F4F2ED]">
      <article className="max-w-3xl mx-auto px-6 pt-24 sm:pt-28 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-black/45 hover:text-[#FF5722] transition-colors duration-200 mb-8"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#15140F] text-[10px] font-semibold uppercase tracking-wider text-[#D6FF01] mb-5">
            {post.category}
          </span>

          {/* Page par sirf ek h1 — SEO ke liye zaruri */}
          <h1 className="font-extrabold text-[#15140F] leading-[1.12] text-3xl sm:text-4xl md:text-[2.75rem]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-xs sm:text-sm text-black/45">
            <span className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-black/[0.06] flex items-center justify-center text-[10px] font-bold text-black/60">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span>
                <span className="text-black/70 font-medium">
                  {post.author.name}
                </span>{" "}
                · {post.author.role}
              </span>
            </span>
            {/* dateTime attribute machine-readable hai — Google isi ko padhta hai */}
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-8 sm:mt-10 rounded-2xl overflow-hidden aspect-[16/9]"
        >
          <img
            src={post.cover}
            alt={post.metaTitle || post.title}
            className="w-full h-full object-cover"
            // Cover LCP element hai — lazy nahi, high priority
            fetchpriority="high"
          />
        </motion.div>

        {/* Article body */}
        <div className="mt-10 sm:mt-12">
          {post.content.map((block, i) => (
            <ContentBlock block={block} key={i} />
          ))}
        </div>

        {/* FAQ — schema me bhi jaata hai, isliye page par bhi dikhna chahiye */}
        {post.faqs?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-[#15140F] font-bold text-xl sm:text-2xl mb-6">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-4">
              {post.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-black/[0.06] p-5 sm:p-6"
                >
                  <h3 className="text-[#15140F] font-semibold text-[15px] sm:text-base mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-black/55 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share row */}
        <div className="flex items-center gap-4 mt-12 pt-8 border-t border-black/[0.08]">
          <span className="text-xs sm:text-sm text-black/45 font-medium">
            Share this
          </span>
          {[FaInstagram, FaFacebookF, FaLinkedinIn].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Share"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-[#15140F] bg-black/[0.05] border border-black/10 hover:bg-[#D6FF01] hover:text-[#15140F] hover:border-[#D6FF01] transition-colors duration-300"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>

        {/* Mini CTA */}
        <div className="mt-10 rounded-2xl bg-white border border-black/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[#15140F] font-bold text-base sm:text-lg">
              Want edits like the ones we break down here?
            </p>
            <p className="text-black/45 text-sm mt-1">
              Book a free 20-minute call, no commitment needed.
            </p>
          </div>
          <a
            href="https://wa.me/918053200325?text=Hi%20CirklX!%20I%20want%20to%20book%20a%20free%20meeting."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D6FF01] text-[#15140F] px-5 py-2.5 text-sm font-bold whitespace-nowrap hover:shadow-[0_8px_24px_rgba(214,255,1,0.35)] transition-shadow duration-300"
          >
            Book A Free Meeting
          </a>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;