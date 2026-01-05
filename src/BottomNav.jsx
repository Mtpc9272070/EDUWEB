import React from 'react';
import { Layout, Gamepad2, Plus, BrainCircuit, Menu } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab, isActionMenuOpen, setIsActionMenuOpen, setIsMobileMenuOpen }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 md:hidden z-30 flex justify-between items-end pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom-4 duration-500">
    <button 
      onClick={() => setActiveTab('dashboard')}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors animate-in slide-in-from-bottom-2 fade-in duration-500 ${activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <Layout size={22} />
      <span className="text-[10px] font-bold">Inicio</span>
    </button>

    <button 
      onClick={() => setActiveTab('simulator')}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors animate-in slide-in-from-bottom-2 fade-in duration-500 delay-75 ${activeTab === 'simulator' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <Gamepad2 size={22} />
      <span className="text-[10px] font-bold">Simular</span>
    </button>

    {/* Botón Central ADUPOST */}
    <div className="relative -top-6 animate-in slide-in-from-bottom-6 fade-in duration-500 delay-150">
      <button 
        onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
        className={`bg-gradient-to-tr from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-xl shadow-purple-200 border-4 border-gray-50 hover:scale-105 transition-transform group ${isActionMenuOpen ? 'rotate-45' : ''}`}
      >
        <Plus size={28} className={`transition-transform duration-300 ${isActionMenuOpen ? 'rotate-90' : 'group-hover:rotate-90'}`} />
      </button>
      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-purple-600 whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">ADUPOST</span>
    </div>

    <button 
      onClick={() => setActiveTab('ai-assistant')}
      className={`flex flex-col items-center gap-1 p-2 transition-colors animate-in slide-in-from-bottom-2 fade-in duration-500 delay-200 ${activeTab === 'ai-assistant' ? 'text-purple-600' : 'text-gray-400 hover:text-purple-600'}`}
    >
      <BrainCircuit size={22} />
      <span className="text-[10px] font-bold">IA</span>
    </button>

    <button 
      onClick={() => setIsMobileMenuOpen(true)}
      className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-purple-600 transition-colors animate-in slide-in-from-bottom-2 fade-in duration-500 delay-300"
    >
      <Menu size={22} />
      <span className="text-[10px] font-bold">Menú</span>
    </button>
  </div>
);

export default BottomNav;
