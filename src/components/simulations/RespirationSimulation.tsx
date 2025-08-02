import React, { useEffect, useState } from 'react';
import { Activity, ArrowRight, Zap } from 'lucide-react';

interface RespirationSimulationProps {
  isPlaying: boolean;
}

const RespirationSimulation: React.FC<RespirationSimulationProps> = ({ isPlaying }) => {
  const [step, setStep] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setStep((prev) => (prev + 1) % 3);
        setEnergyLevel((prev) => Math.min(prev + 25, 100));
      }, 2500);
      return () => clearInterval(interval);
    } else {
      setStep(0);
      setEnergyLevel(0);
    }
  }, [isPlaying]);

  const processes = [
    { name: 'Glycolysis', location: 'Cytoplasm', energy: '2 ATP' },
    { name: 'Krebs Cycle', location: 'Mitochondria', energy: '2 ATP' },
    { name: 'Electron Transport', location: 'Mitochondria', energy: '32 ATP' }
  ];

  return (
    <div className="h-96 bg-gradient-to-br from-purple-100 to-red-100 rounded-xl relative overflow-hidden">
      {/* Cell structure */}
      <div className="absolute inset-4 border-2 border-gray-400 rounded-full relative">
        <div className="absolute inset-8 border-2 border-red-400 rounded-full relative">
          {/* Mitochondria */}
          <div className={`absolute top-1/2 right-1/4 w-16 h-8 bg-red-200 rounded-full border-2 border-red-400 
            ${step >= 1 ? 'animate-pulse bg-red-300' : ''}`}>
            <div className="absolute inset-1 bg-red-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Glucose molecule */}
      <div className="absolute top-4 left-4">
        <div className={`bg-yellow-400 text-white px-3 py-2 rounded-lg font-semibold 
          ${step === 0 ? 'animate-bounce' : ''}`}>
          C₆H₁₂O₆
          <div className="text-xs">Glucose</div>
        </div>
      </div>

      {/* Process steps */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-800">
            Step {step + 1}: {processes[step].name}
          </h4>
          <div className="text-sm text-gray-600">{processes[step].location}</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm font-semibold text-green-600">
            {processes[step].energy}
          </div>
        </div>
      </div>

      {/* ATP molecules */}
      {isPlaying && (
        <div className="absolute top-1/2 right-4 space-y-2">
          {[...Array(Math.floor(energyLevel / 10))].map((_, i) => (
            <div key={i} className="bg-green-400 text-white text-xs px-2 py-1 rounded animate-pulse">
              ATP
            </div>
          ))}
        </div>
      )}

      {/* Energy meter */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold">Energy Produced</span>
        </div>
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${energyLevel}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600 mt-1">{energyLevel}% ATP</div>
      </div>

      {/* Process arrows */}
      {isPlaying && (
        <div className="absolute top-1/2 left-1/3 animate-pulse">
          <ArrowRight className="w-8 h-8 text-purple-600" />
        </div>
      )}

      {/* Equation */}
      <div className="absolute top-16 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
        <p className="text-xs font-mono">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36ATP</p>
      </div>
    </div>
  );
};

export default RespirationSimulation;