import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { getPostBySlug } from "../data/blogPosts";

// Article body ke blocks render karta hai — paragraph, sub-heading, ya pulled quote.
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
  return (
    <p className="text-black/60 text-[15px] sm:text-base leading-relaxed sm:leading-loose mb-5">
      {block.text}
    </p>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  // Galat / purana link -> blog listing par bhej do, 404 pe atkao mat.
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="relative w-full bg-[#F4F2ED]">
      <article className="max-w-3xl mx-auto px-6 pt-24 sm:pt-28 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-black/45 hover:text-[#FF5722] transition-colors duration-200 mb-8"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#15140F] text-[10px] font-semibold uppercase tracking-wider text-[#D6FF01] mb-5">
            {post.category}
          </span>

          <h1 className="font-extrabold text-[#15140F] leading-[1.12] text-3xl sm:text-4xl md:text-[2.75rem]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-xs sm:text-sm text-black/45">
            <span className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-black/[0.06] flex items-center justify-center text-[10px] font-bold text-black/60">
                {post.author.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <span>
                <span className="text-black/70 font-medium">{post.author.name}</span> · {post.author.role}
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-8 sm:mt-10 rounded-2xl overflow-hidden aspect-[16/9]"
        >
          <img src={post.cover} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Article body */}
        <div className="mt-10 sm:mt-12">
          {post.content.map((block, i) => (
            <ContentBlock block={block} key={i} />
          ))}
        </div>

        {/* Share row */}
        <div className="flex items-center gap-4 mt-12 pt-8 border-t border-black/[0.08]">
          <span className="text-xs sm:text-sm text-black/45 font-medium">Share this</span>
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
            <p className="text-[#15140F] font-bold text-base sm:text-lg">Want edits like the ones we break down here?</p>
            <p className="text-black/45 text-sm mt-1">Book a free 20-minute call, no commitment needed.</p>
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