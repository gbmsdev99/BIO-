import React, { useEffect, useState } from 'react';
import { Heart, Activity, Droplets } from 'lucide-react';

interface HeartSimulationProps {
  isPlaying: boolean;
}

const HeartSimulation: React.FC<HeartSimulationProps> = ({ isPlaying }) => {
  const [heartbeat, setHeartbeat] = useState(false);
  const [bloodFlow, setBloodFlow] = useState(0);
  const [phase, setPhase] = useState<'systole' | 'diastole'>('diastole');

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setHeartbeat(true);
        setPhase(prev => prev === 'systole' ? 'diastole' : 'systole');
        setBloodFlow(prev => (prev + 1) % 4);
        
        setTimeout(() => setHeartbeat(false), 300);
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      setHeartbeat(false);
      setBloodFlow(0);
      setPhase('diastole');
    }
  }, [isPlaying]);

  return (
    <div className="h-96 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl relative overflow-hidden">
      {/* Heart */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Heart 
          className={`w-24 h-24 text-red-500 transition-all duration-300 
            ${heartbeat ? 'scale-110 text-red-600' : 'scale-100'} 
            ${phase === 'systole' ? 'fill-current' : ''}`} 
        />
        
        {/* Heart chambers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1">
            <div className={`w-3 h-4 rounded-t-full ${phase === 'systole' ? 'bg-red-400' : 'bg-red-200'}`}></div>
            <div className={`w-3 h-4 rounded-t-full ${phase === 'systole' ? 'bg-red-400' : 'bg-red-200'}`}></div>
            <div className={`w-3 h-4 rounded-b-full ${phase === 'diastole' ? 'bg-red-400' : 'bg-red-200'}`}></div>
            <div className={`w-3 h-4 rounded-b-full ${phase === 'diastole' ? 'bg-red-400' : 'bg-red-200'}`}></div>
          </div>
        </div>
      </div>

      {/* Blood vessels */}
      <div className="absolute top-20 left-1/2 w-2 h-16 bg-red-300 transform -translate-x-1/2 rounded-t-full">
        {/* Aorta */}
        {bloodFlow >= 1 && (
          <div className="w-full h-4 bg-red-500 rounded-t-full animate-pulse"></div>
        )}
      </div>

      <div className="absolute bottom-20 left-1/2 w-2 h-16 bg-blue-300 transform -translate-x-1/2 rounded-b-full">
        {/* Vena Cava */}
        {bloodFlow >= 3 && (
          <div className="w-full h-4 bg-blue-500 rounded-b-full animate-pulse absolute bottom-0"></div>
        )}
      </div>

      {/* Lungs representation */}
      <div className="absolute top-8 left-8 right-8 flex justify-between">
        <div className={`w-16 h-12 bg-pink-200 rounded-full ${bloodFlow === 2 ? 'bg-pink-400 animate-pulse' : ''}`}>
          <div className="absolute inset-2 bg-pink-300 rounded-full"></div>
        </div>
        <div className={`w-16 h-12 bg-pink-200 rounded-full ${bloodFlow === 2 ? 'bg-pink-400 animate-pulse' : ''}`}>
          <div className="absolute inset-2 bg-pink-300 rounded-full"></div>
        </div>
      </div>

      {/* Blood flow indicators */}
      {isPlaying && (
        <>
          {/* Oxygenated blood */}
          <div className="absolute top-16 right-1/4">
            <Droplets className="w-6 h-6 text-red-500 animate-bounce" />
            <div className="text-xs text-red-600 font-semibold">O₂ Rich</div>
          </div>

          {/* Deoxygenated blood */}
          <div className="absolute bottom-16 left-1/4">
            <Droplets className="w-6 h-6 text-blue-500 animate-bounce" />
            <div className="text-xs text-blue-600 font-semibold">CO₂ Rich</div>
          </div>
        </>
      )}

      {/* Heart rate monitor */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Activity className="w-4 h-4 text-red-500" />
          <span className="text-sm font-semibold">Heart Rate</span>
        </div>
        <div className="text-xl font-bold text-red-600">
          {isPlaying ? '72 BPM' : '-- BPM'}
        </div>
      </div>

      {/* Phase indicator */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="text-sm font-semibold text-gray-800 mb-1">
          Cardiac Phase
        </div>
        <div className="text-lg font-bold capitalize" style={{ 
          color: phase === 'systole' ? '#dc2626' : '#2563eb' 
        }}>
          {phase}
        </div>
        <div className="text-xs text-gray-600">
          {phase === 'systole' ? 'Heart contracts' : 'Heart relaxes'}
        </div>
      </div>

      {/* Blood pressure simulation */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="text-sm font-semibold text-gray-800 mb-1">
          Blood Pressure
        </div>
        <div className="text-lg font-bold text-red-600">
          {isPlaying ? (phase === 'systole' ? '120/80' : '80/60') : '--/--'}
        </div>
      </div>
    </div>
  );
};

export default HeartSimulation;