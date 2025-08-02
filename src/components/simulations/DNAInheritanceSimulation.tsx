import React, { useEffect, useState } from 'react';
import { Dna, Users, Shuffle, Eye } from 'lucide-react';

interface DNAInheritanceSimulationProps {
  isPlaying: boolean;
}

const DNAInheritanceSimulation: React.FC<DNAInheritanceSimulationProps> = ({ isPlaying }) => {
  const [currentProcess, setCurrentProcess] = useState<'meiosis' | 'fertilization' | 'expression'>('meiosis');
  const [chromosomePairs, setChromosomePairs] = useState(2);
  const [crossingOver, setCrossingOver] = useState(false);
  const [geneExpression, setGeneExpression] = useState({ eyeColor: 'brown', hairColor: 'black', height: 'tall' });
  const [inheritancePattern, setInheritancePattern] = useState<'dominant' | 'recessive' | 'codominant'>('dominant');

  const traits = {
    eyeColor: {
      dominant: { allele: 'B', trait: 'Brown', color: 'bg-amber-600' },
      recessive: { allele: 'b', trait: 'Blue', color: 'bg-blue-500' }
    },
    hairColor: {
      dominant: { allele: 'H', trait: 'Black', color: 'bg-gray-800' },
      recessive: { allele: 'h', trait: 'Blonde', color: 'bg-yellow-400' }
    },
    height: {
      dominant: { allele: 'T', trait: 'Tall', color: 'bg-green-600' },
      recessive: { allele: 't', trait: 'Short', color: 'bg-green-400' }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentProcess(prev => {
          switch (prev) {
            case 'meiosis': return 'fertilization';
            case 'fertilization': return 'expression';
            case 'expression': return 'meiosis';
            default: return 'meiosis';
          }
        });

        setCrossingOver(prev => !prev);
        setChromosomePairs(prev => (prev % 3) + 1);
        
        // Simulate random gene expression
        const expressions = ['brown', 'blue'];
        const hairExpressions = ['black', 'blonde'];
        const heightExpressions = ['tall', 'short'];
        
        setGeneExpression({
          eyeColor: expressions[Math.floor(Math.random() * expressions.length)],
          hairColor: hairExpressions[Math.floor(Math.random() * hairExpressions.length)],
          height: heightExpressions[Math.floor(Math.random() * heightExpressions.length)]
        });

        setInheritancePattern(prev => {
          const patterns: ('dominant' | 'recessive' | 'codominant')[] = ['dominant', 'recessive', 'codominant'];
          return patterns[(patterns.indexOf(prev) + 1) % patterns.length];
        });
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setCurrentProcess('meiosis');
      setCrossingOver(false);
      setChromosomePairs(2);
    }
  }, [isPlaying]);

  const renderChromosome = (maternal: boolean, index: number) => {
    return (
      <div className={`relative w-2 h-16 rounded-full ${maternal ? 'bg-pink-400' : 'bg-blue-400'} transition-all duration-1000`}>
        {/* Centromere */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-1 bg-gray-600 rounded-full"></div>
        
        {/* Gene locations */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></div>
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-700 rounded-full"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
        
        {/* Crossing over indicator */}
        {crossingOver && currentProcess === 'meiosis' && (
          <div className="absolute inset-0 border-2 border-yellow-400 rounded-full animate-pulse"></div>
        )}
      </div>
    );
  };

  return (
    <div className="h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl relative overflow-hidden">
      {/* Process Information */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-64">
        <div className="flex items-center space-x-2 mb-2">
          <Dna className="w-5 h-5 text-purple-500" />
          <h4 className="font-semibold text-gray-800 capitalize">{currentProcess}</h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">Process: </span>
            <span className="text-gray-600">
              {currentProcess === 'meiosis' && 'Gamete formation with genetic recombination'}
              {currentProcess === 'fertilization' && 'Fusion of male and female gametes'}
              {currentProcess === 'expression' && 'Genes determine observable traits'}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Result: </span>
            <span className="text-gray-600">
              {currentProcess === 'meiosis' && 'Genetic diversity through crossing over'}
              {currentProcess === 'fertilization' && 'Diploid zygote formation'}
              {currentProcess === 'expression' && 'Phenotype manifestation'}
            </span>
          </div>
        </div>
      </div>

      {/* Chromosome Display */}
      {currentProcess === 'meiosis' && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex space-x-8">
            {/* Homologous chromosome pairs */}
            {[...Array(chromosomePairs)].map((_, pairIndex) => (
              <div key={pairIndex} className="flex space-x-2">
                {renderChromosome(true, pairIndex)}
                {renderChromosome(false, pairIndex)}
              </div>
            ))}
          </div>
          
          {crossingOver && (
            <div className="absolute -inset-4 border-2 border-yellow-400 rounded-lg animate-pulse">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                Crossing Over
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fertilization Display */}
      {currentProcess === 'fertilization' && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center space-x-8">
            {/* Sperm */}
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full relative animate-bounce">
                <div className="absolute -right-4 top-1/2 w-8 h-1 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
              </div>
              <div className="text-xs mt-2 font-semibold">Sperm (n)</div>
              <div className="text-xs text-gray-600">Paternal genes</div>
            </div>

            {/* Fusion arrow */}
            <div className="text-2xl font-bold text-gray-600 animate-pulse">→</div>

            {/* Egg */}
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full animate-pulse"></div>
              <div className="text-xs mt-2 font-semibold">Egg (n)</div>
              <div className="text-xs text-gray-600">Maternal genes</div>
            </div>

            {/* Fusion arrow */}
            <div className="text-2xl font-bold text-gray-600 animate-pulse">→</div>

            {/* Zygote */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full animate-pulse relative">
                <div className="absolute inset-2 bg-purple-600 rounded-full"></div>
              </div>
              <div className="text-xs mt-2 font-semibold">Zygote (2n)</div>
              <div className="text-xs text-gray-600">Combined genes</div>
            </div>
          </div>
        </div>
      )}

      {/* Gene Expression Display */}
      {currentProcess === 'expression' && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-center">
            {/* Human figure */}
            <div className="w-24 h-32 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full relative mx-auto mb-4">
              {/* Head */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-300 rounded-full">
                {/* Eyes */}
                <div className={`absolute top-2 left-1 w-1 h-1 rounded-full ${
                  geneExpression.eyeColor === 'brown' ? 'bg-amber-600' : 'bg-blue-500'
                }`}></div>
                <div className={`absolute top-2 right-1 w-1 h-1 rounded-full ${
                  geneExpression.eyeColor === 'brown' ? 'bg-amber-600' : 'bg-blue-500'
                }`}></div>
                
                {/* Hair */}
                <div className={`absolute -top-1 inset-x-0 h-2 rounded-t-full ${
                  geneExpression.hairColor === 'black' ? 'bg-gray-800' : 'bg-yellow-400'
                }`}></div>
              </div>
              
              {/* Body height indicator */}
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 transition-all duration-1000 ${
                geneExpression.height === 'tall' ? 'h-16 bg-green-600' : 'h-12 bg-green-400'
              }`}></div>
            </div>

            <div className="text-sm font-semibold text-gray-800">Expressed Phenotype</div>
          </div>
        </div>
      )}

      {/* Trait Information */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-48">
        <div className="flex items-center space-x-2 mb-2">
          <Eye className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold">Current Traits</span>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span>Eye Color:</span>
            <div className={`w-4 h-4 rounded-full ${
              geneExpression.eyeColor === 'brown' ? 'bg-amber-600' : 'bg-blue-500'
            }`}></div>
          </div>
          <div className="flex items-center justify-between">
            <span>Hair Color:</span>
            <div className={`w-4 h-4 rounded-full ${
              geneExpression.hairColor === 'black' ? 'bg-gray-800' : 'bg-yellow-400'
            }`}></div>
          </div>
          <div className="flex items-center justify-between">
            <span>Height:</span>
            <div className={`w-4 rounded-full ${
              geneExpression.height === 'tall' ? 'h-4 bg-green-600' : 'h-3 bg-green-400'
            }`}></div>
          </div>
        </div>
      </div>

      {/* Inheritance Pattern */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h5 className="font-semibold text-gray-800 mb-2">Inheritance Pattern</h5>
        <div className={`text-sm font-semibold capitalize ${
          inheritancePattern === 'dominant' ? 'text-green-600' :
          inheritancePattern === 'recessive' ? 'text-blue-600' :
          'text-purple-600'
        }`}>
          {inheritancePattern}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {inheritancePattern === 'dominant' && 'One copy masks the other'}
          {inheritancePattern === 'recessive' && 'Requires two copies to express'}
          {inheritancePattern === 'codominant' && 'Both alleles expressed equally'}
        </div>
      </div>

      {/* Genetic Diversity Indicator */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Shuffle className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-semibold">Genetic Diversity</span>
        </div>
        <div className="text-lg font-bold text-purple-600">
          {Math.pow(2, chromosomePairs * 2)}
        </div>
        <div className="text-xs text-gray-600">possible combinations</div>
      </div>

      {/* Sex Determination */}
      <div className="absolute bottom-4 center bg-white/90 backdrop-blur-sm rounded-lg p-3 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-center">
            <div className="flex space-x-1 mb-1">
              <div className="w-2 h-4 bg-pink-400 rounded-full"></div>
              <div className="w-2 h-4 bg-pink-400 rounded-full"></div>
            </div>
            <div className="text-xs">XX (Female)</div>
          </div>
          <div className="text-center">
            <div className="flex space-x-1 mb-1">
              <div className="w-2 h-4 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-3 bg-blue-400 rounded-full"></div>
            </div>
            <div className="text-xs">XY (Male)</div>
          </div>
        </div>
      </div>

      {/* Process Animation */}
      {isPlaying && (
        <div className="absolute top-1/2 left-8 bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg">
          <Users className="w-6 h-6 mx-auto animate-pulse" />
          <div className="text-xs text-center mt-1">Inheriting</div>
        </div>
      )}
    </div>
  );
};

export default DNAInheritanceSimulation;