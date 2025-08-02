import React, { useEffect, useState } from 'react';
import { ArrowDown, Droplets, Zap, Clock } from 'lucide-react';

interface DigestiveSystemSimulationProps {
  isPlaying: boolean;
}

const DigestiveSystemSimulation: React.FC<DigestiveSystemSimulationProps> = ({ isPlaying }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [foodPosition, setFoodPosition] = useState(0);
  const [enzymeActivity, setEnzymeActivity] = useState<string[]>([]);
  const [nutrients, setNutrients] = useState({ carbs: 0, proteins: 0, fats: 0 });

  const stages = [
    { name: 'Mouth', enzyme: 'Salivary Amylase', action: 'Starch → Maltose', duration: 2000 },
    { name: 'Stomach', enzyme: 'Pepsin + HCl', action: 'Proteins → Peptides', duration: 3000 },
    { name: 'Small Intestine', enzyme: 'Pancreatic Enzymes', action: 'Complete Digestion', duration: 4000 },
    { name: 'Absorption', enzyme: 'Villi', action: 'Nutrient Absorption', duration: 3000 },
    { name: 'Large Intestine', enzyme: 'Bacteria', action: 'Water Absorption', duration: 2000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => {
          const next = (prev + 1) % stages.length;
          setFoodPosition(next * 20);
          
          // Simulate enzyme activity
          setEnzymeActivity(prev => [...prev.slice(-2), stages[next].enzyme]);
          
          // Simulate nutrient absorption
          if (next === 3) {
            setNutrients({ carbs: 85, proteins: 78, fats: 92 });
          }
          
          return next;
        });
      }, stages[currentStage]?.duration || 2000);
      
      return () => clearInterval(interval);
    } else {
      setCurrentStage(0);
      setFoodPosition(0);
      setEnzymeActivity([]);
      setNutrients({ carbs: 0, proteins: 0, fats: 0 });
    }
  }, [isPlaying, currentStage]);

  return (
    <div className="h-96 bg-gradient-to-b from-pink-100 to-yellow-100 rounded-xl relative overflow-hidden">
      {/* Digestive Tract */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4">
        {/* Mouth */}
        <div className={`w-16 h-8 bg-pink-300 rounded-full mb-2 relative ${currentStage === 0 ? 'animate-pulse bg-pink-400' : ''}`}>
          <div className="absolute inset-2 bg-pink-400 rounded-full"></div>
          {currentStage === 0 && (
            <Droplets className="absolute -right-6 top-1 w-4 h-4 text-blue-500 animate-bounce" />
          )}
        </div>

        {/* Esophagus */}
        <div className="w-4 h-12 bg-pink-400 mx-auto relative">
          {foodPosition >= 20 && (
            <div className="absolute inset-0 bg-orange-400 animate-pulse rounded"></div>
          )}
        </div>

        {/* Stomach */}
        <div className={`w-20 h-16 bg-red-300 rounded-full mx-auto mb-2 relative ${currentStage === 1 ? 'animate-pulse bg-red-400' : ''}`}>
          <div className="absolute inset-2 bg-red-400 rounded-full"></div>
          {currentStage === 1 && (
            <div className="absolute inset-4 bg-yellow-400 rounded-full animate-ping"></div>
          )}
        </div>

        {/* Small Intestine */}
        <div className="relative">
          <div className={`w-32 h-3 bg-green-300 rounded-full mb-1 ${currentStage === 2 || currentStage === 3 ? 'animate-pulse bg-green-400' : ''}`}></div>
          <div className={`w-28 h-3 bg-green-300 rounded-full mb-1 ml-4 ${currentStage === 2 || currentStage === 3 ? 'animate-pulse bg-green-400' : ''}`}></div>
          <div className={`w-30 h-3 bg-green-300 rounded-full mb-1 ${currentStage === 2 || currentStage === 3 ? 'animate-pulse bg-green-400' : ''}`}></div>
          
          {/* Villi */}
          {currentStage === 3 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1 h-2 bg-green-600 animate-pulse"></div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Large Intestine */}
        <div className={`w-24 h-12 bg-brown-300 rounded-lg mx-auto ${currentStage === 4 ? 'animate-pulse bg-yellow-600' : ''}`}>
          <div className="absolute inset-2 bg-yellow-700 rounded-lg"></div>
        </div>
      </div>

      {/* Food Particle */}
      {isPlaying && (
        <div 
          className="absolute left-1/2 w-3 h-3 bg-orange-500 rounded-full transform -translate-x-1/2 transition-all duration-1000"
          style={{ top: `${60 + foodPosition}px` }}
        >
          <div className="absolute inset-0 bg-orange-600 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Enzyme Activity Panel */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-48">
        <h4 className="font-semibold text-gray-800 mb-2">Current Process</h4>
        <div className="text-sm">
          <div className="font-medium text-blue-600">{stages[currentStage]?.name}</div>
          <div className="text-gray-600">{stages[currentStage]?.enzyme}</div>
          <div className="text-xs text-green-600 mt-1">{stages[currentStage]?.action}</div>
        </div>
      </div>

      {/* Nutrient Absorption */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-semibold text-gray-800 mb-2">Absorption</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span>Carbs:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${nutrients.carbs}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Proteins:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${nutrients.proteins}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Fats:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${nutrients.fats}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Digestion Progress</span>
          <Clock className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex space-x-1">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded ${
                index <= currentStage ? 'bg-green-500' : 'bg-gray-200'
              } transition-colors duration-500`}
            ></div>
          ))}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {Math.round(((currentStage + 1) / stages.length) * 100)}% Complete
        </div>
      </div>
    </div>
  );
};

export default DigestiveSystemSimulation;