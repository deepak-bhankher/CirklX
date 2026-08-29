import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Simple, uniform card — sirf image + title + excerpt + author.
// Light background ke liye colors — koi white text nahi jo white bg par gayab ho jaye.
function BlogCard({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: "easeOut" }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block rounded-2xl overflow-hidden bg-white border border-black/[0.08]
          shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:border-[#FF5722]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]
          transition-all duration-300"
      >
        {/* Thumbnail — sirf image, koi badge/text overlay nahi */}
        <div className="relative overflow-hidden h-40 sm:h-44">
          <img
            src={post.cover}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Text block */}
        <div className="p-5 sm:p-6 flex flex-col">
          <h3 className="font-bold text-[#15140F] leading-snug group-hover:text-[#FF5722] transition-colors duration-200 text-base sm:text-lg">
            {post.title}
          </h3>
          <p className="text-black/50 mt-2.5 leading-relaxed text-xs sm:text-sm line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 mt-4 text-[11px] sm:text-xs text-black/45">
            <span className="w-5 h-5 rounded-full bg-black/[0.06] flex items-center justify-center text-[9px] font-bold text-black/60">
              {post.author.name.split(" ").map((n) => n[0]).join("")}
            </span>
            {post.author.name}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default BlogCard;