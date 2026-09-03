import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const INTRO = [
  <>At <strong className="font-bold text-[#15140F]">CirklX Agency</strong>, we respect your privacy and are committed to handling personal information responsibly and transparently.</>,
  "This Privacy Policy explains how CirklX Agency (\"CirklX\", \"we\", \"us\", or \"our\"), based in Hisar, Haryana, India, may collect, use, store, disclose, and protect personal information when you visit or interact with our website, contact us through a website form, email, phone, WhatsApp, social media, or another channel, request a quotation or proposal, become a client of CirklX Agency, work with us as a creator, influencer, model, vendor, freelancer, contractor, or business partner, or interact with campaigns, advertisements, websites, or digital services managed by us.",
  "By using our website or voluntarily providing information to us, you acknowledge the practices described in this Privacy Policy.",
];

const SECTIONS = [
  {
    title: "1. About CirklX Agency",
    body: [
      "CirklX Agency is a digital marketing and creative agency providing services including Social Media Management, Content Creation, Reels and Video Shoots, Video Editing, Graphic Design, Meta Ads, Google Ads, Search Engine Optimization (SEO), Google Business Profile / GMB Management, Influencer Marketing, Website Design and Development, Branding, Digital Marketing Strategy, Creative Strategy, Campaign Management, and related marketing and creative services.",
      "Depending on the service, we may process information directly for our own business purposes or on behalf of a client.",
    ],
  },
  {
    title: "2. Information We May Collect",
    body: [
      "The type of information we collect depends on how you interact with CirklX Agency.",
      "You may voluntarily provide information such as your full name, business or brand name, email address, phone or WhatsApp number, company details, job title, city or location, project requirements, marketing objectives, budget information, messages and enquiries, feedback, reviews or testimonials, billing or invoicing information, social media handles, website details, brand assets, photos and videos, documents, content supplied for projects, and account access required to provide services.",
      "We may also collect any other information you choose to provide while communicating or working with us.",
    ],
  },
  {
    title: "3. Information Collected Automatically",
    body: [
      "When you visit our website, certain technical information may be collected automatically through cookies, analytics tools, server logs, pixels, or similar technologies — including IP address, browser type, device type, operating system, approximate geographical location, referral source, pages visited, date and time of visit, time spent on pages, website interactions, clicks, session information, advertising identifiers, cookie identifiers, and general website usage information.",
      "This information may help us understand how people use our website and improve its performance, marketing, design, and user experience.",
    ],
  },
  {
    title: "4. Cookies and Similar Technologies",
    body: [
      "Our website may use cookies and similar technologies. Cookies are small data files stored on your device that help websites remember information and understand visitor behaviour.",
      "We may use cookies for website functionality, security, performance, analytics, understanding visitor behaviour, remembering preferences, measuring advertising performance, marketing and remarketing, and improving website experience. Some cookies may be placed by third-party services such as Google, Meta, analytics providers, advertising platforms, website hosting providers, or other technology providers.",
      "Where required by applicable law, we may request consent before using certain non-essential cookies. You may also control or delete cookies through your browser settings. Disabling certain cookies may affect some website features.",
    ],
  },
  {
    title: "5. Analytics Tools",
    body: [
      "We may use third-party analytics services, including services such as Google Analytics or similar tools, to understand website performance and visitor behaviour. These services may collect technical and usage information according to their own privacy policies.",
      "Analytics information may help us understand how visitors find our website, which pages receive the most attention, how visitors interact with the website, device and browser trends, website performance, and marketing campaign effectiveness.",
    ],
  },
  {
    title: "6. Advertising and Tracking Technologies",
    body: [
      "CirklX Agency may use advertising and measurement technologies provided by platforms such as Meta, Google, and other advertising networks to measure advertising performance, understand website conversions, build advertising audiences, show relevant advertisements, conduct remarketing campaigns, and analyze campaign effectiveness.",
      "Depending on your settings and applicable law, third-party platforms may also use information collected through their technologies according to their own privacy policies.",
    ],
  },
  {
    title: "7. How We Use Personal Information",
    body: [
      "We may use information we collect for legitimate business and service-related purposes, including to respond to enquiries, communicate with potential clients, prepare proposals and quotations, provide our services, manage client relationships, plan marketing strategies, create content, conduct shoots, edit videos and designs, manage advertising campaigns, manage websites, provide SEO services, and manage Google Business Profiles.",
      "We may also use it to coordinate influencers, creators, and models, process invoices and payments, provide customer support, schedule meetings and shoots, send project updates, request approvals, deliver completed work, maintain business records, improve our website and services, analyze marketing performance, prevent misuse or fraud, maintain website and account security, comply with legal obligations, resolve disputes, and enforce our agreements and Terms & Conditions.",
      "We may also use information for other purposes that are clearly explained when the information is collected.",
    ],
  },
  {
    title: "8. Marketing Communications",
    body: [
      "If you contact CirklX Agency, become a client, subscribe to updates, or otherwise provide appropriate permission, we may occasionally contact you regarding our services, new service offerings, business updates, marketing opportunities, offers, relevant agency information, or follow-ups regarding previous enquiries.",
      "You may ask us to stop sending promotional communications at any time. Transactional or service-related communication necessary for an active project may continue even if you opt out of promotional messages.",
    ],
  },
  {
    title: "9. Client Data and Marketing Campaigns",
    body: [
      "As a marketing agency, CirklX may sometimes receive or access personal information belonging to a client's customers, prospects, leads, employees, website visitors, or audiences while providing services — through lead generation campaigns, Meta Ads, Google Ads, website forms, CRM integrations, social media management, email campaigns, analytics, website development, Google Business Profile management, or other digital marketing activities.",
      "Where CirklX processes such information on behalf of a client, we will generally use the information only for providing the agreed services and according to the client's lawful instructions. Clients remain responsible for ensuring that information they collect or provide to CirklX has been obtained lawfully and that appropriate notices, permissions, and consents have been provided where required.",
    ],
  },
  {
    title: "10. Social Media Account Access",
    body: [
      "Clients may provide CirklX Agency with access to social media platforms, advertising accounts, websites, Google Business Profiles, analytics platforms, or other business tools. We use such access only to perform the agreed services.",
      "Where possible, clients should provide partner access, employee access, role-based permissions, or agency access rather than sharing primary account passwords. Clients should maintain control of their primary business accounts and use available security features such as two-factor authentication.",
    ],
  },
  {
    title: "11. Payment Information",
    body: [
      "Payments may be made through bank transfer, UPI, payment gateways, or other agreed payment methods. Where a third-party payment provider is used, the provider may process payment information according to its own terms and privacy policy.",
      "CirklX Agency may maintain records such as invoice details, transaction references, payment status, amount paid, and billing information. We do not require access to information that is unnecessary for completing a payment or maintaining accounting records.",
    ],
  },
  {
    title: "12. How We May Share Information",
    body: [
      "We do not disclose personal information unnecessarily. Information may be shared when reasonably required with parties such as employees, team members, freelancers, contractors, videographers, photographers, designers, developers, editors, influencers, models, creators, hosting providers, cloud service providers, analytics providers, advertising platforms, payment providers, software providers, professional advisers, and government or law enforcement authorities.",
      "Information will generally be shared only when necessary for business operations, service delivery, legal compliance, security, or another legitimate purpose.",
    ],
  },
  {
    title: "13. Third-Party Services",
    body: [
      "CirklX Agency relies on various third-party services and platforms that may independently collect or process information — including Google, Meta, Instagram, Facebook, YouTube, WhatsApp, Google Business Profile, website hosting and domain providers, email providers, analytics services, advertising platforms, cloud storage providers, CRM systems, communication tools, and payment platforms.",
      "These organizations operate under their own privacy policies and terms. CirklX Agency is not responsible for the independent privacy practices of third-party services. We encourage users to review the privacy policies of services they interact with.",
    ],
  },
  {
    title: "14. Influencers, Creators and Models",
    body: [
      "Where a project involves influencers, creators, actors, models, photographers, videographers, or other third parties, certain information may be shared as required to coordinate the project — such as name, contact details, shoot information, location details, brand requirements, campaign brief, and scheduling information.",
      "Only information reasonably necessary for the collaboration should be shared.",
    ],
  },
  {
    title: "15. Information Received From Third Parties",
    body: [
      "We may receive information about you from third parties, such as social media platforms, advertising platforms, referrals, business directories, partners, clients, analytics providers, or publicly available business sources.",
      "We may use such information for legitimate business purposes, including responding to enquiries, providing services, evaluating marketing campaigns, or business development, subject to applicable law.",
    ],
  },
  {
    title: "16. Publicly Available Information",
    body: [
      "If you make information publicly available through business websites, public social media accounts, Google Business Profiles, business directories, public advertisements, or other public platforms, we may view or use that information for legitimate business purposes, including evaluating potential collaborations or communicating regarding our services, subject to applicable law.",
    ],
  },
  {
    title: "17. Data Retention",
    body: [
      "We retain personal information only for as long as reasonably necessary for providing services, completing projects, maintaining business records, accounting, tax compliance, resolving disputes, protecting legal rights, maintaining client relationships, and meeting applicable legal obligations.",
      "Different categories of information may be retained for different periods. When information is no longer reasonably required, we may delete, anonymize, archive, or securely dispose of it, subject to applicable requirements and technical limitations.",
    ],
  },
  {
    title: "18. Data Security",
    body: [
      "CirklX Agency takes reasonable administrative, organizational, and technical steps to protect information against unauthorized access, loss, misuse, alteration, disclosure, or destruction.",
      "However, no website, cloud system, internet transmission, or digital storage method can be guaranteed to be completely secure. Therefore, while we take reasonable precautions, we cannot guarantee absolute security of information transmitted or stored electronically.",
    ],
  },
  {
    title: "19. Data Breaches",
    body: [
      "If CirklX Agency becomes aware of a personal data breach affecting information under our control, we may take reasonable steps to investigate the incident, contain the breach, reduce potential harm, restore security, notify affected parties where appropriate, and notify relevant authorities where required by applicable law.",
    ],
  },
  {
    title: "20. International Data Processing",
    body: [
      "Some technology providers used by CirklX Agency may operate servers or infrastructure outside India. As a result, certain information may be processed or stored in another country.",
      "Where international processing occurs, we will take reasonable steps to use reputable providers and handle information in accordance with applicable legal requirements.",
    ],
  },
  {
    title: "21. Your Privacy Choices and Rights",
    body: [
      "Depending on applicable law and the circumstances, you may have rights regarding your personal information — including the ability to ask what personal information we hold about you, request correction of inaccurate information, request updating of incomplete information, request deletion or erasure where applicable, withdraw consent where processing depends on consent, raise a privacy-related grievance, request information regarding how your personal data is processed, or exercise other rights available under applicable law.",
      "Certain requests may be subject to legal, contractual, security, or record-keeping requirements.",
      <>To exercise a privacy-related request, contact us at <strong className="font-bold text-[#15140F]">cirklx.agency@gmail.com</strong>. We may need to verify your identity before processing certain requests.</>,
    ],
  },
  {
    title: "22. Withdrawal of Consent",
    body: [
      "Where we rely on your consent to process personal information, you may withdraw that consent by contacting us. Withdrawal will apply to future processing where consent is the relevant basis for processing.",
      "It may not affect processing that occurred lawfully before the withdrawal or information that we must retain for lawful business, contractual, or regulatory purposes.",
    ],
  },
  {
    title: "23. Accuracy of Information",
    body: [
      "You are responsible for providing accurate and current information. If your information changes, you may contact us and request that we update it.",
      "For clients, keeping contact, billing, business, product, pricing, service, and campaign information accurate is particularly important for effective service delivery.",
    ],
  },
  {
    title: "24. Children's Privacy",
    body: [
      "CirklX Agency's website and services are primarily intended for businesses and individuals who are 18 years of age or older. We do not knowingly seek to collect personal information directly from children for the purpose of selling or providing our agency services to them.",
      "If you believe that a child has provided personal information to us inappropriately, please contact us so that we can review the situation and take appropriate action.",
    ],
  },
  {
    title: "25. External Website Links",
    body: [
      "Our website may contain links to third-party websites, social media platforms, portfolios, client websites, tools, or external resources. When you leave our website, the privacy practices of the third-party service will apply.",
      "CirklX Agency is not responsible for the content, security, data practices, or privacy policies of external websites.",
    ],
  },
  {
    title: "26. Testimonials, Case Studies and Portfolio Content",
    body: [
      "With appropriate permission or where otherwise permitted, CirklX Agency may feature client names, business names, logos, testimonials, campaigns, completed designs, reels, videos, websites, publicly available campaign metrics, project results, and case studies on our website, social media pages, proposals, presentations, advertisements, or portfolio materials.",
      "Clients may contact us if they have specific confidentiality requirements. Portfolio and intellectual property rights are also governed by our Terms & Conditions and any specific client agreement.",
    ],
  },
  {
    title: "27. Photography and Video Production",
    body: [
      "During video shoots, photography, events, interviews, or content production, images, voices, or video recordings of individuals may be captured. Clients are responsible for helping ensure that appropriate permissions have been obtained from employees, customers, models, participants, property owners, or other individuals appearing in content where such permission is required.",
      "For separately hired models, creators, actors, or influencers, permissions and usage rights may also be governed by the relevant project arrangement.",
    ],
  },
  {
    title: "28. Business Transfers",
    body: [
      "If CirklX Agency undergoes a merger, restructuring, acquisition, sale of business assets, or similar business transaction, relevant information may be transferred as part of that transaction where permitted by applicable law. Any receiving party would be expected to handle personal information appropriately.",
    ],
  },
  {
    title: "29. Legal Disclosure",
    body: [
      "We may disclose information where we reasonably believe it is necessary to comply with applicable law, respond to lawful government requests, comply with court orders, protect CirklX Agency's legal rights, investigate fraud or security incidents, enforce agreements, or protect the safety of our team, users, clients, or others.",
    ],
  },
  {
    title: "30. Legal Basis and Consent",
    body: [
      "Where applicable, CirklX Agency processes personal information based on appropriate grounds permitted under applicable law — including your consent, your request for services, performance of our contractual obligations, legitimate business operations where permitted, compliance with legal obligations, or other uses permitted under applicable law.",
      "Where consent is required, we aim to request it in a clear and understandable manner.",
    ],
  },
  {
    title: "31. Privacy of Client Campaign Audiences",
    body: [
      "When CirklX manages campaigns for clients, the client remains responsible for the lawfulness of its customer databases, lead lists, mailing lists, CRM information, remarketing audiences, customer uploads, marketing claims, and consent records.",
      "Clients should not provide CirklX Agency with illegally obtained, purchased, scraped, stolen, or otherwise unauthorized personal information. We reserve the right to refuse to process information where we reasonably believe its use may violate applicable law or platform policies.",
    ],
  },
  {
    title: "32. Do Not Provide Unnecessary Sensitive Information",
    body: [
      "Unless specifically required for a legitimate project purpose, users and clients should avoid sending CirklX Agency highly sensitive personal information. Please provide only information reasonably necessary for the relevant service, enquiry, or project.",
    ],
  },
  {
    title: "33. Changes to This Privacy Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our services, changes in our website, new technologies, new service providers, changes in business practices, or legal or regulatory developments.",
      "When we make changes, we may update the \"Last Updated\" date at the top of this page. We encourage visitors to review this Privacy Policy periodically.",
    ],
  },
  {
    title: "34. Relationship With Our Terms & Conditions",
    body: [
      "This Privacy Policy should be read together with the CirklX Agency Terms & Conditions, as well as any proposal, quotation, contract, or project-specific agreement entered into with a client.",
      "If a project involves special confidentiality, data processing, or privacy requirements, these may be covered through an additional written agreement.",
    ],
  },
  {
    title: "35. Governing Law",
    body: [
      "This Privacy Policy shall be interpreted in accordance with applicable laws of India, including applicable data protection and information technology laws as they come into force or are amended from time to time.",
      "Subject to applicable law, disputes relating to this Privacy Policy shall be subject to the jurisdiction of appropriate courts in Hisar, Haryana, India.",
    ],
  },
  {
    title: "36. Contact Us",
    body: [
      <>If you have questions, concerns, complaints, or requests regarding this Privacy Policy or the handling of your personal information, please contact CirklX Agency, Hisar, Haryana, India, at <strong className="font-bold text-[#15140F]">cirklx.agency@gmail.com</strong>.</>,
      "We will make reasonable efforts to review and respond to legitimate privacy-related requests.",
      "By using the CirklX Agency website, submitting information to us, or engaging our services, you acknowledge that you have read and understood this Privacy Policy.",
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
      <div className="max-w-4xl mx-auto text-center px-6 pt-6 pb-6 sm:pb-8">
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
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10"
        >
          {INTRO.map((para, j) => (
            <p key={j} className="text-black/60 text-sm sm:text-base leading-relaxed mb-3">
              {para}
            </p>
          ))}
        </motion.div>

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