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
    { id: "exhibition", label: "EXHIBITION", num: "05" },
    { id: "contact", label: "CONTACT", num: "06" }
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

  // Festival Registration URL
  registrationLink: "#",

  // Events Timeline Data (Exactly 6 Fest Events · ₹ 31.5K Total Prize Pool)
  events: [
    {
      id: "01",
      time: "09:30 AM",
      timePeriod: "MORNING",
      num: "1",
      name: "TREASURE HUNT",
      nameDisplay: "Find X (Treasure Hunt)",
      prizeDisplay: "10K",
      venueDisplay: "Medlicot Hall",
      timeDisplay: "9:30 AM",
      category: "TREASURE HUNT · CAMPUS QUEST",
      tagline: "Mathematics hides everywhere. Follow the clues.",
      registrationLink: "#",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/Find X.webp",
      venue: "Medlicot Hall",
      teamSize: "Teams of 3 - 4",
      prizePool: "₹ 10,000",
      coordinators: "Campus Expedition Team",
      fullDescription: "An exhilarating campus-wide treasure hunt. Decipher mathematical riddles, topological map clues, and coordinate puzzles across landmarks to Find X.",
      rounds: [
        { round: "Phase 1: The First Clue", desc: "Solve the opening riddle to unlock your campus route" },
        { round: "Phase 2: Checkpoint Quests", desc: "Navigate hidden locations and solve mini-challenges" },
        { round: "The Final Vault", desc: "Race against time to unlock the grand prize coordinates" }
      ]
    },
    {
      id: "02",
      time: "09:30 AM",
      timePeriod: "MORNING",
      num: "2",
      name: "MATHEMATICS QUIZ",
      nameDisplay: "Mathematics quiz competition",
      prizeDisplay: "5K",
      venueDisplay: "Menachery Hall",
      timeDisplay: "9:30 AM",
      category: "QUIZ COMPETITION · THINK & SOLVE",
      tagline: "Questions beyond the obvious.",
      registrationLink: "#",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/Quiz.webp",
      venue: "Menachery Hall",
      teamSize: "Teams of 2",
      prizePool: "₹ 5,000",
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
      time: "10:00 AM",
      timePeriod: "MORNING",
      num: "3",
      name: "SPEAKATHON",
      nameDisplay: "Speakathon competition",
      prizeDisplay: "4.5K",
      venueDisplay: "Nalandha hall",
      timeDisplay: "10:00 AM",
      category: "SPEAKING COMPETITION · ORATORY",
      tagline: "Articulate the power of ideas.",
      registrationLink: "#",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/Speakathon.webp",
      venue: "Nalandha hall",
      teamSize: "Individual",
      prizePool: "₹ 4,500",
      coordinators: "Literary & Oratory Committee",
      fullDescription: "A prestigious speaking competition for articulate thinkers. Present persuasive perspectives on mathematics, scientific revolutions, and creative logic.",
      rounds: [
        { round: "Round 1: Prepared Speech", desc: "5-minute address on curated mathematical or scientific themes" },
        { round: "Round 2: Extempore Spotlight", desc: "On-the-spot speaking challenge with 2 minutes preparation" }
      ]
    },
    {
      id: "04",
      time: "11:00 AM",
      timePeriod: "MORNING",
      num: "4",
      name: "PYTHON SPRINT",
      nameDisplay: "Python (Sprint Coding)",
      prizeDisplay: "4.5K",
      venueDisplay: "Data science lab",
      timeDisplay: "11:00 AM",
      category: "SPRINT CODING COMPETITION · SPEED",
      tagline: "Speed, syntax, and algorithmic mastery.",
      registrationLink: "#",
      isHighlighted: false,
      accentColor: "gold",
      image: "/assets/Python.webp",
      venue: "Data science lab",
      teamSize: "Individual Knockout",
      prizePool: "₹ 4,500",
      coordinators: "Computing & Tech Team",
      fullDescription: "A fast-paced sprint coding competition. Implement efficient algorithmic solutions in Python to solve mathematical equations, optimization tasks, and data structures under ticking clocks.",
      rounds: [
        { round: "Round 1: Rapid Code Sprint", desc: "Solve 4 mathematical algorithmic problems in 40 minutes" },
        { round: "Round 2: Code Duel", desc: "Head-to-head live sudden-death algorithmic optimization" }
      ]
    },
    {
      id: "05",
      time: "11:00 AM",
      timePeriod: "MORNING",
      num: "5",
      name: "CRYPTORA",
      nameDisplay: "Cryptora",
      prizeDisplay: "4.5K",
      venueDisplay: "AC 121",
      timeDisplay: "11:00 AM",
      category: "CRYPTOGRAPHY · CIPHER & LOGIC",
      tagline: "Break the cipher. Unravel the mystery.",
      registrationLink: "#",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/Cryptora.jpg",
      venue: "AC 121",
      teamSize: "Solo or Duo",
      prizePool: "₹ 4,500",
      coordinators: "Cryptanalysis & Logic Team",
      fullDescription: "A high-stakes cryptanalysis and cipher challenge. Crack cryptographic ciphers, numerical sequences, and lateral thinking enigmas in a race against the clock.",
      rounds: [
        { round: "Round 1: Cipher Screening", desc: "Decode substitution ciphers and logical sequences" },
        { round: "Round 2: Cryptographic Showdown", desc: "Advanced algorithmic enigma decoding" }
      ]
    },
    {
      id: "06",
      time: "12:00 PM",
      timePeriod: "AFTERNOON",
      num: "6",
      name: "MINI MILITIA",
      nameDisplay: "Mini Militia tournament",
      prizeDisplay: "3K",
      venueDisplay: "AC 220",
      timeDisplay: "12:00 PM",
      category: "TOURNAMENT · MULTIPLAYER COMBAT",
      tagline: "Lock, load, and conquer the battlefield.",
      registrationLink: "#",
      isHighlighted: true,
      accentColor: "red",
      image: "/assets/Mini Militia.webp",
      venue: "AC 220",
      teamSize: "Squads & Solo",
      prizePool: "₹ 3,000",
      coordinators: "Gaming Coordinators",
      fullDescription: "High-octane mobile multiplayer combat tournament. Gear up for intense squad battlefields, strategic weapon coordination, and rapid-fire elimination brackets.",
      rounds: [
        { round: "Round 1: Preliminary Knockouts", desc: "Classic squad battleground elimination matches" },
        { round: "Round 2: Semifinal Deathmatch", desc: "Top squads battle in custom close-quarters combat" },
        { round: "Grand Finale", desc: "Championship deathmatch showdown for the ultimate trophy" }
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
      { name: "Instagram", url: "https://www.instagram.com/asthrafest?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw==", handle: "@asthrafest" },
      { name: "WhatsApp", url: "https://chat.whatsapp.com/asthra26", handle: "ASTHRA Community" },
      { name: "LinkedIn", url: "https://linkedin.com/company/asthra-stc", handle: "ASTHRA STC" },
      { name: "YouTube", url: "https://youtube.com/@asthra-stc", handle: "ASTHRA Media" }
    ]
  }
};
