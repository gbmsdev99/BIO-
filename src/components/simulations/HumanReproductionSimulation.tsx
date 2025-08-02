import React, { useEffect, useState } from 'react';
import { Heart, Baby, Calendar, Activity } from 'lucide-react';

interface HumanReproductionSimulationProps {
  isPlaying: boolean;
}

const HumanReproductionSimulation: React.FC<HumanReproductionSimulationProps> = ({ isPlaying }) => {
  const [currentPhase, setCurrentPhase] = useState<'ovulation' | 'fertilization' | 'implantation' | 'development'>('ovulation');
  const [cycleDay, setCycleDay] = useState(1);
  const [hormoneLevel, setHormoneLevel] = useState({ estrogen: 30, progesterone: 20, lh: 10, fsh: 15 });
  const [embryoStage, setEmbryoStage] = useState(0);

  const phases = {
    ovulation: { name: 'Ovulation', duration: 'Day 14', description: 'Egg released from ovary' },
    fertilization: { name: 'Fertilization', duration: 'Day 15-16', description: 'Sperm meets egg in fallopian tube' },
    implantation: { name: 'Implantation', duration: 'Day 21-22', description: 'Embryo attaches to uterine wall' },
    development: { name: 'Development', duration: 'Week 3-40', description: 'Fetal growth and development' }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentPhase(prev => {
          switch (prev) {
            case 'ovulation': return 'fertilization';
            case 'fertilization': return 'implantation';
            case 'implantation': return 'development';
            case 'development': return 'ovulation';
            default: return 'ovulation';
          }
        });

        setCycleDay(prev => (prev % 28) + 1);
        setEmbryoStage(prev => Math.min(prev + 1, 8));

        // Simulate hormone fluctuations
        setHormoneLevel(prev => ({
          estrogen: Math.max(20, Math.min(80, prev.estrogen + (Math.random() - 0.5) * 20)),
          progesterone: Math.max(10, Math.min(60, prev.progesterone + (Math.random() - 0.5) * 15)),
          lh: Math.max(5, Math.min(50, prev.lh + (Math.random() - 0.5) * 25)),
          fsh: Math.max(5, Math.min(40, prev.fsh + (Math.random() - 0.5) * 10))
        }));
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setCycleDay(1);
      setEmbryoStage(0);
      setCurrentPhase('ovulation');
    }
  }, [isPlaying]);

  return (
    <div className="h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl relative overflow-hidden">
      {/* Female Reproductive System */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Uterus */}
        <div className={`w-20 h-24 bg-pink-300 rounded-t-full relative ${
          currentPhase === 'implantation' || currentPhase === 'development' ? 'animate-pulse bg-pink-400' : ''
        }`}>
          {/* Endometrium */}
          <div className="absolute inset-2 bg-pink-400 rounded-t-full">
            {currentPhase === 'implantation' && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
            {currentPhase === 'development' && (
              <div className="absolute inset-2 bg-red-300 rounded-t-full flex items-center justify-center">
                <Baby className="w-4 h-4 text-red-600 animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Fallopian Tubes */}
        <div className="absolute -top-2 left-0 w-8 h-3 bg-pink-400 rounded-full transform -rotate-45">
          {currentPhase === 'fertilization' && (
            <div className="absolute inset-0 bg-pink-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <div className="absolute -top-2 right-0 w-8 h-3 bg-pink-400 rounded-full transform rotate-45">
          {currentPhase === 'fertilization' && (
            <div className="absolute inset-0 bg-pink-500 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Ovaries */}
        <div className={`absolute -top-4 -left-4 w-6 h-4 bg-purple-400 rounded-full ${
          currentPhase === 'ovulation' ? 'animate-pulse bg-purple-500' : ''
        }`}>
          {currentPhase === 'ovulation' && (
            <div className="absolute -right-2 top-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
          )}
        </div>
        <div className={`absolute -top-4 -right-4 w-6 h-4 bg-purple-400 rounded-full ${
          currentPhase === 'ovulation' ? 'animate-pulse bg-purple-500' : ''
        }`}>
          {currentPhase === 'ovulation' && (
            <div className="absolute -left-2 top-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
          )}
        </div>
      </div>

      {/* Gametes Animation */}
      {currentPhase === 'fertilization' && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
          {/* Egg */}
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse relative">
            <div className="absolute inset-1 bg-yellow-500 rounded-full"></div>
          </div>
          
          {/* Sperm */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{
                left: `${-10 + i * 4}px`,
                top: `${2 + i * 2}px`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-blue-600 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Phase Information */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-64">
        <div className="flex items-center space-x-2 mb-2">
          <Heart className="w-5 h-5 text-pink-500" />
          <h4 className="font-semibold text-gray-800">{phases[currentPhase].name}</h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">Timing: </span>
            <span className="text-gray-600">{phases[currentPhase].duration}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Process: </span>
            <span className="text-gray-600">{phases[currentPhase].description}</span>
          </div>
        </div>
      </div>

      {/* Menstrual Cycle Calendar */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-semibold">Cycle Day</span>
        </div>
        <div className="text-2xl font-bold text-center text-purple-600">
          {cycleDay}
        </div>
        <div className="text-xs text-gray-600 text-center">of 28 days</div>
        
        {/* Cycle visualization */}
        <div className="mt-2 w-16 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(cycleDay / 28) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Hormone Levels */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Hormone Levels</h5>
        <div className="space-y-1 text-xs">
          {Object.entries(hormoneLevel).map(([hormone, level]) => (
            <div key={hormone} className="flex items-center justify-between">
              <span className="capitalize">{hormone}:</span>
              <div className="w-12 bg-gray-200 rounded-full h-1 ml-2">
                <div 
                  className={`h-1 rounded-full transition-all duration-1000 ${
                    hormone === 'estrogen' ? 'bg-pink-500' :
                    hormone === 'progesterone' ? 'bg-purple-500' :
                    hormone === 'lh' ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embryo Development */}
      {currentPhase === 'development' && (
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Baby className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold">Development</span>
          </div>
          <div className="text-lg font-bold text-blue-600">
            Week {embryoStage}
          </div>
          <div className="text-xs text-gray-600">
            {embryoStage <= 2 && 'Cell division'}
            {embryoStage > 2 && embryoStage <= 4 && 'Organ formation'}
            {embryoStage > 4 && embryoStage <= 6 && 'Growth phase'}
            {embryoStage > 6 && 'Maturation'}
          </div>
        </div>
      )}

      {/* Fertilization Success */}
      {currentPhase === 'fertilization' && (
        <div className="absolute top-1/2 right-8 bg-green-100 text-green-800 px-3 py-2 rounded-lg animate-pulse">
          <div className="text-sm font-semibold">Fertilization</div>
          <div className="text-xs">In Progress...</div>
          <Activity className="w-4 h-4 mx-auto mt-1 animate-spin" />
        </div>
      )}

      {/* Key Statistics */}
      <div className="absolute bottom-4 center bg-white/90 backdrop-blur-sm rounded-lg p-3 left-1/2 transform -translate-x-1/2">
        <div className="grid grid-cols-3 gap-4 text-xs text-center">
          <div>
            <div className="font-semibold text-gray-800">Egg Lifespan</div>
            <div className="text-gray-600">12-24 hours</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">Sperm Lifespan</div>
            <div className="text-gray-600">3-5 days</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">Pregnancy</div>
            <div className="text-gray-600">40 weeks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanReproductionSimulation;