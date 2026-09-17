export const siteConfig = {
  festName: "ASTHRA ’26",
  subTitle: "MATHEMATICS FEST",
  college: "St. Thomas College (Autonomous) Thrissur",
  department: "Department of Mathematics",
  dates: "NOVEMBER 27, 2026",
  eventDate: "2026-11-27T00:00:00",
  venue: "Main Auditorium & Jubilee Complex, St. Thomas College Thrissur",
  
  // Navigation items
  navLinks: [
    { id: "hero", label: "HOME", num: "01" },
    { id: "about", label: "ABOUT", num: "02" },
    { id: "events", label: "EVENTS", num: "03" },
    { id: "social-drive", label: "SOCIAL DRIVE", num: "04" },
    { id: "contact", label: "CONTACT", num: "05" }
  ],

  // Social Drive configuration
  socialDrive: {
    badge: "SOCIAL IMPACT INITIATIVE",
    title: "Social Impact Initiative",
    paragraphs: [
      "We believe in the power of mathematics to transform lives. Our social drive initiative aims to create a positive impact in the community by supporting differently-abled individuals through Bethesda Charitable Trust.",
      "Join us in our mission to donate wheelchairs and create an inclusive environment where everyone can participate and shine in our festivities."
    ],
    metrics: [
      { id: "wheelchairs", value: "50+", label: "Wheelchairs to Donate" },
      { id: "lives", value: "200+", label: "Lives to Impact" },
      { id: "events", value: "100%", label: "Inclusive Events" },
      { id: "smiles", value: "∞", label: "Smiles to Create" }
    ]
  },

  // Events Timeline Data
  events: [
    {
      id: "01",
      time: "09:00 AM",
      timePeriod: "MORNING",
      num: "01",
      name: "INAUGURATION",
      category: "OPENING CEREMONY",
      tagline: "A new chapter in numbers.",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/event-1-inauguration.webp",
      fallbackImage: "/assets/event-1-inauguration.jpg",
      venue: "Main Auditorium, Ramanujan Block",
      teamSize: "Open to All",
      prizePool: "—",
      coordinators: "Dr. A. Raman & Fest Core Team",
      fullDescription: "The grand ceremonial opening of ASTHRA ’26 featuring keynote reflections from renowned mathematicians, unveiling of the festival archive, and the ceremonial lighting of the golden flame.",
      rounds: [
        { round: "Keynote Address", desc: "The Future of Applied Mathematics in Quantum Computing" },
        { round: "Fest Unveiling", desc: "Interactive geometry showcase & festival flag hoisting" }
      ]
    },
    {
      id: "02",
      time: "10:00 AM",
      timePeriod: "MORNING",
      num: "02",
      name: "MATH QUIZ",
      category: "THINK · SOLVE · WIN",
      tagline: "Questions beyond the obvious.",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/event-2-math-quiz.webp",
      fallbackImage: "/assets/event-2-math-quiz.jpg",
      venue: "Hall 304, Euler Wing",
      teamSize: "Teams of 2",
      prizePool: "₹ 15,000",
      coordinators: "Rahul K. (+91 98471 22334) & Meera S.",
      fullDescription: "The pinnacle collegiate mathematics quiz. Testing intuition, mathematical speed, lateral problem solving, and analytical acumen over 4 electrifying rounds of buzzer battles.",
      rounds: [
        { round: "Round 1: Preliminary Cipher", desc: "30-minute written screening with 25 rapid analytical problems" },
        { round: "Round 2: The Infinite Grid", desc: "Top 8 teams compete in visual topology and pattern recognition" },
        { round: "Round 3: Rapid Fire", desc: "60-second speed calculations without calculators" },
        { round: "Grand Finale", desc: "Buzzer round with escalating point values and risk mechanics" }
      ]
    },
    {
      id: "03",
      time: "11:30 AM",
      timePeriod: "MORNING",
      num: "03",
      name: "PUZZLE ARENA",
      category: "PATTERNS · LOGIC · SPEED",
      tagline: "Small clues. Big thinking.",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/event-3-puzzle-arena.webp",
      fallbackImage: "/assets/event-3-puzzle-arena.jpg",
      venue: "Ramanujan Design Studio",
      teamSize: "Individual or Duo",
      prizePool: "₹ 10,000",
      coordinators: "Ananya P. (+91 94460 88901)",
      fullDescription: "A curated battleground of non-Euclidean mazes, logic puzzles, combinatorics, cryptarithms, and spatial geometry riddles designed to stretch your intellect.",
      rounds: [
        { round: "Stage 1: Logic Labyrinths", desc: "Hands-on spatial & topological puzzle modules" },
        { round: "Stage 2: Paradox Arena", desc: "Solve time-constrained algorithmic paradoxes" }
      ]
    },
    {
      id: "04",
      time: "01:00 PM",
      timePeriod: "AFTERNOON",
      num: "04",
      name: "INTEGRATION BEE",
      category: "CALCULUS · SPEED · DUEL",
      tagline: "The ultimate 1v1 calculus showdown.",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/event-4-workshop.webp",
      fallbackImage: "/assets/event-4-workshop.jpg",
      venue: "Gauss Amphitheatre, STC",
      teamSize: "Individual Knockout",
      prizePool: "₹ 12,000",
      coordinators: "Adarsh V. (+91 97455 33412) & Pooja N.",
      fullDescription: "Head-to-head live blackboard calculus tournament. Solve complex integrals under 90-second timers with escalating difficulty brackets from Riemann sums to contour integration.",
      rounds: [
        { round: "Qualifier", desc: "20 rapid integral evaluations in 15 minutes" },
        { round: "Sweet 16 Knockout", desc: "1v1 live blackboard race to compute definite integrals" },
        { round: "Championship Bout", desc: "Multi-variable and special functions sudden death duel" }
      ]
    },
    {
      id: "05",
      time: "02:15 PM",
      timePeriod: "AFTERNOON",
      num: "05",
      name: "WORKSHOP",
      category: "LEARN · EXPLORE · APPLY",
      tagline: "From theory to possibilities.",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/event-4-workshop.webp",
      fallbackImage: "/assets/event-4-workshop.jpg",
      venue: "Seminar Complex & Lab 2",
      teamSize: "Individual Registration",
      prizePool: "Certificates & Internship Credits",
      coordinators: "Prof. S. Namboodiri & Devika V.",
      fullDescription: "A masterclass on 'Fractal Geometry, Chaos Theory & Neural Network Architectures'. Hands-on numerical simulation and visual mathematical computation.",
      rounds: [
        { round: "Session 1: Foundations", desc: "Chaos theory and Mandelbrot set applications" },
        { round: "Session 2: Hands-On Lab", desc: "Simulating mathematical models in Python and Julia" }
      ]
    },
    {
      id: "06",
      time: "03:30 PM",
      timePeriod: "AFTERNOON",
      num: "06",
      name: "PAPER PRESENTATION",
      category: "RESEARCH · DISCOVERY · EXPO",
      tagline: "Unveiling visionary mathematical ideas.",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/event-2-math-quiz.webp",
      fallbackImage: "/assets/event-2-math-quiz.jpg",
      venue: "Aryabhata Conference Hall",
      teamSize: "Teams of 1 - 3",
      prizePool: "₹ 15,000",
      coordinators: "Kavya M. (+91 94951 88204) & Dr. R. George",
      fullDescription: "Collegiate presentation symposium showcasing novel research, applications of graph theory, cryptography algorithms, financial mathematics, and topological modeling.",
      rounds: [
        { round: "Abstract Screening", desc: "Peer review of submitted research papers" },
        { round: "Live Defense", desc: "10-minute presentation followed by 5-minute panel Q&A" }
      ]
    },
    {
      id: "07",
      time: "04:45 PM",
      timePeriod: "EVENING",
      num: "07",
      name: "TREASURE HUNT",
      category: "FIND · SOLVE · UNLOCK",
      tagline: "Mathematics hides everywhere.",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/event-5-treasure-hunt.webp",
      fallbackImage: "/assets/event-5-treasure-hunt.jpg",
      venue: "Campus-Wide Expedition",
      teamSize: "Teams of 3 - 4",
      prizePool: "₹ 12,000",
      coordinators: "Arjun M. (+91 98950 11223) & Sneha R.",
      fullDescription: "Campus-wide adventure where clues are encoded in mathematical ciphers, polar coordinates, topological landmarks, and Fourier audio frequencies.",
      rounds: [
        { round: "Clue 1: The Golden Ratio Trail", desc: "Decipher ancient geometric clues hidden across college archives" },
        { round: "Clue 2: Cipher Lockers", desc: "Solve modular arithmetic keys to open physical challenge boxes" },
        { round: "Final Checkpoint", desc: "Triangulate the final artifact location using GPS vectors" }
      ]
    },
    {
      id: "08",
      time: "06:00 PM",
      timePeriod: "EVENING",
      num: "08",
      name: "VALEDICTORY",
      category: "CELEBRATE · HONOUR · INSPIRE",
      tagline: "Until next time.",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/event-6-valedictory.webp",
      fallbackImage: "/assets/event-6-valedictory.jpg",
      venue: "Main Auditorium",
      teamSize: "Open to All",
      prizePool: "Grand Trophy & Awards",
      coordinators: "Fest General Convener",
      fullDescription: "The grand finale ceremony honoring championship teams, distribution of the ₹ 75,000+ total prize pool, live musical symphony, and the formal closing of ASTHRA ’26.",
      rounds: [
        { round: "Prize Distribution", desc: "Felicitation of winners across all 8 competitive tracks" },
        { round: "Closing Address", desc: "Vote of thanks and celebration symphony" }
      ]
    }
  ],

  // Contact & Inquiries
  contact: {
    headingWhite: "LET'S BUILD A",
    headingGold: "BRIGHTER",
    headingWhiteEnd: "TOMORROW",
    subline: "REACH OUT. BE A PART OF ASTHRA ’26.",
    email: "asthra@stthomas.ac.in",
    phone: "+91 98765 43210",
    phoneDisplay: "+91 98765 43210",
    address: "Department of Mathematics, St. Thomas College (Autonomous), Thrissur, Kerala — 680001",
    socials: [
      { name: "Instagram", url: "https://instagram.com/asthra.stc", handle: "@asthra.stc" },
      { name: "WhatsApp", url: "https://chat.whatsapp.com/asthra26", handle: "ASTHRA Community" },
      { name: "LinkedIn", url: "https://linkedin.com/company/asthra-stc", handle: "ASTHRA STC" },
      { name: "YouTube", url: "https://youtube.com/@asthra-stc", handle: "ASTHRA Media" }
    ]
  }
};
