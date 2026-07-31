/* ============================================
   Urban Spazio — All Site Data
   ============================================ */

// ─── Services ────────────────────────────────

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price?: string;
  duration?: string;
  deliverables: string[];
  cta: { label: string; action: "consultation" | "whatsapp" | "form" };
  icon: string; // lucide icon name
}

export const SERVICES: Service[] = [
  {
    id: "quick-consultation",
    title: "Quick Design Consultation",
    subtitle: "Online · 30 min to 1 hr",
    description:
      "Get expert design advice from the comfort of your home. Share your space, discuss your vision, and receive actionable design direction — all in a focused video call.",
    price: "₹999",
    duration: "30 min – 1 hr",
    deliverables: [
      "1-on-1 video consultation",
      "Initial design direction & mood board",
      "Material & color palette suggestions",
      "Budget estimation guidance",
      "Follow-up summary via email",
    ],
    cta: { label: "Book Consultation", action: "consultation" },
    icon: "Video",
  },
  {
    id: "advanced-consultation",
    title: "Advanced Design Consultation",
    subtitle: "Complete Design Package",
    description:
      "Full-scope design service including 2D layouts, photorealistic 3D visualizations, on-site visits, material selection, and a comprehensive design presentation — all the paperwork, perfectly prepared.",
    deliverables: [
      "Detailed 2D floor plans & elevations",
      "Photorealistic 3D renders",
      "On-site visits & measurements",
      "Material & finish selection boards",
      "Design presentation (PPT)",
      "Complete BOQ documentation",
    ],
    cta: { label: "Inquire Now", action: "whatsapp" },
    icon: "PenTool",
  },
  {
    id: "turnkey",
    title: "Turnkey Services",
    subtitle: "Design + Execution",
    description:
      "End-to-end interior transformation. We handle everything from concept to completion — design, procurement, civil work, carpentry, electrical, painting, and final styling.",
    deliverables: [
      "Complete design development",
      "Project management & scheduling",
      "Vendor coordination & procurement",
      "On-site execution & supervision",
      "Quality checks & handover",
      "Post-completion support",
    ],
    cta: { label: "Discuss Your Project", action: "whatsapp" },
    icon: "Hammer",
  },
  {
    id: "pmc",
    title: "Project Management (PMC)",
    subtitle: "Execution Only",
    description:
      "Already have your design ready? We bring it to life. Our PMC service handles pure execution — coordinating contractors, managing timelines, ensuring quality, and delivering on schedule.",
    deliverables: [
      "Contractor coordination",
      "Timeline & milestone management",
      "Quality assurance inspections",
      "Budget tracking & reporting",
      "Site supervision",
      "Handover & defect liability period",
    ],
    cta: { label: "Get Started", action: "whatsapp" },
    icon: "ClipboardCheck",
  },
  {
    id: "bespoke-furniture",
    title: "Custom / Bespoke Furniture",
    subtitle: "Luxury Furniture Design",
    description:
      "One-of-a-kind furniture pieces designed and crafted to your exact specifications. From statement dining tables to custom built-in units — furniture that tells your story.",
    deliverables: [
      "Custom design sketches & 3D models",
      "Premium material sourcing",
      "Artisan craftsmanship",
      "Finish & upholstery selection",
      "White-glove delivery & installation",
    ],
    cta: { label: "Design Your Piece", action: "whatsapp" },
    icon: "Armchair",
  },
];

// ─── Design Philosophy ────────────────────────

export interface DesignPhilosophy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  colorAccent: string;
  characteristics: string[];
}

