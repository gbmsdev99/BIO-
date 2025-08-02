import React, { useEffect, useState } from 'react';
import { Dna, TrendingUp, Eye, Zap, Target } from 'lucide-react';

interface EvolutionSimulationProps {
  isPlaying: boolean;
}

const EvolutionSimulation: React.FC<EvolutionSimulationProps> = ({ isPlaying }) => {
  const [generation, setGeneration] = useState(1);
  const [population, setPopulation] = useState({
    advantageous: 20,
    neutral: 60,
    disadvantageous: 20
  });
  const [environmentalPressure, setEnvironmentalPressure] = useState('moderate');
  const [mutationRate, setMutationRate] = useState(5);
  const [fitnessScores, setFitnessScores] = useState({ high: 85, medium: 50, low: 15 });
  const [speciesCount, setSpeciesCount] = useState(1);

  const environments = {
    mild: { name: 'Mild Environment', pressure: 0.1, color: 'bg-green-400' },
    moderate: { name: 'Moderate Pressure', pressure: 0.3, color: 'bg-yellow-400' },
    harsh: { name: 'Harsh Environment', pressure: 0.6, color: 'bg-red-400' },
    extreme: { name: 'Extreme Conditions', pressure: 0.8, color: 'bg-purple-400' }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setGeneration(prev => prev + 1);
        
        // Simulate natural selection
        setPopulation(prev => {
          const pressure = environments[environmentalPressure as keyof typeof environments].pressure;
          const survivalRate = {
            advantageous: 1 - pressure * 0.2,
            neutral: 1 - pressure * 0.5,
            disadvantageous: 1 - pressure * 0.8
          };

          const newPop = {
            advantageous: Math.floor(prev.advantageous * survivalRate.advantageous * (1 + Math.random() * 0.3)),
            neutral: Math.floor(prev.neutral * survivalRate.neutral * (1 + Math.random() * 0.1)),
            disadvantageous: Math.floor(prev.disadvantageous * survivalRate.disadvantageous * (1 + Math.random() * 0.05))
          };

          // Mutations create new variants
          const mutations = Math.floor(mutationRate * (newPop.advantageous + newPop.neutral + newPop.disadvantageous) / 100);
          newPop.advantageous += Math.floor(mutations * 0.1);
          newPop.neutral += Math.floor(mutations * 0.7);
          newPop.disadvantageous += Math.floor(mutations * 0.2);

          return newPop;
        });

        // Update fitness scores based on environment
        setFitnessScores(prev => {
          const pressure = environments[environmentalPressure as keyof typeof environments].pressure;
          return {
            high: Math.max(60, 100 - pressure * 30),
            medium: Math.max(30, 70 - pressure * 40),
            low: Math.max(5, 40 - pressure * 50)
          };
        });

        // Speciation occurs under extreme pressure
        if (environmentalPressure === 'extreme' && generation % 5 === 0) {
          setSpeciesCount(prev => Math.min(prev + 1, 4));
        }

        // Cycle through environmental pressures
        if (generation % 10 === 0) {
          const pressures = ['mild', 'moderate', 'harsh', 'extreme'];
          const currentIndex = pressures.indexOf(environmentalPressure);
          setEnvironmentalPressure(pressures[(currentIndex + 1) % pressures.length]);
        }
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setGeneration(1);
      setPopulation({ advantageous: 20, neutral: 60, disadvantageous: 20 });
      setEnvironmentalPressure('moderate');
      setSpeciesCount(1);
    }
  }, [isPlaying, generation, environmentalPressure]);

  const totalPopulation = population.advantageous + population.neutral + population.disadvantageous;

  const renderOrganisms = () => {
    const organisms = [];
    const maxDisplay = 50;
    const scaleFactor = totalPopulation > maxDisplay ? maxDisplay / totalPopulation : 1;

    // Advantageous organisms (green)
    for (let i = 0; i < Math.floor(population.advantageous * scaleFactor); i++) {
      organisms.push(
        <div
          key={`adv-${i}`}
          className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '2s'
          }}
        />
      );
    }

    // Neutral organisms (blue)
    for (let i = 0; i < Math.floor(population.neutral * scaleFactor); i++) {
      organisms.push(
        <div
          key={`neu-${i}`}
          className="w-3 h-3 bg-blue-500 rounded-full"
        />
      );
    }

    // Disadvantageous organisms (red)
    for (let i = 0; i < Math.floor(population.disadvantageous * scaleFactor); i++) {
      organisms.push(
        <div
          key={`dis-${i}`}
          className="w-3 h-3 bg-red-500 rounded-full opacity-70"
        />
      );
    }

    return organisms;
  };

  return (
    <div className="h-96 bg-gradient-to-br from-amber-100 to-green-100 rounded-xl relative overflow-hidden shadow-2xl">
      {/* Environment indicator */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <div className="flex items-center space-x-2 mb-3">
          <Eye className="w-5 h-5 text-amber-500" />
          <h4 className="font-bold text-gray-800">Evolution Monitor</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Generation:</span>
            <span className="font-bold text-purple-600 text-lg">{generation}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Environment:</span>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
              environments[environmentalPressure as keyof typeof environments].color
            }`}>
              {environments[environmentalPressure as keyof typeof environments].name}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Species:</span>
            <span className="font-bold text-green-600">{speciesCount}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Total Population:</span>
            <span className="font-bold text-blue-600">{totalPopulation}</span>
          </div>
        </div>
      </div>

      {/* Population visualization */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-32 bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-xl">
          <h5 className="text-sm font-semibold text-gray-800 mb-3 text-center">Population Distribution</h5>
          <div className="grid grid-cols-10 gap-1">
            {renderOrganisms()}
          </div>
        </div>
      </div>

      {/* Fitness chart */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <h5 className="font-semibold text-gray-800 text-sm">Fitness Scores</h5>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">High Fitness:</span>
            <div className="flex items-center space-x-2">
              <div className="w-12 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${fitnessScores.high}%` }}
                />
              </div>
              <span className="font-mono text-xs">{fitnessScores.high}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600">Medium Fitness:</span>
            <div className="flex items-center space-x-2">
              <div className="w-12 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${fitnessScores.medium}%` }}
                />
              </div>
              <span className="font-mono text-xs">{fitnessScores.medium}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-600">Low Fitness:</span>
            <div className="flex items-center space-x-2">
              <div className="w-12 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${fitnessScores.low}%` }}
                />
              </div>
              <span className="font-mono text-xs">{fitnessScores.low}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Population statistics */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-semibold text-gray-800 mb-3 text-sm">Population Breakdown</h5>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Advantageous:</span>
            </div>
            <span className="font-bold text-green-600">
              {population.advantageous} ({Math.round(population.advantageous / totalPopulation * 100)}%)
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Neutral:</span>
            </div>
            <span className="font-bold text-blue-600">
              {population.neutral} ({Math.round(population.neutral / totalPopulation * 100)}%)
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Disadvantageous:</span>
            </div>
            <span className="font-bold text-red-600">
              {population.disadvantageous} ({Math.round(population.disadvantageous / totalPopulation * 100)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Evolutionary forces */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-semibold text-gray-800 mb-3 text-sm">Evolutionary Forces</h5>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <Target className="w-3 h-3 text-purple-500" />
            <span>Natural Selection</span>
          </div>
          <div className="flex items-center space-x-2">
            <Dna className="w-3 h-3 text-blue-500" />
            <span>Genetic Drift</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>Mutation Rate: {mutationRate}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span>Gene Flow</span>
          </div>
        </div>
      </div>

      {/* Environmental pressure visualization */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
        <div className={`w-4 h-24 rounded-full transition-all duration-1000 ${
          environments[environmentalPressure as keyof typeof environments].color
        }`}>
          <div 
            className="w-full bg-white/30 rounded-full transition-all duration-1000"
            style={{ 
              height: `${environments[environmentalPressure as keyof typeof environments].pressure * 100}%`,
              marginTop: `${(1 - environments[environmentalPressure as keyof typeof environments].pressure) * 100}%`
            }}
          />
        </div>
        <div className="text-xs text-center mt-2 font-semibold text-gray-700">
          Pressure
        </div>
      </div>

      {/* Mutation events */}
      {isPlaying && generation % 3 === 0 && (
        <div className="absolute top-1/2 right-8 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-2 animate-pulse shadow-lg">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-xs font-semibold text-yellow-800">Mutation Event!</span>
          </div>
        </div>
      )}

      {/* Speciation indicator */}
      {speciesCount > 1 && (
        <div className="absolute top-8 center bg-purple-100 border-2 border-purple-400 rounded-lg p-2 left-1/2 transform -translate-x-1/2 shadow-lg">
          <div className="text-xs font-semibold text-purple-800 text-center">
            Speciation Occurring!
          </div>
          <div className="text-xs text-purple-600 text-center">
            {speciesCount} distinct species
          </div>
        </div>
      )}
    </div>
  );
};

export default EvolutionSimulation;