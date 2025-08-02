import React, { useEffect, useState } from 'react';
import { Copy, Zap, Droplets, Leaf } from 'lucide-react';

interface AsexualReproductionSimulationProps {
  isPlaying: boolean;
}

const AsexualReproductionSimulation: React.FC<AsexualReproductionSimulationProps> = ({ isPlaying }) => {
  const [currentType, setCurrentType] = useState<'binary' | 'budding' | 'fragmentation' | 'spores'>('binary');
  const [reproductionStage, setReproductionStage] = useState(0);
  const [organismCount, setOrganismCount] = useState(1);
  const [generationTime, setGenerationTime] = useState(0);

  const reproductionTypes = {
    binary: {
      name: 'Binary Fission',
      organism: 'Amoeba',
      description: 'Single cell divides into two identical cells',
      stages: ['DNA replication', 'Cell elongation', 'Septum formation', 'Cell separation'],
      time: '20-30 minutes'
    },
    budding: {
      name: 'Budding',
      organism: 'Hydra',
      description: 'Small outgrowth develops into new individual',
      stages: ['Bud formation', 'Bud growth', 'Organ development', 'Detachment'],
      time: '2-3 days'
    },
    fragmentation: {
      name: 'Fragmentation',
      organism: 'Spirogyra',
      description: 'Body breaks into fragments, each grows into new individual',
      stages: ['Filament breaks', 'Fragment isolation', 'Cell division', 'New filament'],
      time: '1-2 weeks'
    },
    spores: {
      name: 'Spore Formation',
      organism: 'Rhizopus',
      description: 'Specialized reproductive cells develop into new organisms',
      stages: ['Sporangium formation', 'Spore development', 'Spore release', 'Germination'],
      time: '3-5 days'
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentType(prev => {
          switch (prev) {
            case 'binary': return 'budding';
            case 'budding': return 'fragmentation';
            case 'fragmentation': return 'spores';
            case 'spores': return 'binary';
            default: return 'binary';
          }
        });

        setReproductionStage(prev => (prev + 1) % 4);
        setOrganismCount(prev => Math.min(prev * 2, 16));
        setGenerationTime(prev => prev + 1);
      }, 2500);

      return () => clearInterval(interval);
    } else {
      setReproductionStage(0);
      setOrganismCount(1);
      setGenerationTime(0);
    }
  }, [isPlaying]);

  const renderOrganism = () => {
    switch (currentType) {
      case 'binary':
        return (
          <div className="relative">
            {/* Amoeba */}
            <div className={`w-16 h-12 bg-blue-300 rounded-full relative transition-all duration-1000 ${
              reproductionStage >= 2 ? 'transform scale-x-150' : ''
            }`}>
              <div className="absolute inset-2 bg-blue-400 rounded-full">
                {/* Nucleus */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full ${
                  reproductionStage === 0 ? 'animate-pulse' : ''
                }`}></div>
                
                {/* Division line */}
                {reproductionStage >= 2 && (
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-600 transform -translate-x-1/2"></div>
                )}
              </div>
              
              {/* Pseudopodia */}
              <div className="absolute -left-2 top-1/2 w-4 h-2 bg-blue-200 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute -right-2 top-1/2 w-4 h-2 bg-blue-200 rounded-full transform -translate-y-1/2"></div>
            </div>
            
            {/* Second cell after division */}
            {reproductionStage >= 3 && (
              <div className="absolute top-0 left-20 w-16 h-12 bg-blue-300 rounded-full animate-pulse">
                <div className="absolute inset-2 bg-blue-400 rounded-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        );

      case 'budding':
        return (
          <div className="relative">
            {/* Hydra body */}
            <div className="w-4 h-20 bg-green-400 rounded-t-full relative">
              {/* Tentacles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute -top-1 w-8 h-0.5 bg-green-600 rounded-full"
                  style={{
                    transform: `rotate(${i * 60}deg)`,
                    transformOrigin: 'left center',
                    left: '50%'
                  }}
                ></div>
              ))}
              
              {/* Bud */}
              {reproductionStage >= 1 && (
                <div className={`absolute left-6 top-8 bg-green-300 rounded-full transition-all duration-1000 ${
                  reproductionStage === 1 ? 'w-2 h-2' :
                  reproductionStage === 2 ? 'w-4 h-6' :
                  'w-3 h-8'
                }`}>
                  {reproductionStage >= 2 && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-4 h-0.5 bg-green-600 rounded-full"
                          style={{
                            transform: `rotate(${i * 90}deg)`,
                            transformOrigin: 'left center'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Detached bud */}
              {reproductionStage >= 3 && (
                <div className="absolute left-12 top-16 w-3 h-8 bg-green-300 rounded-t-full animate-bounce">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-4 h-0.5 bg-green-600 rounded-full"
                        style={{
                          transform: `rotate(${i * 90}deg)`,
                          transformOrigin: 'left center'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'fragmentation':
        return (
          <div className="relative">
            {/* Spirogyra filament */}
            <div className="flex space-x-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 bg-green-500 border border-green-600 transition-all duration-1000 ${
                    reproductionStage >= 1 && (i === 2 || i === 5) ? 'bg-red-400 animate-pulse' : ''
                  } ${
                    reproductionStage >= 2 && i > 2 && i < 6 ? 'transform translate-y-4' : ''
                  }`}
                >
                  {/* Chloroplast spiral */}
                  <div className="absolute inset-0.5 border border-green-700 rounded-full"></div>
                </div>
              ))}
            </div>
            
            {/* New filaments from fragments */}
            {reproductionStage >= 3 && (
              <>
                <div className="absolute top-8 left-8 flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-green-500 border border-green-600 animate-pulse">
                      <div className="absolute inset-0.5 border border-green-700 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-8 left-20 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-green-500 border border-green-600 animate-pulse">
                      <div className="absolute inset-0.5 border border-green-700 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );

      case 'spores':
        return (
          <div className="relative">
            {/* Rhizopus structure */}
            <div className="w-32 h-16 relative">
              {/* Hyphae */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 rounded-full"></div>
              
              {/* Sporangiophores */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-1 w-0.5 h-8 bg-gray-700 rounded-full"
                  style={{ left: `${20 + i * 20}%` }}
                >
                  {/* Sporangium */}
                  <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full ${
                    reproductionStage >= 2 ? 'animate-pulse' : ''
                  }`}>
                    {/* Spores inside */}
                    {reproductionStage >= 1 && (
                      <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Released spores */}
              {reproductionStage >= 3 && (
                <div className="absolute top-0 left-0 right-0">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-bounce"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 20}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl relative overflow-hidden">
      {/* Main organism display */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {renderOrganism()}
      </div>

      {/* Type Information */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-64">
        <div className="flex items-center space-x-2 mb-2">
          <Copy className="w-5 h-5 text-green-500" />
          <h4 className="font-semibold text-gray-800">{reproductionTypes[currentType].name}</h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">Organism: </span>
            <span className="text-gray-600">{reproductionTypes[currentType].organism}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Process: </span>
            <span className="text-gray-600">{reproductionTypes[currentType].description}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Time: </span>
            <span className="text-gray-600">{reproductionTypes[currentType].time}</span>
          </div>
        </div>
      </div>

      {/* Stage Progress */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Current Stage</h5>
        <div className="space-y-1">
          {reproductionTypes[currentType].stages.map((stage, index) => (
            <div
              key={index}
              className={`text-xs px-2 py-1 rounded transition-all duration-500 ${
                reproductionStage >= index
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {stage}
            </div>
          ))}
        </div>
      </div>

      {/* Population Counter */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Population</h5>
        <div className="text-3xl font-bold text-green-600 text-center">
          {organismCount}
        </div>
        <div className="text-xs text-gray-600 text-center">organisms</div>
        
        {/* Growth visualization */}
        <div className="mt-2 grid grid-cols-4 gap-1">
          {[...Array(Math.min(organismCount, 16))].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Generation Time */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Generation</h5>
        <div className="text-2xl font-bold text-blue-600 text-center">
          {generationTime}
        </div>
        <div className="text-xs text-gray-600 text-center">cycles</div>
      </div>

      {/* Advantages Display */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-64">
        <h5 className="font-semibold text-gray-800 mb-2 text-center">Advantages</h5>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>Fast reproduction</span>
          </div>
          <div className="flex items-center space-x-1">
            <Copy className="w-3 h-3 text-blue-500" />
            <span>Identical offspring</span>
          </div>
          <div className="flex items-center space-x-1">
            <Leaf className="w-3 h-3 text-green-500" />
            <span>Single parent</span>
          </div>
          <div className="flex items-center space-x-1">
            <Droplets className="w-3 h-3 text-cyan-500" />
            <span>Energy efficient</span>
          </div>
        </div>
      </div>

      {/* Reproduction Rate */}
      {isPlaying && (
        <div className="absolute top-1/2 left-8 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
          <div className="text-sm font-semibold">Rate</div>
          <div className="text-lg font-bold">
            {currentType === 'binary' ? '2x/30min' :
             currentType === 'budding' ? '1x/3days' :
             currentType === 'fragmentation' ? '3x/week' :
             '100x/5days'}
          </div>
        </div>
      )}
    </div>
  );
};

export default AsexualReproductionSimulation;