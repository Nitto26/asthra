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

  // Festival Registration URL (Update "##" with your live Google Form or registration portal URL when ready)
  registrationLink: "##",

  // Events Timeline Data (Exactly 7 Fest Events)
  events: [
    {
      id: "01",
      time: "10:00 AM",
      timePeriod: "MORNING",
      num: "01",
      name: "MINI MILITIA",
      category: "TOURNAMENT · MULTIPLAYER COMBAT",
      tagline: "Lock, load, and conquer the battlefield.",
      registrationLink: "##",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/Mini Militia.png",
      imageWebp: "/assets/Mini Militia.webp",
      venue: "Auditorium Hub / E-Sports Arena",
      teamSize: "Squads & Solo",
      prizePool: "Cash Prizes & Trophies",
      coordinators: "Gaming Coordinators",
      fullDescription: "High-octane mobile multiplayer combat tournament. Gear up for intense squad battlefields, strategic weapon coordination, and rapid-fire elimination brackets.",
      rounds: [
        { round: "Round 1: Preliminary Knockouts", desc: "Classic squad battleground elimination matches" },
        { round: "Round 2: Semifinal Deathmatch", desc: "Top squads battle in custom close-quarters combat" },
        { round: "Grand Finale", desc: "Championship deathmatch showdown for the ultimate trophy" }
      ]
    },
    {
      id: "02",
      time: "11:00 AM",
      timePeriod: "MORNING",
      num: "02",
      name: "MATHEMATICS QUIZ",
      category: "QUIZ COMPETITION · THINK & SOLVE",
      tagline: "Questions beyond the obvious.",
      registrationLink: "##",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/Quiz.png",
      imageWebp: "/assets/Quiz.webp",
      venue: "Hall 304, Euler Wing",
      teamSize: "Teams of 2",
      prizePool: "Cash Prizes & Certificates",
      coordinators: "Department of Mathematics",
      fullDescription: "The premier mathematics quiz competition testing intuition, rapid calculation, historical theorems, and lateral analytical acumen over exciting rounds.",
      rounds: [
        { round: "Round 1: Preliminary Cipher", desc: "Written screening with 25 rapid analytical problems" },
        { round: "Round 2: Rapid Calculations", desc: "Speed calculations and pattern recognition without aids" },
        { round: "Grand Finale", desc: "Buzzer round with escalating point values and risk mechanics" }
      ]
    },
    {
      id: "03",
      time: "12:30 PM",
      timePeriod: "AFTERNOON",
      num: "03",
      name: "FIND X",
      category: "TREASURE HUNT · CAMPUS QUEST",
      tagline: "Mathematics hides everywhere. Follow the clues.",
      registrationLink: "##",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/Find X.png",
      imageWebp: "/assets/Find X.webp",
      venue: "Campus-Wide Expedition",
      teamSize: "Teams of 3 - 4",
      prizePool: "Cash Prizes & Goodies",
      coordinators: "Campus Expedition Team",
      fullDescription: "An exhilarating campus-wide treasure hunt. Decipher mathematical riddles, topological map clues, and coordinate puzzles across landmarks to Find X.",
      rounds: [
        { round: "Phase 1: The First Clue", desc: "Solve the opening riddle to unlock your campus route" },
        { round: "Phase 2: Checkpoint Quests", desc: "Navigate hidden locations and solve mini-challenges" },
        { round: "The Final Vault", desc: "Race against time to unlock the grand prize coordinates" }
      ]
    },
    {
      id: "04",
      time: "01:30 PM",
      timePeriod: "AFTERNOON",
      num: "04",
      name: "LOG-IC",
      category: "APTITUDE COMPETITION · REASONING",
      tagline: "Pure reasoning under pressure.",
      registrationLink: "##",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/Log-ic.png",
      imageWebp: "/assets/Log-ic.webp",
      venue: "Seminar Complex, Ramanujan Block",
      teamSize: "Individual",
      prizePool: "Cash Prizes & Certificates",
      coordinators: "Aptitude Coordinators",
      fullDescription: "A curated aptitude competition testing logical deduction, quantitative aptitude, data interpretation, and cognitive problem-solving under strict time limits.",
      rounds: [
        { round: "Round 1: Quantitative Sprint", desc: "Time-bound numerical and analytical reasoning test" },
        { round: "Round 2: Deductive Logic Challenge", desc: "Advanced case-based logic deductions and puzzles" }
      ]
    },
    {
      id: "05",
      time: "02:30 PM",
      timePeriod: "AFTERNOON",
      num: "05",
      name: "SPEAKATHON",
      category: "SPEAKING COMPETITION · ORATORY",
      tagline: "Articulate the power of ideas.",
      registrationLink: "##",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/Speakathon.png",
      imageWebp: "/assets/Speakathon.webp",
      venue: "Aryabhata Conference Hall",
      teamSize: "Individual",
      prizePool: "Cash Prizes & Mementos",
      coordinators: "Literary & Oratory Committee",
      fullDescription: "A prestigious speaking competition for articulate thinkers. Present persuasive perspectives on mathematics, scientific revolutions, and creative logic.",
      rounds: [
        { round: "Round 1: Prepared Speech", desc: "5-minute address on curated mathematical or scientific themes" },
        { round: "Round 2: Extempore Spotlight", desc: "On-the-spot speaking challenge with 2 minutes preparation" }
      ]
    },
    {
      id: "06",
      time: "03:30 PM",
      timePeriod: "AFTERNOON",
      num: "06",
      name: "DECRYPTO",
      category: "PUZZLE COMPETITION · CIPHERS",
      tagline: "Break the cipher. Unravel the mystery.",
      registrationLink: "##",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/Decrypto.png",
      imageWebp: "/assets/Decrypto.webp",
      venue: "Gauss Amphitheatre",
      teamSize: "Solo or Duo",
      prizePool: "Cash Prizes & Certificates",
      coordinators: "Cryptanalysis Club",
      fullDescription: "A high-stakes puzzle competition. Crack cryptographic ciphers, non-Euclidean mazes, logic matrices, and lateral thinking enigmas in a race against the clock.",
      rounds: [
        { round: "Stage 1: Enigma Codes", desc: "Decipher classical and substitution cryptographic ciphers" },
        { round: "Stage 2: Paradox Arena", desc: "Solve time-constrained algorithmic riddles and brainteasers" }
      ]
    },
    {
      id: "07",
      time: "04:30 PM",
      timePeriod: "AFTERNOON",
      num: "07",
      name: "PYTHON SPRINT",
      category: "SPRINT CODING COMPETITION · SPEED",
      tagline: "Speed, syntax, and algorithmic mastery.",
      registrationLink: "##",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/Python.png",
      imageWebp: "/assets/Python.webp",
      venue: "Computer Science & Math Labs",
      teamSize: "Individual Knockout",
      prizePool: "Cash Prizes & Badges",
      coordinators: "Computing & Tech Team",
      fullDescription: "A fast-paced sprint coding competition. Implement efficient algorithmic solutions in Python to solve mathematical equations, optimization tasks, and data structures under ticking clocks.",
      rounds: [
        { round: "Round 1: Rapid Code Sprint", desc: "Solve 4 mathematical algorithmic problems in 40 minutes" },
        { round: "Round 2: Code Duel", desc: "Head-to-head live sudden-death algorithmic optimization" }
      ]
    }
  ],

  // Contact & Inquiries
  contact: {
    headingWhite: "LET'S BUILD A",
    headingGold: "BRIGHTER",
    headingWhiteEnd: "TOMORROW",
    subline: "REACH OUT. BE A PART OF ASTHRA ’26.",
    email: "asthrastc.26@gmail.com",
    phone: "+91 73563 36812",
    phoneDisplay: "+91 73563 36812",
    address: "Department of Mathematics, St. Thomas College (Autonomous), Thrissur, Kerala — 680001",
    socials: [
      { name: "Instagram", url: "https://instagram.com/asthra.stc", handle: "@asthra.stc" },
      { name: "WhatsApp", url: "https://chat.whatsapp.com/asthra26", handle: "ASTHRA Community" },
      { name: "LinkedIn", url: "https://linkedin.com/company/asthra-stc", handle: "ASTHRA STC" },
      { name: "YouTube", url: "https://youtube.com/@asthra-stc", handle: "ASTHRA Media" }
    ]
  }
};
