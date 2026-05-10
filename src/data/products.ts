import excavator from "@/assets/excavator.jpg";
import bulldozer from "@/assets/bulldozer.jpg";
import loader from "@/assets/loader.jpg";
import crane from "@/assets/crane.jpg";

export type Category = "Excavators" | "Loaders" | "Cranes" | "Dozers";

export interface Product {
  id: string;
  name: string;
  category: Category;
  image: string;
  shortDesc: string;
  longDesc: string;
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "ex-titan-900",
    name: "Titan X900 Excavator",
    category: "Excavators",
    image: excavator,
    shortDesc: "40-Ton class heavy excavator designed for deep mining and quarry operations.",
    longDesc: "The Titan X900 represents the pinnacle of hydraulic excavation. Engineered with a Tri-Core smart hydraulic system, it recovers kinetic energy during swing deceleration to boost fuel efficiency by 20%. The high-tensile steel boom can easily handle relentless impacts in the harshest mining environments.",
    specs: [
      { label: "Operating Weight", value: "41,500 kg" },
      { label: "Engine Power", value: "320 HP" },
      { label: "Bucket Capacity", value: "2.1 m³" },
      { label: "Max Dig Depth", value: "7.5 m" }
    ]
  },
  {
    id: "ld-omega-50",
    name: "Omega 50 Loader",
    category: "Loaders",
    image: loader,
    shortDesc: "High-capacity wheel loader with superior breakout force and payload stability.",
    longDesc: "Built for massive earthmoving tasks, the Omega 50 Loader features a planetary powershift transmission and a Z-bar linkage that delivers unmatched breakout force. The cabin provides 360-degree augmented visibility, keeping operators safe and efficient even in low-light conditions.",
    specs: [
      { label: "Operating Weight", value: "24,000 kg" },
      { label: "Engine Power", value: "260 HP" },
      { label: "Payload Capacity", value: "8,500 kg" },
      { label: "Dump Clearance", value: "3.2 m" }
    ]
  },
  {
    id: "dz-forge-d9",
    name: "Forge D9 Dozer",
    category: "Dozers",
    image: bulldozer,
    shortDesc: "Heavy-duty crawler dozer built to rip through bedrock and push massive volumes.",
    longDesc: "The Forge D9 is synonymous with unstoppable pushing power. Its elevated sprocket design isolates the final drives from ground impacts, massively increasing durability. The SU-blade design is optimized for heavy material retention, making it the king of the quarry.",
    specs: [
      { label: "Operating Weight", value: "49,000 kg" },
      { label: "Engine Power", value: "450 HP" },
      { label: "Blade Capacity", value: "16.4 m³" },
      { label: "Track Gauge", value: "2,250 mm" }
    ]
  },
  {
    id: "cr-apex-120",
    name: "Apex 120 Mobile Crane",
    category: "Cranes",
    image: crane,
    shortDesc: "All-terrain 120-ton capacity crane featuring a 6-section telescopic boom.",
    longDesc: "When lifting massive structures requires surgical precision, the Apex 120 delivers. It features a state-of-the-art fly-by-wire load moment indicator and active suspension for unmatched stability on rough terrain. It can lift 120 tons with zero structural flex.",
    specs: [
      { label: "Max Lift Capacity", value: "120 Tons" },
      { label: "Main Boom Length", value: "66 m" },
      { label: "Engine Power", value: "530 HP" },
      { label: "Drive System", value: "10x8x10 All-Wheel" }
    ]
  }
];
