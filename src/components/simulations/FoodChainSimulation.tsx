import React, { useEffect, useState } from 'react';
import { Leaf, Fish, Bird, Sun, ArrowRight } from 'lucide-react';

interface FoodChainSimulationProps {
  isPlaying: boolean;
}

const FoodChainSimulation: React.FC<FoodChainSimulationProps> = ({ isPlaying }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [energyFlow, setEnergyFlow] = useState([100, 0, 0, 0]);
  const [populationSize, setPopulationSize] = useState([1000, 100, 10, 1]);
  const [activeTransfer, setActiveTransfer] = useState(-1);

  const trophicLevels = [
    {
      name: 'Producers',
      organisms: ['Grass', 'Trees', 'Algae'],
      icon: Leaf,
      color: 'bg-green-500',
      energy: 100,
      description: 'Convert solar energy to chemical energy'
    },
    {
      name: 'Primary Consumers',
      organisms: ['Rabbit', 'Deer', 'Grasshopper'],
      icon: Fish,
      color: 'bg-blue-500',
      energy: 10,
      description: 'Herbivores that eat producers'
    },
    {
      name: 'Secondary Consumers',
      organisms: ['Snake', 'Fox', 'Frog'],
      icon: Bird,
      color: 'bg-orange-500',
      energy: 1,
      description: 'Carnivores that eat primary consumers'
    },
    {
      name: 'Tertiary Consumers',
      organisms: ['Eagle', 'Lion', 'Shark'],
      icon: Bird,
      color: 'bg-red-500',
      energy: 0.1,
      description: 'Top predators in the food chain'
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentLevel(prev => (prev + 1) % 4);
        setActiveTransfer(prev => (prev + 1) % 4);
        
        // Simulate energy transfer (10% rule)
        setEnergyFlow(prev => {
          const newFlow = [...prev];
          const currentIdx = (Date.now() / 2000) % 4;
          const idx = Math.floor(currentIdx);
          
          if (idx < 3) {
            newFlow[idx + 1] = Math.min(newFlow[idx + 1] + 2, newFlow[idx] * 0.1);
          }
          
          return newFlow;
        });

        // Update population sizes
        setPopulationSize(prev => {
          const newPop = [...prev];
          newPop.forEach((pop, idx) => {
            const variation = Math.random() * 0.2 - 0.1; // ±10% variation
            newPop[idx] = Math.max(1, Math.floor(pop * (1 + variation)));
          });
          return newPop;
        });
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setCurrentLevel(0);
      setEnergyFlow([100, 0, 0, 0]);
      setActiveTransfer(-1);
    }
  }, [isPlaying]);

  return (
    <div className="h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl relative overflow-hidden">
      {/* Sun */}
      <div className="absolute top-4 right-4">
        <Sun className="w-12 h-12 text-yellow-500 animate-pulse" />
        <div className="text-xs text-center mt-1 font-semibold">Solar Energy</div>
      </div>

      {/* Food Chain Levels */}
      <div className="absolute left-8 top-8 bottom-8 right-8">
        <div className="grid grid-cols-4 gap-4 h-full">
          {trophicLevels.map((level, index) => (
            <div key={index} className="flex flex-col items-center justify-center relative">
              {/* Organism representation */}
              <div className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
                currentLevel === index ? 'animate-pulse scale-110' : ''
              }`}>
                <level.icon className="w-8 h-8 text-white" />
              </div>

              {/* Level name */}
              <div className="text-sm font-semibold text-center mb-1">{level.name}</div>
              
              {/* Organisms list */}
              <div className="text-xs text-center text-gray-600 mb-2">
                {level.organisms.map((org, i) => (
                  <div key={i}>{org}</div>
                ))}
              </div>

              {/* Energy level */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${level.color}`}
                  style={{ width: `${energyFlow[index]}%` }}
                ></div>
              </div>
              <div className="text-xs font-semibold">{energyFlow[index].toFixed(1)}%</div>

              {/* Population indicator */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs">
                Pop: {populationSize[index]}
              </div>

              {/* Energy transfer arrow */}
              {index < 3 && (
                <div className={`absolute -right-6 top-1/2 transform -translate-y-1/2 ${
                  activeTransfer === index ? 'animate-pulse' : ''
                }`}>
                  <ArrowRight className="w-6 h-6 text-yellow-500" />
                  <div className="text-xs text-center text-yellow-600 font-semibold">10%</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Energy Pyramid */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Energy Pyramid</h5>
        <div className="space-y-1">
          {trophicLevels.map((level, index) => (
            <div
              key={index}
              className={`h-3 ${level.color} rounded transition-all duration-1000`}
              style={{ width: `${80 - index * 15}px` }}
            ></div>
          ))}
        </div>
        <div className="text-xs text-gray-600 mt-2">Energy decreases at each level</div>
      </div>

      {/* 10% Rule Explanation */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-48">
        <h5 className="font-semibold text-gray-800 mb-2">10% Rule</h5>
        <div className="text-xs text-gray-600">
          Only 10% of energy is transferred from one trophic level to the next. 
          The remaining 90% is lost as heat, movement, and metabolic processes.
        </div>
      </div>

      {/* Current Level Info */}
      <div className="absolute top-1/2 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 transform -translate-y-1/2">
        <h5 className="font-semibold text-gray-800 mb-2">Active Level</h5>
        <div className={`w-8 h-8 ${trophicLevels[currentLevel].color} rounded-full flex items-center justify-center mb-2 mx-auto`}>
          {React.createElement(trophicLevels[currentLevel].icon, { className: 'w-5 h-5 text-white' })}
        </div>
        <div className="text-sm font-semibold text-center">{trophicLevels[currentLevel].name}</div>
        <div className="text-xs text-gray-600 text-center mt-1">
          {trophicLevels[currentLevel].description}
        </div>
      </div>

      {/* Decomposers */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Decomposers</h5>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-brown-500 rounded-full flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs">
            <div className="font-semibold">Bacteria & Fungi</div>
            <div className="text-gray-600">Recycle nutrients</div>
          </div>
        </div>
      </div>

      {/* Energy Flow Animation */}
      {isPlaying && activeTransfer >= 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      )}

      {/* Ecosystem Balance Indicator */}
      <div className="absolute bottom-4 center bg-white/90 backdrop-blur-sm rounded-lg p-3 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-800">Ecosystem Balance</div>
          <div className={`text-lg font-bold ${
            populationSize.every((pop, i) => pop > (i === 0 ? 500 : i === 1 ? 50 : i === 2 ? 5 : 1)) 
              ? 'text-green-600' : 'text-orange-600'
          }`}>
            {populationSize.every((pop, i) => pop > (i === 0 ? 500 : i === 1 ? 50 : i === 2 ? 5 : 1)) 
              ? 'Stable' : 'Fluctuating'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodChainSimulation;