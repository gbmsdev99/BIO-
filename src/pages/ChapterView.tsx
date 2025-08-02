import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { simulations } from '../data/simulations';
import { Play, BookOpen, Beaker, ArrowLeft } from 'lucide-react';

const ChapterView: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const chapter = chapters.find(c => c.id === parseInt(chapterId || '0'));
  const chapterSimulations = simulations.filter(s => s.chapterId === parseInt(chapterId || '0'));

  if (!chapter) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800">Chapter not found</h1>
        <Link to="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Chapters</span>
      </Link>

      {/* Chapter Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm mb-4 inline-block">
              Chapter {chapter.id}
            </div>
            <h1 className="text-4xl font-bold mb-4">{chapter.title}</h1>
            <p className="text-xl opacity-90 max-w-3xl">{chapter.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">{chapter.topics.length}</div>
                <div className="text-sm opacity-80">Topics Covered</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Play className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">{chapter.simulations}</div>
                <div className="text-sm opacity-80">Simulations</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Beaker className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">{chapterSimulations.filter(s => s.type === 'experiment').length}</div>
                <div className="text-sm opacity-80">Experiments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulations Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Interactive Simulations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapterSimulations.map((simulation) => (
            <Link
              key={simulation.id}
              to={`/simulation/${simulation.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
                <div className="h-40 bg-gradient-to-br from-green-400 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs">
                    {simulation.type}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2">{simulation.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{simulation.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{simulation.duration}</span>
                      <span>•</span>
                      <span>Level {simulation.difficulty}</span>
                    </div>
                    <div className="text-green-600 font-semibold group-hover:text-green-700 transition-colors text-sm">
                      Start →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Topics Overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Topics Covered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapter.topics.map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-green-300 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                </div>
                <span className="font-medium text-gray-800">{topic}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChapterView;