export interface MaterialItem {
  name: string;
  brand: string;
  detail: string;
}

export interface BeforeAfterPair {
  before: string;
  beforeLabel: string;
  after: string;
  afterLabel: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
  projectSlug?: string;
  role?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'kitchen' | 'wardrobe' | 'tv-unit' | 'full-home';
  homePackageId?: string;
  homePackageName?: string;
  location: string;
  scope: string[];
  timeline: string;
  clientType: string;
  coverImage: string;
  galleryImages: string[];
  beforeAfterPair?: BeforeAfterPair;
  materials: MaterialItem[];
  signatureFeatures: string[];
  testimonial?: Testimonial;
  featured: boolean;
  metaDescription: string;
}

export interface HomePackage {
  id: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  coverImage: string;
  projects: {
    category: string;
    title: string;
    image: string;
    slug: string;
  }[];
}

export const SIGNATURE_PILLARS = [
  {
    id: 'lighting',
    number: '01',
    title: 'Architectural LED Lighting',
    shortDesc: 'We design the light, not just the cabinet.',
    description: 'Every cabinet run, glass profile display, and cove includes concealed 3000K warm LED strip lighting with touch dimmers and indirect anti-glare diffusers.',
    iconName: 'Sparkles',
    detailShot: '/images/projects/signature-kitchen-1.jpg',
    highlights: ['Concealed Aluminum LED Channels', '3000K Warm Architectural Glow', 'Sensors & Touch Dimming']
  },
  {
    id: 'finish',
    number: '02',
    title: 'Glossy Neutral PU Finish',
    shortDesc: 'Warm taupe & cream high-gloss panels.',
    description: 'Precision multi-coat PU lacquer in warm taupe and beige tones that reflect ambient light smoothly, paired with zero-fingerprint matte balance doors.',
    iconName: 'Layers',
    detailShot: '/images/projects/signature-kitchen-2.jpg',
    highlights: ['High-Gloss Italian PU Polish', 'Thermal & UV Scratch Resistance', 'Seamless Seamless Edge Banding']
  },
  {
    id: 'countertops',
    number: '03',
    title: 'Solid Black Quartz & Granite',
    shortDesc: 'Dramatic dark stone counter contrast.',
    description: 'Jet black quartz and polished granite counters with waterfall edges, providing a striking high-contrast grounding element under warm overhead LED lighting.',
    iconName: 'Shield',
    detailShot: '/images/projects/signature-kitchen-3.jpg',
    highlights: ['Non-Porous Black Quartz', 'Stain & Heat Resistant Surface', 'Integrated Under-Mount Sink Cutouts']
  },
  {
    id: 'wood-accents',
    number: '04',
    title: 'Fluted Wood Slat Accents',
    shortDesc: 'Tactile architectural wood details.',
    description: 'Custom fluted wood slat paneling on breakfast bars, feature media walls, open display niches, and entryway partitions that add rich warm texture.',
    iconName: 'Grid',
    detailShot: '/images/projects/signature-kitchen-1.jpg',
    highlights: ['Solid Hardwood Slat Profile', 'Acoustic Backing Panel', 'Warm Walnut / Honey Oak Stains']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'the-horizon-residence-kitchen',
    title: 'The Horizon Residence Signature Kitchen',
    subtitle: 'Full Modular Kitchen Renovation with Integrated LED & Fluted Breakfast Bar',
    category: 'kitchen',
    homePackageId: 'home-horizon',
    homePackageName: 'The Horizon Residence (4BHK Suite)',
    location: 'Golf Course Road, Gurugram',
    scope: ['Parallel Modular Kitchen Layout', 'Fluted Wood Breakfast Bar', 'Backlit Glass Cabinets', 'Black Quartz Countertop'],
    timeline: '3.5 Weeks Execution',
    clientType: '4BHK Luxury Apartment',
    coverImage: '/images/projects/signature-kitchen-1.jpg',
    galleryImages: [
      '/images/projects/signature-kitchen-1.jpg',
      '/images/projects/signature-kitchen-2.jpg',
      '/images/projects/signature-kitchen-3.jpg'
    ],
    beforeAfterPair: {
      before: '/images/projects/signature-kitchen-raw.jpg',
      beforeLabel: 'Raw Construction (In-Progress)',
      after: '/images/projects/signature-kitchen-1.jpg',
      afterLabel: 'Finished Signature Kitchen',
      description: 'Drag to compare the raw plastered structure and brickwork with the final illuminated kitchen featuring black quartz counters, warm LED channels, and taupe PU cabinetry.'
    },
    materials: [
      { name: 'Hardware & Drawers', brand: 'Hettich Germany', detail: 'InnoTech Atira Soft-Close Tandem Boxes' },
      { name: 'Cabinet Finish', brand: 'Merino Luvih / Sayerlack', detail: 'High-Gloss PU Lacquer in Taupe Beige' },
      { name: 'Countertop', brand: 'Caesarstone Black Quartz', detail: '40mm Mitered Edge Jet Black Quartz' },
      { name: 'Lighting System', brand: 'Hafele Loox LED', detail: '3000K Warm LED Strip with Concealed Diffuser' },
      { name: 'Fluted Wall Panels', brand: 'CenturyPly Teak', detail: 'Precision CNC Fluted Wood Slats with Polyurethane Sealant' }
    ],
    signatureFeatures: [
      'Warm 3000K LED profile along under-cabinet runs and lower toe kicks',
      'Fluted wood slat cladding around island breakfast counter',
      'Black quartz counter with seamless mitered waterfall edge',
      'Backlit black aluminum profile glass wall units',
      'Concealed gas pipeline & integrated chimney hood space'
    ],
    testimonial: {
      quote: "Urban Spazio didn't just install cabinets — they completely transformed how our kitchen feels at night. The lighting design alone sets this apart from any vendor we spoke to.",
      author: 'Vikram & Ananya Sharma',
      location: 'Gurugram',
      rating: 5,
      role: 'Homeowner'
    },
    featured: true,
    metaDescription: 'Explore our signature modular kitchen project featuring high-gloss taupe cabinets, black quartz counters, and warm LED profile lighting.'
  },
  {
    id: 'proj-2',
    slug: 'the-horizon-master-wardrobe',
    title: 'The Horizon Suite Master Wardrobe',
    subtitle: 'Floor-to-Ceiling Floor Storage with Backlit Open Display Niches',
    category: 'wardrobe',
    homePackageId: 'home-horizon',
    homePackageName: 'The Horizon Residence (4BHK Suite)',
    location: 'Golf Course Road, Gurugram',
    scope: ['Full Wall Walk-in Wardrobe', 'Fluted Surround Framing', 'Integrated Sensor Lighting', 'Jewelry Organizer Drawers'],
    timeline: '2.5 Weeks Execution',
    clientType: 'Master Bedroom',
    coverImage: '/images/projects/signature-wardrobe-1.jpg',
    galleryImages: [
      '/images/projects/signature-wardrobe-1.jpg'
    ],
    materials: [
      { name: 'Shutter Panels', brand: 'CenturyPly Club Prime', detail: 'BWP Grade Marine Plywood with Taupe PU Finish' },
      { name: 'Sliding Systems', brand: 'Hafele Slido Design', detail: 'Top-Hung Soft-Closing Sliding Doors' },
      { name: 'Internal Fittings', brand: 'Hettich Wardrobe Accessories', detail: 'Pull-out Tie Rack, Trouser Organizer & Concealed Safe' },
      { name: 'Illumination', brand: 'Hafele Motion LED', detail: 'Proximity Sensor LED Wardrobe Bars' }
    ],
    signatureFeatures: [
      'Proximity-sensor warm LED interior lighting',
      'Fluted wood slat accent frame coordinating with the living room set',
      'Anti-fingerprint taupe high-gloss shutters with recessed J-pull handles'
    ],
    testimonial: {
      quote: "Having the exact same design language and warm lighting carried from our kitchen to our wardrobe made our entire home look like a unified luxury suite.",
      author: 'Ananya Sharma',
      location: 'Gurugram',
      rating: 5
    },
    featured: true,
    metaDescription: 'Custom floor-to-ceiling modular wardrobe with integrated LED lighting and fluted wood accents by Urban Spazio.'
  },
  {
    id: 'proj-3',
    slug: 'the-horizon-media-wall',
    title: 'The Horizon Suite Media & TV Wall',
    subtitle: 'Backlit Fluted Wood Slat Feature Wall with Floating Media Storage',
    category: 'tv-unit',
    homePackageId: 'home-horizon',
    homePackageName: 'The Horizon Residence (4BHK Suite)',
    location: 'Golf Course Road, Gurugram',
    scope: ['Fluted Wood Wall Cladding', 'Concealed Cable Routing', 'Backlit TV Panel', 'Floating Quartz Media Console'],
    timeline: '1.5 Weeks Execution',
    clientType: 'Living Room Feature Wall',
    coverImage: '/images/projects/signature-tv-unit-1.jpg',
    galleryImages: [
      '/images/projects/signature-tv-unit-1.jpg'
    ],
    materials: [
      { name: 'Wall Paneling', brand: 'Custom Solid Oak Slats', detail: 'Precision CNC Fluted Slat Panel with Black Felt Acoustic Backing' },
      { name: 'Media Console', brand: 'Hettich Push-to-Open', detail: 'Floating Console in Taupe PU Gloss' },
      { name: 'Top Counter', brand: 'Black Quartz', detail: 'Slim 20mm Polished Quartz Top' },
      { name: 'Indirect Lighting', brand: 'Philips Hue / Hafele LED', detail: 'Dimmable Warm Perimeter Cove Strip' }
    ],
    signatureFeatures: [
      'Continuous fluted wood slat backdrop with zero visible fasteners',
      'Perimeter warm cove LED lighting for ambient evening movie viewing',
      'Zero wire visibility with concealed internal cable conduit raceways'
    ],
    testimonial: {
      quote: "The media wall is the centerpiece of our living room. Guests instantly comment on the indirect cove lighting and fluted texture.",
      author: 'Vikram Sharma',
      location: 'Gurugram',
      rating: 5
    },
    featured: true,
    metaDescription: 'Contemporary TV media wall with backlit fluted wood slats and floating taupe cabinetry by Urban Spazio.'
  }
];

