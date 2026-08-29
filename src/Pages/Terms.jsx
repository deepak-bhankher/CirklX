import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "1. Who We Are",
    body: [
      "CirklX (\"we\", \"us\", \"our\") is a video editing and content agency providing short-form video editing, growth strategy, and related creative services to creators and brands. These Terms & Conditions govern your use of our website and any services booked through it.",
      "By booking a call, hiring us, or otherwise using our services, you agree to the terms laid out below.",
    ],
  },
  {
    title: "2. Our Services",
    body: [
      "We offer video editing, content strategy, color grading, sound design, and related creative services on a project or retainer basis. The exact scope, deliverables, timelines, and pricing for any engagement are agreed separately in a proposal, quote, or contract before work begins.",
      "We reserve the right to refuse or discontinue service to any client at our discretion, including where content requested is unlawful, infringing, or against our creative standards.",
    ],
  },
  {
    title: "3. Bookings & Payments",
    body: [
      "A free introductory call does not constitute a binding agreement. Paid work begins only after both parties agree on scope and payment terms in writing (including via WhatsApp or email).",
      "Payment schedules (upfront, milestone-based, or monthly retainer) are set out per project. Late payments may result in paused delivery until dues are cleared.",
    ],
  },
  {
    title: "4. Revisions & Turnaround",
    body: [
      "Each project includes an agreed number of revision rounds, communicated at the start of the engagement. Requests beyond the agreed scope may incur additional charges.",
      "Turnaround times are estimates based on the information and raw footage provided on time by the client. Delays in providing assets or feedback may extend delivery timelines accordingly.",
    ],
  },
  {
    title: "5. Cancellations & Refunds",
    body: [
      "Clients may cancel an ongoing engagement with written notice. Any work already completed up to the point of cancellation will be billed and is non-refundable.",
      "Retainer payments are non-refundable once the corresponding work period has started, unless otherwise agreed in writing.",
    ],
  },
  {
    title: "6. Content Ownership & License",
    body: [
      "Once full payment is received, ownership of the final edited deliverables transfers to the client for their intended use. Raw project files, templates, presets, and internal workflows remain the intellectual property of CirklX.",
      "We may showcase completed work (or excerpts of it) in our portfolio, social media, or marketing materials unless the client requests confidentiality in writing before the project begins.",
    ],
  },
  {
    title: "7. Client Responsibilities",
    body: [
      "Clients are responsible for ensuring they own or have the rights to any footage, music, images, or other material they provide to us for editing. CirklX is not liable for copyright claims arising from client-supplied material.",
      "Timely feedback and access to necessary accounts or assets is the client's responsibility and directly affects delivery timelines.",
    ],
  },
  {
    title: "8. Confidentiality",
    body: [
      "We treat client information, unreleased content, and business details as confidential, and won't share them with third parties without consent, except where required by law.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    body: [
      "CirklX is not responsible for platform-side outcomes such as views, follower growth, algorithm changes, or account restrictions imposed by third-party platforms (Instagram, YouTube, TikTok, etc.). Our commitment is to the quality and timely delivery of the agreed creative work, not guaranteed performance metrics.",
      "To the extent permitted by law, our total liability for any claim related to our services is limited to the amount paid by the client for the specific project in question.",
    ],
  },
  {
    title: "10. Changes to These Terms",
    body: [
      "We may update these Terms from time to time to reflect changes in our services or legal requirements. The latest version will always be available on this page, and continued use of our services after an update constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "Questions about these Terms can be sent to cirklX.agency@gmail.com or +91 80532 00325.",
    ],
  },
];

function Terms() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F2ED]">
      {/* section already relative — back link positions against it */}
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
          Terms &amp;{" "}
          <span className="italic font-light text-[#FF5722]" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Conditions.
          </span>
        </motion.h1>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
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

export default Terms;