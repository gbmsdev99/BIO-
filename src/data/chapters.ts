export interface Chapter {
  id: number;
  title: string;
  description: string;
  topics: string[];
  simulations: number;
  difficulty: number;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Life Processes",
    description: "Explore the fundamental processes that sustain life including nutrition, respiration, transportation, and excretion through detailed simulations.",
    topics: [
      "Nutrition in Plants - Photosynthesis",
      "Nutrition in Animals - Digestion",
      "Respiration - Aerobic and Anaerobic",
      "Transportation in Plants and Animals",
      "Excretion in Humans",
      "Control and Coordination"
    ],
    simulations: 8,
    difficulty: 4
  },
  {
    id: 2,
    title: "Control and Coordination",
    description: "Understand how organisms respond to their environment through nervous and hormonal coordination systems.",
    topics: [
      "Nervous System in Humans",
      "Reflex Actions and Reflex Arc",
      "Human Brain Structure",
      "Coordination in Plants",
      "Hormones in Animals",
      "Plant Hormones and Tropisms"
    ],
    simulations: 6,
    difficulty: 4
  },
  {
    id: 3,
    title: "How Do Organisms Reproduce?",
    description: "Discover the fascinating world of reproduction from asexual reproduction to human reproductive systems and sexual reproduction in plants.",
    topics: [
      "Asexual Reproduction",
      "Sexual Reproduction in Plants",
      "Human Reproductive System",
      "Reproductive Health",
      "Population Control Methods"
    ],
    simulations: 7,
    difficulty: 3
  },
  {
    id: 4,
    title: "Heredity and Evolution",
    description: "Learn about inheritance patterns, Mendel's laws, and the process of evolution through natural selection.",
    topics: [
      "Heredity and Inheritance",
      "Mendel's Laws of Inheritance",
      "Sex Determination",
      "Evolution and Natural Selection",
      "Speciation and Classification"
    ],
    simulations: 5,
    difficulty: 4
  },
  {
    id: 5,
    title: "Our Environment",
    description: "Explore ecosystems, food chains, environmental problems, and the delicate balance of nature.",
    topics: [
      "Ecosystems and Food Chains",
      "Energy Flow in Ecosystems",
      "Environmental Problems",
      "Natural Resource Management",
      "Waste Management"
    ],
    simulations: 4,
    difficulty: 3
  },
  {
    id: 6,
    title: "Management of Natural Resources",
    description: "Understand sustainable development and conservation of forests, water, and coal & petroleum resources.",
    topics: [
      "Natural Resource Management",
      "Forest Conservation",
      "Water Resource Management",
      "Coal and Petroleum Conservation",
      "Sustainable Development"
    ],
    simulations: 3,
    difficulty: 3
  }
];