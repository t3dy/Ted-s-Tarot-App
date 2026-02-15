import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ReadingSession } from './features/Reading/ReadingSession';
import { SpreadDesigner } from './features/Designer/SpreadDesigner';
import { AssetDashboard } from './features/System/AssetDashboard';
import { MTGReadingSession } from './features/MTG/MTGReadingSession';
import { CorrespondenceExplorer } from './features/Library/CorrespondenceExplorer';
import { Layout, BookOpen, PenTool, Home, Sparkles, Settings } from 'lucide-react';

const Dashboard = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDuration: '0.7s' }}>
    <h1 className="text-5xl font-serif text-tarot-accent drop-shadow-lg text-center">Arcana Desktop</h1>
    <p className="text-xl text-gray-400 max-w-md text-center">
      Explore the mysteries of the Tarot through digital divination and design.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <Link to="/reading" className="group p-6 bg-tarot-panel border border-gray-700 hover:border-tarot-accent rounded-xl w-64 flex flex-col items-center transition-all hover:scale-105 shadow-xl">
        <Layout className="w-12 h-12 text-tarot-primary mb-4 group-hover:text-tarot-accent" />
        <h2 className="text-xl font-semibold">Tarot Reading</h2>
        <span className="text-sm text-gray-500 mt-2">Consult the Major Arcana</span>
      </Link>

      <Link to="/mtg" className="group p-6 bg-tarot-panel border border-gray-700 hover:border-orange-500 rounded-xl w-64 flex flex-col items-center transition-all hover:scale-105 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1 bg-orange-500 text-black text-[10px] font-bold rounded-bl">BETA</div>
        <Sparkles className="w-12 h-12 text-orange-500 mb-4 group-hover:text-white" />
        <h2 className="text-xl font-semibold">MTG Oracle</h2>
        <span className="text-sm text-gray-500 mt-2">Divination via the Gathering</span>
      </Link>

      <Link to="/designer" className="group p-6 bg-tarot-panel border border-gray-700 hover:border-tarot-accent rounded-xl w-64 flex flex-col items-center transition-all hover:scale-105 shadow-xl">
        <PenTool className="w-12 h-12 text-purple-500 mb-4 group-hover:text-tarot-accent" />
        <h2 className="text-xl font-semibold">Spread Designer</h2>
        <span className="text-sm text-gray-500 mt-2">Create custom layouts</span>
      </Link>

      <Link to="/system" className="group p-6 bg-tarot-panel border border-gray-700 hover:border-gray-500 rounded-xl w-64 flex flex-col items-center transition-all hover:scale-105 shadow-xl">
        <Settings className="w-12 h-12 text-gray-400 mb-4 group-hover:text-white" />
        <h2 className="text-xl font-semibold">System</h2>
        <span className="text-sm text-gray-500 mt-2">Assets & Rules</span>
      </Link>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-tarot-dark text-tarot-text font-sans selection:bg-tarot-accent selection:text-black">
        {/* Sidebar Navigation */}
        <nav className="w-16 flex flex-col items-center py-6 border-r border-tarot-panel bg-black/20 backdrop-blur-sm z-50">
          <Link to="/" className="mb-8 p-2 rounded-lg hover:bg-white/10 text-tarot-accent">
            <Home size={24} />
          </Link>
          <div className="flex flex-col gap-6">
            <Link to="/reading" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white" title="Tarot Reading">
              <Layout size={24} />
            </Link>
            <Link to="/mtg" className="p-2 rounded-lg hover:bg-white/10 text-orange-400 hover:text-white" title="MTG Oracle">
              <Sparkles size={24} />
            </Link>
            <Link to="/designer" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white" title="Designer">
              <PenTool size={24} />
            </Link>
            <Link to="/library" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white" title="Library">
              <BookOpen size={24} />
            </Link>
            <div className="h-px w-8 bg-gray-700 my-2" />
            <Link to="/system" className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white" title="System">
              <Settings size={24} />
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reading" element={<ReadingSession />} />
            <Route path="/mtg" element={<MTGReadingSession />} />
            <Route path="/designer" element={<SpreadDesigner />} />
            <Route path="/library" element={<CorrespondenceExplorer />} />
            <Route path="/system" element={<AssetDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
