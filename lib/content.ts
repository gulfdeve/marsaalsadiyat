// Verbatim copy from the reference site, kept out of markup so components stay readable.

export const nav = [
  { label: "VISION", href: "#vision" },
  { label: "LIFESTYLE", href: "#lifestyle" },
  { label: "MASTERPLAN", href: "#masterplan" },
  { label: "RESIDENCES", href: "#residences" },
  { label: "INVEST", href: "#invest" },
  { label: "CONNECTIVITY", href: "#connectivity" },
] as const;

export const hero = {
  eyebrow: "NEWLY ANNOUNCED · SAADIYAT ISLAND, ABU DHABI",
  titleLead: "Marsa Al Saadiyat",
  titleLine2: "Abu Dhabi",
  body: "A landmark AED 100 billion waterfront destination on Saadiyat Island — a 6.4 million sqm masterplan of private mansions, luxury villas, waterfront apartments and branded residences along an 8km waterfront with Abu Dhabi's largest marina.",
};

export const vision = {
  eyebrow: "THE VISION",
  title: "The Next Chapter Of Saadiyat Island's Evolution",
  body: "An integrated destination across approximately 6.4 million square metres, weaving mansions, villas, apartments and branded residences alongside beaches, marina facilities, a theatre district, schools and healthcare into one walkable waterfront community for more than 58,000 residents.",
  stats: [
    { icon: "waves", value: 8, decimals: 0, unit: "KM", prefix: "", caption: "WATERFRONT" },
    { icon: "sun", value: 5.6, decimals: 1, unit: "KM", prefix: "", caption: "BEACH" },
    { icon: "footprints", value: 140, decimals: 0, unit: "KM", prefix: "", caption: "WALKING TRAILS" },
    { icon: "bike", value: 46, decimals: 0, unit: "KM", prefix: "", caption: "CYCLING TRACK" },
    { icon: "gem", value: 100, decimals: 0, unit: "B", prefix: "AED ", caption: "MASTER DEVELOPMENT" },
  ],
} as const;

export const lifestyle = {
  eyebrow: "WATERFRONT LIFESTYLE",
  title: "A Destination Built Around The Water",
  body: "From beaches and promenade dining to marina living and luxury hospitality, Marsa Al Saadiyat is designed as a continuous waterfront experience — a one-kilometre promenade lined with retail and dining connects the beaches to the marina and yacht club.",
  cards: [
    { title: "Beaches & promenade", body: "Approximately 5.6km of beaches and a 1km waterfront promenade" },
    { title: "Marina living", body: "Abu Dhabi's largest marina with a dedicated yacht club" },
    { title: "Luxury hospitality", body: "Two luxury hotels anchoring the wider hospitality offering" },
    { title: "Cultural district", body: "Saadiyat's museums and theatre district minutes away" },
  ],
} as const;

export const masterplan = {
  eyebrow: "MASTERPLAN & COMMUNITY VISION",
  title: "An Integrated, Walkable Waterfront Community",
  body: "Select a numbered point on the illustrative masterplan to explore each planned zone. Final layout is subject to official confirmation.",
  legend: [
    { icon: "square", label: "WATERFRONT RESIDENCES" },
    { icon: "triangle", label: "MARINA & YACHT CLUB" },
    { icon: "shopping-bag", label: "RETAIL & DINING" },
    { icon: "leaf", label: "PARKS & OPEN SPACES" },
    { icon: "waves", label: "BEACHES" },
    { icon: "globe", label: "CULTURAL & COMMUNITY" },
    { icon: "lightbulb", label: "HOTELS & RESORTS" },
  ],
  hotspots: [
    { id: "marina", x: 62, y: 32, title: "Marina & Yacht Club", body: "Abu Dhabi's largest marina with a dedicated yacht club." },
    { id: "residential", x: 40, y: 45, title: "Residential Neighbourhoods", body: "Private mansions, luxury villas, waterfront apartments and branded residences." },
    { id: "theatre", x: 85, y: 55, title: "Theatre District", body: "A dedicated cultural and performance district minutes from the coast." },
    { id: "beachfront", x: 30, y: 68, title: "Beachfront & Promenade", body: "5.6km of beaches connected by a one-kilometre waterfront promenade." },
    { id: "park", x: 20, y: 20, title: "Landscaped Central Park", body: "A landscaped central park woven through the residential neighbourhoods." },
    { id: "schools", x: 55, y: 15, title: "Schools & Healthcare", body: "Community schools and healthcare facilities within walking distance." },
  ],
} as const;

