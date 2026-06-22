import { motion } from "framer-motion";

const OPENINGS = [
 {
  title: "React Developer",
  desc: "Develops modern, high-performance websites with seamless user experiences.",
},
{
  title: "Marketing Lead",
  desc: "Plans winning campaigns that boost reach, engagement, and conversions.",
},
{
  title: "Editor",
  desc: "Transforms raw footage into compelling videos that capture attention instantly.",
},
{
  title: "Graphic Designer",
  desc: "Designs premium thumbnails, social posts, and branding that stand out.",
},
];

function ApplyButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-lg bg-[#D6ff01] text-black px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold 
        hover:bg-black hover:text-[#D6ff01] transition-all  cursor-pointer hover:shadow-lg  duration-300"
    >
      Apply Now
    </motion.button>
  );
}

function About5() {
  return (
    <section className="w-full bg-[#F4F2ED] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* ---- Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center rounded-lg cursor-pointer transition-all duration-300 hover:bg-black hover:text-[#D6ff01] border border-black px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70">
            CAREERS
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-center text-4xl sm:text-5xl font-bold text-[#15140F] mb-12"
        >
          Current openings
        </motion.h2>

        {/* ---- Openings list ---- */}
        <div className="flex flex-col gap-4">
          {OPENINGS.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white px-6 sm:px-8 py-6 sm:py-7
                shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                transition-shadow duration-300 "
            >
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-[#15140F] mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-black/55 truncate sm:whitespace-normal">
                  {job.desc}
                </p>
              </div>

              <ApplyButton />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About5;