export const DESIGN_PHILOSOPHIES: DesignPhilosophy[] = [
  {
    id: "japandi",
    title: "Japandi",
    subtitle: "Japanese Minimalism meets Scandinavian Warmth",
    description:
      "The art of 'less but better.' Japandi fuses wabi-sabi imperfection with Nordic functionality — creating spaces that are calm, intentional, and effortlessly refined.",
    image: "/images/themes/japandi.jpg",
    colorAccent: "#C4B49A",
    characteristics: [
      "Natural materials — oak, linen, ceramic",
      "Muted, earthy color palettes",
      "Low-profile, functional furniture",
      "Negative space as a design element",
      "Handcrafted, imperfect textures",
    ],
  },
  {
    id: "neoclassical",
    title: "Neo Classical / Victorian",
    subtitle: "Timeless Grandeur, Reimagined",
    description:
      "For those who believe in the power of heritage. Rich moldings, tufted velvets, and gilded accents — classical elegance adapted for contemporary living.",
    image: "/images/themes/neoclassical.jpg",
    colorAccent: "#8B6F47",
    characteristics: [
      "Ornate moldings & coffered ceilings",
      "Rich jewel-tone upholstery",
      "Marble, crystal, and gilt details",
      "Symmetrical, balanced compositions",
      "Statement chandeliers & sconces",
    ],
  },
  {
    id: "contemporary",
    title: "Modern Contemporary",
    subtitle: "Minimalist Precision & Art Deco Flair",
    description:
      "Clean lines meet bold statements. Contemporary design strips away excess while Art Deco injects geometry, metallic accents, and sculptural drama.",
    image: "/images/themes/contemporary.jpg",
    colorAccent: "#6B6B6B",
    characteristics: [
      "Clean, geometric lines",
      "Monochromatic with metallic accents",
      "Statement sculptural lighting",
      "Premium materials — concrete, brass, glass",
      "Open-plan, flowing layouts",
    ],
  },
  {
    id: "biophilic",
    title: "Biophilic",
    subtitle: "Where Architecture Meets Nature",
    description:
      "Designed to heal. Living walls, natural light, organic materials, and indoor greenery create spaces that reconnect you with nature — right inside your home or office.",
    image: "/images/themes/biophilic.jpg",
    colorAccent: "#6B8F5E",
    characteristics: [
      "Living green walls & indoor gardens",
      "Natural light maximization",
      "Organic materials — stone, wood, rattan",
      "Water features & natural sounds",
      "Earthy, grounding color palettes",
    ],
  },
];

// ─── Process Steps ────────────────────────────

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Consultation",
    description:
      "We start by understanding you — your lifestyle, preferences, budget, and vision. Through an in-depth consultation, we define the design brief together.",
  },
  {
    step: "02",
    title: "Concept & Design Development",
    description:
      "Our team creates mood boards, 2D layouts, and photorealistic 3D renders. We iterate until you see your dream space come alive on screen.",
  },
  {
    step: "03",
    title: "Material Selection & Costing",
    description:
      "Handpicked material palettes, finish samples, and transparent BOQ documentation. You know exactly what you're getting and what it costs.",
  },
  {
    step: "04",
    title: "Execution & Project Management",
    description:
      "Our site team takes over — managing contractors, timelines, and quality checks. You receive regular progress updates without the stress.",
  },
  {
    step: "05",
    title: "Styling & Handover",
    description:
      "Final styling, deep cleaning, and a walk-through with you. We hand over a space that exceeds expectations — ready to live in.",
  },
];

// ─── Package Segments ─────────────────────────

export interface PackageSegment {
  id: string;
  tier: string;
  range: string;
  description: string;
  includes: string[];
  popular?: boolean;
}

export const PACKAGE_SEGMENTS: PackageSegment[] = [
  {
    id: "starter",
    tier: "Essential",
    range: "₹3 – 10 Lakhs",
    description:
      "Smart, stylish interiors for compact spaces. Quality materials and clean design without compromise.",
    includes: [
      "Living + bedroom design",
      "Modular kitchen layout",
      "Standard material palette",
      "2D plans & basic 3D",
    ],
  },
  {
    id: "premium",
    tier: "Premium",
    range: "₹10 – 30 Lakhs",
    description:
      "Elevated design for those who value craftsmanship. Custom furniture, premium finishes, and detailed execution.",
    includes: [
      "Full home design & execution",
      "Custom furniture pieces",
      "Premium material selection",
      "Photorealistic 3D renders",
      "Dedicated project manager",
    ],
    popular: true,
  },
  {
    id: "luxury",
    tier: "Luxury",
    range: "₹30 Lakhs & Above",
    description:
      "Bespoke luxury for discerning clients. Every detail is curated, every finish is exceptional, every space is a masterpiece.",
    includes: [
      "End-to-end bespoke design",
      "Artisan-crafted furniture",
      "Imported premium materials",
      "Smart home integration",
      "Dedicated design team",
      "Post-project styling",
    ],
  },
];

