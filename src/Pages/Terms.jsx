import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LAST_UPDATED = "September 3, 2026";

const INTRO = [
  <>Welcome to <strong className="font-bold text-[#15140F]">CirklX</strong> Agency.</>,
  "These Terms and Conditions (\"Terms\") govern your access to and use of the CirklX Agency website and the marketing, advertising, creative, digital, branding, development, and related services provided by CirklX Agency (\"CirklX\", \"we\", \"us\", or \"our\"). CirklX Agency operates from Hisar, Haryana, India.",
  "By accessing our website, contacting us for services, accepting a quotation or proposal, making a payment, or engaging CirklX Agency for any project or ongoing service, you agree to be bound by these Terms. If you do not agree with these Terms, you should not use our services.",
];

const SECTIONS = [
  {
    title: "1. About CirklX Agency",
    body: [
      "CirklX Agency is a digital marketing and creative agency offering services including, but not limited to, Social Media Management, Content Creation, Reels and Video Production, Video Shoots, Video Editing, Graphic Design, Meta Advertising, Google Advertising, Search Engine Optimization (SEO), Google Business Profile / GMB Management, Influencer Marketing, Website Design and Development, Branding, Creative Strategy, Digital Marketing Strategy, Campaign Management, and other related marketing and creative services.",
      "The exact services provided to each client will depend upon the package, quotation, proposal, scope of work, invoice, agreement, or other written communication accepted by the client.",
    ],
  },
  {
    title: "2. Acceptance of Terms",
    body: [
      "By engaging CirklX Agency, you confirm that you have read and understood these Terms, that you have the legal authority to enter into an agreement with CirklX Agency, that you are at least 18 years old, and that — if you are acting on behalf of a company, brand, organization, partnership, or other business entity — you have authority to bind that entity to these Terms.",
      "Acceptance may occur through written approval, WhatsApp, email, signing a proposal, making payment, approving commencement of work, or otherwise instructing CirklX Agency to begin providing services.",
    ],
  },
  {
    title: "3. Scope of Services",
    body: [
      "The specific scope of each project will be defined through a proposal, quotation, service package, invoice, written communication, or other mutually accepted document.",
      "Any service, deliverable, campaign, design, shoot, revision, additional platform, additional content, development work, or other requirement not included in the agreed scope may be treated as additional work and may involve additional charges. CirklX Agency reserves the right to provide a separate quotation for work outside the original agreed scope.",
    ],
  },
  {
    title: "4. Project Proposals and Quotations",
    body: [
      "All quotations and proposals are based on the information and requirements provided by the client at the time of discussion.",
      "If the scope, requirements, timeline, deliverables, manpower, location, number of shoots, creators, revisions, advertising requirements, integrations, website functionality, or other project requirements change, CirklX Agency may revise the quotation accordingly.",
      "A quotation does not permanently reserve resources, production dates, models, creators, influencers, photographers, videographers, developers, editors, or other third parties unless expressly agreed.",
    ],
  },
  {
    title: "5. Payment Terms",
    body: [
      "Unless otherwise agreed in writing, CirklX Agency follows a 50% advance and 50% balance payment structure for project-based work. The initial 50% payment must generally be paid before the project or service begins, and the remaining 50% must be paid according to the payment milestone specified in the proposal, quotation, invoice, or project communication.",
      "For monthly retainers, advertising management, social media management, or ongoing services, payment terms may be specified separately in the relevant proposal.",
      "CirklX Agency may require full or partial payment before releasing final files, publishing final deliverables, transferring websites, handing over credentials, completing deployment, or delivering other final assets.",
      "All prices are exclusive of applicable third-party charges, advertising budgets, influencer fees, creator fees, model fees, travel expenses, location charges, paid software, hosting, domains, stock assets, licenses, or government taxes unless expressly mentioned otherwise.",
    ],
  },
  {
    title: "6. Non-Refundable Payments",
    body: [
      "Payments made to CirklX Agency are non-refundable, including advance payments, booking amounts, retainers, project payments, production charges, and other fees, unless CirklX Agency expressly agrees otherwise in writing.",
      "Once work, planning, strategy, research, production preparation, designing, editing, development, advertising setup, content planning, shoot coordination, resource allocation, or another part of the project has started, payments will not be refunded. This is because CirklX Agency commits team resources, time, production capacity, planning, and other costs after accepting a project.",
    ],
  },
  {
    title: "7. Cancellation of Ongoing Services",
    body: [
      "For recurring or monthly services, clients should provide at least 7 days' notice before the next renewal or billing period if they wish to discontinue the service. If notice is not provided within the required period, CirklX Agency may proceed based on the previously agreed service schedule or resource allocation.",
      "Payments already made for the existing service period remain non-refundable. Any work already completed, scheduled, committed, outsourced, booked, or incurred before cancellation remains payable.",
    ],
  },
  {
    title: "8. Delayed or Late Payments",
    body: [
      "Clients are responsible for making payments according to the agreed payment schedule. If payment becomes overdue, CirklX Agency may temporarily suspend or stop content creation, designing, editing, content posting, advertising management, SEO activities, GMB management, website development, website maintenance, campaign execution, shoot scheduling, account management, delivery of final files, or any other ongoing services.",
      "CirklX Agency will not be responsible for loss of reach, ranking, campaign performance, leads, sales, revenue, website availability, advertising performance, or other negative effects arising from services being paused due to delayed payment. Work may resume after outstanding payments are cleared, subject to team and resource availability.",
    ],
  },
  {
    title: "9. Advertising Budget and Management Fees",
    body: [
      "Where CirklX Agency manages Meta Ads, Google Ads, or other paid advertising platforms, the agency's management fee is separate from the advertising budget unless expressly mentioned otherwise. The client is responsible for providing and funding the advertising budget, and advertising expenditure may be paid directly by the client to Meta, Google, or the relevant advertising platform.",
      "CirklX Agency's fees cover advertising management, strategy, setup, optimization, monitoring, creative coordination, reporting, or other agreed services and do not automatically include advertising spend. CirklX Agency is not responsible for charges made directly by advertising platforms to the client's payment method.",
    ],
  },
  {
    title: "10. No Guarantee of Marketing Results",
    body: [
      "CirklX Agency aims to provide professional services and uses reasonable marketing, creative, advertising, content, SEO, and growth strategies. However, no specific business result is guaranteed — including followers, views, reach, engagement, website traffic, leads, enquiries, conversions, sales, revenue, profit, ROAS, ROI, Google ranking, search engine position, viral content performance, influencer performance, advertising results, or business growth percentage.",
      "Marketing results can be affected by several factors outside CirklX Agency's control, including market conditions, competition, product quality, pricing, demand, client response time, advertising budget, platform algorithms, customer behaviour, seasonality, brand reputation, location, account history, and third-party platform policies.",
      "Previous client results, case studies, campaign results, analytics, testimonials, or portfolio examples must not be interpreted as a guarantee of future performance.",
    ],
  },
  {
    title: "11. Social Media and Third-Party Platforms",
    body: [
      "CirklX Agency may provide services involving platforms including Instagram, Facebook, Meta, Google, YouTube, WhatsApp, Google Business Profile, search engines, hosting providers, website platforms, social networks, advertising networks, analytics platforms, and other third-party services. CirklX Agency does not own or control these third-party platforms.",
      "We are therefore not responsible for platform downtime, technical errors, algorithm changes, account restrictions, suspension or termination, advertising or Business Manager restrictions, reduced organic reach, changes in advertising costs, policy changes, deleted content, security incidents originating from third-party platforms, feature changes, verification rejection, changes to search rankings or third-party APIs, or losses caused by third-party outages or service failures.",
      "CirklX Agency may assist clients in resolving platform-related issues where reasonably possible, but resolution cannot be guaranteed.",
    ],
  },
  {
    title: "12. Client Account Access",
    body: [
      "Clients may be required to provide appropriate access to social media accounts, advertising accounts, websites, Google Business Profiles, analytics platforms, domain providers, hosting accounts, or other services. The client is responsible for ensuring that they have the legal right to provide such access.",
      "Where possible, role-based or partner access should be provided instead of sharing personal passwords. The client remains responsible for maintaining control and security over their primary business accounts.",
    ],
  },
  {
    title: "13. Client Responsibilities",
    body: [
      "The client agrees to provide CirklX Agency with accurate and timely information required to complete the work — including business, product, and service information, pricing, offers, terms, contact details, brand assets, logos, photos, videos, testimonials, access credentials, advertising access, website information, legal claims, product claims, approvals, feedback, and required permissions.",
      "The client is responsible for ensuring that all information provided to CirklX Agency is accurate, lawful, and not misleading, and that they have appropriate licenses, permissions, copyrights, releases, or ownership rights for material supplied to CirklX Agency.",
    ],
  },
  {
    title: "14. Content Approval",
    body: [
      "CirklX Agency may send designs, videos, reels, captions, advertisements, websites, branding materials, scripts, or other deliverables to the client for approval. The client is responsible for carefully reviewing text, spellings, prices, contact details, offers, product claims, dates, addresses, phone numbers, brand details, images, videos, legal statements, and other important information.",
      "Once the client approves a deliverable, CirklX Agency may treat the content as approved for publication or final delivery. CirklX Agency will not be responsible for an error, incorrect information, claim, spelling, price, offer, image, statement, or other issue that was visible in the content and approved by the client.",
    ],
  },
  {
    title: "15. Revisions",
    body: [
      "The number of revisions included in a project will depend on the relevant package, quotation, proposal, or agreed scope. Revisions outside the agreed number or scope may be charged separately.",
      "A revision means a reasonable modification to an existing concept or deliverable. A request that substantially changes the original direction, concept, script, campaign, design style, functionality, branding direction, website structure, shoot concept, or project requirements may be considered new work rather than a revision, and CirklX Agency may quote additional charges for such changes.",
    ],
  },
  {
    title: "16. Delayed Client Feedback",
    body: [
      "Clients are expected to provide approvals, information, feedback, materials, and required access within a reasonable period. If a project is delayed because the client does not provide information, feedback, approval, payment, access, content, or other required material, CirklX Agency will not be responsible for missed deadlines resulting from such delays.",
      "Project timelines may be revised according to team availability when the client later resumes the project.",
    ],
  },
  {
    title: "17. Video Shoots and Production",
    body: [
      "Shoot dates are subject to mutual confirmation and availability. The client should ensure that the location, staff, products, food, equipment, models, permissions, or other required items are available at the agreed time.",
      "If a shoot is cancelled, postponed, or rescheduled by the client after CirklX Agency has incurred costs, the client will be responsible for reimbursing applicable expenses, including travel, model or creator charges, photographer or videographer charges, equipment rentals, location fees, production costs, transportation, accommodation, third-party bookings, or other non-recoverable expenses. Any additional rescheduling fee, if applicable, may be communicated separately.",
    ],
  },
  {
    title: "18. Influencers, Models and Content Creators",
    body: [
      "Influencer, creator, actor, and model services may involve independent third parties. Availability, charges, audience behaviour, content performance, scheduling, engagement, reach, and results can vary, and CirklX Agency does not guarantee that any collaboration will achieve a specific level of reach, engagement, enquiries, sales, followers, or revenue.",
      "Unless included in the proposal, influencer, model, creator, celebrity, travel, production, location, and associated third-party fees may be charged separately. CirklX Agency will not be liable for circumstances outside our reasonable control involving independent influencers, creators, or other third-party talent.",
    ],
  },
  {
    title: "19. Intellectual Property and Ownership",
    body: [
      "Unless otherwise agreed in writing, ownership of final approved deliverables specifically created for the client may transfer to the client after full payment of all amounts due.",
      "However, CirklX Agency retains ownership of its raw files, unused footage, project files, source files, editable files, working files, templates, internal systems, processes, strategies, frameworks, presets, production methods, concepts not selected by the client, internal documentation, and proprietary know-how, unless their transfer has been specifically agreed in writing.",
      "Editable or source files are not automatically included with final deliverables unless expressly mentioned in the proposal. Third-party assets remain subject to the license terms of their respective owners.",
    ],
  },
  {
    title: "20. Portfolio and Promotional Rights",
    body: [
      "Unless otherwise agreed in writing, the client grants CirklX Agency permission to display work completed for the client as part of CirklX Agency's portfolio and promotional activities — including logos, brand names, designs, reels, videos, websites, campaign creatives, advertisements, before-and-after examples, marketing results, screenshots, public analytics, case studies, testimonials, or other publicly released work.",
      "CirklX Agency may display such work on its website, social media platforms, presentations, pitch decks, portfolios, advertisements, case studies, or other marketing materials. If confidentiality is specifically required, the client should communicate this requirement in writing.",
    ],
  },
  {
    title: "21. Website Development",
    body: [
      "For website projects, the specific features, pages, functionality, integrations, design, content, hosting arrangements, maintenance, and revisions will depend on the agreed project scope.",
      "Unless included in the proposal, the following may involve additional charges: domain registration, hosting, premium themes, premium plugins, third-party APIs, payment gateway fees, licensed fonts, stock assets, maintenance, security monitoring, website updates, additional pages, additional integrations, and additional functionality.",
      "CirklX Agency is not responsible for issues caused by unsupported modifications made by the client or another third party after project handover.",
    ],
  },
  {
    title: "22. Search Engine Optimization",
    body: [
      "SEO is an ongoing process influenced by search engine algorithms, competition, website quality, domain authority, user behaviour, content, technical factors, and many other variables. CirklX Agency does not guarantee a specific Google ranking, keyword position, traffic level, or timeframe for results.",
      "Search engines may change their algorithms at any time, which may positively or negatively affect website rankings.",
    ],
  },
  {
    title: "23. Google Business Profile / GMB Services",
    body: [
      "Where CirklX Agency manages a Google Business Profile, the client must provide accurate business information. Google retains independent control over profile verification, suspension, reviews, edits, ranking, features, and account policies.",
      "CirklX Agency cannot guarantee profile verification, ranking position, review removal, reinstatement, or any specific visibility level.",
    ],
  },
  {
    title: "24. Graphic Design and Branding",
    body: [
      "Branding and design services may include concepts, logos, colour systems, typography recommendations, visual identities, social media templates, packaging directions, or other creative work according to the agreed proposal.",
      "Only selected and fully paid final concepts are considered approved deliverables. Unused concepts and rejected concepts remain the intellectual property of CirklX Agency unless otherwise agreed.",
    ],
  },
  {
    title: "25. Confidentiality",
    body: [
      "CirklX Agency will make reasonable efforts to protect confidential business information provided by clients and will not intentionally disclose confidential information to unrelated third parties except where it is required to deliver the service, the client provides permission, disclosure is required by law, the information is already publicly available, or the information was independently known or developed.",
      "Clients must also respect CirklX Agency's confidential pricing, strategies, systems, proposals, internal processes, templates, project files, business information, and proprietary methods.",
    ],
  },
  {
    title: "26. Third-Party Costs",
    body: [
      "Certain projects may require third-party services or expenses, including influencers, models, actors, voiceover artists, photographers, videographers, developers, designers, locations, equipment, travel, software, plugins, domains, hosting, stock media, advertising spend, printing, and production materials.",
      "Unless expressly included in CirklX Agency's proposal, these costs are separate and may be payable by the client.",
    ],
  },
  {
    title: "27. Client-Supplied Content and Copyright",
    body: [
      "The client warrants that any content supplied to CirklX Agency may legally be used for the intended project — including logos, photographs, videos, music, testimonials, product images, trademarks, fonts, written content, and other intellectual property.",
      "CirklX Agency is not responsible for copyright, trademark, privacy, advertising, or other legal disputes resulting from materials supplied or specifically requested by the client where the client did not have proper rights or permissions.",
    ],
  },
  {
    title: "28. Compliance With Laws",
    body: [
      "Clients remain responsible for ensuring their products, services, offers, claims, advertisements, promotions, competitions, pricing, and business practices comply with applicable laws and industry regulations.",
      "CirklX Agency provides marketing and creative services and does not automatically provide legal, financial, tax, or regulatory advice. Where a campaign contains regulated or sensitive claims, the client should obtain appropriate professional advice before publication.",
    ],
  },
  {
    title: "29. Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law, CirklX Agency will not be liable for indirect, incidental, special, consequential, or business-related losses arising from the use of our services — including loss of revenue, profit, business opportunities, customers, data, advertising spend, reputation, ranking, followers, reach, leads, or sales.",
      "CirklX Agency will not be responsible for losses arising from factors outside our reasonable control, including third-party platforms, account restrictions, client delays, inaccurate client information, platform outages, algorithm changes, advertising platform decisions, force majeure events, or third-party service failures.",
      "Where liability cannot legally be excluded, CirklX Agency's liability will, to the extent permitted by applicable law, be limited to the amount paid by the client to CirklX Agency for the specific service directly giving rise to the claim.",
    ],
  },
  {
    title: "30. Indemnification",
    body: [
      "The client agrees to indemnify and hold CirklX Agency, its team members, contractors, representatives, and service providers harmless from reasonable claims, losses, liabilities, damages, or expenses arising from material provided by the client, false or misleading information provided by the client, unlawful products or services, intellectual property violations caused by client-supplied materials, claims or promises specifically instructed by the client, or client violation of applicable laws or these Terms.",
      "This clause applies to the extent permitted by applicable law.",
    ],
  },
  {
    title: "31. Termination of Services",
    body: [
      "CirklX Agency reserves the right to suspend or terminate services where reasonably necessary, including where payments remain unpaid, the client repeatedly violates agreed terms, the client engages in abusive or threatening behaviour, the client requests illegal, fraudulent, deceptive, or unethical work, the client misuses CirklX Agency's work or intellectual property, continuing the project may create legal or reputational risk, or required cooperation is repeatedly withheld.",
      "Amounts payable for completed work, allocated resources, incurred expenses, third-party costs, or services already provided remain due following termination.",
    ],
  },
  {
    title: "32. Force Majeure",
    body: [
      "CirklX Agency will not be responsible for delays or failure to perform obligations caused by circumstances reasonably outside our control, including natural disasters, extreme weather, internet failures, platform outages, government restrictions, strikes, civil disturbances, epidemics, pandemics, power failures, technical infrastructure failures, illness, travel restrictions, or other extraordinary events.",
      "Where possible, CirklX Agency will make reasonable efforts to resume affected services.",
    ],
  },
  {
    title: "33. Communication",
    body: [
      "Official project communication may take place through email, WhatsApp, phone calls, meetings, proposals, project management systems, or other mutually agreed communication channels. Clients are responsible for providing current and accurate contact information.",
      "Approvals or instructions provided through normal project communication channels may be treated as valid project decisions.",
    ],
  },
  {
    title: "34. Changes to Services or Pricing",
    body: [
      "CirklX Agency may update its service offerings, packages, pricing, processes, or policies from time to time. Changes to standard pricing do not automatically affect an already agreed fixed-price project unless the project scope changes or both parties agree otherwise.",
      "Recurring services may be offered at revised pricing for future renewal periods after appropriate communication.",
    ],
  },
  {
    title: "35. Website Information",
    body: [
      "We make reasonable efforts to keep information on our website accurate and updated. However, website content may occasionally contain errors, outdated information, or temporary inaccuracies.",
      "Information shown on the website is general information and does not override a specific proposal, quotation, agreement, or written arrangement made between CirklX Agency and a client.",
    ],
  },
  {
    title: "36. External Links",
    body: [
      "Our website may contain links to third-party websites, social media profiles, tools, platforms, or services. CirklX Agency does not control these external websites and is not responsible for their content, security, availability, practices, or privacy policies.",
      "Users access external websites at their own discretion.",
    ],
  },
  {
    title: "37. Privacy",
    body: [
      "Personal information collected through the CirklX Agency website or during service delivery will be handled in accordance with our applicable Privacy Policy.",
      "Clients and website visitors should review the CirklX Agency Privacy Policy to understand how information may be collected, used, stored, or processed.",
    ],
  },
  {
    title: "38. Changes to These Terms",
    body: [
      "CirklX Agency may revise these Terms and Conditions when necessary due to changes in our services, business practices, website, or applicable requirements. The updated version may be published on our website with a revised \"Last Updated\" date.",
      "Continued use of our website or services after updated Terms are published may constitute acceptance of the revised Terms to the extent permitted by applicable law.",
    ],
  },
  {
    title: "39. Governing Law and Jurisdiction",
    body: [
      "These Terms shall be governed by and interpreted in accordance with the laws applicable in India. Subject to applicable law, disputes relating to CirklX Agency, our website, these Terms, or our services shall be subject to the jurisdiction of the appropriate courts located in Hisar, Haryana, India.",
      "Where reasonably possible, both parties should first attempt to resolve any disagreement through good-faith discussion before commencing formal legal proceedings.",
    ],
  },
  {
    title: "40. Severability",
    body: [
      "If any part of these Terms is found to be invalid, unlawful, or unenforceable, the remaining provisions will continue to remain in effect to the extent permitted by law.",
    ],
  },
  {
    title: "41. Entire Understanding",
    body: [
      "These Terms, together with the applicable quotation, proposal, invoice, written scope of work, Privacy Policy, and any separately executed agreement, form the understanding between CirklX Agency and the client regarding the relevant services.",
      "Where a separately signed agreement expressly conflicts with these general Terms, the specific terms of that agreement may take priority for that particular engagement.",
    ],
  },
  {
    title: "42. Contact Us",
    body: [
      <>For questions regarding these Terms and Conditions, you may contact CirklX Agency, Hisar, Haryana, India, at <strong className="font-bold text-[#15140F]">cirklx.agency@gmail.com</strong>.</>,
      "By using the CirklX Agency website or engaging our services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.",
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
      <div className="max-w-4xl mx-auto text-center px-6 pt-6 pb-6 sm:pb-8">
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

export default Terms;