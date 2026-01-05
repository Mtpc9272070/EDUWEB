import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Gamepad2, 
  PenTool, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  MessageCircle, 
  ClipboardList, 
  PencilRuler, 
  ArrowRight, 
  Save,
  Users,
  Play,
  Plus,
  MonitorPlay,
  Settings
} from 'lucide-react';

const Simulador = ({ onBack, initialCase, initialMode = 'lobby' }) => {
  const [mode, setMode] = useState(initialMode); // 'lobby', 'play', 'create'
  
  // --- ESTADOS PARA MODO JUGAR (PLAY) ---
  const [simulatorPhase, setSimulatorPhase] = useState('observacion');
  const [activeMobileSimTab, setActiveMobileSimTab] = useState('subject');
  const [checklist, setChecklist] = useState({
    contactoVisual: null,
    lenguaje: null,
    juegoSimb: null
  });

  // --- ESTADOS PARA MODO CREAR (CREATE) ---
  const [newCaseData, setNewCaseData] = useState({
    title: '',
    subjectName: '',
    age: '',
    difficulty: 'Intermedio',
    description: ''
  });

  // --- VISTA: LOBBY ---
  const renderLobby = () => (
    <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in fade-in duration-500 overflow-y-auto">
       <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg text-gray-800">Centro de Simulación SIPU</h2>
      </header>

      <div className="p-6 md:p-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">¿Qué deseas hacer hoy?</h1>
          <p className="text-gray-500 text-lg">Selecciona un modo para comenzar tu experiencia práctica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Card Jugar */}
          <div 
            onClick={() => setMode('play')}
            className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl shadow-purple-100 border border-purple-50 cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-200 group-hover:rotate-6 transition-transform">
                <Gamepad2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Resolver Caso</h3>
              <p className="text-gray-500 mb-6">Entra en el simulador y diagnostica casos reales diseñados por expertos.</p>
              <span className="inline-flex items-center gap-2 text-purple-600 font-bold group-hover:gap-3 transition-all">
                Comenzar <ArrowRight size={20} />
              </span>
            </div>
          </div>

          {/* Card Crear */}
          <div 
            onClick={() => setMode('create')}
            className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-100 border border-blue-50 cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:-rotate-6 transition-transform">
                <PenTool size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Crear Actividad</h3>
              <p className="text-gray-500 mb-6">Diseña experiencias de aprendizaje y actividades didácticas personalizadas.</p>
              <span className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                Diseñar <ArrowRight size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- VISTA: CREAR (CREATE) ---
  const renderCreate = () => (
    <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto">
       <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => setMode('lobby')} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-bold text-lg text-gray-800">Creador de Actividades</h2>
        </div>
        <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
          <Save size={18} /> Guardar Actividad
        </button>
      </header>

      <div className="p-6 md:p-10 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Formulario */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <PenTool className="text-blue-500" /> Información General
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Título de la Actividad</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Ej: Juego de Bloques"
                  value={newCaseData.title}
                  onChange={e => setNewCaseData({...newCaseData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Edad Recomendada</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Ej: 3 años y 2 meses"
                  value={newCaseData.age}
                  onChange={e => setNewCaseData({...newCaseData, age: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageCircle className="text-purple-500" /> Desarrollo
            </h3>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Instrucciones</label>
              <textarea 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all h-32 resize-none"
                placeholder="Describe los pasos, materiales y objetivos..."
                value={newCaseData.description}
                onChange={e => setNewCaseData({...newCaseData, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-28 h-fit">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Vista Previa de Actividad</h3>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-blue-50 to-white"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-3xl mb-4 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                 <PenTool size={40} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{newCaseData.title || 'Título de la Actividad'}</h2>
              <p className="text-gray-500 font-medium mb-6">{newCaseData.age || 'Edad Recomendada'}</p>
              
              <div className="w-full bg-gray-50 rounded-2xl p-6 text-left border border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Descripción</h4>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{newCaseData.description || 'La descripción de la actividad aparecerá aquí...'}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- VISTA: JUGAR (PLAY) - (Código original refactorizado) ---
  const renderPlay = () => (
    <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in fade-in duration-300">
        {/* Header del Simulador */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm z-20 shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setMode('lobby')}
              className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden md:inline text-sm font-medium">Salir</span>
            </button>
            <div className="overflow-hidden">
              <h2 className="font-bold text-sm md:text-lg text-gray-800 flex items-center gap-2 truncate">
                <span className="hidden md:inline px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full border border-blue-200 whitespace-nowrap">En Progreso</span>
                <span className="truncate">{initialCase.title}</span>
              </h2>
              <p className="text-xs text-gray-500 truncate md:hidden">{initialCase.subject}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-500">Tiempo</p>
                <p className="text-sm font-mono text-gray-800">14:30</p>
             </div>
             <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-lg hover:bg-gray-800 transition-colors whitespace-nowrap flex items-center gap-2">
               <Save size={16} /> Guardar
             </button>
          </div>
        </header>

        {/* Stepper de Fases SIPU */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {['observacion', 'planeacion', 'ejecucion', 'analisis'].map((phase, idx) => {
              const isActive = simulatorPhase === phase;
              return (
                <button
                  key={phase}
                  onClick={() => setSimulatorPhase(phase)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive 
                      ? 'bg-purple-100 text-purple-700 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${isActive ? 'bg-white border-purple-200' : 'border-gray-300'}`}>
                    {idx + 1}
                  </span>
                  <span className="capitalize">{phase}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tabs de Vista Móvil */}
        <div className="lg:hidden flex border-b border-gray-200 bg-white shrink-0">
          <button 
            onClick={() => setActiveMobileSimTab('subject')}
            className={`flex-1 py-3 text-sm font-bold text-center border-b-2 ${activeMobileSimTab === 'subject' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500'}`}
          >
            Ver Niño (Sujeto)
          </button>
          <button 
            onClick={() => setActiveMobileSimTab('tools')}
            className={`flex-1 py-3 text-sm font-bold text-center border-b-2 ${activeMobileSimTab === 'tools' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500'}`}
          >
            Herramientas
          </button>
        </div>

        {/* Área de Trabajo */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative">
          
          {/* Panel Izquierdo: El Sujeto */}
          <div className={`w-full lg:w-7/12 p-4 md:p-6 overflow-y-auto border-r border-gray-200 bg-slate-50 ${activeMobileSimTab === 'subject' ? 'block' : 'hidden lg:block'}`}>
             <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5 md:p-8 mb-20 lg:mb-6 max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
                   <div className="flex gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center overflow-hidden relative shrink-0 shadow-inner">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Matias&backgroundColor=ffdfbf`} alt="Matías" className="w-full h-full" />
                         <div className="absolute bottom-0 right-0 bg-yellow-400 w-5 h-5 md:w-6 md:h-6 rounded-tl-xl flex items-center justify-center text-xs">😐</div>
                      </div>
                      <div>
                         <h3 className="text-xl md:text-2xl font-bold text-gray-800">Matías J.</h3>
                         <p className="text-sm text-gray-500 mb-2">{initialCase.age}</p>
                         <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-red-50 text-red-500 text-[10px] md:text-xs font-bold rounded border border-red-100 flex items-center gap-1">
                               <AlertCircle size={12} /> Alerta Discursiva
                            </span>
                         </div>
                      </div>
                   </div>
                   <button className="self-end sm:self-start p-2 text-gray-400 hover:text-blue-500 bg-gray-50 rounded-lg">
                      <Info size={20} />
                   </button>
                </div>

                {/* Escenario Visual */}
                <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-6 relative overflow-hidden group shadow-xl shadow-slate-200">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Gamepad2 size={80} />
                   </div>
                   <h4 className="font-bold text-base md:text-lg mb-3 flex items-center gap-2 text-blue-200">
                      <MessageCircle size={18} className="text-blue-400" /> Observación Directa:
                   </h4>
                   <p className="text-slate-100 italic text-lg leading-relaxed font-light">
                      "Estás en la hora del juego libre. Matías está sentado frente a una torre de bloques. 
                      Otro niño se acerca y le pide un bloque rojo. Matías no responde verbalmente, 
                      solo empuja su mano y emite un sonido gutural ('¡Mmmm!'). No hace contacto visual con su compañero."
                   </p>
                   <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs rounded-full border border-blue-500/30 transition-colors">
                         🔍 Inspeccionar Gestos
                      </button>
                      <button className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs rounded-full border border-blue-500/30 transition-colors">
                         🎧 Escuchar Sonido
                      </button>
                   </div>
                </div>

                {/* Historial */}
                <div className="space-y-4 pb-4">
                   <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Antecedentes</h4>
                   <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 flex gap-3">
                      <div className="w-1 h-full bg-purple-400 rounded-full shrink-0"></div>
                      <strong>Madre:</strong> "En casa señala lo que quiere, pero no dice los nombres de las cosas."
                   </div>
                   <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 flex gap-3">
                      <div className="w-1 h-full bg-blue-400 rounded-full shrink-0"></div>
                      <strong>Docente anterior:</strong> "Se aísla durante las canciones grupales."
                   </div>
                </div>
             </div>
          </div>

          {/* Panel Derecho: Herramientas */}
          <div className={`w-full lg:w-5/12 p-4 md:p-6 overflow-y-auto bg-white ${activeMobileSimTab === 'tools' ? 'block' : 'hidden lg:block'}`}>
             <div className="max-w-lg mx-auto mb-20 lg:mb-0">
                <div className="mb-4 md:mb-6">
                   <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                      <ClipboardList className="text-purple-500" /> Diagnóstico
                   </h3>
                   <p className="text-sm text-gray-500">Selecciona los hitos cumplidos o fallidos.</p>
                </div>

                {/* Checklist */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="font-bold text-gray-700 text-sm">Escala de Desarrollo (2-3 Años)</span>
                      <span className="text-[10px] md:text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">Dimensión Comunicativa</span>
                   </div>
                   
                   <div className="divide-y divide-gray-100">
                      {/* Item 1 */}
                      <div className="p-3 md:p-4 hover:bg-gray-50 transition-colors">
                         <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-medium text-gray-800">Establece contacto visual</p>
                         </div>
                         <div className="flex gap-2">
                            <button 
                               onClick={() => setChecklist({...checklist, contactoVisual: true})}
                               className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${checklist.contactoVisual === true ? 'bg-green-50 text-green-700 border-green-200 shadow-inner' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
                            >
                               Sí Cumple
                            </button>
                            <button 
                               onClick={() => setChecklist({...checklist, contactoVisual: false})}
                               className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${checklist.contactoVisual === false ? 'bg-red-50 text-red-700 border-red-200 shadow-inner' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
                            >
                               No Cumple
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Notas */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 shadow-sm mb-6">
                   <h4 className="font-bold text-yellow-800 text-sm mb-2 flex items-center gap-2">
                      <PencilRuler size={16} /> Notas de Campo
                   </h4>
                   <textarea 
                      className="w-full bg-white border border-amber-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none h-28"
                      placeholder="Conclusiones..."
                   ></textarea>
                </div>
                
                <button 
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-gray-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  onClick={() => setSimulatorPhase('planeacion')}
                >
                   Ir a Planeación <ArrowRight size={18} />
                </button>

             </div>
          </div>
        </div>
    </div>
  );

  if (mode === 'play') return renderPlay();
  if (mode === 'create') return renderCreate();
  return renderLobby();
};

export default Simulador;
