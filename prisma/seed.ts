import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";

// ---------------------------------------------------------------------------
// Types (seed-only)
// ---------------------------------------------------------------------------

type SeedProduct = {
  name: string;
  brand: string;
  categorySlug: string;
  price: number;
  discount?: number | null;
  shortDescription: string;
  fullDescription: string;
  warranty?: string;
  delivery?: string;
  isFeatured?: boolean;
  tags?: string;
  quantity: number;
  specs: Record<string, string>;
  images: string[];
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function inventoryStatus(quantity: number): "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" {
  if (quantity <= 0) return "OUT_OF_STOCK";
  if (quantity <= 5) return "LOW_STOCK";
  return "IN_STOCK";
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

const categories = [
  {
    name: "Laptops",
    slug: "laptops",
    description: "Premium laptops for work, creation, and play.",
  },
  {
    name: "Audio",
    slug: "audio",
    description: "Headphones and earbuds with reference-level sound.",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Keyboards, mice, displays, and desk essentials.",
  },
] as const;

// ---------------------------------------------------------------------------
// Products (~30 curated items — expand later toward 100)
// Prices in DZD
// ---------------------------------------------------------------------------

const products: SeedProduct[] = [
  // ----- LAPTOPS -----
  {
    name: "MacBook Pro 16 M3 Max",
    brand: "Apple",
    categorySlug: "laptops",
    price: 650000,
    discount: 5,
    shortDescription: "The ultimate pro laptop with M3 Max.",
    fullDescription:
      "The 16-inch MacBook Pro with M3 Max delivers a Liquid Retina XDR display, exceptional battery life, and workstation-class performance for demanding creative workflows.",
    warranty: "1 year international warranty",
    delivery: "48–72h major wilayas · COD available",
    isFeatured: true,
    tags: "apple,pro,m3,creator",
    quantity: 8,
    specs: {
      Processor: "Apple M3 Max (16-core CPU, 40-core GPU)",
      RAM: "128GB Unified Memory",
      Storage: "8TB NVMe SSD",
      Display: "16.2-inch Liquid Retina XDR (3456x2234), 120Hz ProMotion",
      Battery: "100Wh, up to 22h video playback",
      Weight: "2.16 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "ROG Zephyrus G14 (2024)",
    brand: "ASUS",
    categorySlug: "laptops",
    price: 345000,
    shortDescription: "OLED gaming laptop with RTX 4070.",
    fullDescription:
      "The 2024 ROG Zephyrus G14 pairs a CNC aluminum chassis with a 3K OLED G-Sync panel and RTX 4070 — a hybrid machine for creators and gamers.",
    warranty: "2 years local warranty",
    delivery: "48–72h major wilayas · COD available",
    isFeatured: true,
    tags: "asus,gaming,oled,rtx",
    quantity: 12,
    specs: {
      Processor: "AMD Ryzen 9 8945HS",
      Graphics: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      RAM: "32GB LPDDR5X-6400",
      Storage: "1TB PCIe 4.0 NVMe M.2 SSD",
      Display: "14-inch 3K (2880x1800) OLED, 120Hz, 0.2ms",
      Weight: "1.50 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "ThinkPad X1 Carbon Gen 12",
    brand: "Lenovo",
    categorySlug: "laptops",
    price: 380000,
    shortDescription: "The gold standard for business.",
    fullDescription:
      "ThinkPad X1 Carbon Gen 12 features a haptic trackpad, Intel Core Ultra with NPU, and aerospace-grade carbon fiber for serious durability.",
    warranty: "3 years onsite (business)",
    delivery: "48–72h major wilayas · COD available",
    isFeatured: false,
    tags: "lenovo,business,ultrabook",
    quantity: 15,
    specs: {
      Processor: "Intel Core Ultra 7 155H",
      RAM: "64GB LPDDR5x-6400",
      Storage: "2TB PCIe Gen4 Performance SSD",
      Display: "14-inch 2.8K (2880x1800) OLED, Anti-Reflective, 400 nits",
      Battery: "57Wh with Rapid Charge",
      Weight: "1.09 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "XPS 16 (2024)",
    brand: "Dell",
    categorySlug: "laptops",
    price: 460000,
    discount: 10,
    shortDescription: "Futuristic design meets Intel Core Ultra.",
    fullDescription:
      "Dell XPS 16 offers an invisible haptic trackpad, zero-lattice keyboard, and a stunning 4K+ OLED touch display in CNC-machined aluminum.",
    warranty: "1 year premium support",
    delivery: "48–72h major wilayas · COD available",
    isFeatured: true,
    tags: "dell,xps,oled,creator",
    quantity: 7,
    specs: {
      Processor: "Intel Core Ultra 9 185H",
      Graphics: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      RAM: "64GB LPDDR5x-7467",
      Storage: "4TB PCIe 4.0 SSD",
      Display: "16.3-inch 4K+ (3840x2400) OLED Touch",
      Weight: "2.13 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "MacBook Air 15 M3",
    brand: "Apple",
    categorySlug: "laptops",
    price: 290000,
    shortDescription: "Impossibly thin and light.",
    fullDescription:
      "The 15-inch MacBook Air with M3 offers strong everyday performance and up to 18 hours of battery life in a fanless chassis.",
    warranty: "1 year international warranty",
    delivery: "48–72h major wilayas · COD available",
    isFeatured: true,
    tags: "apple,air,portable",
    quantity: 20,
    specs: {
      Processor: "Apple M3 (8-core CPU, 10-core GPU)",
      RAM: "24GB Unified Memory",
      Storage: "2TB NVMe SSD",
      Display: "15.3-inch Liquid Retina (2880x1864)",
      Battery: "66.5Wh, up to 18h",
      Weight: "1.51 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Blade 16 (2024)",
    brand: "Razer",
    categorySlug: "laptops",
    price: 620000,
    shortDescription: "Dual-mode Mini-LED powerhouse.",
    fullDescription:
      "Razer Blade 16 features a dual-mode Mini-LED panel and desktop-class RTX 4090 performance in a sleek unibody design.",
    warranty: "1 year international warranty",
    delivery: "3–5 days · COD available",
    isFeatured: false,
    tags: "razer,gaming,rtx4090",
    quantity: 4,
    specs: {
      Processor: "Intel Core i9-14900HX",
      Graphics: "NVIDIA GeForce RTX 4090 16GB GDDR6",
      RAM: "64GB DDR5-5600",
      Storage: "4TB (2x 2TB) PCIe 4.0 NVMe",
      Display: "16-inch Dual-Mode (UHD+ 120Hz / FHD+ 240Hz) Mini-LED",
      Weight: "2.45 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Spectre x360 14",
    brand: "HP",
    categorySlug: "laptops",
    price: 310000,
    shortDescription: "Luxury 2-in-1 convertible.",
    fullDescription:
      "HP Spectre x360 14 combines a 2.8K OLED panel, IMAX Enhanced certification, and a gem-cut chassis with strong battery life.",
    warranty: "1 year local warranty",
    delivery: "48–72h major wilayas · COD available",
    isFeatured: false,
    tags: "hp,2in1,oled",
    quantity: 10,
    specs: {
      Processor: "Intel Core Ultra 7 155H",
      RAM: "32GB LPDDR5x-7467",
      Storage: "2TB PCIe Gen4 NVMe",
      Display: "14-inch 2.8K (2880x1800) OLED Touch, 120Hz",
      Battery: "68Wh, up to 13h",
      Weight: "1.44 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Surface Laptop Studio 2",
    brand: "Microsoft",
    categorySlug: "laptops",
    price: 420000,
    shortDescription: "The most powerful Surface ever built.",
    fullDescription:
      "A versatile laptop with a dynamic woven hinge — transitions from laptop to stage to creative canvas.",
    warranty: "1 year manufacturer warranty",
    delivery: "3–5 days · COD available",
    isFeatured: false,
    tags: "microsoft,surface,creator",
    quantity: 6,
    specs: {
      Processor: "Intel Core i7-13700H",
      Graphics: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      RAM: "64GB LPDDR5x",
      Storage: "2TB PCIe 4.0 SSD",
      Display: "14.4-inch PixelSense Flow (2400x1600) Touch, 120Hz",
      Weight: "1.98 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "LG Gram 17",
    brand: "LG",
    categorySlug: "laptops",
    price: 280000,
    shortDescription: "Massive screen. Impossibly light.",
    fullDescription:
      "LG Gram 17 delivers a 17-inch display and long battery life in a magnesium body lighter than many 13-inch laptops.",
    warranty: "1 year local warranty",
    delivery: "48–72h major wilayas · COD available",
    isFeatured: false,
    tags: "lg,lightweight,productivity",
    quantity: 9,
    specs: {
      Processor: "Intel Core 7 150U",
      RAM: "32GB LPDDR5x-6400",
      Storage: "1TB PCIe Gen4 NVMe",
      Display: "17-inch WQXGA (2560x1600) IPS, 99% DCI-P3",
      Battery: "77Wh, up to 21h video playback",
      Weight: "1.35 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Alienware m18 R2",
    brand: "Dell",
    categorySlug: "laptops",
    price: 680000,
    shortDescription: "Desktop replacement domination.",
    fullDescription:
      "Alienware m18 R2 is an unapologetic desktop replacement with advanced cooling and max-TGP graphics.",
    warranty: "1 year premium support",
    delivery: "3–5 days · COD available",
    isFeatured: false,
    tags: "dell,alienware,gaming",
    quantity: 3,
    specs: {
      Processor: "Intel Core i9-14900HX",
      Graphics: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W)",
      RAM: "64GB DDR5-5200",
      Storage: "8TB (4x 2TB) PCIe 4.0 NVMe RAID 0",
      Display: "18-inch QHD+ (2560x1600) 165Hz",
      Weight: "4.23 kg",
    },
    images: [
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&q=80&w=800",
    ],
  },

  // ----- AUDIO -----
  {
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    categorySlug: "audio",
    price: 45000,
    shortDescription: "Magical audio with USB-C.",
    fullDescription:
      "AirPods Pro deliver stronger Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio — now with USB-C.",
    warranty: "1 year international warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: true,
    tags: "apple,earbuds,anc",
    quantity: 40,
    specs: {
      Chip: "Apple H2 headphone chip, Apple U1 chip in case",
      "Active Noise Cancellation": "Yes (Up to 2x more)",
      "Spatial Audio": "Personalized Spatial Audio with dynamic head tracking",
      Battery: "Up to 6 hours listening time, 30 hours with case",
      Resistance: "Dust, sweat, and water resistant (IP54)",
      Charging: "USB-C, MagSafe, Apple Watch charger",
    },
    images: [
      "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "WH-1000XM5",
    brand: "Sony",
    categorySlug: "audio",
    price: 65000,
    discount: 15,
    shortDescription: "Industry-leading noise cancellation.",
    fullDescription:
      "Sony WH-1000XM5 uses dual processors and eight microphones for class-leading noise cancellation and all-day comfort.",
    warranty: "1 year local warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: true,
    tags: "sony,headphones,anc",
    quantity: 25,
    specs: {
      "Driver Unit": "30mm, specially designed",
      "Noise Cancellation": "Auto NC Optimizer with 8 microphones",
      "Battery Life": "Up to 30 hours with NC on",
      Codecs: "SBC, AAC, LDAC",
      Weight: "250g",
    },
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "QuietComfort Ultra",
    brand: "Bose",
    categorySlug: "audio",
    price: 75000,
    shortDescription: "Immersive audio and world-class ANC.",
    fullDescription:
      "Bose QC Ultra headphones feature spatial immersive audio and CustomTune technology that adapts to your ears.",
    warranty: "1 year local warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: false,
    tags: "bose,headphones,anc",
    quantity: 18,
    specs: {
      "Acoustic Architecture": "Closed-back",
      "Immersive Audio": "Bose Immersive Audio (Spatialized)",
      "Noise Cancellation": "World-class CustomTune ANC",
      "Battery Life": "Up to 24 hours (18h with Immersive Audio)",
      Weight: "252g",
    },
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Momentum 4 Wireless",
    brand: "Sennheiser",
    categorySlug: "audio",
    price: 62000,
    shortDescription: "Audiophile sound, 60h battery.",
    fullDescription:
      "Momentum 4 delivers Sennheiser Signature Sound, adaptive ANC, and up to 60 hours of battery life.",
    warranty: "2 years local warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: false,
    tags: "sennheiser,headphones",
    quantity: 14,
    specs: {
      "Transducer Principle": "42mm dynamic",
      "Battery Life": "Up to 60 hours",
      "Audio Codecs": "SBC, AAC, aptX, aptX Adaptive",
      "Active Noise Cancellation": "Hybrid Adaptive ANC",
      Weight: "293g",
    },
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Devialet Gemini II",
    brand: "Devialet",
    categorySlug: "audio",
    price: 95000,
    shortDescription: "Acoustic engineering masterpiece.",
    fullDescription:
      "Devialet Gemini II true wireless earbuds feature adaptive noise cancellation and a compact premium design.",
    warranty: "1 year international warranty",
    delivery: "48–72h · COD available",
    isFeatured: false,
    tags: "devialet,earbuds,premium",
    quantity: 8,
    specs: {
      Drivers: "Custom 10mm Titanium coating",
      "Noise Cancellation": "Devialet Adaptive Noise Cancellation (Up to 40dB)",
      "Battery Life": "Up to 22 hours with charging case",
      "Frequency Response": "5Hz to 21kHz",
      Weight: "6g per earbud",
    },
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "AirPods Max",
    brand: "Apple",
    categorySlug: "audio",
    price: 98000,
    shortDescription: "High-fidelity over-ear audio.",
    fullDescription:
      "AirPods Max combine high-fidelity audio with industry-leading ANC and a precision aluminum design.",
    warranty: "1 year international warranty",
    delivery: "48–72h · COD available",
    isFeatured: false,
    tags: "apple,headphones",
    quantity: 11,
    specs: {
      Driver: "Apple-designed dynamic driver",
      Design: "Knit mesh canopy and memory foam ear cushions",
      "Audio Technology":
        "Active Noise Cancellation, Transparency mode, Spatial audio",
      "Battery Life": "Up to 20 hours",
      Weight: "384.8g",
    },
    images: [
      "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "WF-1000XM5",
    brand: "Sony",
    categorySlug: "audio",
    price: 52000,
    shortDescription: "Flagship noise cancelling earbuds.",
    fullDescription:
      "Sony WF-1000XM5 earbuds deliver premium sound and excellent noise cancelling in a compact body.",
    warranty: "1 year local warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: false,
    tags: "sony,earbuds,anc",
    quantity: 22,
    specs: {
      "Driver Unit": "8.4 mm Dynamic Driver X",
      "Noise Cancellation": "Dual Feedback mics, Integrated Processor V2",
      "High-Resolution Audio": "LDAC support, DSEE Extreme",
      "Battery Life": "Up to 24 hours (8h buds + 16h case)",
      Weight: "5.9g per earbud",
    },
    images: [
      "https://images.unsplash.com/photo-1572569533612-85859ca447b9?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Beats Studio Pro",
    brand: "Beats",
    categorySlug: "audio",
    price: 58000,
    shortDescription: "Iconic sound, fully re-engineered.",
    fullDescription:
      "Beats Studio Pro delivers rich immersive sound over Bluetooth or USB-C with a custom acoustic platform.",
    warranty: "1 year local warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: false,
    tags: "beats,headphones",
    quantity: 16,
    specs: {
      Acoustics: "Custom 40mm active drivers",
      "Audio Connectivity": "Class 1 Bluetooth, USB-C DAC, 3.5mm analog",
      "Battery Life": "Up to 40 hours",
      "Spatial Audio": "Personalized Spatial Audio with dynamic head tracking",
      Weight: "260g",
    },
    images: [
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Pi7 S2",
    brand: "Bowers & Wilkins",
    categorySlug: "audio",
    price: 85000,
    shortDescription: "True high-resolution audio.",
    fullDescription:
      "Pi7 S2 continues the Bowers & Wilkins legacy with dual hybrid drivers and a smart charging case retransmitter.",
    warranty: "1 year international warranty",
    delivery: "48–72h · COD available",
    isFeatured: false,
    tags: "bowers,earbuds,hires",
    quantity: 7,
    specs: {
      "Drive Units": "9.2mm Dynamic Drive + Balanced Armature",
      "Bluetooth Codecs": "aptX Adaptive, aptX HD, aptX Classic, AAC, SBC",
      "Special Feature": "Smartcase Audio Retransmission",
      "Battery Life": "Up to 21 hours total",
      Weight: "7g per earbud",
    },
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Galaxy Buds2 Pro",
    brand: "Samsung",
    categorySlug: "audio",
    price: 35000,
    discount: 10,
    shortDescription: "24-bit Hi-Fi audio.",
    fullDescription:
      "Galaxy Buds2 Pro feature an ergonomic design, 24-bit Hi-Fi audio, and intelligent Active Noise Cancellation.",
    warranty: "1 year local warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: false,
    tags: "samsung,earbuds",
    quantity: 30,
    specs: {
      Audio: "24-bit Hi-Fi, 360 Audio with Direct Multi-channel",
      Speakers: "Custom 2-way (Tweeter + Woofer)",
      ANC: "Intelligent ANC with 3 high-SNR microphones",
      "Water Resistance": "IPX7",
      "Battery Life": "Up to 18 hours (with case, ANC on)",
    },
    images: [
      "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?auto=format&fit=crop&q=80&w=800",
    ],
  },

  // ----- ACCESSORIES -----
  {
    name: "MX Master 3S",
    brand: "Logitech",
    categorySlug: "accessories",
    price: 22000,
    shortDescription: "The master of productivity.",
    fullDescription:
      "MX Master 3S is remastered for tactility and flow — quiet clicks and an 8,000 DPI track-on-glass sensor.",
    warranty: "1 year local warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: true,
    tags: "logitech,mouse,productivity",
    quantity: 35,
    specs: {
      Sensor: "Darkfield high precision (8000 DPI)",
      Buttons: "7 buttons, MagSpeed wheel, Thumb wheel",
      Connectivity: "Logi Bolt USB Receiver, Bluetooth Low Energy",
      Battery: "500 mAh Li-Po, up to 70 days",
      Weight: "141g",
    },
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Keychron Q1 Pro",
    brand: "Keychron",
    categorySlug: "accessories",
    price: 45000,
    shortDescription: "Wireless custom mechanical keyboard.",
    fullDescription:
      "Q1 Pro is a full-metal QMK/VIA wireless custom board with a 75% layout for macros and daily coding.",
    warranty: "1 year local warranty",
    delivery: "48–72h · COD available",
    isFeatured: false,
    tags: "keychron,keyboard,mechanical",
    quantity: 12,
    specs: {
      Layout: "75% (81 Keys)",
      "Body Material": "CNC machined aluminum",
      Connectivity: "Bluetooth 5.1 & Type-C wired",
      Switches: "Keychron K Pro Mechanical (Hot-swappable)",
      Battery: "4000 mAh rechargeable li-polymer",
    },
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Pro Display XDR",
    brand: "Apple",
    categorySlug: "accessories",
    price: 950000,
    shortDescription: "Mastering-grade 6K monitor.",
    fullDescription:
      "32-inch Retina 6K display with up to 1600 nits peak brightness and a 1,000,000:1 contrast ratio.",
    warranty: "1 year international warranty",
    delivery: "Special order · contact support",
    isFeatured: false,
    tags: "apple,display,6k",
    quantity: 2,
    specs: {
      Display: "32-inch IPS LCD with Oxide TFT technology",
      Resolution: "6016 by 3384 pixels (20.4 million pixels) at 218 ppi",
      Brightness: "1000 nits sustained, 1600 nits peak",
      "Contrast Ratio": "1,000,000:1",
      "Color Depth": "True 10-bit color, P3 wide color gamut",
    },
    images: [
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Caldigit TS4 Dock",
    brand: "Caldigit",
    categorySlug: "accessories",
    price: 85000,
    shortDescription: "The ultimate Thunderbolt 4 dock.",
    fullDescription:
      "TS4 offers 18 ports, up to 98W power delivery, and full Thunderbolt 4 40Gb/s performance.",
    warranty: "2 years manufacturer warranty",
    delivery: "48–72h · COD available",
    isFeatured: false,
    tags: "caldigit,dock,thunderbolt",
    quantity: 10,
    specs: {
      Interface: "Thunderbolt 4 (40Gb/s)",
      Ports:
        "18 Total (3x TB4, 3x USB-C, 5x USB-A, 2.5GbE, DisplayPort, SD/microSD, Audio)",
      "Power Delivery": "Up to 98W to host",
      "Display Support": "Single 8K or Dual 6K 60Hz",
      Material: "Premium Aluminum",
    },
    images: [
      "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Herman Miller Aeron",
    brand: "Herman Miller",
    categorySlug: "accessories",
    price: 350000,
    shortDescription: "The gold standard of office seating.",
    fullDescription:
      "Aeron features 8Z Pellicle suspension and PostureFit SL support — a reference chair for long work sessions.",
    warranty: "12-year manufacturer warranty",
    delivery: "5–7 days · COD available",
    isFeatured: false,
    tags: "chair,ergonomic,office",
    quantity: 5,
    specs: {
      Material: "8Z Pellicle elastomeric suspension",
      Adjustability: "Fully adjustable arms, tilt, seat angle, PostureFit SL",
      Environmental: "Contains ocean-bound plastic, up to 91% recyclable",
      "Weight Capacity": "Up to 350 lbs (159 kg)",
      Warranty: "12-year, 3-shift warranty",
    },
    images: [
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Logitech Brio 4K",
    brand: "Logitech",
    categorySlug: "accessories",
    price: 38000,
    shortDescription: "Ultra HD webcam for video conferencing.",
    fullDescription:
      "Brio delivers 4K Ultra HD with HDR and RightLight 3 for sharp calls and content creation.",
    warranty: "1 year local warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: false,
    tags: "logitech,webcam,4k",
    quantity: 20,
    specs: {
      Resolution: "4K/30fps, 1080p/60fps",
      "Field of View": "Adjustable (65°, 78°, 90°)",
      "Focus Type": "Autofocus with glass lens",
      Microphone: "Built-in dual omni-directional mics with noise cancellation",
      Security: "Windows Hello infrared facial recognition",
    },
    images: [
      "https://images.unsplash.com/photo-1587826227038-0387b9ce052c?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Magic Keyboard with Touch ID",
    brand: "Apple",
    categorySlug: "accessories",
    price: 34000,
    shortDescription: "Wireless, rechargeable, secure.",
    fullDescription:
      "Magic Keyboard with Touch ID provides fast authentication for logins and purchases on Apple silicon Macs.",
    warranty: "1 year international warranty",
    delivery: "24–48h major wilayas · COD available",
    isFeatured: false,
    tags: "apple,keyboard,touchid",
    quantity: 18,
    specs: {
      Connectivity: "Bluetooth, Lightning port",
      Security: "Integrated Touch ID sensor",
      Battery: "Built-in rechargeable (1 month+ per charge)",
      Compatibility: "Mac with Apple silicon",
      Weight: "243g",
    },
    images: [
      "https://images.unsplash.com/photo-1587826227038-0387b9ce052c?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Elgato Stream Deck MK.2",
    brand: "Elgato",
    categorySlug: "accessories",
    price: 32000,
    shortDescription: "Studio control for creators.",
    fullDescription:
      "Stream Deck MK.2 offers 15 LCD keys to trigger actions, control apps, and run your creator workflow.",
    warranty: "1 year local warranty",
    delivery: "48–72h · COD available",
    isFeatured: false,
    tags: "elgato,streaming,creator",
    quantity: 13,
    specs: {
      Keys: "15 customizable LCD keys",
      Interface: "USB 2.0 (USB-C cable included)",
      Customization: "Interchangeable faceplates",
      Software: "Stream Deck app (macOS, Windows)",
      Dimensions: "118 x 84 x 25 mm",
    },
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Secretlab TITAN Evo",
    brand: "Secretlab",
    categorySlug: "accessories",
    price: 120000,
    shortDescription: "Award-winning comfort.",
    fullDescription:
      "TITAN Evo brings 4-way L-ADAPT lumbar support and a magnetic memory foam head pillow for long sessions.",
    warranty: "Up to 5 years",
    delivery: "5–7 days · COD available",
    isFeatured: false,
    tags: "secretlab,chair,gaming",
    quantity: 6,
    specs: {
      Upholstery: "Secretlab NEO Hybrid Leatherette",
      "Lumbar Support": "4-way L-ADAPT system",
      Armrests: "Full-Metal 4D with CloudSwap replacement tech",
      Base: "ADC12 Aluminum Wheel Base",
      Warranty: "Up to 5 years",
    },
    images: [
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "LG UltraFine 5K Display",
    brand: "LG",
    categorySlug: "accessories",
    price: 280000,
    shortDescription: "The perfect Mac companion.",
    fullDescription:
      "27-inch 5K UltraFine with P3 color and 94W power delivery over a single Thunderbolt cable.",
    warranty: "1 year local warranty",
    delivery: "48–72h · COD available",
    isFeatured: true,
    tags: "lg,display,5k,mac",
    quantity: 7,
    specs: {
      Display: "27-inch IPS (5120x2880)",
      Brightness: "500 nits",
      "Color Gamut": "DCI-P3 99%",
      Ports: "1x Thunderbolt 3 (94W PD), 3x USB-C",
      Features: "Built-in camera, microphone, and stereo speakers",
    },
    images: [
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800",
    ],
  },
];

// ---------------------------------------------------------------------------
// Seed runners
// ---------------------------------------------------------------------------

async function seedCategories() {
  console.log("→ Categories");
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        isActive: true,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        isActive: true,
      },
    });
  }
}

async function seedAdmin() {
  console.log("→ Admin user");
  const email = "admin@novatech.dz";
  const passwordHash = await hash("Admin123!", 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "NovaTech Admin",
      password: passwordHash,
      role: "ADMIN",
    },
    create: {
      name: "NovaTech Admin",
      email,
      password: passwordHash,
      role: "ADMIN",
    },
  });
}

async function seedCustomerDemo() {
  console.log("→ Demo customer");
  const email = "customer@novatech.dz";
  const passwordHash = await hash("Customer123!", 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "Demo Customer",
      password: passwordHash,
      role: "CUSTOMER",
    },
    create: {
      name: "Demo Customer",
      email,
      password: passwordHash,
      role: "CUSTOMER",
    },
  });
}

async function seedProducts() {
  console.log("→ Products");

  const allCategories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(allCategories.map((c) => [c.slug, c.id]));

  for (const p of products) {
    const categoryId = categoryMap[p.categorySlug];
    if (!categoryId) {
      throw new Error(`Missing category: ${p.categorySlug}`);
    }

    const slug = slugify(p.name);
    const qty = p.quantity;
    const status = inventoryStatus(qty);

    const existing = await prisma.product.findUnique({ where: { slug } });

    if (existing) {
      await prisma.productImage.deleteMany({ where: { productId: existing.id } });
      await prisma.productSpecification.deleteMany({
        where: { productId: existing.id },
      });
      await prisma.inventory.deleteMany({ where: { productId: existing.id } });

      await prisma.product.update({
        where: { id: existing.id },
        data: {
          name: p.name,
          brand: p.brand,
          price: p.price,
          discount: p.discount ?? null,
          shortDescription: p.shortDescription,
          fullDescription: p.fullDescription,
          warranty: p.warranty ?? "1 year local warranty",
          delivery: p.delivery ?? "48–72h major wilayas · COD available",
          seoTitle: `${p.name} | NovaTech Algeria`,
          seoDescription: p.shortDescription,
          tags: p.tags ?? null,
          isFeatured: p.isFeatured ?? false,
          status: "PUBLISHED",
          categoryId,
          images: {
            create: p.images.map((url, idx) => ({
              url,
              alt: p.name,
              isPrimary: idx === 0,
              order: idx,
            })),
          },
          inventory: {
            create: {
              quantity: qty,
              reserved: 0,
              status,
            },
          },
          specifications: {
            create: Object.entries(p.specs).map(([name, value]) => ({
              name,
              value,
            })),
          },
        },
      });
      console.log(`  updated: ${p.name}`);
    } else {
      await prisma.product.create({
        data: {
          name: p.name,
          slug,
          brand: p.brand,
          price: p.price,
          discount: p.discount ?? null,
          shortDescription: p.shortDescription,
          fullDescription: p.fullDescription,
          warranty: p.warranty ?? "1 year local warranty",
          delivery: p.delivery ?? "48–72h major wilayas · COD available",
          seoTitle: `${p.name} | NovaTech Algeria`,
          seoDescription: p.shortDescription,
          tags: p.tags ?? null,
          isFeatured: p.isFeatured ?? false,
          status: "PUBLISHED",
          categoryId,
          images: {
            create: p.images.map((url, idx) => ({
              url,
              alt: p.name,
              isPrimary: idx === 0,
              order: idx,
            })),
          },
          inventory: {
            create: {
              quantity: qty,
              reserved: 0,
              status,
            },
          },
          specifications: {
            create: Object.entries(p.specs).map(([name, value]) => ({
              name,
              value,
            })),
          },
        },
      });
      console.log(`  created: ${p.name}`);
    }
  }
}

async function seedCoupons() {
  console.log("→ Coupons");
  await prisma.coupon.upsert({
    where: { code: "NOVA10" },
    update: {
      discountType: "PERCENTAGE",
      discountValue: 10,
      minOrderValue: 50000,
      maxUses: 1000,
      isActive: true,
    },
    create: {
      code: "NOVA10",
      discountType: "PERCENTAGE",
      discountValue: 10,
      minOrderValue: 50000,
      maxUses: 1000,
      usedCount: 0,
      isActive: true,
    },
  });
}

async function seedBanners() {
  console.log("→ Banners");
  const existing = await prisma.banner.count();
  if (existing > 0) {
    console.log("  skipped (banners already exist)");
    return;
  }

  await prisma.banner.createMany({
    data: [
      {
        title: "Engineered for excellence",
        subtitle: "Premium tech, curated for Algeria — cash on delivery.",
        imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
        linkUrl: "/shop",
        position: "HERO",
        isActive: true,
        order: 0,
      },
      {
        title: "Studio audio week",
        subtitle: "Up to 15% on selected headphones.",
        imageUrl:
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1600",
        linkUrl: "/shop?category=audio",
        position: "PROMO",
        isActive: true,
        order: 1,
      },
    ],
  });
}

async function seedSettings() {
  console.log("→ Store settings");
  const settings: { key: string; value: string; description: string }[] = [
    {
      key: "store_name",
      value: "NovaTech",
      description: "Public store name",
    },
    {
      key: "currency",
      value: "DZD",
      description: "Display currency code",
    },
    {
      key: "currency_label",
      value: "DA",
      description: "Short currency label for UI",
    },
    {
      key: "support_email",
      value: "support@novatech.dz",
      description: "Customer support email",
    },
    {
      key: "support_phone",
      value: "+213 555 00 00 00",
      description: "Customer support phone",
    },
    {
      key: "cod_enabled",
      value: "true",
      description: "Cash on delivery enabled",
    },
    {
      key: "free_shipping_threshold",
      value: "150000",
      description: "Free shipping above this subtotal (DZD)",
    },
  ];

  for (const s of settings) {
    await prisma.storeSettings.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
}

async function main() {
  console.log("🌱 NovaTech seed starting...\n");

  await seedCategories();
  await seedAdmin();
  await seedCustomerDemo();
  await seedProducts();
  await seedCoupons();
  await seedBanners();
  await seedSettings();

  console.log("\n✅ Seed complete.");
  console.log("────────────────────────────────────");
  console.log("Admin:    admin@novatech.dz / Admin123!");
  console.log("Customer: customer@novatech.dz / Customer123!");
  console.log(`Products: ${products.length}`);
  console.log("────────────────────────────────────");
  console.log("Change these passwords before any public deploy.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });