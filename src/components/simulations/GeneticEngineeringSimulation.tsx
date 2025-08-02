import React, { useEffect, useState } from 'react';
import { Scissors, Dna, Zap, Target, ArrowRight, Beaker } from 'lucide-react';

interface GeneticEngineeringSimulationProps {
  isPlaying: boolean;
}

const GeneticEngineeringSimulation: React.FC<GeneticEngineeringSimulationProps> = ({ isPlaying }) => {
  const [step, setStep] = useState<'isolation' | 'cutting' | 'insertion' | 'transformation' | 'expression'>('isolation');
  const [progress, setProgress] = useState(0);
  const [plasmidCount, setPlasmidCount] = useState(1);
  const [proteinProduction, setProteinProduction] = useState(0);
  const [bacterialGrowth, setBacterialGrowth] = useState(1);

  const steps = {
    isolation: { name: 'Gene Isolation', description: 'Extract target gene from donor organism', color: 'bg-blue-500', icon: Target },
    cutting: { name: 'Restriction Cutting', description: 'Cut DNA using restriction enzymes', color: 'bg-red-500', icon: Scissors },
    insertion: { name: 'Gene Insertion', description: 'Insert gene into plasmid vector', color: 'bg-green-500', icon: ArrowRight },
    transformation: { name: 'Transformation', description: 'Introduce recombinant plasmid into bacteria', color: 'bg-purple-500', icon: Zap },
    expression: { name: 'Protein Expression', description: 'Bacteria produce desired protein', color: 'bg-yellow-500', icon: Beaker }
  };

  useEffect(() => {
    if (isPlaying) {
      const stepOrder: (keyof typeof steps)[] = ['isolation', 'cutting', 'insertion', 'transformation', 'expression'];
      let currentIndex = stepOrder.indexOf(step);

      const timer = setTimeout(() => {
        currentIndex = (currentIndex + 1) % stepOrder.length;
        setStep(stepOrder[currentIndex]);
        setProgress(prev => Math.min(prev + 20, 100));
        
        if (stepOrder[currentIndex] === 'transformation') {
          setPlasmidCount(prev => prev * 2);
        } else if (stepOrder[currentIndex] === 'expression') {
          setProteinProduction(prev => Math.min(prev + 25, 100));
          setBacterialGrowth(prev => prev * 1.5);
        }
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setStep('isolation');
      setProgress(0);
      setPlasmidCount(1);
      setProteinProduction(0);
      setBacterialGrowth(1);
    }
  }, [isPlaying, step]);

  const renderDNA = () => {
    return (
      <div className="relative">
        {/* DNA double helix */}
        <div className="flex items-center space-x-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <div className={`w-2 h-1 rounded-full ${i % 3 === 0 ? 'bg-red-400' : i % 3 === 1 ? 'bg-blue-400' : 'bg-green-400'}`}></div>
              <div className="w-0.5 h-2 bg-gray-400"></div>
              <div className={`w-2 h-1 rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-red-400' : 'bg-yellow-400'}`}></div>
            </div>
          ))}
        </div>
        
        {/* Target gene highlight */}
        {step === 'isolation' && (
          <div className="absolute inset-0 border-2 border-yellow-400 rounded-lg animate-pulse bg-yellow-100 opacity-50"></div>
        )}
        
        {/* Cutting sites */}
        {step === 'cutting' && (
          <>
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-600 animate-pulse"></div>
            <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-red-600 animate-pulse"></div>
            <Scissors className="absolute top-1/2 left-8 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 text-red-600 animate-bounce" />
            <Scissors className="absolute top-1/2 right-8 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 text-red-600 animate-bounce" />
          </>
        )}
      </div>
    );
  };

  const renderPlasmid = () => {
    return (
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-500 rounded-full bg-green-100 relative">
          {/* Plasmid features */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-500 rounded-full"></div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-2 bg-purple-500 rounded-full"></div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-2 bg-orange-500 rounded-full"></div>
          
          {/* Inserted gene */}
          {(step === 'insertion' || step === 'transformation' || step === 'expression') && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
          )}
          
          {/* Cutting site */}
          {step === 'cutting' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-red-600 animate-pulse"></div>
          )}
        </div>
        
        {/* Multiple plasmids after transformation */}
        {step === 'transformation' && (
          <>
            <div className="absolute -top-4 -left-4 w-12 h-12 border-3 border-green-400 rounded-full bg-green-50 opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-3 border-green-400 rounded-full bg-green-50 opacity-70"></div>
          </>
        )}
      </div>
    );
  };

  const renderBacteria = () => {
    const bacteriaCount = Math.floor(bacterialGrowth);
    return (
      <div className="grid grid-cols-3 gap-2">
        {[...Array(Math.min(bacteriaCount, 9))].map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 relative shadow-lg ${
              step === 'expression' ? 'animate-pulse' : ''
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Plasmid inside bacteria */}
            {(step === 'transformation' || step === 'expression') && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-green-400 rounded-full bg-green-200"></div>
            )}
            
            {/* Protein production */}
            {step === 'expression' && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-96 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-xl relative overflow-hidden shadow-2xl">
      {/* Step information */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-64">
        <div className="flex items-center space-x-2 mb-3">
          {React.createElement(steps[step].icon, { className: 'w-5 h-5 text-purple-500' })}
          <h4 className="font-bold text-gray-800">{steps[step].name}</h4>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{steps[step].description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress:</span>
            <span className="font-semibold text-purple-600">{progress}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main visualization area */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center space-x-8">
          {/* DNA source */}
          <div className="text-center">
            <div className="mb-2">{renderDNA()}</div>
            <div className="text-xs font-semibold text-gray-700">Source DNA</div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-6 h-6 text-gray-500 animate-pulse" />

          {/* Plasmid vector */}
          <div className="text-center">
            <div className="mb-2">{renderPlasmid()}</div>
            <div className="text-xs font-semibold text-gray-700">Plasmid Vector</div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-6 h-6 text-gray-500 animate-pulse" />

          {/* Bacteria */}
          <div className="text-center">
            <div className="mb-2">{renderBacteria()}</div>
            <div className="text-xs font-semibold text-gray-700">Host Bacteria</div>
          </div>
        </div>
      </div>

      {/* Production metrics */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-bold text-gray-800 mb-3">Production Metrics</h5>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Plasmid Copies:</span>
            <span className="font-bold text-green-600">{plasmidCount}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Bacterial Growth:</span>
            <span className="font-bold text-purple-600">{bacterialGrowth.toFixed(1)}x</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Protein Yield:</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${proteinProduction}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Process timeline */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h5 className="font-bold text-gray-800 mb-3">Genetic Engineering Process</h5>
        <div className="flex items-center justify-between">
          {Object.entries(steps).map(([key, stepInfo], index) => (
            <div key={key} className="flex flex-col items-center space-y-2">
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                step === key ? `${stepInfo.color} animate-pulse shadow-lg` : 'bg-gray-300'
              }`}></div>
              <div className="text-xs text-center font-medium text-gray-700 max-w-16">
                {stepInfo.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Molecular tools */}
      {isPlaying && (
        <div className="absolute bottom-8 left-8 space-y-2">
          <div className="bg-red-400 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg">
            Restriction Enzymes
          </div>
          <div className="bg-blue-400 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.3s' }}>
            DNA Ligase
          </div>
          <div className="bg-green-400 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.6s' }}>
            Vectors
          </div>
        </div>
      )}

      {/* Applications */}
      <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl">
        <h6 className="font-semibold text-gray-800 mb-2 text-sm">Applications</h6>
        <div className="space-y-1 text-xs text-gray-600">
          <div>• Insulin production</div>
          <div>• Gene therapy</div>
          <div>• Crop improvement</div>
          <div>• Vaccine development</div>
        </div>
      </div>

      {/* Safety indicators */}
      <div className="absolute top-1/2 left-8 bg-orange-100 border border-orange-300 rounded-lg p-2 shadow-lg">
        <div className="text-xs font-semibold text-orange-800">Biosafety Level 2</div>
        <div className="text-xs text-orange-600">Controlled Environment</div>
      </div>
    </div>
  );
};

export default GeneticEngineeringSimulation;