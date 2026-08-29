// Saara blog content ek hi jagah — Blog.jsx (list) aur BlogPost.jsx (detail)
// dono isi array se data uthate hain. Naya blog add karna ho to bas yaha
// ek naya object add karo, list aur detail page dono automatically update ho jayenge.
//
// content blocks: { type: "p" | "h" | "quote", text }
//   p     -> normal paragraph
//   h     -> sub-heading inside the article
//   quote -> pulled-quote styled in lime italic

export const blogPosts = [
  {
    id: 1,
    slug: "hooks-that-stop-the-scroll",
    title: "The Anatomy of a Hook That Stops the Scroll",
    excerpt:
      "The first 1.5 seconds decide everything. Here's the exact structure we use before we even open the timeline.",
    category: "Editing Tips",
    date: "2026-08-02",
    
    author: { name: "Ritika Sharma", role: "Lead Editor" },
    cover: "https://picsum.photos/id/96/1200/800",
    content: [
      { type: "p", text: "Every reel lives or dies in the first second and a half. Before a single cut is made, we already know what the opening frame has to do — interrupt the thumb." },
      { type: "h", text: "Start mid-motion, never mid-sentence" },
      { type: "p", text: "Talking-head intros where someone says 'hey guys' lose almost half the audience before the point even lands. We open on action already in progress — a hand reaching for something, a reaction already happening — so the eye has no choice but to follow." },
      { type: "quote", text: "If the first frame could be the tenth frame of a boring video, it's the wrong first frame." },
      { type: "h", text: "Text on screen earns its place" },
      { type: "p", text: "We only put text over the hook when it adds a question the viewer wants answered, not a caption of what's already visible. 'Wait for it' is dead. A specific, oddly precise claim works better every time." },
      { type: "p", text: "Once the hook is locked, the rest of the edit gets easier — pacing, music, and cuts all exist to protect that first promise, not distract from it." },
    ],
  },
  {
    id: 2,
    slug: "0-to-2-million-in-90-days",
    title: "0 to 2 Million Followers in 90 Days: A Case Study",
    excerpt:
      "How a fitness creator with almost no audience became one of the fastest-growing pages in the niche — without going viral once.",
    category: "Case Study",
    date: "2026-07-18",
   
    author: { name: "Aman Verma", role: "Growth Strategist" },
    cover: "https://picsum.photos/id/1074/1200/800",
    content: [
      { type: "p", text: "When this creator came to us, he had 4,200 followers and a folder of gym footage nobody was watching. Ninety days later he crossed two million. No single video went mega-viral — the growth came from a system." },
      { type: "h", text: "The problem wasn't the content" },
      { type: "p", text: "His workouts were genuinely good. The footage just wasn't shaped into anything a stranger would stop for. We didn't change what he filmed — we changed how it got assembled." },
      { type: "h", text: "The three-edit rule" },
      { type: "p", text: "Every raw clip got cut into three completely different reels: one built around the hook, one built around a transformation moment, and one built around a single useful tip. Same footage, three different reasons to watch." },
      { type: "quote", text: "Volume without variation is just noise repeated. Variation is what compounds." },
      { type: "p", text: "By week six, the account had enough data for us to see exactly which format his specific audience rewatched — and we doubled down hard on that shape for the next month." },
    ],
  },
  {
    id: 3,
    slug: "color-grading-that-doesnt-scream",
    title: "Behind the Cut: Color Grading That Doesn't Scream 'Filter'",
    excerpt:
      "The best grade is the one nobody notices. A look at the subtle adjustments we run on every single project before export.",
    category: "Behind The Scenes",
    date: "2026-07-02",
  
    author: { name: "Zara Khan", role: "Colorist" },
    cover: "https://picsum.photos/id/1050/1200/800",
    content: [
      { type: "p", text: "A grade that looks like a grade has already failed. The goal is footage that feels like it was shot in better light than it actually was — not footage wrapped in a preset." },
      { type: "h", text: "Skin first, everything else second" },
      { type: "p", text: "We isolate skin tones before touching anything else in the frame. If a preset shifts skin even slightly warm or grey, the rest of the correction gets built to compensate — which is exactly backwards." },
      { type: "h", text: "Contrast does more than saturation" },
      { type: "p", text: "Most rough-looking phone footage isn't undersaturated, it's flat. A small, controlled contrast curve fixes more perceived 'quality' than pushing vibrance ever will, and it ages a lot better on a small screen." },
      { type: "p", text: "We finish every grade by watching it at thumbnail size before final export — if it doesn't read at that size, it doesn't matter how it looks full-screen." },
    ],
  },
  {
    id: 4,
    slug: "2026-short-form-trends",
    title: "5 Short-Form Trends Worth Your Attention in 2026",
    excerpt:
      "Not every trend is worth chasing. Here's what's actually moving the needle right now — and what's already fading.",
    category: "Trends",
    date: "2026-06-20",
  
    author: { name: "Ritika Sharma", role: "Lead Editor" },
    cover: "https://picsum.photos/id/180/1200/800",
    content: [
      { type: "p", text: "Trend-chasing burns creators out fast. We track dozens of formats every month so we can tell our clients which ones are worth the shoot day — and which ones peaked two months ago." },
      { type: "h", text: "Longer hooks, shorter payoffs" },
      { type: "p", text: "Audiences are more patient with a two- to three-second setup than they were a year ago, as long as the payoff lands fast once it arrives. The pendulum on ultra-fast cuts is swinging back slightly." },
      { type: "h", text: "Native captions over designed text" },
      { type: "p", text: "Platform-generated caption styles are outperforming heavily designed text overlays in a lot of niches — they read as more authentic and load faster on the eye." },
      { type: "quote", text: "The trend is never the format. The trend is what the format lets the audience feel." },
      { type: "p", text: "Treat every trend as a tool, not a template — the ones that work best are the ones bent to fit a creator's existing voice, not the other way around." },
    ],
  },
  {
    id: 5,
    slug: "sound-design-nobody-notices",
    title: "The Sound Design Nobody Notices (And Why That's the Point)",
    excerpt:
      "Whooshes and clicks aren't decoration. They're doing structural work in the edit — most viewers just never realize it.",
    category: "Editing Tips",
    date: "2026-06-05",

    author: { name: "Dev Malhotra", role: "Sound Editor" },
    cover: "https://picsum.photos/id/1011/1200/800",
    content: [
      { type: "p", text: "Take the sound design out of a well-cut reel and the pacing suddenly feels off, even though nothing visual has changed. That's because most of the perceived rhythm is coming from audio, not the cuts themselves." },
      { type: "h", text: "Every hard cut needs a reason to exist" },
      { type: "p", text: "A whoosh or a click under a cut tells the brain the change was intentional. Without it, fast cuts can read as jarring or accidental instead of energetic." },
      { type: "p", text: "We build a layered sound bed under almost every edit — ambient texture, a couple of accent hits, and music that's ducked at exactly the right syllables. None of it is meant to be consciously heard. It's meant to be felt." },
    ],
  },
  {
    id: 6,
    slug: "brief-that-saves-a-shoot-day",
    title: "The One-Page Brief That Saves an Entire Shoot Day",
    excerpt:
      "Most wasted footage isn't a filming problem — it's a planning problem. Here's the brief format we send every client before we roll camera.",
    category: "Behind The Scenes",
    date: "2026-05-22",
   
    author: { name: "Aman Verma", role: "Growth Strategist" },
    cover: "https://picsum.photos/id/60/1200/800",
    content: [
      { type: "p", text: "The most expensive mistake in content creation isn't a bad edit — it's a shoot day that comes back without the footage the edit actually needed." },
      { type: "h", text: "Shot list by outcome, not by scene" },
      { type: "p", text: "Instead of listing scenes, we list the specific edit moments we need: a reaction shot, a close-up detail insert, a clean wide for the hook. Whoever's filming knows exactly what each clip is for before they hit record." },
      { type: "h", text: "One page, not ten" },
      { type: "p", text: "A brief that's too long doesn't get read on set. Ours fits on one page — hook idea, must-have shots, and the one thing that would make the day a failure if it's missing." },
      { type: "quote", text: "Clarity before the shoot is cheaper than coverage after it." },
    ],
  },
];

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);