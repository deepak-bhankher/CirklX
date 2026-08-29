import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "1. Overview",
    body: [
      "This Privacy Policy explains what information CirklX (\"we\", \"us\", \"our\") collects when you visit our website or work with us, how we use it, and the choices you have. By using our website or services, you agree to the practices described here.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "Contact details you share with us directly — name, email, phone number, and business or social media handles — when you book a call, message us on WhatsApp, or fill out a form on our site.",
      "Project information — raw footage, brand assets, and any files you send us for editing, shared strictly for the purpose of completing your project.",
      "Basic usage data — pages visited, device and browser type, and general location, collected automatically through standard website analytics.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: [
      "To respond to enquiries, schedule calls, and deliver the services you've hired us for.",
      "To communicate project updates, invoices, and revisions via email or WhatsApp.",
      "To improve our website and understand which content and services people find useful.",
      "We do not sell your personal information to third parties, ever.",
    ],
  },
  {
    title: "4. Cookies & Analytics",
    body: [
      "Our website may use cookies and similar tools (such as Google Analytics) to understand how visitors use the site. You can disable cookies through your browser settings — this won't affect your ability to browse the site, though some features may work less smoothly.",
    ],
  },
  {
    title: "5. Third-Party Services",
    body: [
      "We use trusted third-party tools to run our business — for example, WhatsApp for communication, email providers for correspondence, and hosting/analytics providers for the website. These services may process limited data on our behalf under their own privacy terms.",
    ],
  },
  {
    title: "6. Client Content & Confidentiality",
    body: [
      "Any footage, brand material, or project files you share with us are used solely to complete the agreed work and are treated as confidential. We don't share client footage or business details with third parties without consent, except where legally required.",
    ],
  },
  {
    title: "7. Data Storage & Security",
    body: [
      "We take reasonable technical and organisational measures to protect the information we hold, including limiting access to project files to the team members working on them. No method of storage or transmission is completely secure, but we work to keep your data safe.",
    ],
  },
  {
    title: "8. Data Retention",
    body: [
      "We retain contact and project information for as long as needed to provide our services and meet legal or accounting obligations, and delete or anonymise it when it's no longer needed.",
    ],
  },
  {
    title: "9. Your Rights",
    body: [
      "You can ask us to access, correct, or delete the personal information we hold about you at any time by contacting us directly. We'll respond to reasonable requests as quickly as we can.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The latest version will always be available on this page.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "Questions about this Privacy Policy or your data can be sent to cirklX.agency@gmail.com or +91 80532 00325.",
    ],
  },
];

function Privacy() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F2ED]">
      {/* Back link — normal flow, sits below the navbar */}
      <div className="max-w-4xl mx-auto px-6 pt-24 sm:pt-28">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-black/45 hover:text-[#FF5722] transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center px-6 pt-6 pb-12 sm:pb-14">
      
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-extrabold text-[#15140F] leading-[1.1] text-3xl sm:text-5xl whitespace-nowrap"
        >
          Privacy{" "}
          <span className="italic font-light text-[#FF5722]" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Policy.
          </span>
        </motion.h1>
       
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.2), ease: "easeOut" }}
            className="mb-9"
          >
            <h2 className="font-bold text-[#15140F] text-lg sm:text-xl mb-3">{section.title}</h2>
            {section.body.map((para, j) => (
              <p key={j} className="text-black/60 text-sm sm:text-base leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Privacy;