import React, { useEffect, useState } from 'react';
import { Wind, Bug, Droplets, Star } from 'lucide-react';

interface FlowerPollinationSimulationProps {
  isPlaying: boolean;
}

const FlowerPollinationSimulation: React.FC<FlowerPollinationSimulationProps> = ({ isPlaying }) => {
  const [pollinationType, setPollinationType] = useState<'insect' | 'wind' | 'self'>('insect');
  const [pollenGrains, setPollenGrains] = useState<Array<{id: number, x: number, y: number, moving: boolean}>>([]);
  const [fertilizationStage, setFertilizationStage] = useState(0);
  const [nectarLevel, setNectarLevel] = useState(100);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setPollinationType(prev => {
          switch (prev) {
            case 'insect': return 'wind';
            case 'wind': return 'self';
            case 'self': return 'insect';
            default: return 'insect';
          }
        });

        // Generate pollen grains
        setPollenGrains(prev => [
          ...prev.slice(-5),
          {
            id: Date.now(),
            x: Math.random() * 200 + 100,
            y: Math.random() * 100 + 150,
            moving: true
          }
        ]);

        setFertilizationStage(prev => Math.min(prev + 1, 4));
        setNectarLevel(prev => Math.max(prev - 5, 20));
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setPollenGrains([]);
      setFertilizationStage(0);
      setNectarLevel(100);
    }
  }, [isPlaying]);

  const flowerParts = {
    petals: { name: 'Petals', function: 'Attract pollinators with color and scent' },
    stamen: { name: 'Stamen (Male)', function: 'Produces pollen grains' },
    pistil: { name: 'Pistil (Female)', function: 'Contains ovules for fertilization' },
    nectar: { name: 'Nectar', function: 'Rewards pollinators with sweet liquid' }
  };

  return (
    <div className="h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl relative overflow-hidden">
      {/* Flower Structure */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Stem */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-3 h-20 bg-green-600"></div>

        {/* Petals */}
        <div className="relative">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-8 h-12 bg-pink-400 rounded-full transform transition-all duration-1000 ${
                pollinationType === 'insect' ? 'animate-pulse bg-pink-500' : ''
              }`}
              style={{
                transform: `rotate(${i * 45}deg) translateY(-20px)`,
                transformOrigin: 'center bottom'
              }}
            ></div>
          ))}
        </div>

        {/* Center of flower */}
        <div className="absolute inset-0 w-12 h-12 bg-yellow-400 rounded-full border-4 border-yellow-500 flex items-center justify-center">
          {/* Stamens */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-4 bg-orange-500 rounded-full ${
                fertilizationStage >= 1 ? 'animate-pulse' : ''
              }`}
              style={{
                transform: `rotate(${i * 60}deg) translateY(-6px)`,
                transformOrigin: 'center bottom'
              }}
            >
              {/* Anther with pollen */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-600 rounded-full">
                {fertilizationStage >= 1 && (
                  <div className="absolute inset-0 bg-yellow-500 rounded-full animate-ping"></div>
                )}
              </div>
            </div>
          ))}

          {/* Pistil */}
          <div className={`w-2 h-6 bg-green-500 rounded-full ${
            fertilizationStage >= 2 ? 'animate-pulse bg-green-600' : ''
          }`}>
            {/* Stigma */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-red-400 rounded-full">
              {fertilizationStage >= 2 && (
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pollinating Agent */}
      <div className="absolute top-8 right-8">
        {pollinationType === 'insect' && (
          <div className="relative">
            <Bug className="w-8 h-8 text-black animate-bounce" />
            <div className="absolute -inset-2 border-2 border-yellow-400 rounded-full animate-ping"></div>
          </div>
        )}
        {pollinationType === 'wind' && (
          <Wind className="w-8 h-8 text-blue-500 animate-pulse" />
        )}
        {pollinationType === 'self' && (
          <Star className="w-8 h-8 text-purple-500 animate-spin" />
        )}
      </div>

      {/* Pollen Grains Animation */}
      {pollenGrains.map((pollen) => (
        <div
          key={pollen.id}
          className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-bounce"
          style={{
            left: `${pollen.x}px`,
            top: `${pollen.y}px`,
            animationDuration: '2s'
          }}
        >
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      ))}

      {/* Pollination Information */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-64">
        <h4 className="font-semibold text-gray-800 mb-2">
          {pollinationType === 'insect' && 'Insect Pollination'}
          {pollinationType === 'wind' && 'Wind Pollination'}
          {pollinationType === 'self' && 'Self Pollination'}
        </h4>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">Agent: </span>
            <span className="text-gray-600">
              {pollinationType === 'insect' && 'Bees, butterflies, beetles'}
              {pollinationType === 'wind' && 'Air currents'}
              {pollinationType === 'self' && 'Same flower'}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Mechanism: </span>
            <span className="text-gray-600">
              {pollinationType === 'insect' && 'Attracted by nectar and color'}
              {pollinationType === 'wind' && 'Pollen carried by air'}
              {pollinationType === 'self' && 'Pollen falls on own stigma'}
            </span>
          </div>
        </div>
      </div>

      {/* Fertilization Stages */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Fertilization Process</h5>
        <div className="space-y-1">
          {[
            'Pollen release',
            'Pollen transfer',
            'Pollen tube growth',
            'Fertilization complete'
          ].map((stage, index) => (
            <div
              key={index}
              className={`text-xs px-2 py-1 rounded transition-all duration-500 ${
                fertilizationStage > index
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {stage}
            </div>
          ))}
        </div>
      </div>

      {/* Nectar Level */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Nectar Reward</h5>
        <div className="w-20 bg-gray-200 rounded-full h-3 mb-1">
          <div 
            className="bg-orange-400 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${nectarLevel}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600">{nectarLevel}% available</div>
      </div>

      {/* Flower Parts Labels */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-48">
        <h5 className="font-semibold text-gray-800 mb-2">Flower Parts</h5>
        <div className="space-y-1 text-xs">
          {Object.entries(flowerParts).map(([key, part]) => (
            <div key={key} className="border-b border-gray-200 pb-1">
              <div className="font-medium text-gray-700">{part.name}</div>
              <div className="text-gray-600">{part.function}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pollen Count */}
      {isPlaying && (
        <div className="absolute top-1/2 left-8 bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg">
          <div className="text-sm font-semibold">Pollen Grains</div>
          <div className="text-2xl font-bold">{pollenGrains.length}</div>
          <div className="text-xs">in transfer</div>
        </div>
      )}

      {/* Success Rate */}
      <div className="absolute top-1/2 right-8 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
        <div className="text-sm font-semibold">Success Rate</div>
        <div className="text-2xl font-bold">
          {pollinationType === 'insect' ? '85%' : pollinationType === 'wind' ? '45%' : '95%'}
        </div>
        <div className="text-xs">pollination</div>
      </div>
    </div>
  );
};

export default FlowerPollinationSimulation;