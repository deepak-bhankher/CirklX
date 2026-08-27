import { motion } from "framer-motion";

const teamMembers = [
  {
    id: 1,
    image: "/team3.jpeg",
    name: "Govind Sharma",
    role: "Creative Director",
  },
  {
    id: 2,
    image: "/team2.jpeg",
    name: "Naveen Nagar",
    role: "  Lead Editor",
  },
  {
    id: 3,
    image: "/team1.jpeg",
    name: " Krishan Bansal",
    role: "Client Success",
  
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function TeamCard({ member }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.35 }}
      className="group bg-[#F4F2ED] rounded-[34px] overflow-hidden shadow-sm hover:shadow-2xl duration-500"
    >
      <div className="overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          src={member.image}
          alt={member.name}
          className="w-full h-[420px] object-cover"
        />
      </div>

      <div className="p-7 text-center">
        <h2 className="text-2xl font-bold text-[#15140F]">{member.name}</h2>
        <span className="inline-block mt-3 border border-black/20 px-3 py-1 text-xs font-semibold tracking-wide rounded-md text-black/70 group-hover:bg-black group-hover:text-[#D6ff01] group-hover:border-black transition-all duration-300">
          {member.role}
        </span>
      </div>
    </motion.div>
  );
}

function About4() {
  return (
    <section className=" py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <span className="border border-black  px-3 py-1 text-xs sm:text-sm font-semibold tracking-wide rounded-md hover:text-[#D6ff01] text-black hover:bg-black  transition-all duration-300 cursor-pointer">
            TEAM
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-3xl mt-5 md:text-4xl lg:text-5xl font-bold text-white"
        >
          Meet the team
        </motion.h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
      >
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </motion.div>
    </section>
  );
}

export default About4;
