import React, { useEffect, useState } from 'react';
import { Sun, Droplets, Leaf, ArrowRight } from 'lucide-react';

interface PhotosynthesisSimulationProps {
  isPlaying: boolean;
}

const PhotosynthesisSimulation: React.FC<PhotosynthesisSimulationProps> = ({ isPlaying }) => {
  const [step, setStep] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setStep((prev) => (prev + 1) % 4);
        setAnimationClass('animate-pulse');
        setTimeout(() => setAnimationClass(''), 500);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setStep(0);
    }
  }, [isPlaying]);

  const steps = [
    { title: 'Light Absorption', description: 'Chlorophyll absorbs sunlight energy' },
    { title: 'Water Uptake', description: 'Roots absorb water from soil' },
    { title: 'CO₂ Intake', description: 'Stomata take in carbon dioxide' },
    { title: 'Glucose Production', description: 'Light energy converts CO₂ + H₂O → Glucose + O₂' }
  ];

  return (
    <div className="h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-xl relative overflow-hidden">
      {/* Sun */}
      <div className={`absolute top-4 right-4 ${step >= 0 && isPlaying ? 'animate-spin' : ''}`}>
        <Sun className={`w-12 h-12 text-yellow-500 ${step === 0 ? 'text-yellow-400 animate-pulse' : ''}`} />
      </div>

      {/* Plant Structure */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        {/* Leaves */}
        <div className="relative">
          <Leaf className={`w-16 h-16 text-green-500 mb-4 ${step === 0 || step === 3 ? animationClass : ''}`} />
          {/* Stomata indicators */}
          {step === 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          )}
        </div>

        {/* Stem */}
        <div className="w-2 h-24 bg-green-600 mx-auto relative">
          {/* Water flow animation */}
          {step === 1 && (
            <div className="absolute inset-0 bg-blue-400 animate-pulse opacity-50 rounded"></div>
          )}
        </div>

        {/* Roots */}
        <div className="flex justify-center space-x-4">
          <div className="w-12 h-2 bg-green-700 rounded transform rotate-45"></div>
          <div className="w-12 h-2 bg-green-700 rounded transform -rotate-45"></div>
        </div>

        {/* Water droplets */}
        {step === 1 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <Droplets className="w-6 h-6 text-blue-500 animate-bounce" />
          </div>
        )}
      </div>

      {/* CO2 molecules */}
      {step === 2 && (
        <div className="absolute left-4 top-1/3 animate-bounce">
          <div className="bg-gray-400 text-white text-xs px-2 py-1 rounded">CO₂</div>
        </div>
      )}

      {/* Glucose and Oxygen output */}
      {step === 3 && (
        <div className="absolute right-4 top-1/2 space-y-2">
          <div className="bg-green-400 text-white text-xs px-2 py-1 rounded animate-pulse">C₆H₁₂O₆</div>
          <div className="bg-blue-400 text-white text-xs px-2 py-1 rounded animate-pulse">O₂</div>
        </div>
      )}

      {/* Process arrows */}
      {isPlaying && (
        <div className="absolute top-1/2 left-1/4 right-1/4 flex items-center justify-center">
          <ArrowRight className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
      )}

      {/* Step indicator */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-semibold text-gray-800">{steps[step].title}</h4>
        <p className="text-sm text-gray-600">{steps[step].description}</p>
      </div>

      {/* Equation */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <p className="text-sm font-mono">6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂</p>
      </div>
    </div>
  );
};

export default PhotosynthesisSimulation;