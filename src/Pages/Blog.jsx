import { motion } from "framer-motion";
import { blogPosts } from "../data/blogPosts";
import BlogCard from "../compnent/BlogCard";

function Blog() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F2ED]">
      {/* ---- Hero ---- */}
      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center px-6 pt-24 sm:pt-28 pb-14 sm:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] sm:text-xs font-semibold tracking-[0.16em]  text-black/40 mb-4"
          >
            The CirklX Blog
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-extrabold text-[#15140F] leading-[1.1] text-4xl sm:text-5xl md:text-6xl"
          >
            Notes from
            <br />
            <span className="italic font-light text-[#FF5722]" style={{ fontFamily: "'Instrument Serif', serif" }}>
              the cutting room.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mt-6 text-sm sm:text-base text-black/55 max-w-md mx-auto"
          >
            Editing breakdowns, growth case studies, and honest notes on what
            actually makes content perform — straight from the team cutting it.
          </motion.p>
        </div>
      </div>

      {/* ---- Grid — same light bg, no data-theme="dark" so navbar stays dark-text ---- */}
      <div className="relative">
        <div className="max-w-5xl mx-auto px-6 pt-2 sm:pt-4 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {blogPosts.map((post, i) => (
              <BlogCard post={post} key={post.id} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;