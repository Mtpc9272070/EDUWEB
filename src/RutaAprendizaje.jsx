import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  BookOpen, 
  Clock,
  Microscope,
  PencilRuler,
  Gamepad2,
  TrendingUp
} from 'lucide-react';

const RutaAprendizaje = ({ moduleData, onBack, onNavigateToSimulator }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in slide-in-from-right-full fade-in duration-500 overflow-y-auto">
      {/* Header de Navegación */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <h2 className="font-bold text-lg text-gray-800">Ruta de Aprendizaje</h2>
      </header>

      <div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Module Header Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-bold mb-3 backdrop-blur-md">
                  {moduleData.level}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{moduleData.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1"><BookOpen size={16} /> {moduleData.phases.length} Fases</span>
                  <span className="flex items-center gap-1"><Clock size={16} /> 12h estimadas</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 min-w-[220px]">
                <div className="flex justify-between text-xs font-bold mb-2 text-gray-300">
                  <span>Progreso General</span>
                  <span>{moduleData.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-1">
                   <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400" style={{ width: `${moduleData.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Fases con Estilo 3D */}
          <div className="p-6 md:p-8 bg-gray-50/50 grid grid-cols-1 md:grid-cols-2 gap-5">
            {moduleData.phases.map((phase, index) => (
              <div 
                key={phase.id}
                onClick={() => phase.status !== 'locked' && onNavigateToSimulator(phase.id)}
                className={`relative group p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-4 ${
                  phase.status === 'locked' 
                    ? 'bg-gray-100 border-gray-200 opacity-60 grayscale cursor-not-allowed' 
                    : 'bg-white border-gray-200 border-b-4 hover:border-b-2 hover:translate-y-[2px] hover:shadow-sm cursor-pointer active:border-b-0 active:translate-y-[4px]'
                }`}
              >
                {/* Icono con profundidad */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border-b-2 border-black/5 mb-2 ${phase.status === 'locked' ? 'bg-gray-200 text-gray-400' : `${phase.bg} ${phase.color}`}`}>
                   {phase.status === 'completed' ? <CheckCircle2 size={28} /> : phase.status === 'locked' ? <Lock size={24} /> : phase.icon}
                </div>

                <div className="flex-1 min-w-0">
                   <div className="flex flex-col items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Fase 0{index + 1}</span>
                      
                      {phase.status === 'active' && (
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span> En Curso
                        </span>
                      )}
                   </div>
                   <h4 className={`font-bold text-lg leading-tight mb-2 ${phase.status === 'locked' ? 'text-gray-500' : 'text-gray-800'}`}>{phase.title}</h4>
                   <p className="text-sm text-gray-500 leading-relaxed">{phase.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RutaAprendizaje;