// ─── Testimonials ─────────────────────────────

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  project: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Urban Spazio transformed our apartment into something we see in design magazines. Their attention to detail and understanding of our lifestyle was exceptional.",
    author: "Rohan & Devika Kapur",
    location: "DLF Phase 5, Gurugram",
    project: "Full Home Design",
    rating: 5,
  },
  {
    quote:
      "From the first consultation to the final handover, the experience was seamless. They managed everything — we just moved in and loved it.",
    author: "Siddharth Nair",
    location: "Vasant Vihar, New Delhi",
    project: "Turnkey Apartment",
    rating: 5,
  },
  {
    quote:
      "The biophilic design they created for our office has genuinely improved our team's well-being. It's not just beautiful — it feels alive.",
    author: "Meera Sen",
    location: "Noida Sector 128",
    project: "Commercial Office Design",
    rating: 5,
  },
  {
    quote:
      "We wanted a Japandi aesthetic and they nailed it. Every piece, every texture, every empty space was intentional. Exactly what we dreamed of.",
    author: "Amit & Priya Mehta",
    location: "South Delhi",
    project: "3BHK Japandi Home",
    rating: 5,
  },
];

// ─── Portfolio / Work ─────────────────────────

export interface PortfolioItem {
  id: string;
  title: string;
  category: "residential" | "commercial";
  philosophy: string;
  image: string;
  location: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    title: "The Horizon Residence",
    category: "residential",
    philosophy: "Modern Contemporary",
    image: "/images/projects/signature-kitchen-1.jpg",
    location: "Gurugram",
  },
  {
    id: "p2",
    title: "Japandi Living Suite",
    category: "residential",
    philosophy: "Japandi",
    image: "/images/themes/japandi.jpg",
    location: "South Delhi",
  },
  {
    id: "p3",
    title: "Victorian Heritage Home",
    category: "residential",
    philosophy: "Neo Classical",
    image: "/images/themes/neoclassical.jpg",
    location: "Lutyens Delhi",
  },
  {
    id: "p4",
    title: "Biophilic Office Space",
    category: "commercial",
    philosophy: "Biophilic",
    image: "/images/themes/biophilic.jpg",
    location: "Noida",
  },
  {
    id: "p5",
    title: "Art Deco Penthouse",
    category: "residential",
    philosophy: "Modern Contemporary",
    image: "/images/themes/contemporary.jpg",
    location: "Golf Course Road",
  },
  {
    id: "p6",
    title: "Modern Kitchen & Living",
    category: "residential",
    philosophy: "Modern Contemporary",
    image: "/images/projects/signature-kitchen-2.jpg",
    location: "Gurugram",
  },
];

// ─── FAQ ───────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What areas do you serve?",
    answer:
      "We currently serve Delhi NCR — including New Delhi, Gurugram, Noida, and Faridabad. For select projects, we also take up work in other cities.",
  },
  {
    question: "How does the ₹999 Quick Consultation work?",
    answer:
      "Book a slot, fill the form, and pay ₹999. You get a 30-min to 1-hour video call with our design expert who will provide initial direction, mood board references, and budget guidance for your project.",
  },
  {
    question: "Do you handle both residential and commercial projects?",
    answer:
      "Yes! We design for homes (apartments, villas, penthouses) as well as commercial spaces (offices, retail, restaurants, clinics).",
  },
  {
    question: "What is the typical project timeline?",
    answer:
      "It depends on the scope. A single room can take 3-4 weeks. A full home typically takes 8-16 weeks from design approval to handover.",
  },
  {
    question: "Can I just get the design without execution?",
    answer:
      "Absolutely. Our Advanced Design Consultation provides complete design documentation — 2D, 3D, material boards, BOQ — without execution. You can use any contractor you trust.",
  },
];
