export interface Simulation {
  id: string;
  name: string;
  description: string;
  chapterId: number;
  type: 'simulation' | 'experiment' | 'interactive';
  duration: string;
  difficulty: number;
  keyPoints?: string[];
}

export const simulations: Simulation[] = [
  // Chapter 1: Life Processes
  {
    id: 'photosynthesis',
    name: 'Photosynthesis Process',
    description: 'Interactive simulation showing the complete process of photosynthesis with light absorption, water uptake, and glucose production.',
    chapterId: 1,
    type: 'simulation',
    duration: '8 min',
    difficulty: 4,
    keyPoints: [
      'Chlorophyll absorbs light energy in chloroplasts',
      'Water is absorbed by roots and transported to leaves',
      'CO₂ enters through stomata during the day',
      'Light energy converts CO₂ + H₂O into glucose and oxygen',
      'Oxygen is released as a byproduct through stomata',
      'Glucose is used for energy or stored as starch'
    ]
  },
  {
    id: 'respiration',
    name: 'Cellular Respiration',
    description: 'Step-by-step breakdown of glucose to release energy through glycolysis, Krebs cycle, and electron transport chain.',
    chapterId: 1,
    type: 'simulation',
    duration: '10 min',
    difficulty: 4,
    keyPoints: [
      'Glycolysis occurs in cytoplasm, produces 2 ATP',
      'Krebs cycle occurs in mitochondria matrix',
      'Electron transport chain produces maximum ATP (32)',
      'Total energy yield: 36 ATP molecules per glucose',
      'Aerobic respiration requires oxygen',
      'Anaerobic respiration occurs without oxygen'
    ]
  },
  {
    id: 'heart-circulation',
    name: 'Heart and Blood Circulation',
    description: 'Animated model of the human heart showing systole, diastole, and blood circulation through pulmonary and systemic circuits.',
    chapterId: 1,
    type: 'simulation',
    duration: '12 min',
    difficulty: 3,
    keyPoints: [
      'Heart has four chambers: 2 atria, 2 ventricles',
      'Systole: heart contracts, pumps blood out',
      'Diastole: heart relaxes, fills with blood',
      'Pulmonary circulation: heart ↔ lungs',
      'Systemic circulation: heart ↔ body organs',
      'Blood pressure varies with cardiac cycle'
    ]
  },
  {
    id: 'digestive-system',
    name: 'Human Digestive System',
    description: 'Follow food through the digestive tract with enzyme action, absorption, and waste elimination.',
    chapterId: 1,
    type: 'simulation',
    duration: '15 min',
    difficulty: 3,
    keyPoints: [
      'Mechanical and chemical digestion occur',
      'Saliva contains amylase for starch breakdown',
      'Stomach acid activates pepsin for protein digestion',
      'Small intestine: maximum absorption occurs here',
      'Liver produces bile for fat emulsification',
      'Large intestine absorbs water and forms feces'
    ]
  },
  {
    id: 'kidney-function',
    name: 'Kidney and Nephron Function',
    description: 'Detailed look at nephron structure and urine formation through filtration, reabsorption, and secretion.',
    chapterId: 1,
    type: 'simulation',
    duration: '10 min',
    difficulty: 4,
    keyPoints: [
      'Nephron is the functional unit of kidney',
      'Glomerular filtration removes waste from blood',
      'Tubular reabsorption recovers useful substances',
      'Tubular secretion eliminates additional waste',
      'ADH hormone regulates water reabsorption',
      'Urine concentration varies with body hydration'
    ]
  },

  // Chapter 2: Control and Coordination
  {
    id: 'reflex-arc',
    name: 'Reflex Arc Mechanism',
    description: 'Interactive demonstration of reflex action pathway from stimulus detection to motor response.',
    chapterId: 2,
    type: 'simulation',
    duration: '8 min',
    difficulty: 3,
    keyPoints: [
      'Reflex arc bypasses brain for quick response',
      'Sensory neuron detects stimulus',
      'Spinal cord processes information',
      'Motor neuron triggers muscle contraction',
      'Example: withdrawal reflex from hot object',
      'Involuntary and automatic response'
    ]
  },
  {
    id: 'brain-structure',
    name: 'Human Brain Structure',
    description: 'Explore different regions of the brain and their specific functions in controlling body activities.',
    chapterId: 2,
    type: 'interactive',
    duration: '12 min',
    difficulty: 4,
    keyPoints: [
      'Cerebrum: thinking, memory, voluntary actions',
      'Cerebellum: balance and coordination',
      'Medulla: involuntary actions (breathing, heartbeat)',
      'Hypothalamus: hormone regulation, temperature',
      'Brain stem connects brain to spinal cord',
      'Left and right hemispheres have specialized functions'
    ]
  },
  {
    id: 'plant-tropisms',
    name: 'Plant Tropisms and Movements',
    description: 'Observe how plants respond to light, gravity, and touch through various tropistic movements.',
    chapterId: 2,
    type: 'simulation',
    duration: '10 min',
    difficulty: 3,
    keyPoints: [
      'Phototropism: growth towards light',
      'Geotropism: response to gravity',
      'Hydrotropism: growth towards water',
      'Thigmotropism: response to touch',
      'Auxin hormone controls tropistic movements',
      'Growth occurs by cell elongation'
    ]
  },

  // Chapter 3: How Do Organisms Reproduce?
  {
    id: 'flower-structure',
    name: 'Flower Structure and Pollination',
    description: 'Detailed exploration of flower parts and the process of pollination by insects and wind.',
    chapterId: 3,
    type: 'simulation',
    duration: '12 min',
    difficulty: 3,
    keyPoints: [
      'Stamens produce pollen (male gametes)',
      'Pistil contains ovules (female gametes)',
      'Pollination transfers pollen to stigma',
      'Self-pollination vs cross-pollination',
      'Insects, wind, water act as pollinating agents',
      'Fertilization occurs in the ovary'
    ]
  },
  {
    id: 'human-reproduction',
    name: 'Human Reproductive System',
    description: 'Comprehensive look at male and female reproductive systems, menstrual cycle, and fertilization.',
    chapterId: 3,
    type: 'simulation',
    duration: '20 min',
    difficulty: 4,
    keyPoints: [
      'Male system: testes produce sperm and testosterone',
      'Female system: ovaries produce eggs and hormones',
      'Menstrual cycle: 28-day reproductive cycle',
      'Fertilization occurs in fallopian tube',
      'Embryo implants in uterine wall',
      'Placenta nourishes developing fetus'
    ]
  },
  {
    id: 'asexual-reproduction',
    name: 'Asexual Reproduction Methods',
    description: 'Interactive examples of binary fission, budding, fragmentation, and spore formation.',
    chapterId: 3,
    type: 'simulation',
    duration: '15 min',
    difficulty: 2,
    keyPoints: [
      'Single parent produces genetically identical offspring',
      'Binary fission: splitting into two (Amoeba)',
      'Budding: outgrowth forms new individual (Hydra)',
      'Fragmentation: body breaks into pieces (Spirogyra)',
      'Spore formation: reproductive cells (Rhizopus)',
      'Faster reproduction, no genetic variation'
    ]
  },

  // Chapter 4: Heredity and Evolution
  {
    id: 'mendel-experiments',
    name: 'Mendel\'s Inheritance Laws',
    description: 'Interactive Punnett squares showing monohybrid and dihybrid crosses with trait inheritance.',
    chapterId: 4,
    type: 'experiment',
    duration: '15 min',
    difficulty: 4,
    keyPoints: [
      'Law of dominance: dominant traits mask recessive',
      'Law of segregation: alleles separate during gamete formation',
      'Law of independent assortment: traits inherit independently',
      'Monohybrid cross: single trait inheritance',
      'Dihybrid cross: two traits inheritance',
      'Genotype vs phenotype differences'
    ]
  },
  {
    id: 'dna-inheritance',
    name: 'DNA and Trait Inheritance',
    description: 'Visualize how DNA carries genetic information and how traits pass from parents to offspring.',
    chapterId: 4,
    type: 'simulation',
    duration: '12 min',
    difficulty: 4,
    keyPoints: [
      'DNA contains genetic information in genes',
      'Chromosomes carry many genes',
      'Alleles are different versions of genes',
      'Homologous chromosomes pair during meiosis',
      'Crossing over increases genetic variation',
      'Sex chromosomes determine gender (XY/XX)'
    ]
  },

  // Chapter 5: Our Environment
  {
    id: 'food-chains',
    name: 'Food Chains and Energy Flow',
    description: 'Build food chains and observe energy transfer through different trophic levels in ecosystems.',
    chapterId: 5,
    type: 'interactive',
    duration: '10 min',
    difficulty: 2,
    keyPoints: [
      'Producers convert solar energy to chemical energy',
      'Primary consumers eat producers (herbivores)',
      'Secondary consumers eat primary consumers',
      'Tertiary consumers are top predators',
      'Energy decreases at each trophic level (10% rule)',
      'Decomposers recycle nutrients back to ecosystem'
    ]
  },
  {
    id: 'ecosystem-balance',
    name: 'Ecosystem Balance and Biodiversity',
    description: 'Explore how different species interact and maintain ecological balance in various ecosystems.',
    chapterId: 5,
    type: 'simulation',
    duration: '15 min',
    difficulty: 3,
    keyPoints: [
      'Biodiversity maintains ecosystem stability',
      'Predator-prey relationships control populations',
      'Symbiotic relationships benefit organisms',
      'Human activities affect ecosystem balance',
      'Conservation protects endangered species',
      'Habitat destruction reduces biodiversity'
    ]
  }
];