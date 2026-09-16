export interface TechnicalDetail {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  tmNumber: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  technicalDetails: TechnicalDetail[];
  githubUrl?: string;
  demoUrl?: string;
  awardBadge?: string;
}

export interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface LeadershipRole {
  organization: string;
  role: string;
  slug: string;
  period: string;
  website: string;
  logoUrl: string;
  actionText: string;
  description: string;
  bullets: string[];
  tags: string[];
}

export interface HonorItem {
  category: string;
  title: string;
  role: string;
  period: string;
  description: string;
}

export const profile = {
  name: "Aadrit",
  role: "AI/ML & Systems Developer",
  university: "SRM University AP",
  degree: "B.Tech in Computer Science & Engineering",
  period: "2025–2029",
  location: "Lucknow, India",
  homeLocation: "Based in Lucknow, India",
  dexNumber: "0384",
  region: "Hoenn",
  pokedexEntry:
    "Computer Science undergraduate at SRM University AP building lightweight machine learning systems in Python and systems software in C.",
  bio: [
    "I am a Computer Science student at SRM University AP, a member at Next Tech Lab (ntlap), and co-lead at FOSS SRMAP.",
    "I work with C for microcontrollers and embedded systems, and Python for lightweight machine learning models designed to run on standard hardware.",
    "Recipient of the national MANAK Inspire Award by DST and winner at FOSS United JUST A HACKATHON.",
  ],
  contact: {
    email: "aadrit.yks@gmail.com",
    github: "https://github.com/Aadrit555",
    githubHandle: "github.com/Aadrit555",
    linkedin: "https://www.linkedin.com/in/skaoldi-ntlap",
    linkedinHandle: "in/skaoldi-ntlap",
  },
};

export const focusAreas: FocusArea[] = [
  {
    id: "systems",
    title: "Systems",
    subtitle: "C · Embedded · Low-level",
    description: "Low-level C systems code for image processing, cryptographic verification, and embedded work.",
  },
  {
    id: "ml",
    title: "Machine Learning",
    subtitle: "Python · NLP · Attention Policies",
    description: "Character-level policy and intent models in PyTorch that run locally on standard CPU hardware.",
  },
  {
    id: "security",
    title: "Security & Integrity",
    subtitle: "ECDSA · Perceptual Hash · Provenance",
    description: "Cryptographic verification, perceptual hashing, and tamper detection algorithms.",
  },
  {
    id: "oss",
    title: "Open Source",
    subtitle: "FOSS SRMAP · Next Tech Lab",
    description: "Campus workshops, developer sprints, and open-source contribution.",
  },
];

