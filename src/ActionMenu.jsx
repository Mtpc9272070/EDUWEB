import React from 'react';
import { PenTool, MessageSquare } from 'lucide-react';

const ActionMenu = ({ setIsActionMenuOpen, setSimulatorInitialMode, setActiveTab }) => (
  <div className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex flex-col justify-end pb-24 items-center animate-in fade-in duration-200" onClick={() => setIsActionMenuOpen(false)}>
    <div className="flex flex-col gap-4 mb-4" onClick={e => e.stopPropagation()}>
      <button 
        onClick={() => {
          setSimulatorInitialMode('create');
          setActiveTab('simulator');
          setIsActionMenuOpen(false);
        }}
        className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform animate-in slide-in-from-bottom-8 duration-300"
      >
        <span className="font-bold text-gray-800">Crear Actividad</span>
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <PenTool size={20} />
        </div>
      </button>

      <button 
        onClick={() => {
          // Aquí iría la lógica para abrir el modal de postear
          setIsActionMenuOpen(false);
        }}
        className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform animate-in slide-in-from-bottom-4 duration-300 delay-75"
      >
        <span className="font-bold text-gray-800">Nuevo Post</span>
        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
          <MessageSquare size={20} />
        </div>
      </button>
    </div>
  </div>
);

export default ActionMenu;