export const FULL_HOME_PACKAGES: HomePackage[] = [
  {
    id: 'home-horizon',
    name: 'The Horizon Residence Cohesive Suite',
    location: 'Golf Course Road, Gurugram',
    tagline: 'Kitchen + Master Wardrobe + Living Media Wall in One Unified Design Language',
    description: 'Designed and installed for a single 4BHK residence in Gurugram. From the parallel kitchen breakfast island to the living room TV console and master wardrobe, every room shares our signature warm taupe PU finish, black quartz accents, fluted wood paneling, and warm LED profile illumination.',
    coverImage: '/images/projects/signature-kitchen-1.jpg',
    projects: [
      {
        category: 'Modular Kitchen',
        title: 'Parallel Kitchen & Fluted Island',
        image: '/images/projects/signature-kitchen-1.jpg',
        slug: 'the-horizon-residence-kitchen'
      },
      {
        category: 'Master Wardrobe',
        title: 'Floor-to-Ceiling Storage',
        image: '/images/projects/signature-wardrobe-1.jpg',
        slug: 'the-horizon-master-wardrobe'
      },
      {
        category: 'TV Media Suite',
        title: 'Backlit Fluted Wall Panel',
        image: '/images/projects/signature-tv-unit-1.jpg',
        slug: 'the-horizon-media-wall'
      }
    ]
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Site Laser Measurement & Lighting Plan',
    duration: 'Days 1-2',
    description: 'We perform 3D laser scanning of your raw space and map electrical conduits specifically for integrated LED profiles, so lighting is engineered from day one.',
    details: ['Laser dimensional survey', 'Electrical & plumbing mapping', 'Structural readiness assessment']
  },
  {
    step: '02',
    title: '3D Photorealistic Design & Material Palette',
    duration: 'Days 3-7',
    description: 'We present full 3D renders matching exact material finishes — taupe PU lacquer codes, black quartz samples, and warm 3000K LED simulations.',
    details: ['Exact color & finish approval', 'Hardware selection (Hettich/Hafele)', 'Interactive 3D walkthrough']
  },
  {
    step: '03',
    title: 'Precision Factory Automation & Edge-Banding',
    duration: 'Weeks 2-3',
    description: 'Cabinets are CNC cut and edge-banded in our automated facility using BWP Marine Plywood. Zero on-site messy carpentry for carcass build.',
    details: ['PUR waterproof edge banding', 'Multi-coat Italian PU lacquer booth', 'Pre-installed LED channel grooves']
  },
  {
    step: '04',
    title: 'On-Site Modular Assembly & Stone Miter',
    duration: 'Days 21-25',
    description: 'Our certified master installers assemble modules, mount fluted wood slat accents, cut mitered black quartz counters, and wire LED drivers.',
    details: ['Dust-free modular assembly', 'Seamless black quartz miter cut', 'Low-voltage LED driver wiring']
  },
  {
    step: '05',
    title: 'White-Glove Handover & 10-Year Warranty',
    duration: 'Day 28',
    description: 'Deep cleaning, light calibration, soft-close hardware adjustment, and handover with full 10-year structural warranty certificate.',
    details: ['Final lighting scene test', 'Warranty card & care kit', 'Key handover & client signoff']
  }
];

export const REVIEWS = [
  {
    quote: "Every modular kitchen vendor sells cabinets. Urban Spazio designed the actual ambient atmosphere of our home with integrated LED profiles and fluted wood work. 100% worth working with a single specialist.",
    author: "Rohan & Devika Kapur",
    location: "DLF Phase 5, Gurugram",
    rating: 5,
    project: "Full Home Modular Package"
  },
  {
    quote: "The before-and-after difference was unbelievable. They transformed our raw brick kitchen structure into an architectural showcase in under 4 weeks with zero hassle.",
    author: "Siddharth Nair",
    location: "Vasant Vihar, New Delhi",
    rating: 5,
    project: "Signature Kitchen & Bar Counter"
  },
  {
    quote: "Having one point of contact for our kitchen, TV unit, and wardrobes meant identical wood tone, matching black quartz, and seamless finish across all rooms.",
    author: "Meera Sen",
    location: "Noida Sector 128",
    rating: 5,
    project: "Cohesive Living Suite"
  }
];
