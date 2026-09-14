export const siteConfig = {
  festName: "ASTHRA ’26",
  subTitle: "MATHEMATICS FEST",
  college: "College of Engineering Trivandrum",
  department: "Department of Mathematics",
  dates: "OCTOBER 24 – 26, 2026",
  venue: "Main Auditorium & Ramanujan Complex, CET",
  
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
    badge: "SOCIAL DRIVE",
    headlineWhite: "NUMBERS CAN CHANGE",
    headlineGold: "LIVES.",
    subline: "A SMALL CONTRIBUTION. A BIGGER TOMORROW.",
    totalRaised: 132450, // Displayed as ₹ 1,32,450 with live count-up
    currency: "₹",
    impactTagline: "TURNING POSSIBILITIES INTO OPPORTUNITIES",
    impactTiers: [
      {
        id: "edu",
        title: "EDUCATION",
        subtitle: "SUPPORTS LEARNING RESOURCES",
        amount: "₹ 500",
        amountValue: 500,
        desc: "Provides essential textbooks, geometry toolkits, and academic study kits to underprivileged students in rural high schools."
      },
      {
        id: "opp",
        title: "OPPORTUNITY",
        subtitle: "HELPS BRIGHT MINDS GROW",
        amount: "₹ 1,000",
        amountValue: 1000,
        desc: "Funds scholarship registration fees, travel grants, and digital access for talented young mathematicians to compete at regional summits."
      },
      {
        id: "com",
        title: "COMMUNITY",
        subtitle: "BUILDS A STRONGER TOMORROW",
        amount: "₹ 5,000",
        amountValue: 5000,
        desc: "Sponsors a complete interactive STEM mathematics laboratory setup and mentorship sessions at a government rural school."
      }
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
      name: "WORKSHOP",
      category: "LEARN · EXPLORE · APPLY",
      tagline: "From theory to possibilities.",
      isHighlighted: true,
      accentColor: "red",
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
      id: "05",
      time: "02:30 PM",
      timePeriod: "AFTERNOON",
      num: "05",
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
      id: "06",
      time: "04:00 PM",
      timePeriod: "EVENING",
      num: "06",
      name: "VALEDICTORY",
      category: "CELEBRATE · HONOUR · INSPIRE",
      tagline: "Until next time.",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/event-6-valedictory.webp",
      fallbackImage: "/assets/event-6-valedictory.jpg",
      venue: "Main Amphitheatre",
      teamSize: "All Attendees",
      prizePool: "Trophies & Honors",
      coordinators: "General Secretary, Mathematics Association",
      fullDescription: "The grand culmination of ASTHRA ’26 celebrating victors, felicitating champions, presenting cash awards, and the passing of the ceremonial golden asthra bow.",
      rounds: [
        { round: "Awards Presentation", desc: "Distribution of ₹50,000+ prize pool & trophies" },
        { round: "Cultural Finale", desc: "Mathematics-inspired laser symphony and closing address" }
      ]
    }
  ],

  // Contact & Inquiries
  contact: {
    headingWhite: "LET'S BUILD A",
    headingGold: "BRIGHTER",
    headingWhiteEnd: "TOMORROW",
    subline: "REACH OUT. BE A PART OF ASTHRA ’26.",
    email: "asthra@cet.ac.in",
    phone: "+91 98765 43210",
    phoneDisplay: "+91 98765 43210",
    address: "Department of Mathematics, College of Engineering Trivandrum, Thiruvananthapuram, Kerala — 695016",
    socials: [
      { name: "Instagram", url: "https://instagram.com/asthra.cet", handle: "@asthra.cet" },
      { name: "WhatsApp", url: "https://chat.whatsapp.com/asthra26", handle: "ASTHRA Community" },
      { name: "LinkedIn", url: "https://linkedin.com/company/asthra-fest", handle: "ASTHRA CET" },
      { name: "YouTube", url: "https://youtube.com/@asthra-cet", handle: "ASTHRA Media" }
    ]
  }
};
