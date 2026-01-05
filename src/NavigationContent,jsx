import React from 'react';
import { Layout, Gamepad2, BookOpen, BrainCircuit, Bot, Puzzle, Award, Star, X, ChevronRight } from 'lucide-react';

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${active ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
    <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`}>{icon}</span>
    <span className="font-bold text-sm">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto text-gray-500" />}
  </button>
);

const NavigationContent = ({ activeTab, setActiveTab, setIsMobileMenuOpen, setSimulatorInitialMode, mobile = false }) => (
  <>
    <div className="p-8 flex items-center gap-3 mb-2">
      <div>
        <h1 className="font-bold text-2xl tracking-tight text-gray-900">EDUWEB<span className="text-purple-600">PRO</span></h1>
        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Plataforma Docente</p>
      </div>
      {mobile && (
        <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto text-gray-400">
          <X size={24} />
        </button>
      )}
    </div>

    <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
      <NavItem icon={<Layout size={20} />} label="Panel Principal" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); if(mobile) setIsMobileMenuOpen(false); }} />
      <NavItem icon={<Gamepad2 size={20} />} label="Simulador SIPU" active={activeTab === 'simulator'} onClick={() => { setSimulatorInitialMode('lobby'); setActiveTab('simulator'); if(mobile) setIsMobileMenuOpen(false); }} />
      <NavItem icon={<BookOpen size={20} />} label="Malla Curricular" active={activeTab === 'curriculum'} onClick={() => { setActiveTab('curriculum'); if(mobile) setIsMobileMenuOpen(false); }} />
      <NavItem icon={<BrainCircuit size={20} />} label="Biblioteca IA" active={activeTab === 'library'} onClick={() => { setActiveTab('library'); if(mobile) setIsMobileMenuOpen(false); }} />
      <NavItem icon={<Bot size={20} />} label="Asistente IA" active={activeTab === 'ai-assistant'} onClick={() => { setActiveTab('ai-assistant'); if(mobile) setIsMobileMenuOpen(false); }} />
      <NavItem icon={<Puzzle size={20} />} label="Juegos" active={activeTab === 'games'} onClick={() => { setActiveTab('games'); if(mobile) setIsMobileMenuOpen(false); }} />
      <NavItem icon={<Award size={20} />} label="Certificaciones" />
    </nav>

    <div className="p-6 m-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl border border-purple-100 shrink-0 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className="p-1.5 bg-white rounded-lg shadow-sm">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
        </div>
        <span className="text-sm font-bold text-purple-900">Plan Estudiante</span>
      </div>
      <button 
        onClick={() => { setActiveTab('profile'); if(mobile) setIsMobileMenuOpen(false); }}
        className="w-full py-2.5 bg-white text-purple-700 text-xs font-bold rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-all"
      >
        Ver Perfil
      </button>
    </div>
  </>
);

export default NavigationContent;
