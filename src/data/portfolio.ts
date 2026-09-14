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
    subtitle: "C · Embedded · Memory",
    description: "Low-level C code for perceptual hashing, cryptographic verification, and memory safety.",
  },
  {
    id: "ml",
    title: "Machine Learning",
    subtitle: "Python · NLP · Attention Policies",
    description: "Character-level policy and intent models in PyTorch that run locally on standard CPU hardware.",
  },
  {
    id: "security",
    title: "Security",
    subtitle: "Perceptual Hash · Signatures · Integrity",
    description: "Cryptographic checks, perceptual hashing, and tamper detection algorithms.",
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
    title: "SLM (Character-Level Intent Model)",
    description:
      "A lightweight character-level intent model built from scratch in Python, using self-attention and REINFORCE to map text inputs to discrete actions.",
    bullets: [
      "Built a character-level tokenizer and attention-based policy network in PyTorch.",
      "Trained the model using REINFORCE with reward-based intent selection.",
      "Designed the project to run locally on CPU without pretrained language-model weights.",
    ],
    tags: ["PYTHON", "PYTORCH", "REINFORCE", "ATTENTION", "CPU INFERENCE"],
    technicalDetails: [
      { value: "CPU", label: "Local Inference" },
      { value: "REINFORCE", label: "Policy Gradient" },
      { value: "PyTorch", label: "From-Scratch Arch" },
    ],
    githubUrl: "https://github.com/Aadrit555/DIDsomethin_SLM",
  },
  {
    id: "hemlock",
    tmNumber: "TM-02",
    category: "C Systems & Cryptography",
    title: "Hemlock (Adversarial Image Defense & Provenance)",
    awardBadge: "FOSS United JUST A HACKATHON Winner · 2024",
    description:
      "A C-based image protection and verification system combining perceptual hashing, RSA signatures, and adversarial pixel perturbation to detect modification and establish file provenance.",
    bullets: [
      "Wrote core C modules for perceptual hashing and RSA signature verification.",
      "Applied subtle adversarial pixel perturbations to defend visual assets against automated alteration.",
      "Recognized as a winning project at FOSS United JUST A HACKATHON 2024.",
    ],
    tags: ["C LANGUAGE", "CRYPTOGRAPHY", "IMAGE PROVENANCE", "PERCEPTUAL HASH", "FOSS UNITED"],
    technicalDetails: [
      { value: "Winner", label: "FOSS United Hackathon" },
      { value: "C Lang", label: "Core Algorithms" },
      { value: "RSA + pHash", label: "Tamper Detection" },
    ],
    githubUrl: "https://github.com/Aadrit555/Hemlock",
  },
  {
    id: "chimera",
    tmNumber: "TM-03",
    category: "AI Simulation & Python",
    title: "Chimera (Multi-Agent Simulation)",
    description:
      "A Python simulation where attacker and defender AI agents compete against each other in rounds, learning and improving their tactics over time.",
    bullets: [
      "Built a turn-based simulation environment in Python to test competing agent behaviors.",
      "Implemented learning loops so defender agents adapt and raise their win rate over time.",
      "Built repeatable experiment scripts for automated runs and result logging.",
    ],
    tags: ["PYTHON", "MULTI-AGENT", "SIMULATION", "EXPERIMENTS"],
    technicalDetails: [
      { value: "Adaptive", label: "Attacker vs Defender" },
      { value: "Python", label: "Simulation Engine" },
      { value: "Iterative", label: "Round-by-Round Learning" },
    ],
  },
  {
    id: "superrag",
    tmNumber: "TM-04",
    category: "Search Systems & FastAPI",
    title: "SuperRAG (Modular Multi-Phase RAG Pipeline)",
    description:
      "A modular multi-phase RAG system combining semantic retrieval, knowledge graphs, multimodal inputs, reranking, and structured answer synthesis.",
    bullets: [
      "Built with FastAPI and Python to process multi-format inputs across PDFs, text, and structured data.",
      "Integrated semantic vector search with knowledge-graph entity linking and cross-encoder reranking.",
      "Designed modular pipeline stages for document parsing, visual retrieval, and structured response generation.",
    ],
    tags: ["FASTAPI", "VECTOR SEARCH", "KNOWLEDGE GRAPH", "RAG PIPELINE"],
    technicalDetails: [
      { value: "Multi-Phase", label: "Vector + Graph + Rerank" },
      { value: "Multi-Doc", label: "PDF, Text & Markdown" },
      { value: "FastAPI", label: "Async API Service" },
    ],
    githubUrl: "https://github.com/Aadrit555/SuperRAG",
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
    actionText: "Visit Next Tech Lab",
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
    actionText: "Visit FOSS United",
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
      "Winning project at FOSS United JUST A HACKATHON 2024 for C systems implementation.",
  },
];

export const securityControls: string[] = [
  "Server-side input validation (Zod schema enforcement)",
  "Signed admin session tokens (HMAC-SHA256)",
  "Security response headers (CSP, HSTS, X-Frame-Options, nosniff)",
  "Application-level rate limiting on contact and authentication endpoints",
];

