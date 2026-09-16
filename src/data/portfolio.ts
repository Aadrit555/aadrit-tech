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
    tmNumber: "01",
    category: "Machine Learning",
    title: "DidSomethinSLM",
    description:
      "A small language model built from scratch in PyTorch. It uses reinforcement learning (REINFORCE) and self-attention to learn intent decision-making, running locally on CPU without pretrained weights.",
    bullets: [
      "Built custom character-level tokenization and self-attention in PyTorch.",
      "Trained with policy gradients based on reward feedback.",
      "Runs completely locally on standard CPU hardware without external weights.",
    ],
    tags: ["Python", "PyTorch", "Reinforcement Learning", "NLP"],
    technicalDetails: [
      { value: "CPU Local", label: "Inference Engine" },
      { value: "REINFORCE", label: "Policy Gradient" },
      { value: "PyTorch", label: "Custom Architecture" },
    ],
    githubUrl: "https://github.com/Aadrit555/DidSomethinSLM",
  },
  {
    id: "hemlock",
    tmNumber: "02",
    category: "C & Image Security",
    title: "Hemlock",
    awardBadge: "1st Place · FOSS United Hackathon 2024",
    description:
      "A security tool written in C to detect whether an image has been altered. It combines digital signatures (ECDSA) and perceptual image hashing to verify origin and catch tampering.",
    bullets: [
      "Wrote core image processing and verification logic in C.",
      "Uses perceptual hashing (pHash) and ECDSA signatures to verify file integrity.",
      "Won first place at FOSS United JUST A HACKATHON 2024.",
    ],
    tags: ["C", "Security", "ECDSA", "Image Hashing", "FOSS United"],
    technicalDetails: [
      { value: "1st Place", label: "FOSS United Hackathon" },
      { value: "C Language", label: "Core Engine" },
      { value: "pHash + ECDSA", label: "Tamper Detection" },
    ],
    githubUrl: "https://github.com/Aadrit555/Hemlock",
  },
  {
    id: "primordial-void",
    tmNumber: "03",
    category: "Reinforcement Learning",
    title: "primordial-void",
    description:
      "An autonomous framework that tests systems for exploits. It uses reinforcement learning to find gaps between what the system was intended to do and what its rules actually permit.",
    bullets: [
      "Models intent gaps using KL-divergence as a reward signal.",
      "Explores edge cases that human developers easily overlook.",
      "Open-source research project under the MIT License.",
    ],
    tags: ["Python", "Reinforcement Learning", "Security Research", "Exploit Discovery"],
    technicalDetails: [
      { value: "KL Divergence", label: "Intent Gap Signal" },
      { value: "Autonomous", label: "Edge Case Search" },
      { value: "Python", label: "Research Engine" },
    ],
    githubUrl: "https://github.com/Aadrit555/primordial-void",
  },
  {
    id: "superrag",
    tmNumber: "04",
    category: "Search & Retrieval",
    title: "SuperRAG",
    description:
      "A search pipeline that helps LLMs answer questions accurately using your documents. It combines vector similarity search, knowledge graphs, and reranking.",
    bullets: [
      "Built with FastAPI and Python to process PDFs and markdown documents.",
      "Connects vector search with entity linking and reranking for better answers.",
      "Modular architecture for easy integration.",
    ],
    tags: ["Python", "FastAPI", "Vector Search", "RAG"],
    technicalDetails: [
      { value: "FastAPI", label: "Async API" },
      { value: "Vector + Graph", label: "Hybrid Retrieval" },
      { value: "Reranking", label: "Relevance Scoring" },
    ],
    githubUrl: "https://github.com/Aadrit555/SuperRAG",
  },
  {
    id: "aadrit-tech",
    tmNumber: "05",
    category: "Web Development",
    title: "aadrit.tech",
    description:
      "Personal developer portfolio built with Next.js and Tailwind CSS, featuring an interactive command palette, terminal console, and live GitHub activity.",
    bullets: [
      "Built using Next.js 14 App Router and TypeScript.",
      "Fast, responsive interface with keyboard shortcuts and clean typography.",
      "Open-source and deployed on Vercel.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    technicalDetails: [
      { value: "Next.js 14", label: "App Router" },
      { value: "TypeScript", label: "Type Safety" },
      { value: "Tailwind CSS", label: "Modern Styling" },
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

