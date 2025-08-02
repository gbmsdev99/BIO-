import React, { useEffect, useState } from 'react';
import { Shuffle, Target, BarChart3, Dna } from 'lucide-react';

interface MendelExperimentsSimulationProps {
  isPlaying: boolean;
}

const MendelExperimentsSimulation: React.FC<MendelExperimentsSimulationProps> = ({ isPlaying }) => {
  const [currentCross, setCurrentCross] = useState<'monohybrid' | 'dihybrid'>('monohybrid');
  const [generation, setGeneration] = useState<'P' | 'F1' | 'F2'>('P');
  const [offspring, setOffspring] = useState<Array<{genotype: string, phenotype: string, count: number}>>([]);
  const [crossResults, setCrossResults] = useState({ dominant: 0, recessive: 0 });

  const traits = {
    monohybrid: {
      name: 'Plant Height',
      dominant: { allele: 'T', trait: 'Tall', color: 'bg-green-500' },
      recessive: { allele: 't', trait: 'Short', color: 'bg-yellow-500' }
    },
    dihybrid: {
      name: 'Height & Seed Color',
      traits: [
        { dominant: { allele: 'T', trait: 'Tall' }, recessive: { allele: 't', trait: 'Short' } },
        { dominant: { allele: 'Y', trait: 'Yellow' }, recessive: { allele: 'y', trait: 'Green' } }
      ]
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setGeneration(prev => {
          switch (prev) {
            case 'P': return 'F1';
            case 'F1': return 'F2';
            case 'F2': 
              setCurrentCross(curr => curr === 'monohybrid' ? 'dihybrid' : 'monohybrid');
              return 'P';
            default: return 'P';
          }
        });

        // Generate offspring based on current cross and generation
        if (currentCross === 'monohybrid') {
          if (generation === 'F1') {
            setOffspring([{ genotype: 'Tt', phenotype: 'Tall', count: 4 }]);
            setCrossResults({ dominant: 4, recessive: 0 });
          } else if (generation === 'F2') {
            setOffspring([
              { genotype: 'TT', phenotype: 'Tall', count: 1 },
              { genotype: 'Tt', phenotype: 'Tall', count: 2 },
              { genotype: 'tt', phenotype: 'Short', count: 1 }
            ]);
            setCrossResults({ dominant: 3, recessive: 1 });
          }
        } else {
          if (generation === 'F1') {
            setOffspring([{ genotype: 'TtYy', phenotype: 'Tall Yellow', count: 4 }]);
            setCrossResults({ dominant: 4, recessive: 0 });
          } else if (generation === 'F2') {
            setOffspring([
              { genotype: 'TTYY', phenotype: 'Tall Yellow', count: 1 },
              { genotype: 'TTYy', phenotype: 'Tall Yellow', count: 2 },
              { genotype: 'TtYY', phenotype: 'Tall Yellow', count: 2 },
              { genotype: 'TtYy', phenotype: 'Tall Yellow', count: 4 },
              { genotype: 'TTyy', phenotype: 'Tall Green', count: 1 },
              { genotype: 'Ttyy', phenotype: 'Tall Green', count: 2 },
              { genotype: 'ttYY', phenotype: 'Short Yellow', count: 1 },
              { genotype: 'ttYy', phenotype: 'Short Yellow', count: 2 },
              { genotype: 'ttyy', phenotype: 'Short Green', count: 1 }
            ]);
            setCrossResults({ dominant: 9, recessive: 7 });
          }
        }
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setGeneration('P');
      setOffspring([]);
      setCrossResults({ dominant: 0, recessive: 0 });
    }
  }, [isPlaying, generation, currentCross]);

  const renderPunnettSquare = () => {
    if (currentCross === 'monohybrid' && generation === 'F2') {
      return (
        <div className="grid grid-cols-3 gap-1 bg-white rounded-lg p-2">
          <div className="bg-gray-200 p-1 text-center text-xs font-semibold"></div>
          <div className="bg-blue-200 p-1 text-center text-xs font-semibold">T</div>
          <div className="bg-blue-200 p-1 text-center text-xs font-semibold">t</div>
          
          <div className="bg-pink-200 p-1 text-center text-xs font-semibold">T</div>
          <div className="bg-green-100 p-1 text-center text-xs">TT</div>
          <div className="bg-green-100 p-1 text-center text-xs">Tt</div>
          
          <div className="bg-pink-200 p-1 text-center text-xs font-semibold">t</div>
          <div className="bg-green-100 p-1 text-center text-xs">Tt</div>
          <div className="bg-yellow-100 p-1 text-center text-xs">tt</div>
        </div>
      );
    }
    
    if (currentCross === 'dihybrid' && generation === 'F2') {
      const gametes = ['TY', 'Ty', 'tY', 'ty'];
      return (
        <div className="grid grid-cols-5 gap-0.5 bg-white rounded-lg p-2 text-xs">
          <div className="bg-gray-200 p-1 text-center font-semibold"></div>
          {gametes.map(g => (
            <div key={g} className="bg-blue-200 p-1 text-center font-semibold">{g}</div>
          ))}
          
          {gametes.map(g1 => (
            <React.Fragment key={g1}>
              <div className="bg-pink-200 p-1 text-center font-semibold">{g1}</div>
              {gametes.map(g2 => {
                const genotype = g1 + g2;
                const isRecessive = genotype.includes('tt') || genotype.includes('yy');
                return (
                  <div key={g2} className={`p-1 text-center ${isRecessive ? 'bg-yellow-100' : 'bg-green-100'}`}>
                    {genotype}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="h-96 bg-gradient-to-br from-purple-100 to-green-100 rounded-xl relative overflow-hidden">
      {/* Experiment Information */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-64">
        <div className="flex items-center space-x-2 mb-2">
          <Dna className="w-5 h-5 text-purple-500" />
          <h4 className="font-semibold text-gray-800">
            {currentCross === 'monohybrid' ? 'Monohybrid Cross' : 'Dihybrid Cross'}
          </h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">Generation: </span>
            <span className="text-gray-600">{generation}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Trait(s): </span>
            <span className="text-gray-600">
              {currentCross === 'monohybrid' ? traits.monohybrid.name : traits.dihybrid.name}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Cross: </span>
            <span className="text-gray-600">
              {generation === 'P' && 'Pure breeding parents'}
              {generation === 'F1' && 'First generation offspring'}
              {generation === 'F2' && 'F1 × F1 cross'}
            </span>
          </div>
        </div>
      </div>

      {/* Punnett Square */}
      {generation === 'F2' && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold">Punnett Square</span>
          </div>
          {renderPunnettSquare()}
        </div>
      )}

      {/* Parent Generation Display */}
      {generation === 'P' && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center space-x-8">
            {/* Parent 1 */}
            <div className="text-center">
              <div className="w-16 h-20 bg-green-500 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-white font-bold">
                  {currentCross === 'monohybrid' ? 'TT' : 'TTYY'}
                </span>
              </div>
              <div className="text-sm font-semibold">
                {currentCross === 'monohybrid' ? 'Tall' : 'Tall Yellow'}
              </div>
            </div>

            {/* Cross symbol */}
            <div className="text-2xl font-bold text-gray-600">×</div>

            {/* Parent 2 */}
            <div className="text-center">
              <div className="w-16 h-20 bg-yellow-500 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-white font-bold">
                  {currentCross === 'monohybrid' ? 'tt' : 'ttyy'}
                </span>
              </div>
              <div className="text-sm font-semibold">
                {currentCross === 'monohybrid' ? 'Short' : 'Short Green'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offspring Display */}
      {(generation === 'F1' || generation === 'F2') && offspring.length > 0 && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="grid grid-cols-4 gap-2">
            {offspring.map((child, index) => (
              <div key={index} className="text-center">
                {[...Array(child.count)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-12 h-16 rounded-lg mb-1 flex items-center justify-center text-white text-xs font-bold ${
                      child.phenotype.includes('Tall') ? 'bg-green-500' : 'bg-yellow-500'
                    } ${child.phenotype.includes('Green') ? 'border-4 border-green-700' : ''}`}
                  >
                    {child.genotype}
                  </div>
                ))}
                <div className="text-xs font-semibold">{child.phenotype}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ratio Display */}
      {generation === 'F2' && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold">Phenotypic Ratio</span>
          </div>
          <div className="text-lg font-bold text-center">
            {currentCross === 'monohybrid' ? '3:1' : '9:3:3:1'}
          </div>
          <div className="text-xs text-gray-600 text-center">
            {currentCross === 'monohybrid' ? 'Dominant : Recessive' : 'TY : Ty : tY : ty'}
          </div>
        </div>
      )}

      {/* Mendel's Laws */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-48">
        <h5 className="font-semibold text-gray-800 mb-2">Mendel's Laws</h5>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Law of Dominance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Law of Segregation</span>
          </div>
          {currentCross === 'dihybrid' && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Independent Assortment</span>
            </div>
          )}
        </div>
      </div>

      {/* Generation Progress */}
      <div className="absolute top-1/2 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Generation</h5>
        <div className="space-y-1">
          {['P', 'F1', 'F2'].map((gen) => (
            <div
              key={gen}
              className={`text-sm px-2 py-1 rounded transition-all duration-500 ${
                generation === gen
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {gen} Generation
            </div>
          ))}
        </div>
      </div>

      {/* Shuffle Indicator */}
      {isPlaying && (
        <div className="absolute top-1/2 right-8 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
          <Shuffle className="w-6 h-6 mx-auto animate-spin" />
          <div className="text-xs text-center mt-1">Crossing</div>
        </div>
      )}

      {/* Expected vs Observed */}
      {generation === 'F2' && (
        <div className="absolute bottom-4 center bg-white/90 backdrop-blur-sm rounded-lg p-3 left-1/2 transform -translate-x-1/2">
          <div className="text-xs text-center">
            <div className="font-semibold text-gray-800 mb-1">Results Match Prediction</div>
            <div className="text-green-600 font-bold">✓ Confirmed</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MendelExperimentsSimulation;