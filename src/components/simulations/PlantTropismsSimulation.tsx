import React, { useEffect, useState } from 'react';
import { Sun, Droplets, ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';

interface PlantTropismsSimulationProps {
  isPlaying: boolean;
}

const PlantTropismsSimulation: React.FC<PlantTropismsSimulationProps> = ({ isPlaying }) => {
  const [currentTropism, setCurrentTropism] = useState<'phototropism' | 'geotropism' | 'hydrotropism'>('phototropism');
  const [plantAngle, setPlantAngle] = useState(0);
  const [rootDirection, setRootDirection] = useState(0);
  const [auxinConcentration, setAuxinConcentration] = useState({ left: 50, right: 50 });
  const [growthRate, setGrowthRate] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTropism(prev => {
          switch (prev) {
            case 'phototropism': return 'geotropism';
            case 'geotropism': return 'hydrotropism';
            case 'hydrotropism': return 'phototropism';
            default: return 'phototropism';
          }
        });

        // Simulate plant movement based on tropism
        if (currentTropism === 'phototropism') {
          setPlantAngle(prev => Math.min(prev + 5, 30));
          setAuxinConcentration({ left: 30, right: 70 });
        } else if (currentTropism === 'geotropism') {
          setRootDirection(prev => Math.min(prev + 5, 45));
          setAuxinConcentration({ left: 50, right: 50 });
        } else {
          setRootDirection(prev => Math.min(prev + 3, 25));
          setAuxinConcentration({ left: 40, right: 60 });
        }

        setGrowthRate(prev => Math.min(prev + 10, 100));
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setPlantAngle(0);
      setRootDirection(0);
      setAuxinConcentration({ left: 50, right: 50 });
      setGrowthRate(0);
    }
  }, [isPlaying, currentTropism]);

  const tropismInfo = {
    phototropism: {
      name: 'Phototropism',
      description: 'Growth response to light direction',
      stimulus: 'Light',
      response: 'Shoot bends toward light',
      hormone: 'Auxin accumulates on shaded side',
      color: 'text-yellow-500'
    },
    geotropism: {
      name: 'Geotropism (Gravitropism)',
      description: 'Growth response to gravity',
      stimulus: 'Gravity',
      response: 'Roots grow downward, shoots upward',
      hormone: 'Auxin redistributed by gravity',
      color: 'text-blue-500'
    },
    hydrotropism: {
      name: 'Hydrotropism',
      description: 'Growth response to water',
      stimulus: 'Water gradient',
      response: 'Roots grow toward water source',
      hormone: 'Auxin guides root growth',
      color: 'text-cyan-500'
    }
  };

  return (
    <div className="h-96 bg-gradient-to-b from-sky-100 to-green-100 rounded-xl relative overflow-hidden">
      {/* Stimulus Sources */}
      <div className="absolute top-4 right-8">
        {currentTropism === 'phototropism' && (
          <Sun className="w-12 h-12 text-yellow-500 animate-pulse" />
        )}
        {currentTropism === 'geotropism' && (
          <ArrowDown className="w-8 h-8 text-blue-500 animate-bounce" />
        )}
        {currentTropism === 'hydrotropism' && (
          <Droplets className="w-8 h-8 text-cyan-500 animate-pulse" />
        )}
      </div>

      {/* Plant Structure */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        {/* Soil Line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-brown-400"></div>

        {/* Root System */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div 
            className="w-2 h-16 bg-brown-600 transition-all duration-1000"
            style={{ transform: `rotate(${rootDirection}deg)` }}
          >
            {/* Root branches */}
            <div className="absolute bottom-4 -left-2 w-8 h-1 bg-brown-500 transform -rotate-45"></div>
            <div className="absolute bottom-8 -right-2 w-8 h-1 bg-brown-500 transform rotate-45"></div>
            <div className="absolute bottom-12 -left-1 w-6 h-1 bg-brown-500 transform -rotate-30"></div>
          </div>

          {/* Water source indicator for hydrotropism */}
          {currentTropism === 'hydrotropism' && (
            <div className="absolute bottom-8 -right-8 w-4 h-4 bg-blue-400 rounded-full animate-pulse">
              <div className="absolute inset-1 bg-blue-500 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Stem */}
        <div 
          className="w-3 h-24 bg-green-500 transition-all duration-1000 relative"
          style={{ transform: `rotate(${plantAngle}deg)`, transformOrigin: 'bottom center' }}
        >
          {/* Auxin distribution visualization */}
          <div className="absolute inset-0 flex">
            <div 
              className="w-1/2 bg-purple-400 opacity-60 transition-all duration-1000"
              style={{ height: `${auxinConcentration.left}%` }}
            ></div>
            <div 
              className="w-1/2 bg-purple-400 opacity-60 transition-all duration-1000"
              style={{ height: `${auxinConcentration.right}%` }}
            ></div>
          </div>

          {/* Leaves */}
          <div className="absolute top-2 -left-2 w-4 h-2 bg-green-400 rounded-full transform -rotate-45"></div>
          <div className="absolute top-2 -right-2 w-4 h-2 bg-green-400 rounded-full transform rotate-45"></div>
          <div className="absolute top-6 -left-3 w-5 h-3 bg-green-400 rounded-full transform -rotate-30"></div>
          <div className="absolute top-6 -right-3 w-5 h-3 bg-green-400 rounded-full transform rotate-30"></div>

          {/* Growing tip */}
          <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-green-600 rounded-t-full ${
            isPlaying ? 'animate-pulse' : ''
          }`}></div>
        </div>
      </div>

      {/* Tropism Information Panel */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-64">
        <div className="flex items-center space-x-2 mb-3">
          <ArrowRight className={`w-5 h-5 ${tropismInfo[currentTropism].color}`} />
          <h4 className="font-semibold text-gray-800">{tropismInfo[currentTropism].name}</h4>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{tropismInfo[currentTropism].description}</p>

        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">Stimulus: </span>
            <span className="text-gray-600">{tropismInfo[currentTropism].stimulus}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Response: </span>
            <span className="text-gray-600">{tropismInfo[currentTropism].response}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Mechanism: </span>
            <span className="text-gray-600">{tropismInfo[currentTropism].hormone}</span>
          </div>
        </div>
      </div>

      {/* Auxin Concentration Display */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Auxin Distribution</h5>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Left Side:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${auxinConcentration.left}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Right Side:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${auxinConcentration.right}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-2">
          Higher auxin = faster growth
        </div>
      </div>

      {/* Growth Rate Monitor */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Growth Activity</h5>
        <div className="text-2xl font-bold text-green-600 mb-1">
          {growthRate}%
        </div>
        <div className="w-20 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${growthRate}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600 mt-1">Cell elongation rate</div>
      </div>

      {/* Movement Indicators */}
      {isPlaying && (
        <div className="absolute top-1/2 left-8 space-y-2">
          {currentTropism === 'phototropism' && (
            <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg">
              <ArrowRight className="w-4 h-4" />
              <span className="text-xs">Bending toward light</span>
            </div>
          )}
          {currentTropism === 'geotropism' && (
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
              <ArrowDown className="w-4 h-4" />
              <span className="text-xs">Responding to gravity</span>
            </div>
          )}
          {currentTropism === 'hydrotropism' && (
            <div className="flex items-center space-x-2 bg-cyan-100 text-cyan-800 px-3 py-1 rounded-lg">
              <Droplets className="w-4 h-4" />
              <span className="text-xs">Growing toward water</span>
            </div>
          )}
        </div>
      )}

      {/* Time-lapse Indicator */}
      <div className="absolute top-1/2 right-8 bg-white/90 backdrop-blur-sm rounded-lg p-2">
        <div className="text-xs text-gray-600 text-center">
          Time-lapse View
        </div>
        <div className="text-lg font-bold text-center">
          {isPlaying ? '24h' : '0h'}
        </div>
      </div>
    </div>
  );
};

export default PlantTropismsSimulation;