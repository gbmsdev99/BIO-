import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { simulations } from '../data/simulations';
import { chapters } from '../data/chapters';
import PhotosynthesisSimulation from '../components/simulations/PhotosynthesisSimulation';
import RespirationSimulation from '../components/simulations/RespirationSimulation';
import HeartSimulation from '../components/simulations/HeartSimulation';
import DigestiveSystemSimulation from '../components/simulations/DigestiveSystemSimulation';
import KidneySimulation from '../components/simulations/KidneySimulation';
import ReflexArcSimulation from '../components/simulations/ReflexArcSimulation';
import BrainStructureSimulation from '../components/simulations/BrainStructureSimulation';
import PlantTropismsSimulation from '../components/simulations/PlantTropismsSimulation';
import FlowerPollinationSimulation from '../components/simulations/FlowerPollinationSimulation';
import HumanReproductionSimulation from '../components/simulations/HumanReproductionSimulation';
import AsexualReproductionSimulation from '../components/simulations/AsexualReproductionSimulation';
import MendelExperimentsSimulation from '../components/simulations/MendelExperimentsSimulation';
import DNAInheritanceSimulation from '../components/simulations/DNAInheritanceSimulation';
import CellDivisionSimulation from '../components/simulations/CellDivisionSimulation';
import GeneticEngineeringSimulation from '../components/simulations/GeneticEngineeringSimulation';
import EvolutionSimulation from '../components/simulations/EvolutionSimulation';
import PollutionEffectsSimulation from '../components/simulations/PollutionEffectsSimulation';
import FoodChainSimulation from '../components/simulations/FoodChainSimulation';
import EcosystemBalanceSimulation from '../components/simulations/EcosystemBalanceSimulation';
import { ArrowLeft, Play, Pause, RotateCcw, Info } from 'lucide-react';

const SimulationView: React.FC = () => {
  const { simulationId } = useParams<{ simulationId: string }>();
  const simulation = simulations.find(s => s.id === simulationId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  if (!simulation) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800">Simulation not found</h1>
        <Link to="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const chapter = chapters.find(c => c.id === simulation.chapterId);

  const renderSimulation = () => {
    switch (simulation.id) {
      case 'photosynthesis':
        return <PhotosynthesisSimulation isPlaying={isPlaying} />;
      case 'respiration':
        return <RespirationSimulation isPlaying={isPlaying} />;
      case 'heart-circulation':
        return <HeartSimulation isPlaying={isPlaying} />;
      case 'digestive-system':
        return <DigestiveSystemSimulation isPlaying={isPlaying} />;
      case 'kidney-function':
        return <KidneySimulation isPlaying={isPlaying} />;
      case 'reflex-arc':
        return <ReflexArcSimulation isPlaying={isPlaying} />;
      case 'brain-structure':
        return <BrainStructureSimulation isPlaying={isPlaying} />;
      case 'plant-tropisms':
        return <PlantTropismsSimulation isPlaying={isPlaying} />;
      case 'flower-structure':
        return <FlowerPollinationSimulation isPlaying={isPlaying} />;
      case 'human-reproduction':
        return <HumanReproductionSimulation isPlaying={isPlaying} />;
      case 'asexual-reproduction':
        return <AsexualReproductionSimulation isPlaying={isPlaying} />;
      case 'mendel-experiments':
        return <MendelExperimentsSimulation isPlaying={isPlaying} />;
      case 'dna-inheritance':
        return <DNAInheritanceSimulation isPlaying={isPlaying} />;
      case 'cell-division':
        return <CellDivisionSimulation isPlaying={isPlaying} />;
      case 'genetic-engineering':
        return <GeneticEngineeringSimulation isPlaying={isPlaying} />;
      case 'evolution-mechanisms':
        return <EvolutionSimulation isPlaying={isPlaying} />;
      case 'pollution-effects':
        return <PollutionEffectsSimulation isPlaying={isPlaying} />;
      case 'food-chains':
        return <FoodChainSimulation isPlaying={isPlaying} />;
      case 'ecosystem-balance':
        return <EcosystemBalanceSimulation isPlaying={isPlaying} />;
      default:
        return (
          <div className="bg-gradient-to-br from-green-200 to-blue-200 rounded-xl h-96 flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-700 font-semibold text-lg">Advanced Simulation Loading...</p>
              <p className="text-gray-600 text-sm mt-2">This simulation is being enhanced with 3D visuals</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          to={`/chapter/${simulation.chapterId}`}
          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to {chapter?.title}</span>
        </Link>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Info className="w-4 h-4" />
          <span>Info</span>
        </button>
      </div>

      {/* Simulation Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{simulation.name}</h1>
            <p className="text-gray-600 text-lg">{simulation.description}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{simulation.duration}</span>
            <span>•</span>
            <span>Level {simulation.difficulty}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? 'Pause' : 'Start'} Simulation</span>
          </button>
          
          <button
            onClick={() => setIsPlaying(false)}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Learning Objectives</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• Understand the process of {simulation.name.toLowerCase()}</li>
            <li>• Observe the step-by-step mechanism</li>
            <li>• Identify key components and their functions</li>
            <li>• Analyze the biological significance</li>
          </ul>
        </div>
      )}

      {/* Simulation Container */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {renderSimulation()}
      </div>

      {/* Key Points */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Points to Remember</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {simulation.keyPoints?.map((point, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationView;