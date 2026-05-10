import crane from "@/assets/crane.jpg";
import bulldozer from "@/assets/bulldozer.jpg";
import loader from "@/assets/loader.jpg";

export type Capability = {
  id: string;
  tag: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  features: {
    title: string;
    desc: string;
  }[];
};

export const capabilities: Capability[] = [
  {
    id: "lift-systems",
    tag: "Lift Systems",
    title: "Heavy Tower Cranes",
    shortDesc: "Tower & crawler cranes for skylines, ports, and energy infrastructure.",
    longDesc: "Our heavy lift systems are engineered to conquer gravity itself. Designed with high-tensile steel lattices and advanced counterweight algorithms, these cranes offer unmatched stability at extreme altitudes. Whether assembling skyscrapers in hurricane-prone zones or moving reactor cores in energy plants, our lift systems provide precision control under immense structural stress.",
    image: crane,
    features: [
      { title: "Dynamic Counter-Balancing", desc: "Automated ballast shift systems that calculate load distribution in real-time." },
      { title: "Vortex Shedding Lattices", desc: "Aerodynamic crane booms designed to neutralize high-altitude crosswinds." },
      { title: "Micro-Tension Hoists", desc: "Variable frequency drives allowing millimeter-precise load placements." },
      { title: "Seismic Base Locking", desc: "Hydraulic anchoring systems that rapidly secure the base during seismic events." }
    ]
  },
  {
    id: "earthmoving",
    tag: "Earthmoving",
    title: "Dozers & Graders",
    shortDesc: "Track-mounted earthworks built for mining, dam, and pipeline operations.",
    longDesc: "When the geography of the earth needs to be rewritten, our earthmoving fleet is deployed. We forge our track systems from military-grade titanium alloys to ensure zero wear in abrasive environments. Our dozers and graders employ smart blade technology, utilizing GPS and AR telemetry to cut grades with laser-level accuracy, vastly accelerating major infrastructure projects.",
    image: bulldozer,
    features: [
      { title: "Smart Blade Telemetry", desc: "GPS-linked hydraulics that automatically adjust blade pitch to match 3D site plans." },
      { title: "Titanium Alloy Tracks", desc: "Undercarriages forged for absolute resistance to highly abrasive silicate soils." },
      { title: "Hydrostatic Drives", desc: "Continuous power delivery to both tracks for maximum push force without stalling." },
      { title: "Vibration Isosuspension", desc: "Advanced cabin isolation reducing operator fatigue by 85% during continuous operation." }
    ]
  },
  {
    id: "materials-handling",
    tag: "Materials Handling",
    title: "Loaders & Haulers",
    shortDesc: "Wheel loaders, articulated trucks, and mining haulers from 12T to 240T.",
    longDesc: "Efficiency at scale. Our materials handling fleet is the circulatory system of the world's largest open-pit mines and quarries. Featuring variable-geometry turbocharging and kinetic energy recovery systems, these machines move massive tonnage while aggressively cutting fuel consumption. The articulated joints are stress-tested to 500,000 cycles, ensuring they never fail in the field.",
    image: loader,
    features: [
      { title: "Kinetic Recovery Brakes", desc: "Captures energy during downhill braking and stores it in supercapacitors." },
      { title: "Z-Bar Linkage", desc: "Optimized lifting geometry providing maximum breakout force at ground level." },
      { title: "Omni-Articulated Chassis", desc: "Allows full power transfer to all wheels even when the chassis is twisted at extreme angles." },
      { title: "Automated Load Weighing", desc: "Sensors in the boom that instantly calculate payload mass to prevent overloading." }
    ]
  }
];
