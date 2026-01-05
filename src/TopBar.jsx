import React from 'react';
import { Search, Menu, HelpCircle, Flame, Bell } from 'lucide-react';

const TopBar = ({ studentProfile, setIsMobileMenuOpen, setShowTutorial, setActiveTab }) => {
  // Render a skeleton if the student profile hasn't been loaded yet to prevent errors.
  if (!studentProfile) {
    return (
      <div className="h-20 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30 bg-gray-50/80 backdrop-blur-md animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          <div className="flex items-center gap-4">
              <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          </div>
      </div>
    );
  }

  return (
    <header className="h-20 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30 bg-gray-50/80 backdrop-blur-md">
    <div className="flex items-center gap-4 w-auto md:w-1/3 transition-all duration-300">
      {/* Botón Menú Móvil */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Menu size={24} />
      </button>

      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Buscar casos, herramientas o teoría..." 
          className="w-full pl-12 pr-4 py-2.5 bg-white border-none shadow-sm rounded-2xl text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
        />
      </div>
      {/* Logo visible solo en móvil en el header */}
      <span className="md:hidden font-bold text-xl text-gray-800 tracking-tight ml-2">EDU<span className="text-purple-600">PRO</span></span>
    </div>

    <div className="flex items-center gap-3 md:gap-6">
      <button 
        onClick={() => setShowTutorial(true)}
        className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors hidden md:block"
        title="Iniciar Tour"
      >
        <HelpCircle size={22} />
      </button>

      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 group hover:border-orange-200 transition-colors">
        <div className="relative flex items-center justify-center">
          <Flame size={20} className="text-orange-500 fill-orange-500 relative z-10" />
          <div className="absolute inset-0 bg-orange-400 blur-sm opacity-50 animate-pulse rounded-full"></div>
        </div>
        <span className="text-sm font-bold text-gray-700">{studentProfile.streak} <span className="hidden md:inline text-gray-400 font-normal">días</span></span>
      </div>
      
      <button className="relative p-2.5 bg-white rounded-xl text-gray-400 hover:text-purple-600 hover:shadow-md transition-all">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>

      <div id="topbar-profile" className="flex items-center gap-3 pl-2 md:pl-6 border-l border-gray-200/50">
        <div className="text-right hidden lg:block">
          <p className="text-sm font-bold text-gray-800">{studentProfile.name}</p>
          <p className="text-xs text-purple-600 font-medium">Nvl {studentProfile.level} • {studentProfile.title}</p>
        </div>
        <div 
          onClick={() => setActiveTab('profile')}
          className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full p-0.5 border-2 border-white shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
        >
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full rounded-full" />
        </div>
      </div>
    </div>
    </header>
  );
};

export default TopBar;
