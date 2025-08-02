import React, { useEffect, useState } from 'react';
import { Sun, Droplets, Leaf, ArrowRight, Zap, Wind } from 'lucide-react';

interface PhotosynthesisSimulationProps {
  isPlaying: boolean;
}

const PhotosynthesisSimulation: React.FC<PhotosynthesisSimulationProps> = ({ isPlaying }) => {
  const [currentPhase, setCurrentPhase] = useState<'light' | 'dark'>('light');
  const [chloroplastActivity, setChloroplastActivity] = useState(0);
  const [co2Level, setCo2Level] = useState(400);
  const [oxygenProduced, setOxygenProduced] = useState(0);
  const [glucoseProduced, setGlucoseProduced] = useState(0);
  const [waterUptake, setWaterUptake] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(100);
  const [stomataOpen, setStomataOpen] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentPhase(prev => prev === 'light' ? 'dark' : 'light');
        
        if (currentPhase === 'light') {
          setChloroplastActivity(prev => Math.min(prev + 15, 100));
          setCo2Level(prev => Math.max(prev - 5, 350));
          setOxygenProduced(prev => Math.min(prev + 8, 100));
          setGlucoseProduced(prev => Math.min(prev + 6, 100));
          setWaterUptake(prev => Math.min(prev + 10, 100));
          setStomataOpen(true);
        } else {
          setChloroplastActivity(prev => Math.max(prev - 5, 0));
          setCo2Level(prev => Math.min(prev + 2, 400));
          setStomataOpen(false);
        }
        
        setLightIntensity(prev => currentPhase === 'light' ? 
          Math.min(prev + 10, 100) : Math.max(prev - 15, 20));
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setCurrentPhase('light');
      setChloroplastActivity(0);
      setCo2Level(400);
      setOxygenProduced(0);
      setGlucoseProduced(0);
      setWaterUptake(0);
      setLightIntensity(100);
      setStomataOpen(true);
    }
  }, [isPlaying, currentPhase]);

  return (
    <div className="h-96 bg-gradient-to-b from-sky-300 via-green-200 to-green-400 rounded-xl relative overflow-hidden shadow-2xl">
      {/* 3D Sun with realistic lighting */}
      <div className={`absolute top-4 right-4 transition-all duration-1000 ${
        currentPhase === 'light' ? 'scale-110' : 'scale-90 opacity-60'
      }`}>
        <div className="relative">
          <Sun className={`w-16 h-16 text-yellow-400 transition-all duration-1000 ${
            currentPhase === 'light' ? 'animate-pulse drop-shadow-2xl' : ''
          }`} />
          {/* Sun rays */}
          {currentPhase === 'light' && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-8 bg-yellow-300 opacity-60 animate-pulse"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: 'center',
                    top: '50%',
                    left: '50%',
                    marginTop: '-16px',
                    marginLeft: '-2px'
                  }}
                />
              ))}
            </div>
          )}
          {/* Light intensity indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 rounded-lg px-2 py-1">
            <div className="text-xs font-semibold text-yellow-600">{lightIntensity}% Light</div>
          </div>
        </div>
      </div>

      {/* 3D Leaf Structure */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Main leaf with 3D effect */}
          <div className={`w-32 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full relative shadow-xl transform transition-all duration-1000 ${
            chloroplastActivity > 50 ? 'scale-105 shadow-green-400/50' : ''
          }`}>
            {/* Leaf veins */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-green-700 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/3 left-1/2 w-12 h-0.5 bg-green-700 transform -translate-x-1/2 -translate-y-1/2 rotate-12"></div>
              <div className="absolute top-2/3 left-1/2 w-12 h-0.5 bg-green-700 transform -translate-x-1/2 -translate-y-1/2 -rotate-12"></div>
            </div>

            {/* Chloroplasts with activity */}
            <div className="absolute inset-4 grid grid-cols-6 gap-1">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    chloroplastActivity > (i * 4) ? 'bg-green-600 animate-pulse shadow-lg' : 'bg-green-500'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            {/* Stomata */}
            <div className="absolute bottom-2 left-4 right-4 flex justify-between">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-3 rounded-full transition-all duration-1000 ${
                    stomataOpen ? 'bg-blue-400 animate-pulse' : 'bg-green-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stem with water transport */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gradient-to-b from-green-500 to-green-700 rounded-b-lg shadow-lg">
            {waterUptake > 0 && (
              <div className="absolute inset-1 bg-blue-400 opacity-60 animate-pulse rounded-b-lg"
                   style={{ height: `${waterUptake}%` }} />
            )}
          </div>

          {/* Root system */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-16">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-8 bg-brown-600 rounded-b-full transform"
                  style={{ transform: `rotate(${(i - 2) * 15}deg)` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CO2 molecules with realistic movement */}
      {isPlaying && stomataOpen && (
        <div className="absolute left-8 top-1/3 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg"
              style={{ 
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            >
              CO₂
            </div>
          ))}
        </div>
      )}

      {/* Oxygen bubbles */}
      {oxygenProduced > 20 && (
        <div className="absolute right-8 top-1/3 space-y-2">
          {[...Array(Math.floor(oxygenProduced / 20))].map((_, i) => (
            <div
              key={i}
              className="bg-blue-400 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg"
              style={{ 
                animationDelay: `${i * 0.4}s`,
                animationDuration: '1.5s'
              }}
            >
              O₂
            </div>
          ))}
        </div>
      )}

      {/* Glucose production */}
      {glucoseProduced > 30 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-yellow-400 text-yellow-900 px-3 py-2 rounded-lg font-semibold shadow-lg animate-pulse">
            C₆H₁₂O₆ (Glucose)
          </div>
        </div>
      )}

      {/* Real-time data panel */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
          <Leaf className="w-5 h-5 text-green-500 mr-2" />
          Photosynthesis Monitor
        </h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Phase:</span>
            <span className={`font-semibold px-2 py-1 rounded ${
              currentPhase === 'light' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {currentPhase === 'light' ? 'Light Reaction' : 'Dark Reaction'}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Chloroplast Activity:</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${chloroplastActivity}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>CO₂ Level:</span>
              <span className="font-mono text-gray-600">{co2Level} ppm</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>O₂ Production:</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${oxygenProduced}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Glucose Synthesis:</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${glucoseProduced}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental factors */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-bold text-gray-800 mb-2">Environmental Factors</h5>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4 text-yellow-500" />
            <span>Light: {lightIntensity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>Water: {waterUptake}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-gray-500" />
            <span>Stomata: {stomataOpen ? 'Open' : 'Closed'}</span>
          </div>
        </div>
      </div>

      {/* Chemical equation */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl">
        <div className="text-sm font-mono text-center">
          <div className="text-gray-700">6CO₂ + 6H₂O + Light Energy</div>
          <ArrowRight className="w-4 h-4 mx-auto my-1 text-green-500" />
          <div className="text-gray-700">C₆H₁₂O₆ + 6O₂ + ATP</div>
        </div>
      </div>

      {/* Light rays animation */}
      {currentPhase === 'light' && isPlaying && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-20 bg-yellow-300 opacity-30 animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: '10%',
                transform: `rotate(${10 + i * 5}deg)`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosynthesisSimulation;