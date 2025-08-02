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
    name: 'Advanced Photosynthesis Process',
    description: 'Immersive 3D simulation showing light and dark reactions, chloroplast structure, and real-time environmental monitoring.',
    chapterId: 1,
    type: 'simulation',
    duration: '12 min',
    difficulty: 4,
    keyPoints: [
      'Light reactions occur in thylakoid membranes',
      'Dark reactions (Calvin cycle) occur in stroma',
      'Chlorophyll a and b absorb different wavelengths',
      'Stomatal regulation controls gas exchange',
      'Environmental factors affect photosynthetic rate',
      'ATP and NADPH are energy carriers'
    ]
  },
  {
    id: 'respiration',
    name: 'Cellular Respiration Pathway',
    description: 'Detailed visualization of glycolysis, Krebs cycle, and electron transport chain with ATP production tracking.',
    chapterId: 1,
    type: 'simulation',
    duration: '15 min',
    difficulty: 4,
    keyPoints: [
      'Glycolysis: glucose → 2 pyruvate + 2 ATP',
      'Krebs cycle: acetyl-CoA → CO₂ + NADH + FADH₂',
      'Electron transport: NADH/FADH₂ → ATP via chemiosmosis',
      'Oxygen is the final electron acceptor',
      'Total yield: 36-38 ATP per glucose molecule',
      'Anaerobic respiration produces less ATP'
    ]
  },
  {
    id: 'heart-circulation',
    name: '3D Heart and Circulation System',
    description: 'Interactive 3D heart model showing cardiac cycle, blood flow patterns, and pressure changes throughout circulation.',
    chapterId: 1,
    type: 'simulation',
    duration: '18 min',
    difficulty: 3,
    keyPoints: [
      'Cardiac cycle: systole (contraction) and diastole (relaxation)',
      'Pulmonary circulation: right heart → lungs → left heart',
      'Systemic circulation: left heart → body → right heart',
      'Heart valves prevent backflow of blood',
      'Blood pressure varies throughout cardiac cycle',
      'Coronary circulation supplies heart muscle'
    ]
  },
  {
    id: 'digestive-system',
    name: 'Complete Digestive Process',
    description: 'Journey through the digestive tract with enzyme action, nutrient absorption, and waste elimination processes.',
    chapterId: 1,
    type: 'simulation',
    duration: '20 min',
    difficulty: 3,
    keyPoints: [
      'Mechanical digestion: chewing, churning, segmentation',
      'Chemical digestion: enzymes break down macromolecules',
      'Stomach: protein digestion begins with pepsin',
      'Small intestine: most digestion and absorption occurs',
      'Liver: produces bile for fat emulsification',
      'Large intestine: water absorption and feces formation'
    ]
  },
  {
    id: 'kidney-function',
    name: 'Nephron Structure and Function',
    description: 'Microscopic view of nephron showing filtration, reabsorption, secretion, and urine concentration mechanisms.',
    chapterId: 1,
    type: 'simulation',
    duration: '16 min',
    difficulty: 4,
    keyPoints: [
      'Glomerular filtration: blood pressure drives filtration',
      'Tubular reabsorption: recovers useful substances',
      'Tubular secretion: removes additional waste',
      'Counter-current mechanism concentrates urine',
      'ADH regulates water reabsorption',
      'Aldosterone regulates sodium reabsorption'
    ]
  },
  {
    id: 'cell-division',
    name: 'Mitosis and Cell Division',
    description: 'Real-time visualization of cell division phases with chromosome movement, spindle formation, and cytokinesis.',
    chapterId: 1,
    type: 'simulation',
    duration: '14 min',
    difficulty: 4,
    keyPoints: [
      'Interphase: cell growth and DNA replication',
      'Prophase: chromosome condensation and nuclear envelope breakdown',
      'Metaphase: chromosomes align at cell equator',
      'Anaphase: sister chromatids separate and move to poles',
      'Telophase: nuclear envelopes reform around chromosomes',
      'Cytokinesis: cytoplasm divides to form two daughter cells'
    ]
  },

  // Chapter 2: Control and Coordination
  {
    id: 'reflex-arc',
    name: 'Neural Reflex Arc Mechanism',
    description: 'High-definition visualization of reflex pathway from stimulus detection to motor response with nerve impulse tracking.',
    chapterId: 2,
    type: 'simulation',
    duration: '10 min',
    difficulty: 3,
    keyPoints: [
      'Reflex arc components: receptor, sensory neuron, interneuron, motor neuron, effector',
      'Stimulus detection by specialized receptors',
      'Nerve impulse transmission via action potentials',
      'Spinal cord integration bypasses brain for speed',
      'Motor response occurs within milliseconds',
      'Examples: withdrawal reflex, knee-jerk reflex'
    ]
  },
  {
    id: 'brain-structure',
    name: 'Interactive Brain Anatomy',
    description: '3D brain model with clickable regions showing functions, neural pathways, and real-time activity monitoring.',
    chapterId: 2,
    type: 'interactive',
    duration: '16 min',
    difficulty: 4,
    keyPoints: [
      'Cerebrum: higher cognitive functions and voluntary movements',
      'Cerebellum: balance, coordination, and motor learning',
      'Brain stem: vital functions like breathing and heart rate',
      'Hypothalamus: hormone regulation and homeostasis',
      'Limbic system: emotions, memory, and behavior',
      'Neural plasticity allows brain adaptation'
    ]
  },
  {
    id: 'plant-tropisms',
    name: 'Plant Movement and Tropisms',
    description: 'Time-lapse simulation of plant responses to light, gravity, touch, and water with auxin distribution visualization.',
    chapterId: 2,
    type: 'simulation',
    duration: '12 min',
    difficulty: 3,
    keyPoints: [
      'Phototropism: growth response to light direction',
      'Geotropism: response to gravitational force',
      'Hydrotropism: growth toward water sources',
      'Thigmotropism: response to touch or contact',
      'Auxin hormone mediates tropistic responses',
      'Differential growth causes bending movements'
    ]
  },
  {
    id: 'neuron-transmission',
    name: 'Nerve Impulse Transmission',
    description: 'Molecular-level view of action potential generation, propagation, and synaptic transmission between neurons.',
    chapterId: 2,
    type: 'simulation',
    duration: '14 min',
    difficulty: 4,
    keyPoints: [
      'Resting potential: -70mV maintained by sodium-potassium pump',
      'Depolarization: sodium channels open, membrane potential rises',
      'Action potential: all-or-nothing electrical signal',
      'Repolarization: potassium channels restore resting potential',
      'Synaptic transmission: neurotransmitters cross synaptic cleft',
      'Myelination increases conduction velocity'
    ]
  },

  // Chapter 3: How Do Organisms Reproduce?
  {
    id: 'flower-structure',
    name: 'Flower Anatomy and Pollination',
    description: 'Detailed 3D flower model showing reproductive parts, pollination mechanisms, and fertilization process.',
    chapterId: 3,
    type: 'simulation',
    duration: '15 min',
    difficulty: 3,
    keyPoints: [
      'Stamen: male reproductive organ (anther + filament)',
      'Pistil: female reproductive organ (stigma + style + ovary)',
      'Pollination: transfer of pollen from anther to stigma',
      'Self-pollination vs cross-pollination advantages',
      'Pollinating agents: insects, wind, water, animals',
      'Double fertilization unique to flowering plants'
    ]
  },
  {
    id: 'human-reproduction',
    name: 'Human Reproductive Biology',
    description: 'Comprehensive simulation of male and female reproductive systems, menstrual cycle, and embryonic development.',
    chapterId: 3,
    type: 'simulation',
    duration: '25 min',
    difficulty: 4,
    keyPoints: [
      'Male system: sperm production in seminiferous tubules',
      'Female system: ovarian and uterine cycles coordination',
      'Hormonal regulation: FSH, LH, estrogen, progesterone',
      'Fertilization: sperm-egg fusion in fallopian tube',
      'Implantation: blastocyst attachment to endometrium',
      'Placental development and fetal nourishment'
    ]
  },
  {
    id: 'asexual-reproduction',
    name: 'Asexual Reproduction Strategies',
    description: 'Interactive examples of binary fission, budding, fragmentation, spore formation, and vegetative propagation.',
    chapterId: 3,
    type: 'simulation',
    duration: '18 min',
    difficulty: 2,
    keyPoints: [
      'Binary fission: single cell divides into two (bacteria, amoeba)',
      'Budding: outgrowth develops into new individual (hydra, yeast)',
      'Fragmentation: body breaks into pieces, each regenerates',
      'Spore formation: specialized reproductive cells (fungi)',
      'Vegetative propagation: new plants from vegetative parts',
      'Advantages: rapid reproduction, no mate required'
    ]
  },
  {
    id: 'reproductive-health',
    name: 'Reproductive Health and Contraception',
    description: 'Educational simulation covering reproductive health, contraceptive methods, and sexually transmitted infections.',
    chapterId: 3,
    type: 'interactive',
    duration: '20 min',
    difficulty: 3,
    keyPoints: [
      'Contraceptive methods: barrier, hormonal, surgical',
      'Family planning importance for population control',
      'STI prevention and safe practices',
      'Reproductive health maintenance',
      'Prenatal care and maternal health',
      'Adolescent reproductive health awareness'
    ]
  },

  // Chapter 4: Heredity and Evolution
  {
    id: 'mendel-experiments',
    name: 'Mendel\'s Genetic Experiments',
    description: 'Interactive Punnett squares, monohybrid and dihybrid crosses with statistical analysis and trait prediction.',
    chapterId: 4,
    type: 'experiment',
    duration: '18 min',
    difficulty: 4,
    keyPoints: [
      'Law of dominance: dominant alleles mask recessive alleles',
      'Law of segregation: allele pairs separate during gamete formation',
      'Law of independent assortment: genes for different traits assort independently',
      'Monohybrid cross: 3:1 phenotypic ratio in F2 generation',
      'Dihybrid cross: 9:3:3:1 phenotypic ratio in F2 generation',
      'Test cross determines unknown genotype'
    ]
  },
  {
    id: 'dna-inheritance',
    name: 'DNA Structure and Inheritance',
    description: 'Molecular visualization of DNA replication, gene expression, and trait inheritance patterns across generations.',
    chapterId: 4,
    type: 'simulation',
    duration: '16 min',
    difficulty: 4,
    keyPoints: [
      'DNA double helix structure with complementary base pairing',
      'Semi-conservative DNA replication mechanism',
      'Gene expression: transcription and translation',
      'Chromosomal basis of inheritance',
      'Sex-linked inheritance patterns',
      'Genetic variation through crossing over and independent assortment'
    ]
  },
  {
    id: 'genetic-engineering',
    name: 'Genetic Engineering Techniques',
    description: 'Step-by-step simulation of recombinant DNA technology, gene cloning, and biotechnology applications.',
    chapterId: 4,
    type: 'simulation',
    duration: '22 min',
    difficulty: 5,
    keyPoints: [
      'Restriction enzymes cut DNA at specific sequences',
      'DNA ligase joins DNA fragments together',
      'Plasmid vectors carry foreign genes into host cells',
      'Transformation introduces recombinant DNA into bacteria',
      'Gene expression produces desired proteins',
      'Applications: insulin production, gene therapy, GMOs'
    ]
  },
  {
    id: 'evolution-mechanisms',
    name: 'Evolution and Natural Selection',
    description: 'Dynamic simulation showing evolutionary processes, speciation, and adaptation over multiple generations.',
    chapterId: 4,
    type: 'simulation',
    duration: '20 min',
    difficulty: 4,
    keyPoints: [
      'Natural selection favors advantageous traits',
      'Genetic variation provides raw material for evolution',
      'Environmental pressures drive evolutionary change',
      'Speciation occurs through reproductive isolation',
      'Evidence for evolution: fossils, comparative anatomy, molecular biology',
      'Human evolution and common ancestry'
    ]
  },

  // Chapter 5: Our Environment
  {
    id: 'food-chains',
    name: 'Food Webs and Energy Flow',
    description: 'Interactive ecosystem simulation showing energy transfer, trophic levels, and ecological pyramids.',
    chapterId: 5,
    type: 'interactive',
    duration: '14 min',
    difficulty: 2,
    keyPoints: [
      'Producers convert solar energy to chemical energy',
      'Primary consumers (herbivores) eat producers',
      'Secondary and tertiary consumers are carnivores',
      '10% rule: only 10% of energy transfers between levels',
      'Food webs show complex feeding relationships',
      'Decomposers recycle nutrients back to ecosystem'
    ]
  },
  {
    id: 'ecosystem-balance',
    name: 'Ecosystem Dynamics and Balance',
    description: 'Comprehensive simulation of ecosystem interactions, population dynamics, and environmental impact assessment.',
    chapterId: 5,
    type: 'simulation',
    duration: '18 min',
    difficulty: 3,
    keyPoints: [
      'Biodiversity maintains ecosystem stability',
      'Predator-prey relationships control population sizes',
      'Carrying capacity limits population growth',
      'Human activities disrupt natural balance',
      'Conservation strategies protect ecosystems',
      'Climate change affects global ecosystems'
    ]
  },
  {
    id: 'pollution-effects',
    name: 'Environmental Pollution Impact',
    description: 'Real-time simulation showing effects of air, water, and soil pollution on living organisms and ecosystems.',
    chapterId: 5,
    type: 'simulation',
    duration: '16 min',
    difficulty: 3,
    keyPoints: [
      'Air pollution: greenhouse gases, acid rain, ozone depletion',
      'Water pollution: industrial waste, agricultural runoff, sewage',
      'Soil pollution: pesticides, heavy metals, plastic waste',
      'Bioaccumulation and biomagnification of toxins',
      'Health effects on humans and wildlife',
      'Pollution control and prevention strategies'
    ]
  },

  // Chapter 6: Management of Natural Resources
  {
    id: 'forest-conservation',
    name: 'Forest Ecosystem Management',
    description: 'Interactive forest simulation showing sustainable harvesting, reforestation, and biodiversity conservation.',
    chapterId: 6,
    type: 'simulation',
    duration: '15 min',
    difficulty: 3,
    keyPoints: [
      'Forests provide oxygen, timber, and habitat',
      'Deforestation causes habitat loss and climate change',
      'Sustainable forestry practices maintain forest health',
      'Reforestation and afforestation restore forests',
      'Forest fires: natural vs human-caused',
      'Community involvement in forest conservation'
    ]
  },
  {
    id: 'water-management',
    name: 'Water Resource Conservation',
    description: 'Comprehensive water cycle simulation with conservation strategies, pollution control, and sustainable usage.',
    chapterId: 6,
    type: 'simulation',
    duration: '17 min',
    difficulty: 3,
    keyPoints: [
      'Water cycle: evaporation, condensation, precipitation',
      'Freshwater scarcity affects billions of people',
      'Groundwater depletion and contamination',
      'Water conservation techniques and technologies',
      'Wastewater treatment and recycling',
      'Watershed management and protection'
    ]
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy Systems',
    description: 'Interactive simulation of solar, wind, hydro, and biomass energy systems with efficiency comparisons.',
    chapterId: 6,
    type: 'simulation',
    duration: '19 min',
    difficulty: 4,
    keyPoints: [
      'Solar energy: photovoltaic and thermal systems',
      'Wind energy: turbine design and efficiency',
      'Hydroelectric power: dams and environmental impact',
      'Biomass energy: sustainable fuel production',
      'Geothermal energy: earth\'s internal heat',
      'Energy storage and grid integration challenges'
    ]
  },
  {
    id: 'sustainable-development',
    name: 'Sustainable Development Goals',
    description: 'Comprehensive simulation showing balance between economic development, environmental protection, and social equity.',
    chapterId: 6,
    type: 'interactive',
    duration: '21 min',
    difficulty: 4,
    keyPoints: [
      'Three pillars: economic, environmental, social sustainability',
      'Renewable vs non-renewable resource management',
      'Circular economy principles and practices',
      'Green technology and innovation',
      'Community-based conservation programs',
      'Global cooperation for sustainable future'
    ]
  }
];