import React, { useEffect, useState } from 'react';
import { Droplets, Filter, ArrowDown, Beaker } from 'lucide-react';

interface KidneySimulationProps {
  isPlaying: boolean;
}

const KidneySimulation: React.FC<KidneySimulationProps> = ({ isPlaying }) => {
  const [filtrationRate, setFiltrationRate] = useState(0);
  const [reabsorptionRate, setReabsorptionRate] = useState(0);
  const [urineConcentration, setUrineConcentration] = useState(0);
  const [bloodPressure, setBloodPressure] = useState(120);
  const [activeProcess, setActiveProcess] = useState<'filtration' | 'reabsorption' | 'secretion'>('filtration');

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveProcess(prev => {
          switch (prev) {
            case 'filtration': return 'reabsorption';
            case 'reabsorption': return 'secretion';
            case 'secretion': return 'filtration';
            default: return 'filtration';
          }
        });

        setFiltrationRate(prev => Math.min(prev + 15, 100));
        setReabsorptionRate(prev => Math.min(prev + 12, 85));
        setUrineConcentration(prev => Math.min(prev + 8, 60));
        setBloodPressure(prev => 120 + Math.sin(Date.now() / 1000) * 10);
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setFiltrationRate(0);
      setReabsorptionRate(0);
      setUrineConcentration(0);
      setBloodPressure(120);
      setActiveProcess('filtration');
    }
  }, [isPlaying]);

  return (
    <div className="h-96 bg-gradient-to-br from-blue-100 to-red-100 rounded-xl relative overflow-hidden">
      {/* Kidney Structure */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Kidney Outline */}
        <div className="w-32 h-40 bg-red-200 rounded-full relative border-4 border-red-400">
          {/* Renal Cortex */}
          <div className="absolute inset-2 bg-red-300 rounded-full">
            {/* Nephrons */}
            <div className="absolute inset-4 grid grid-cols-4 gap-1">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    activeProcess === 'filtration' ? 'bg-blue-500 animate-pulse' :
                    activeProcess === 'reabsorption' ? 'bg-green-500 animate-pulse' :
                    'bg-yellow-500 animate-pulse'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Renal Medulla */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-red-400 rounded-t-full">
            {/* Collecting Ducts */}
            <div className="absolute inset-2 space-y-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-1 rounded ${
                    activeProcess === 'secretion' ? 'bg-yellow-400 animate-pulse' : 'bg-red-500'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Renal Pelvis */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-yellow-300 rounded-b-full">
            {urineConcentration > 30 && (
              <div className="absolute inset-1 bg-yellow-500 rounded-b-full animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Blood Vessels */}
        <div className="absolute -left-8 top-8 w-4 h-24 bg-red-500 rounded-full">
          {/* Renal Artery */}
          {isPlaying && (
            <div className="absolute inset-0 bg-red-600 animate-pulse rounded-full"></div>
          )}
        </div>

        <div className="absolute -right-8 top-12 w-4 h-16 bg-blue-500 rounded-full">
          {/* Renal Vein */}
          {isPlaying && (
            <div className="absolute inset-0 bg-blue-600 animate-pulse rounded-full"></div>
          )}
        </div>

        {/* Ureter */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-2 h-16 bg-yellow-400 rounded-b-full">
          {urineConcentration > 20 && (
            <div className="absolute inset-0 bg-yellow-500 animate-pulse rounded-b-full"></div>
          )}
        </div>
      </div>

      {/* Detailed Nephron View */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 w-48">
        <h4 className="font-semibold text-gray-800 mb-2">Nephron Function</h4>
        
        {/* Glomerulus */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Glomerular Filtration</span>
            <Filter className={`w-3 h-3 ${activeProcess === 'filtration' ? 'text-blue-500 animate-spin' : 'text-gray-400'}`} />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${filtrationRate}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600">Rate: {filtrationRate.toFixed(0)}%</div>
        </div>

        {/* Tubular Reabsorption */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Reabsorption</span>
            <ArrowDown className={`w-3 h-3 ${activeProcess === 'reabsorption' ? 'text-green-500 animate-bounce' : 'text-gray-400'}`} />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${reabsorptionRate}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600">Rate: {reabsorptionRate.toFixed(0)}%</div>
        </div>

        {/* Secretion */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Secretion</span>
            <Beaker className={`w-3 h-3 ${activeProcess === 'secretion' ? 'text-yellow-500 animate-pulse' : 'text-gray-400'}`} />
          </div>
          <div className="text-xs text-gray-600">
            Active: {activeProcess === 'secretion' ? 'Yes' : 'No'}
          </div>
        </div>
      </div>

      {/* Blood Pressure Monitor */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-semibold text-gray-800 mb-2">Vital Signs</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Blood Pressure:</span>
            <span className="font-mono text-red-600">{bloodPressure.toFixed(0)}/80</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Filtration Rate:</span>
            <span className="font-mono text-blue-600">{(filtrationRate * 1.2).toFixed(0)} mL/min</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Urine Output:</span>
            <span className="font-mono text-yellow-600">{(urineConcentration * 0.8).toFixed(0)} mL/hr</span>
          </div>
        </div>
      </div>

      {/* Waste Products */}
      {isPlaying && (
        <div className="absolute bottom-4 left-1/4 space-y-2">
          <div className="bg-red-400 text-white text-xs px-2 py-1 rounded animate-bounce">Urea</div>
          <div className="bg-blue-400 text-white text-xs px-2 py-1 rounded animate-bounce" style={{ animationDelay: '0.2s' }}>Creatinine</div>
          <div className="bg-green-400 text-white text-xs px-2 py-1 rounded animate-bounce" style={{ animationDelay: '0.4s' }}>Uric Acid</div>
        </div>
      )}

      {/* Reabsorbed Substances */}
      {activeProcess === 'reabsorption' && (
        <div className="absolute bottom-4 right-1/4 space-y-2">
          <div className="bg-yellow-400 text-white text-xs px-2 py-1 rounded animate-pulse">Glucose</div>
          <div className="bg-purple-400 text-white text-xs px-2 py-1 rounded animate-pulse" style={{ animationDelay: '0.3s' }}>Amino Acids</div>
          <div className="bg-blue-400 text-white text-xs px-2 py-1 rounded animate-pulse" style={{ animationDelay: '0.6s' }}>Water</div>
        </div>
      )}

      {/* Process Description */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="text-sm">
          <span className="font-semibold capitalize">{activeProcess}</span>
          <span className="text-gray-600 ml-2">
            {activeProcess === 'filtration' && 'Blood is filtered in glomerulus, removing waste and excess water'}
            {activeProcess === 'reabsorption' && 'Useful substances like glucose and amino acids are reabsorbed'}
            {activeProcess === 'secretion' && 'Additional waste products are actively secreted into urine'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KidneySimulation;