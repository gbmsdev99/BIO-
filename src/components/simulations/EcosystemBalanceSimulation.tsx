import React, { useEffect, useState } from 'react';
import { Trees, Rabbit, WholeWord as Wolf, Droplets, Thermometer, Wind } from 'lucide-react';

interface EcosystemBalanceSimulationProps {
  isPlaying: boolean;
}

const EcosystemBalanceSimulation: React.FC<EcosystemBalanceSimulationProps> = ({ isPlaying }) => {
  const [populations, setPopulations] = useState({ plants: 1000, herbivores: 100, carnivores: 10 });
  const [environmentalFactors, setEnvironmentalFactors] = useState({ 
    temperature: 25, 
    rainfall: 50, 
    pollution: 10 
  });
  const [ecosystemHealth, setEcosystemHealth] = useState(85);
  const [currentEvent, setCurrentEvent] = useState<string>('');
  const [biodiversityIndex, setBiodiversityIndex] = useState(0.8);

  const events = [
    'Drought reduces plant growth',
    'Heavy rainfall increases plant growth',
    'Disease affects herbivore population',
    'New predator introduced',
    'Pollution levels increase',
    'Conservation efforts implemented',
    'Climate change effects',
    'Habitat restoration project'
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        // Random environmental event
        const event = events[Math.floor(Math.random() * events.length)];
        setCurrentEvent(event);

        // Update populations based on ecological relationships
        setPopulations(prev => {
          let newPlants = prev.plants;
          let newHerbivores = prev.herbivores;
          let newCarnivores = prev.carnivores;

          // Plant population affected by environmental factors
          if (event.includes('Drought')) {
            newPlants = Math.max(500, prev.plants * 0.8);
          } else if (event.includes('rainfall')) {
            newPlants = Math.min(1500, prev.plants * 1.2);
          }

          // Herbivore population affected by plant availability and predation
          const carryingCapacity = newPlants / 10;
          if (newHerbivores > carryingCapacity) {
            newHerbivores = Math.max(50, newHerbivores * 0.9);
          } else {
            newHerbivores = Math.min(carryingCapacity, newHerbivores * 1.1);
          }

          // Carnivore population affected by prey availability
          const preyCapacity = newHerbivores / 10;
          if (newCarnivores > preyCapacity) {
            newCarnivores = Math.max(5, newCarnivores * 0.8);
          } else {
            newCarnivores = Math.min(preyCapacity, newCarnivores * 1.05);
          }

          return {
            plants: Math.round(newPlants),
            herbivores: Math.round(newHerbivores),
            carnivores: Math.round(newCarnivores)
          };
        });

        // Update environmental factors
        setEnvironmentalFactors(prev => ({
          temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 4)),
          rainfall: Math.max(20, Math.min(80, prev.rainfall + (Math.random() - 0.5) * 20)),
          pollution: Math.max(5, Math.min(50, prev.pollution + (Math.random() - 0.5) * 10))
        }));

        // Calculate ecosystem health
        setEcosystemHealth(prev => {
          const plantHealth = Math.min(100, (populations.plants / 1000) * 100);
          const balanceHealth = Math.min(100, 100 - Math.abs(populations.herbivores * 10 - populations.plants) / 50);
          const pollutionHealth = Math.max(0, 100 - environmentalFactors.pollution * 2);
          return Math.round((plantHealth + balanceHealth + pollutionHealth) / 3);
        });

        // Update biodiversity index
        setBiodiversityIndex(prev => {
          const diversity = (populations.plants > 800 ? 0.4 : 0.2) + 
                          (populations.herbivores > 80 ? 0.3 : 0.1) + 
                          (populations.carnivores > 8 ? 0.3 : 0.1);
          return Math.min(1.0, diversity);
        });
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setPopulations({ plants: 1000, herbivores: 100, carnivores: 10 });
      setEnvironmentalFactors({ temperature: 25, rainfall: 50, pollution: 10 });
      setEcosystemHealth(85);
      setCurrentEvent('');
    }
  }, [isPlaying]);

  const getPopulationColor = (current: number, optimal: number) => {
    const ratio = current / optimal;
    if (ratio > 1.2 || ratio < 0.8) return 'text-red-600';
    if (ratio > 1.1 || ratio < 0.9) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="h-96 bg-gradient-to-b from-sky-200 via-green-200 to-brown-200 rounded-xl relative overflow-hidden">
      {/* Ecosystem Visualization */}
      <div className="absolute inset-4">
        {/* Sky and weather */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-300 to-blue-100 rounded-t-xl">
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span className="text-xs">{environmentalFactors.temperature.toFixed(1)}°C</span>
          </div>
          <div className="absolute top-2 left-2 flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-xs">{environmentalFactors.rainfall.toFixed(0)}%</span>
          </div>
          {environmentalFactors.pollution > 30 && (
            <div className="absolute inset-0 bg-gray-400 opacity-30 rounded-t-xl"></div>
          )}
        </div>

        {/* Forest/Plant layer */}
        <div className="absolute top-16 left-0 right-0 h-24 bg-green-300 relative">
          {/* Trees representing plant population */}
          <div className="absolute inset-0 flex items-end justify-around">
            {[...Array(Math.min(12, Math.floor(populations.plants / 100)))].map((_, i) => (
              <Trees 
                key={i} 
                className={`w-6 h-8 text-green-600 transition-all duration-1000 ${
                  populations.plants < 800 ? 'opacity-60' : 'opacity-100'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Ground layer with animals */}
        <div className="absolute top-40 left-0 right-0 bottom-0 bg-brown-300 relative">
          {/* Herbivores */}
          <div className="absolute top-2 left-0 right-0 flex items-center justify-around">
            {[...Array(Math.min(8, Math.floor(populations.herbivores / 15)))].map((_, i) => (
              <Rabbit 
                key={i} 
                className={`w-4 h-4 text-brown-600 animate-bounce transition-all duration-1000 ${
                  populations.herbivores < 80 ? 'opacity-60' : 'opacity-100'
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Carnivores */}
          <div className="absolute top-8 left-0 right-0 flex items-center justify-around">
            {[...Array(Math.min(4, Math.floor(populations.carnivores / 3)))].map((_, i) => (
              <Wolf 
                key={i} 
                className={`w-5 h-5 text-gray-700 transition-all duration-1000 ${
                  populations.carnivores < 8 ? 'opacity-60' : 'opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Population Statistics */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Population Levels</h5>
        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Trees className="w-4 h-4 text-green-500" />
              <span>Plants:</span>
            </div>
            <span className={`font-semibold ${getPopulationColor(populations.plants, 1000)}`}>
              {populations.plants}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Rabbit className="w-4 h-4 text-brown-500" />
              <span>Herbivores:</span>
            </div>
            <span className={`font-semibold ${getPopulationColor(populations.herbivores, 100)}`}>
              {populations.herbivores}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Wolf className="w-4 h-4 text-gray-600" />
              <span>Carnivores:</span>
            </div>
            <span className={`font-semibold ${getPopulationColor(populations.carnivores, 10)}`}>
              {populations.carnivores}
            </span>
          </div>
        </div>
      </div>

      {/* Environmental Factors */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Environment</h5>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Temperature:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(environmentalFactors.temperature - 15) / 20 * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Rainfall:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${environmentalFactors.rainfall}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Pollution:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${environmentalFactors.pollution}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Health */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Ecosystem Health</h5>
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            ecosystemHealth > 80 ? 'text-green-600' :
            ecosystemHealth > 60 ? 'text-yellow-600' :
            ecosystemHealth > 40 ? 'text-orange-600' : 'text-red-600'
          }`}>
            {ecosystemHealth}%
          </div>
          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                ecosystemHealth > 80 ? 'bg-green-500' :
                ecosystemHealth > 60 ? 'bg-yellow-500' :
                ecosystemHealth > 40 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${ecosystemHealth}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Biodiversity Index */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Biodiversity</h5>
        <div className="text-center">
          <div className={`text-xl font-bold ${
            biodiversityIndex > 0.8 ? 'text-green-600' :
            biodiversityIndex > 0.6 ? 'text-yellow-600' :
            biodiversityIndex > 0.4 ? 'text-orange-600' : 'text-red-600'
          }`}>
            {biodiversityIndex.toFixed(2)}
          </div>
          <div className="text-xs text-gray-600">Shannon Index</div>
        </div>
      </div>

      {/* Current Event */}
      {currentEvent && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 max-w-48 text-center animate-pulse">
          <div className="text-sm font-semibold text-yellow-800">Environmental Event</div>
          <div className="text-xs text-yellow-700 mt-1">{currentEvent}</div>
        </div>
      )}

      {/* Balance Indicators */}
      <div className="absolute bottom-4 center bg-white/90 backdrop-blur-sm rounded-lg p-3 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 text-xs">
          <div className="text-center">
            <div className="font-semibold text-gray-800">Predator:Prey</div>
            <div className={`font-bold ${
              (populations.carnivores / populations.herbivores) > 0.15 ? 'text-red-600' :
              (populations.carnivores / populations.herbivores) < 0.05 ? 'text-orange-600' : 'text-green-600'
            }`}>
              1:{Math.round(populations.herbivores / populations.carnivores)}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-800">Carrying Capacity</div>
            <div className={`font-bold ${
              populations.herbivores > (populations.plants / 8) ? 'text-red-600' : 'text-green-600'
            }`}>
              {Math.round((populations.herbivores / (populations.plants / 10)) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Weather effects */}
      {environmentalFactors.rainfall > 70 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-4 bg-blue-400 opacity-60 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      )}

      {environmentalFactors.pollution > 35 && (
        <div className="absolute top-16 left-0 right-0 h-8 bg-gray-500 opacity-40">
          <Wind className="absolute top-1 right-2 w-4 h-4 text-gray-700 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default EcosystemBalanceSimulation;