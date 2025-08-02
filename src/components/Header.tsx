import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, User, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-green-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl group-hover:scale-105 transition-transform">
              <Microscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">BioVerse 10</h1>
              <p className="text-sm text-green-600 font-medium">See Biology. Feel Biology. Live Biology.</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>Chapters</span>
            </Link>
            <div className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
              <User className="w-5 h-5" />
              <span>Progress</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;