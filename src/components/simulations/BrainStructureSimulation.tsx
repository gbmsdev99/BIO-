import React, { useState } from 'react';
import { Brain, Zap, Eye, Ear, Heart, Activity } from 'lucide-react';

interface BrainStructureSimulationProps {
  isPlaying: boolean;
}

const BrainStructureSimulation: React.FC<BrainStructureSimulationProps> = ({ isPlaying }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('cerebrum');
  const [activeFunction, setActiveFunction] = useState<string>('');

  const brainRegions = {
    cerebrum: {
      name: 'Cerebrum',
      functions: ['Thinking', 'Memory', 'Voluntary movements', 'Speech', 'Sensory processing'],
      color: 'bg-blue-400',
      hoverColor: 'hover:bg-blue-500',
      description: 'Largest part of brain, controls conscious activities'
    },
    cerebellum: {
      name: 'Cerebellum',
      functions: ['Balance', 'Coordination', 'Posture', 'Motor learning'],
      color: 'bg-green-400',
      hoverColor: 'hover:bg-green-500',
      description: 'Controls balance and fine motor coordination'
    },
    medulla: {
      name: 'Medulla Oblongata',
      functions: ['Breathing', 'Heart rate', 'Blood pressure', 'Swallowing'],
      color: 'bg-red-400',
      hoverColor: 'hover:bg-red-500',
      description: 'Controls vital involuntary functions'
    },
    hypothalamus: {
      name: 'Hypothalamus',
      functions: ['Temperature regulation', 'Hormone control', 'Sleep cycles', 'Hunger'],
      color: 'bg-purple-400',
      hoverColor: 'hover:bg-purple-500',
      description: 'Links nervous and endocrine systems'
    },
    pons: {
      name: 'Pons',
      functions: ['Sleep regulation', 'Arousal', 'Facial sensation', 'Hearing'],
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      description: 'Bridge between brain regions'
    }
  };

  React.useEffect(() => {
    if (isPlaying) {
      const regions = Object.keys(brainRegions);
      const interval = setInterval(() => {
        const randomRegion = regions[Math.floor(Math.random() * regions.length)];
        setSelectedRegion(randomRegion);
        const functions = brainRegions[randomRegion as keyof typeof brainRegions].functions;
        setActiveFunction(functions[Math.floor(Math.random() * functions.length)]);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl relative overflow-hidden">
      {/* Brain Structure */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="200" height="160" viewBox="0 0 200 160" className="drop-shadow-lg">
          {/* Cerebrum */}
          <ellipse
            cx="100"
            cy="60"
            rx="80"
            ry="50"
            className={`${brainRegions.cerebrum.color} ${brainRegions.cerebrum.hoverColor} cursor-pointer transition-all duration-300 ${
              selectedRegion === 'cerebrum' ? 'animate-pulse stroke-4 stroke-blue-600' : 'stroke-2 stroke-gray-400'
            }`}
            onClick={() => setSelectedRegion('cerebrum')}
          />
          
          {/* Cerebrum divisions */}
          <line x1="100" y1="10" x2="100" y2="110" stroke="#1E40AF" strokeWidth="2" opacity="0.5" />
          
          {/* Cerebellum */}
          <ellipse
            cx="140"
            cy="120"
            rx="35"
            ry="25"
            className={`${brainRegions.cerebellum.color} ${brainRegions.cerebellum.hoverColor} cursor-pointer transition-all duration-300 ${
              selectedRegion === 'cerebellum' ? 'animate-pulse stroke-4 stroke-green-600' : 'stroke-2 stroke-gray-400'
            }`}
            onClick={() => setSelectedRegion('cerebellum')}
          />

          {/* Brain Stem */}
          <rect
            x="85"
            y="110"
            width="30"
            height="40"
            rx="15"
            className={`${brainRegions.medulla.color} ${brainRegions.medulla.hoverColor} cursor-pointer transition-all duration-300 ${
              selectedRegion === 'medulla' ? 'animate-pulse stroke-4 stroke-red-600' : 'stroke-2 stroke-gray-400'
            }`}
            onClick={() => setSelectedRegion('medulla')}
          />

          {/* Hypothalamus */}
          <circle
            cx="100"
            cy="90"
            r="12"
            className={`${brainRegions.hypothalamus.color} ${brainRegions.hypothalamus.hoverColor} cursor-pointer transition-all duration-300 ${
              selectedRegion === 'hypothalamus' ? 'animate-pulse stroke-4 stroke-purple-600' : 'stroke-2 stroke-gray-400'
            }`}
            onClick={() => setSelectedRegion('hypothalamus')}
          />

          {/* Pons */}
          <ellipse
            cx="100"
            cy="105"
            rx="20"
            ry="8"
            className={`${brainRegions.pons.color} ${brainRegions.pons.hoverColor} cursor-pointer transition-all duration-300 ${
              selectedRegion === 'pons' ? 'animate-pulse stroke-4 stroke-yellow-600' : 'stroke-2 stroke-gray-400'
            }`}
            onClick={() => setSelectedRegion('pons')}
          />

          {/* Neural Activity Indicators */}
          {isPlaying && (
            <>
              {[...Array(8)].map((_, i) => (
                <circle
                  key={i}
                  cx={60 + i * 20}
                  cy={40 + Math.sin(i) * 10}
                  r="2"
                  fill="#EF4444"
                  className="animate-ping"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Region Information Panel */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-64">
        <div className="flex items-center space-x-2 mb-3">
          <Brain className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold text-gray-800">
            {brainRegions[selectedRegion as keyof typeof brainRegions].name}
          </h4>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          {brainRegions[selectedRegion as keyof typeof brainRegions].description}
        </p>

        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-gray-700">Key Functions:</h5>
          {brainRegions[selectedRegion as keyof typeof brainRegions].functions.map((func, index) => (
            <div
              key={index}
              className={`text-xs px-2 py-1 rounded transition-all duration-300 ${
                activeFunction === func
                  ? 'bg-blue-500 text-white animate-pulse'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {func}
            </div>
          ))}
        </div>
      </div>

      {/* Brain Activity Monitor */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-sm font-semibold">Brain Activity</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Alpha Waves:</span>
            <div className="w-16 bg-gray-200 rounded-full h-1">
              <div className={`h-1 rounded-full transition-all duration-1000 ${
                isPlaying ? 'bg-green-500 w-3/4' : 'bg-gray-400 w-1/4'
              }`}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span>Beta Waves:</span>
            <div className="w-16 bg-gray-200 rounded-full h-1">
              <div className={`h-1 rounded-full transition-all duration-1000 ${
                isPlaying ? 'bg-blue-500 w-2/3' : 'bg-gray-400 w-1/4'
              }`}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span>Theta Waves:</span>
            <div className="w-16 bg-gray-200 rounded-full h-1">
              <div className={`h-1 rounded-full transition-all duration-1000 ${
                isPlaying ? 'bg-purple-500 w-1/2' : 'bg-gray-400 w-1/4'
              }`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sensory Input Indicators */}
      {isPlaying && (
        <div className="absolute bottom-4 left-4 space-y-2">
          <div className="flex items-center space-x-2 bg-white/80 rounded-lg px-3 py-1">
            <Eye className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-xs">Visual Input</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 rounded-lg px-3 py-1">
            <Ear className="w-4 h-4 text-green-500 animate-pulse" />
            <span className="text-xs">Auditory Input</span>
          </div>
        </div>
      )}

      {/* Vital Functions Monitor */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="text-sm font-semibold text-gray-800 mb-2">Vital Functions</h5>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span>Heart Rate:</span>
            </div>
            <span className="font-mono">{isPlaying ? '72 BPM' : '-- BPM'}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-blue-500" />
              <span>Breathing:</span>
            </div>
            <span className="font-mono">{isPlaying ? '16/min' : '--/min'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Temperature:</span>
            <span className="font-mono">{isPlaying ? '37.0°C' : '--°C'}</span>
          </div>
        </div>
      </div>

      {/* Interactive Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
        <p className="text-xs text-gray-600 text-center">
          Click on different brain regions to explore their functions
        </p>
      </div>
    </div>
  );
};

export default BrainStructureSimulation;