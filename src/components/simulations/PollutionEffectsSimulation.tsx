import React, { useEffect, useState } from 'react';
import { Cloud, Droplets, Leaf, AlertTriangle, TrendingDown, Factory } from 'lucide-react';

interface PollutionEffectsSimulationProps {
  isPlaying: boolean;
}

const PollutionEffectsSimulation: React.FC<PollutionEffectsSimulationProps> = ({ isPlaying }) => {
  const [pollutionLevels, setPollutionLevels] = useState({
    air: 30,
    water: 25,
    soil: 20
  });
  const [ecosystemHealth, setEcosystemHealth] = useState(85);
  const [biodiversityIndex, setBiodiversityIndex] = useState(0.8);
  const [humanHealthImpact, setHumanHealthImpact] = useState(15);
  const [currentPollutant, setCurrentPollutant] = useState<'co2' | 'plastic' | 'chemicals'>('co2');
  const [bioaccumulation, setBioaccumulation] = useState(0);

  const pollutants = {
    co2: { name: 'Carbon Dioxide', source: 'Fossil Fuels', effect: 'Climate Change', color: 'bg-gray-500' },
    plastic: { name: 'Plastic Waste', source: 'Consumer Products', effect: 'Marine Pollution', color: 'bg-blue-500' },
    chemicals: { name: 'Industrial Chemicals', source: 'Manufacturing', effect: 'Toxic Accumulation', color: 'bg-red-500' }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        // Increase pollution levels
        setPollutionLevels(prev => ({
          air: Math.min(prev.air + Math.random() * 5, 100),
          water: Math.min(prev.water + Math.random() * 4, 100),
          soil: Math.min(prev.soil + Math.random() * 3, 100)
        }));

        // Calculate ecosystem impact
        setEcosystemHealth(prev => {
          const avgPollution = (pollutionLevels.air + pollutionLevels.water + pollutionLevels.soil) / 3;
          return Math.max(10, 100 - avgPollution);
        });

        // Update biodiversity
        setBiodiversityIndex(prev => {
          const healthFactor = ecosystemHealth / 100;
          return Math.max(0.1, healthFactor * 0.9);
        });

        // Human health impact
        setHumanHealthImpact(prev => {
          const pollutionImpact = (pollutionLevels.air * 0.4 + pollutionLevels.water * 0.3 + pollutionLevels.soil * 0.3);
          return Math.min(pollutionImpact, 100);
        });

        // Bioaccumulation in food chain
        setBioaccumulation(prev => Math.min(prev + 2, 100));

        // Cycle through pollutants
        setCurrentPollutant(prev => {
          const pollutantTypes: (keyof typeof pollutants)[] = ['co2', 'plastic', 'chemicals'];
          const currentIndex = pollutantTypes.indexOf(prev);
          return pollutantTypes[(currentIndex + 1) % pollutantTypes.length];
        });
      }, 2500);

      return () => clearInterval(interval);
    } else {
      setPollutionLevels({ air: 30, water: 25, soil: 20 });
      setEcosystemHealth(85);
      setBiodiversityIndex(0.8);
      setHumanHealthImpact(15);
      setBioaccumulation(0);
    }
  }, [isPlaying, pollutionLevels, ecosystemHealth]);

  const renderPollutionSource = () => {
    return (
      <div className="relative">
        <Factory className="w-12 h-12 text-gray-600" />
        {/* Smoke stacks */}
        <div className="absolute -top-2 left-2 space-y-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-6 bg-gray-700 rounded-full"
            />
          ))}
        </div>
        
        {/* Pollution emissions */}
        {isPlaying && (
          <div className="absolute -top-8 left-0 right-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gray-400 rounded-full opacity-60 animate-bounce"
                style={{
                  left: `${i * 15}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderEcosystem = () => {
    const healthColor = ecosystemHealth > 70 ? 'text-green-500' : 
                       ecosystemHealth > 40 ? 'text-yellow-500' : 'text-red-500';
    
    return (
      <div className="relative">
        {/* Trees - affected by air pollution */}
        <div className="flex space-x-2 mb-4">
          {[...Array(4)].map((_, i) => (
            <Leaf
              key={i}
              className={`w-8 h-8 transition-all duration-1000 ${
                pollutionLevels.air > 60 ? 'text-yellow-600 opacity-60' : 'text-green-500'
              }`}
            />
          ))}
        </div>

        {/* Water body - affected by water pollution */}
        <div className={`w-32 h-8 rounded-full transition-all duration-1000 ${
          pollutionLevels.water > 60 ? 'bg-brown-400' : 'bg-blue-400'
        } relative`}>
          {/* Fish - affected by pollution */}
          <div className="absolute inset-0 flex items-center justify-center space-x-2">
            {[...Array(Math.max(1, 4 - Math.floor(pollutionLevels.water / 25)))].map((_, i) => (
              <div
                key={i}
                className="w-2 h-1 bg-white rounded-full opacity-80"
              />
            ))}
          </div>
          
          {/* Pollution particles in water */}
          {pollutionLevels.water > 40 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(Math.floor(pollutionLevels.water / 20))].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-gray-600 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Soil - affected by soil pollution */}
        <div className={`w-32 h-4 rounded-b-lg transition-all duration-1000 ${
          pollutionLevels.soil > 60 ? 'bg-gray-600' : 'bg-brown-500'
        }`}>
          {/* Soil organisms */}
          {pollutionLevels.soil < 50 && (
            <div className="absolute inset-0 flex items-center justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 h-0.5 bg-yellow-400 rounded-full animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-96 bg-gradient-to-b from-gray-200 to-brown-200 rounded-xl relative overflow-hidden shadow-2xl">
      {/* Pollution source */}
      <div className="absolute top-4 left-8">
        {renderPollutionSource()}
      </div>

      {/* Current pollutant info */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-64">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h4 className="font-bold text-gray-800">Pollution Monitor</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Current Focus:</span>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
              pollutants[currentPollutant].color
            }`}>
              {pollutants[currentPollutant].name}
            </div>
          </div>
          
          <div className="text-xs text-gray-600">
            <div><strong>Source:</strong> {pollutants[currentPollutant].source}</div>
            <div><strong>Effect:</strong> {pollutants[currentPollutant].effect}</div>
          </div>
        </div>
      </div>

      {/* Ecosystem visualization */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {renderEcosystem()}
      </div>

      {/* Pollution levels */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-bold text-gray-800 mb-3 text-sm">Pollution Levels</h5>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Air:</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    pollutionLevels.air > 70 ? 'bg-red-500' : 
                    pollutionLevels.air > 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${pollutionLevels.air}%` }}
                />
              </div>
              <span className="text-xs font-mono">{pollutionLevels.air.toFixed(0)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Water:</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    pollutionLevels.water > 70 ? 'bg-red-500' : 
                    pollutionLevels.water > 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${pollutionLevels.water}%` }}
                />
              </div>
              <span className="text-xs font-mono">{pollutionLevels.water.toFixed(0)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-brown-500" />
              <span className="text-sm">Soil:</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    pollutionLevels.soil > 70 ? 'bg-red-500' : 
                    pollutionLevels.soil > 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${pollutionLevels.soil}%` }}
                />
              </div>
              <span className="text-xs font-mono">{pollutionLevels.soil.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Impact assessment */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-bold text-gray-800 mb-3 text-sm">Environmental Impact</h5>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Ecosystem Health:</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    ecosystemHealth > 70 ? 'bg-green-500' : 
                    ecosystemHealth > 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${ecosystemHealth}%` }}
                />
              </div>
              <span className="font-bold text-gray-700">{ecosystemHealth.toFixed(0)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Biodiversity:</span>
            <span className={`font-bold ${
              biodiversityIndex > 0.7 ? 'text-green-600' : 
              biodiversityIndex > 0.4 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {biodiversityIndex.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Human Health Risk:</span>
            <div className="flex items-center space-x-2">
              <TrendingDown className={`w-4 h-4 ${
                humanHealthImpact > 70 ? 'text-red-500' : 
                humanHealthImpact > 40 ? 'text-yellow-500' : 'text-green-500'
              }`} />
              <span className={`font-bold ${
                humanHealthImpact > 70 ? 'text-red-600' : 
                humanHealthImpact > 40 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {humanHealthImpact.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bioaccumulation chain */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-bold text-gray-800 mb-3 text-sm">Bioaccumulation</h5>
        
        <div className="flex items-center space-x-2 mb-2">
          <div className="text-xs text-center">
            <div className="w-4 h-4 bg-green-400 rounded-full mb-1"></div>
            <div>Plants</div>
            <div className="font-mono text-xs">1x</div>
          </div>
          <div className="text-xs">→</div>
          <div className="text-xs text-center">
            <div className="w-4 h-4 bg-blue-400 rounded-full mb-1"></div>
            <div>Fish</div>
            <div className="font-mono text-xs">10x</div>
          </div>
          <div className="text-xs">→</div>
          <div className="text-xs text-center">
            <div className="w-4 h-4 bg-red-400 rounded-full mb-1"></div>
            <div>Birds</div>
            <div className="font-mono text-xs">100x</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${bioaccumulation}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">Toxin Concentration</div>
      </div>

      {/* Pollution particles animation */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Air pollution particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`air-${i}`}
              className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-40 animate-bounce"
              style={{
                left: `${20 + i * 10}%`,
                top: `${10 + Math.random() * 30}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '4s'
              }}
            />
          ))}
          
          {/* Water pollution */}
          {pollutionLevels.water > 50 && (
            <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`water-${i}`}
                  className="absolute w-1 h-1 bg-brown-600 rounded-full animate-pulse"
                  style={{
                    left: `${i * 8}px`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Warning indicators */}
      {(pollutionLevels.air > 80 || pollutionLevels.water > 80 || pollutionLevels.soil > 80) && (
        <div className="absolute top-1/2 center bg-red-100 border-2 border-red-400 rounded-lg p-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-xl">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <div className="font-bold text-red-800">Critical Pollution Level!</div>
              <div className="text-xs text-red-600">Immediate action required</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollutionEffectsSimulation;