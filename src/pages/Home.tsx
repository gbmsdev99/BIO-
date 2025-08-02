import React from 'react';
import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { Play, Clock, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Master Biology Through Simulations
        </h1>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Explore the fascinating world of Class 10 Biology with interactive simulations, 
          detailed animations, and hands-on experiments.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>NCERT Aligned</span>
            </div>
          </div>
          <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Interactive Simulations</span>
            </div>
          </div>
          <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Progress Tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Biology Chapters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-2">{chapter.title}</h3>
                    <div className="flex items-center space-x-4 text-sm opacity-90">
                      <span>{chapter.topics.length} Topics</span>
                      <span>{chapter.simulations} Simulations</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                    Chapter {chapter.id}
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">{chapter.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {chapter.topics.slice(0, 3).map((topic, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                      {chapter.topics.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                          +{chapter.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(chapter.difficulty)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        Level {chapter.difficulty}
                      </span>
                    </div>
                    
                    <div className="text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                      Explore →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;