export const projects: Project[] = [
  {
    id: "slm",
    tmNumber: "TM-01",
    category: "Machine Learning & PyTorch",
    title: "DidSomethinSLM (Intent Decision Model)",
    description:
      "A reinforcement learning–based Small Language Model for intent decision-making. Text is encoded at the character level with UNK handling, processed via embeddings and lightweight self-attention, and optimized using policy-gradient (REINFORCE) to select actions from reward feedback.",
    bullets: [
      "Built a character-level tokenizer and attention-based policy network in PyTorch.",
      "Trained the model using REINFORCE with reward-based intent selection.",
      "Engineered from scratch to run locally on CPU hardware without pretrained LLM weights.",
    ],
    tags: ["Python", "PyTorch", "REINFORCE", "Self-Attention", "MIT License"],
    technicalDetails: [
      { value: "CPU Local", label: "Inference Engine" },
      { value: "REINFORCE", label: "Policy Gradient" },
      { value: "PyTorch", label: "From-Scratch Arch" },
    ],
    githubUrl: "https://github.com/Aadrit555/DidSomethinSLM",
  },
  {
    id: "hemlock",
    tmNumber: "TM-02",
    category: "C Systems & Cryptography",
    title: "Hemlock (Media Provenance & Tamper Detection)",
    awardBadge: "FOSS United JUST A HACKATHON Winner · 2024",
    description:
      "A C-based image and video verification system combining perceptual hashing (pHash), ECDSA digital signatures, and subtle adversarial pixel perturbation to detect unauthorized modification and preserve media provenance.",
    bullets: [
      "Wrote core C modules for perceptual hashing and ECDSA cryptographic signature verification.",
      "Applied subtle adversarial pixel perturbations to defend visual assets against automated alteration.",
      "Won 1st Place at FOSS United JUST A HACKATHON 2024 for digital media integrity.",
    ],
    tags: ["C Language", "ECDSA", "Perceptual Hash", "FOSS United", "Media Integrity"],
    technicalDetails: [
      { value: "1st Place", label: "FOSS United Winner" },
      { value: "C99 / C11", label: "Core Algorithms" },
      { value: "ECDSA + pHash", label: "Tamper Detection" },
    ],
    githubUrl: "https://github.com/Aadrit555/Hemlock",
  },
  {
    id: "primordial-void",
    tmNumber: "TM-03",
    category: "Reinforcement Learning & Security",
    title: "primordial-void (Autonomous Exploit Discovery)",
    description:
      "An RL framework that autonomously discovers exploits by modeling the gap between a designer's intent and a system's actual rules. Uses KL divergence as an intent gap reward signal to uncover what every system accidentally allows but never meant to.",
    bullets: [
      "Formulated exploit discovery as an intent-gap optimization problem using KL divergence reward signals.",
      "Built reinforcement learning exploration loops to uncover non-intuitive boundary edge cases.",
      "Released as an open-source research framework under the MIT License.",
    ],
    tags: ["Python", "Reinforcement Learning", "KL Divergence", "Exploit Discovery", "MIT License"],
    technicalDetails: [
      { value: "KL Divergence", label: "Intent Gap Reward" },
      { value: "Autonomous", label: "Exploit Discovery" },
      { value: "Python", label: "RL Framework" },
    ],
    githubUrl: "https://github.com/Aadrit555/primordial-void",
  },
  {
    id: "superrag",
    tmNumber: "TM-04",
    category: "Search Systems & FastAPI",
    title: "SuperRAG (Modular Multi-Phase RAG Pipeline)",
    description:
      "A modular multi-phase RAG system combining semantic vector retrieval, knowledge graph entity linking, cross-encoder reranking, and structured response synthesis.",
    bullets: [
      "Built with FastAPI and Python to process multi-format inputs across PDFs, text, and structured data.",
      "Integrated semantic vector search with knowledge-graph entity linking and cross-encoder reranking.",
      "Designed modular pipeline stages for document parsing, visual retrieval, and structured response generation.",
    ],
    tags: ["FastAPI", "Vector Search", "Knowledge Graph", "Reranking", "Python"],
    technicalDetails: [
      { value: "Multi-Phase", label: "Vector + Graph + Rerank" },
      { value: "Multi-Doc", label: "PDF, Text & Data" },
      { value: "FastAPI", label: "Async API Service" },
    ],
    githubUrl: "https://github.com/Aadrit555/SuperRAG",
  },
  {
    id: "aadrit-tech",
    tmNumber: "TM-05",
    category: "WebGL Physics & Next.js",
    title: "aadrit-tech (Systems Portfolio & 3D Arcade)",
    description:
      "Interactive personal portfolio and Devon Corp 3D field simulation chamber featuring real-time Three.js WebGL ballistic physics, procedural audio synthesis, and client-side terminal shell.",
    bullets: [
      "Engineered real-time 3D ballistic trajectory physics and bounce restitution with Three.js.",
      "Implemented procedural chiptune audio via the Web Audio API.",
      "Designed with Next.js 14 App Router, TypeScript, and Tailwind CSS.",
    ],
    tags: ["TypeScript", "Next.js 14", "Three.js", "Tailwind CSS", "Web Audio API"],
    technicalDetails: [
      { value: "60 FPS", label: "WebGL Physics" },
      { value: "Next.js 14", label: "App Router + Turbopack" },
      { value: "Zero SSR Crash", label: "Dynamic Portals" },
    ],
    githubUrl: "https://github.com/Aadrit555/aadrit-tech",
  },
];

export const leadershipRoles: LeadershipRole[] = [
  {
    organization: "Next Tech Lab AP",
    role: "Member at NTL AP",
    slug: "ntlap",
    period: "Nov 2024 - Present",
    website: "https://www.ntlap.in",
    logoUrl: "/images/ntl.png",
    actionText: "Visit website",
    description:
      "Student-led technology lab at SRM University AP working on practical machine learning and systems engineering.",
    bullets: [
      "Trained and evaluated machine learning models in Python for lab projects.",
      "Wrote data preparation scripts to clean and format datasets.",
      "Collaborated with lab peers on code reviews and experiments.",
    ],
    tags: ["MEMBER", "NTL AP", "MACHINE LEARNING", "PYTHON"],
  },
  {
    organization: "FOSS SRMAP",
    role: "Co-Lead at FOSS SRMAP",
    slug: "foss",
    period: "2024 - Present",
    website: "https://fossunited.org",
    logoUrl: "/images/foss.png",
    actionText: "Visit website",
    description:
      "Student open-source chapter at SRM University AP affiliated with the FOSS United Foundation.",
    bullets: [
      "Co-leading campus workshops, open-source meetups, and developer sprints.",
      "Mentoring peers on Git, GitHub, and contributing to open-source software.",
      "Organizing local hackathons and student tech events.",
    ],
    tags: ["CO-LEAD", "FOSS SRMAP", "OPEN SOURCE", "COMMUNITY"],
  },
];

export const academicAndHonors: HonorItem[] = [
  {
    category: "Education",
    title: "SRM University AP",
    role: "B.Tech in Computer Science & Engineering",
    period: "2025 - 2029",
    description:
      "Studying core computer science: operating systems, data structures, algorithms, and networks.",
  },
  {
    category: "National Honor",
    title: "MANAK Inspire Award",
    role: "National Recognition",
    period: "DST, Govt. of India",
    description:
      "Awarded by the Department of Science and Technology for innovative applied engineering.",
  },
  {
    category: "Hackathon",
    title: "JUST A HACKATHON Winner",
    role: "FOSS United",
    period: "2024",
    description:
      "Winning project at FOSS United JUST A HACKATHON 2024 for media integrity and tamper detection.",
  },
];

export const securityControls: string[] = [
  "Server-side input validation (Zod schema enforcement)",
  "Signed admin session tokens (HMAC-SHA256)",
  "Security response headers (CSP, HSTS, X-Frame-Options, nosniff)",
  "Application-level rate limiting on contact and authentication endpoints",
];

