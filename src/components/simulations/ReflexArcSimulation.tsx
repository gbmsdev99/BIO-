import React, { useEffect, useState } from 'react';
import { Zap, Eye, Hand, Brain, ArrowRight } from 'lucide-react';

interface ReflexArcSimulationProps {
  isPlaying: boolean;
}

const ReflexArcSimulation: React.FC<ReflexArcSimulationProps> = ({ isPlaying }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [impulsePosition, setImpulsePosition] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);

  const steps = [
    { name: 'Stimulus Detection', description: 'Sensory receptor detects hot object', icon: Eye, color: 'text-red-500' },
    { name: 'Sensory Neuron', description: 'Impulse travels to spinal cord', icon: Zap, color: 'text-blue-500' },
    { name: 'Spinal Cord Processing', description: 'Interneuron processes signal', icon: Brain, color: 'text-purple-500' },
    { name: 'Motor Neuron', description: 'Signal sent to muscle', icon: ArrowRight, color: 'text-green-500' },
    { name: 'Motor Response', description: 'Hand withdraws from stimulus', icon: Hand, color: 'text-orange-500' }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % steps.length;
          setImpulsePosition(next * 20);
          setReactionTime(prev => prev + 50);
          return next;
        });
      }, 800);

      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
      setImpulsePosition(0);
      setReactionTime(0);
    }
  }, [isPlaying]);

  return (
    <div className="h-96 bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl relative overflow-hidden">
      {/* Human Figure Outline */}
      <div className="absolute right-8 top-8 bottom-8 w-32">
        {/* Head */}
        <div className="w-16 h-16 bg-pink-200 rounded-full mx-auto mb-2 relative">
          <div className="absolute inset-2 bg-pink-300 rounded-full"></div>
          {/* Brain */}
          <div className={`absolute inset-4 bg-pink-400 rounded-full ${currentStep === 2 ? 'animate-pulse bg-pink-500' : ''}`}></div>
        </div>

        {/* Spinal Cord */}
        <div className="w-2 h-32 bg-gray-400 mx-auto relative">
          {currentStep >= 1 && currentStep <= 3 && (
            <div className="absolute inset-0 bg-blue-500 animate-pulse rounded"></div>
          )}
          
          {/* Spinal Cord Segments */}
          <div className="absolute inset-0 space-y-2 pt-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-full h-2 rounded ${
                  currentStep === 2 && i === 3 ? 'bg-purple-500 animate-pulse' : 'bg-gray-500'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Arm */}
        <div className="absolute top-20 -left-8 w-16 h-2 bg-pink-300 rounded-full transform -rotate-45">
          {/* Hand */}
          <div className={`absolute -right-4 -top-2 w-6 h-6 bg-pink-400 rounded-full ${
            currentStep === 4 ? 'animate-bounce bg-orange-400' : ''
          }`}>
            <Hand className="w-4 h-4 text-pink-600 absolute inset-1" />
          </div>
        </div>
      </div>

      {/* Stimulus Source */}
      <div className="absolute top-24 right-20">
        <div className={`w-8 h-8 bg-red-500 rounded-full ${currentStep === 0 ? 'animate-pulse bg-red-600' : ''}`}>
          <div className="absolute inset-1 bg-red-600 rounded-full"></div>
          {/* Heat waves */}
          {currentStep === 0 && (
            <div className="absolute -inset-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-red-400 rounded-full animate-ping"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          )}
        </div>
        <div className="text-xs text-center mt-1 text-red-600 font-semibold">Hot Object</div>
      </div>

      {/* Neural Pathway */}
      <div className="absolute left-8 top-8 bottom-8 w-64">
        <svg className="w-full h-full" viewBox="0 0 256 320">
          {/* Sensory Neuron Path */}
          <path
            d="M 20 280 Q 60 240 100 160 Q 120 120 140 80"
            stroke={currentStep >= 1 ? "#3B82F6" : "#D1D5DB"}
            strokeWidth="3"
            fill="none"
            className={currentStep === 1 ? "animate-pulse" : ""}
          />
          
          {/* Interneuron in Spinal Cord */}
          <circle
            cx="140"
            cy="80"
            r="8"
            fill={currentStep === 2 ? "#8B5CF6" : "#D1D5DB"}
            className={currentStep === 2 ? "animate-pulse" : ""}
          />
          
          {/* Motor Neuron Path */}
          <path
            d="M 140 80 Q 160 120 180 160 Q 200 200 220 240"
            stroke={currentStep >= 3 ? "#10B981" : "#D1D5DB"}
            strokeWidth="3"
            fill="none"
            className={currentStep === 3 ? "animate-pulse" : ""}
          />

          {/* Impulse Indicator */}
          {isPlaying && (
            <circle
              cx="20"
              cy="280"
              r="4"
              fill="#EF4444"
              className="animate-pulse"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 20 280 Q 60 240 100 160 Q 120 120 140 80 Q 160 120 180 160 Q 200 200 220 240"
              />
            </circle>
          )}
        </svg>

        {/* Neuron Labels */}
        <div className="absolute bottom-4 left-4 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
          Sensory Neuron
        </div>
        <div className="absolute top-16 left-32 bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
          Interneuron
        </div>
        <div className="absolute bottom-16 right-4 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
          Motor Neuron
        </div>
      </div>

      {/* Step Information */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-64">
        <div className="flex items-center space-x-2 mb-2">
          {React.createElement(steps[currentStep].icon, {
            className: `w-5 h-5 ${steps[currentStep].color}`
          })}
          <h4 className="font-semibold text-gray-800">{steps[currentStep].name}</h4>
        </div>
        <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Reaction Time */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-semibold text-gray-800 mb-2">Reflex Speed</h4>
        <div className="text-2xl font-bold text-green-600">
          {reactionTime}ms
        </div>
        <div className="text-xs text-gray-600">
          Normal: 150-300ms
        </div>
      </div>

      {/* Key Features */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-semibold text-gray-800 mb-2">Reflex Arc Features</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Bypasses brain for speed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Involuntary response</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Protective mechanism</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Spinal cord processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflexArcSimulation;