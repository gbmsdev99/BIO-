import React, { useEffect, useState } from 'react';
import { Dna, Zap, Target, ArrowRight } from 'lucide-react';

interface CellDivisionSimulationProps {
  isPlaying: boolean;
}

const CellDivisionSimulation: React.FC<CellDivisionSimulationProps> = ({ isPlaying }) => {
  const [phase, setPhase] = useState<'interphase' | 'prophase' | 'metaphase' | 'anaphase' | 'telophase' | 'cytokinesis'>('interphase');
  const [chromosomeCount, setChromosomeCount] = useState(4);
  const [cellCycle, setCellCycle] = useState(0);
  const [dnaReplication, setDnaReplication] = useState(0);
  const [spindleFormation, setSpindleFormation] = useState(0);

  const phases = {
    interphase: { name: 'Interphase', description: 'Cell grows and DNA replicates', duration: 3000, color: 'bg-blue-500' },
    prophase: { name: 'Prophase', description: 'Chromosomes condense, nuclear envelope breaks', duration: 2000, color: 'bg-purple-500' },
    metaphase: { name: 'Metaphase', description: 'Chromosomes align at cell center', duration: 1500, color: 'bg-green-500' },
    anaphase: { name: 'Anaphase', description: 'Sister chromatids separate', duration: 1500, color: 'bg-orange-500' },
    telophase: { name: 'Telophase', description: 'Nuclear envelopes reform', duration: 2000, color: 'bg-red-500' },
    cytokinesis: { name: 'Cytokinesis', description: 'Cytoplasm divides, two cells form', duration: 2000, color: 'bg-pink-500' }
  };

  useEffect(() => {
    if (isPlaying) {
      const phaseOrder: (keyof typeof phases)[] = ['interphase', 'prophase', 'metaphase', 'anaphase', 'telophase', 'cytokinesis'];
      let currentIndex = phaseOrder.indexOf(phase);

      const timer = setTimeout(() => {
        currentIndex = (currentIndex + 1) % phaseOrder.length;
        setPhase(phaseOrder[currentIndex]);
        
        if (phaseOrder[currentIndex] === 'interphase') {
          setCellCycle(prev => prev + 1);
          setDnaReplication(0);
          setSpindleFormation(0);
        } else if (phaseOrder[currentIndex] === 'prophase') {
          setDnaReplication(100);
          setSpindleFormation(30);
        } else if (phaseOrder[currentIndex] === 'metaphase') {
          setSpindleFormation(100);
        }
      }, phases[phase].duration);

      return () => clearTimeout(timer);
    } else {
      setPhase('interphase');
      setCellCycle(0);
      setDnaReplication(0);
      setSpindleFormation(0);
    }
  }, [isPlaying, phase]);

  const renderCell = () => {
    const cellStyle = phase === 'cytokinesis' ? 'w-20 h-20' : 'w-24 h-24';
    
    return (
      <div className="relative flex items-center justify-center space-x-4">
        {/* Main cell or first daughter cell */}
        <div className={`${cellStyle} border-4 border-gray-600 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 relative transition-all duration-1000 shadow-xl`}>
          {/* Nuclear envelope */}
          {(phase === 'interphase' || phase === 'telophase') && (
            <div className="absolute inset-3 border-2 border-purple-400 rounded-full bg-purple-100">
              {/* Nucleolus */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>
          )}

          {/* Chromosomes */}
          <div className="absolute inset-0 flex items-center justify-center">
            {phase === 'interphase' && (
              <div className="grid grid-cols-2 gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-4 bg-red-400 rounded-full opacity-60"></div>
                ))}
              </div>
            )}

            {phase === 'prophase' && (
              <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-6 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                ))}
              </div>
            )}

            {phase === 'metaphase' && (
              <div className="flex items-center justify-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-6 bg-red-600 rounded-full animate-pulse"></div>
                ))}
              </div>
            )}

            {phase === 'anaphase' && (
              <div className="flex justify-between w-full px-2">
                <div className="space-y-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 h-4 bg-red-600 rounded-full animate-bounce"></div>
                  ))}
                </div>
                <div className="space-y-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 h-4 bg-red-600 rounded-full animate-bounce"></div>
                  ))}
                </div>
              </div>
            )}

            {phase === 'telophase' && (
              <div className="flex justify-between w-full px-1">
                <div className="w-8 h-8 border border-purple-400 rounded-full bg-purple-100 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-0.5 h-2 bg-red-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <div className="w-8 h-8 border border-purple-400 rounded-full bg-purple-100 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-0.5 h-2 bg-red-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Spindle fibers */}
          {(phase === 'prophase' || phase === 'metaphase' || phase === 'anaphase') && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-full bg-green-400 opacity-60 animate-pulse"
                  style={{
                    left: '50%',
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: 'center'
                  }}
                />
              ))}
            </div>
          )}

          {/* Cytokinesis furrow */}
          {phase === 'cytokinesis' && (
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-700 transform -translate-x-1/2 animate-pulse"></div>
          )}
        </div>

        {/* Second daughter cell */}
        {phase === 'cytokinesis' && (
          <div className="w-20 h-20 border-4 border-gray-600 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 relative shadow-xl">
            <div className="absolute inset-3 border-2 border-purple-400 rounded-full bg-purple-100">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-600 rounded-full"></div>
              <div className="absolute inset-2 grid grid-cols-2 gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-0.5 h-2 bg-red-400 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl relative overflow-hidden shadow-2xl">
      {/* Phase information */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-64">
        <div className="flex items-center space-x-2 mb-3">
          <Dna className="w-5 h-5 text-purple-500" />
          <h4 className="font-bold text-gray-800">{phases[phase].name}</h4>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{phases[phase].description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Cell Cycle:</span>
            <span className="font-semibold text-purple-600">#{cellCycle + 1}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>DNA Replication:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${phase === 'interphase' ? Math.min(dnaReplication + 20, 100) : dnaReplication}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Spindle Formation:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${spindleFormation}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cell visualization */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {renderCell()}
      </div>

      {/* Phase timeline */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-bold text-gray-800 mb-3">Cell Division Timeline</h5>
        <div className="flex items-center justify-between">
          {Object.entries(phases).map(([key, phaseInfo], index) => (
            <div key={key} className="flex flex-col items-center space-y-2">
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                phase === key ? `${phaseInfo.color} animate-pulse shadow-lg` : 'bg-gray-300'
              }`}></div>
              <div className="text-xs text-center font-medium text-gray-700">
                {phaseInfo.name}
              </div>
              {index < Object.keys(phases).length - 1 && (
                <ArrowRight className="w-3 h-3 text-gray-400 absolute" style={{ left: '100%', top: '50%' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chromosome counter */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="w-4 h-4 text-red-500" />
          <span className="text-sm font-semibold">Chromosomes</span>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {phase === 'cytokinesis' ? `${chromosomeCount} + ${chromosomeCount}` : chromosomeCount}
          </div>
          <div className="text-xs text-gray-600">
            {phase === 'cytokinesis' ? 'Two daughter cells' : 'Parent cell'}
          </div>
        </div>
      </div>

      {/* Molecular activity */}
      {isPlaying && (
        <div className="absolute top-1/2 left-8 space-y-2">
          <div className="bg-blue-400 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg">
            ATP
          </div>
          <div className="bg-green-400 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.3s' }}>
            Proteins
          </div>
          <div className="bg-purple-400 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.6s' }}>
            Enzymes
          </div>
        </div>
      )}

      {/* Energy indicator */}
      <div className="absolute top-1/2 right-8 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold">Energy</span>
        </div>
        <div className="w-20 bg-gray-200 rounded-full h-3">
          <div 
            className="bg-yellow-500 h-3 rounded-full transition-all duration-1000 animate-pulse"
            style={{ width: `${phase === 'interphase' ? 100 : phase === 'cytokinesis' ? 20 : 60}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1 text-center">
          {phase === 'interphase' ? 'High' : phase === 'cytokinesis' ? 'Low' : 'Medium'}
        </div>
      </div>
    </div>
  );
};

export default CellDivisionSimulation;