export const residences = {
  eyebrow: "RESIDENCES",
  title: "Four Ways To Call The Waterfront Home",
  body: "Private mansions, luxury villas, waterfront apartments and branded residences. Layouts, sizes and pricing have not yet been released. Illustrative imagery.",
  tiles: [
    { id: "mansions", label: "PRIVATE MANSIONS", span: "tall" },
    { id: "villas", label: "LUXURY VILLAS", span: "normal" },
    { id: "apartments", label: "WATERFRONT APARTMENTS", span: "tall" },
    { id: "branded", label: "BRANDED RESIDENCES", span: "normal" },
    { id: "beaches", label: "BEACHES", span: "normal" },
    { id: "dining", label: "PROMENADE DINING", span: "normal" },
    { id: "marina", label: "MARINA & YACHT CLUB", span: "normal" },
    { id: "park", label: "CENTRAL PARK", span: "normal" },
  ],
} as const;

export const story = {
  eyebrow: "THE STORY",
  title: "Experience Marsa Al Saadiyat",
};

export const invest = {
  eyebrow: "WHY INVEST IN MARSA AL SAADIYAT",
  title: "A Landmark Scale, In A Location That Cannot Be Replicated",
  body: "Marsa Al Saadiyat combines a landmark development track record with one of Abu Dhabi's most limited waterfront settings.",
  cards: [
    { icon: "gem", title: "Landmark AED 100 Billion Scale", body: "One of Abu Dhabi's most significant waterfront and mixed-use developments announced to date." },
    { icon: "anchor", title: "Prime Saadiyat Island Waterfront", body: "Positioned alongside Saadiyat's established cultural and residential district." },
    { icon: "building-2", title: "Experienced Master Developer", body: "Delivered by an established, listed real estate developer." },
    { icon: "sparkles", title: "Limited Waterfront Land", body: "An 8km waterfront setting on an island with finite coastal frontage." },
    { icon: "users", title: "Diverse Residential Offering", body: "Mansions, villas, apartments and branded residences within one destination." },
    { icon: "compass", title: "Marina, Hospitality & Retail", body: "Abu Dhabi's largest marina, two luxury hotels and a waterfront promenade." },
    { icon: "trending-up", title: "Future Transport Connectivity", body: "A planned underground Etihad Rail station and new road, tunnel and bridge links." },
    { icon: "landmark", title: "Abu Dhabi's Long-Term Growth", body: "Positioned to appeal to both local and international buyers over the long term." },
  ],
} as const;

export const connectivity = {
  eyebrow: "CONNECTIVITY",
  title: "Anchored On Saadiyat Island, Connected To All Of Abu Dhabi",
  body: "A planned underground Etihad Rail high-speed station, plus new road, tunnel and bridge connections toward Reem Island and Umm Yifeenah Island, place the destination within reach of the wider UAE.",
  places: [
    { name: "Louvre Abu Dhabi", tag: "CULTURAL DISTRICT" },
    { name: "Zayed National Museum", tag: "CULTURAL DISTRICT" },
    { name: "Guggenheim Abu Dhabi", tag: "CULTURAL DISTRICT" },
    { name: "teamLab Phenomena Abu Dhabi", tag: "CULTURAL DISTRICT" },
    { name: "Underground Etihad Rail Station", tag: "PLANNED" },
    { name: "Roads, Tunnel & Bridge Links", tag: "PLANNED" },
  ],
} as const;

export const timeline = {
  eyebrow: "REGISTRATION TIMELINE",
  title: "Where Marsa Al Saadiyat Stands Today",
  body: "All dates below are expected and planned, subject to official confirmation.",
  phases: [
    { phase: "01", title: "Announced — 2026", body: "Project launch witnessed with an investment value of AED 100 billion." },
    { phase: "02", title: "Priority Registration — Open Now", body: "Register interest to receive project updates ahead of public launch." },
    { phase: "03", title: "First Residential Sales — Expected H2 2026", body: "First residential sales expected to launch." },
    { phase: "04", title: "Future Phases — To Be Announced", body: "Further residential phases and details subject to future announcement." },
  ],
} as const;

export const amenities = {
  eyebrow: "BEACHES, PARKS & OUTDOOR LIVING",
  title: "Coastal Wellness, Built Into Everyday Life",
  body: "Marsa Al Saadiyat is planned around movement, nature and walkable access to daily amenities.",
  items: [
    "5.6 KM of Beaches",
    "Landscaped Central Park",
    "140 KM Walking Paths",
    "46 KM Cycling Routes",
    "Outdoor Swimming Pools",
    "Sports Facilities",
    "Community Clubhouses",
    "Walkable Daily Amenities",
  ],
} as const;

export const registerForm = {
  eyebrow: "SPEAK TO A PROPERTY CONSULTANT",
  title: "Join The Priority Registration List",
  body: "Register today to receive project information, priority updates and early notice ahead of the first residential sales launch expected in the second half of 2026. No obligation, no cost.",
  budgets: ["AED 2M – 5M", "AED 5M – 10M", "AED 10M – 20M", "AED 20M+"] as const,
  purposes: ["Investment", "End User"] as const,
};

export const finalCta = {
  title: "Ready To Register?",
  body: "Share a few details and a dedicated property consultant will be in touch with project information and priority updates.",
};

export const footer = {
  brand: "MARSA",
};
