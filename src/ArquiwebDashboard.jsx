import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { 
  Box, 
  Layers, 
  Map, 
  Compass, 
  PenTool, 
  Ruler, 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronRight, 
  Home, 
  Briefcase, 
  FileText, 
  Settings,
  Maximize2,
  Sun,
  Wind,
  Droplets,
  Hexagon,
  Move3d,
  Eye,
  GraduationCap,
  CheckCircle2,
  Lock,
  PlayCircle,
  FileDown
} from 'lucide-react';

// Carga perezosa del Mapa Digital
const DigitalMap = lazy(() => import('../../arquiweb/arquiweb/src/DigitalMap')); // Ajusta la ruta si es necesario según tu estructura real

// --- DATOS MOCK (Simulados) ---
const PROJECTS = [
  {
    id: 1,
    title: "Residencial Altos del Bosque",
    type: "Vivienda Multifamiliar",
    progress: 75,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
    status: "En Renderizado"
  },
  {
    id: 2,
    title: "Museo de Arte Moderno",
    type: "Equipamiento Cultural",
    progress: 30,
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop",
    status: "Fase de Bocetos"
  },
  {
    id: 3,
    title: "Eco-Parque Urbano",
    type: "Paisajismo",
    progress: 90,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    status: "Planos Finales"
  }
];

const TOOLS = [
  { icon: <Sun size={20} />, label: "Asoleamiento", color: "text-orange-500 bg-orange-50" },
  { icon: <Wind size={20} />, label: "Túnel de Viento", color: "text-blue-500 bg-blue-50" },
  { icon: <Ruler size={20} />, label: "Conversor", color: "text-indigo-500 bg-indigo-50" },
  { icon: <Droplets size={20} />, label: "Hidráulica", color: "text-cyan-500 bg-cyan-50" },
];

// --- DATOS RUTA DE APRENDIZAJE ---
const LEARNING_PATH = [
  {
    id: 1,
    title: "Fundamentos del Espacio",
    description: "Comprende la escala humana, antropometría y las proporciones básicas.",
    status: "completed", // completed, active, locked
    type: "Teoría + Quiz",
    resources: 3,
    xp: 500
  },
  {
    id: 2,
    title: "Análisis de Sitio: Clima",
    description: "Misión: Identificar la trayectoria solar y vientos dominantes en un terreno.",
    status: "active",
    type: "Práctica Virtual",
    resources: 2,
    xp: 1000
  },
  {
    id: 3,
    title: "Sistemas Estructurales I",
    description: "Introducción a cargas vivas y muertas. Diferencia entre muro portante y divisorio.",
    status: "locked",
    type: "Evaluación",
    resources: 4,
    xp: 750
  }
];

// Loader simple para componentes pesados
const ComponentLoader = ({ text }) => (
  <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-cyan-400 rounded-[2rem]">
    <Hexagon size={48} className="animate-spin mb-4" />
    <p className="font-mono text-sm tracking-widest animate-pulse">{text}</p>
  </div>
);

const ArquiwebDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);

  // Efecto de carga inicial
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Hexagon size={48} className="text-cyan-400 animate-spin" strokeWidth={1} />
          <span className="text-cyan-400 font-mono tracking-[0.3em] text-sm animate-pulse">CARGANDO ARQUIWEB...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden selection:bg-cyan-200">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-2xl`}>
        <div className="p-8 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl tracking-tighter flex items-center gap-2">
              <Hexagon className="text-cyan-400 fill-cyan-400/20" /> 
              ARQUI<span className="text-cyan-400">WEB</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono mt-1 tracking-widest">V.3.0 STUDIO</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400">
            <X />
          </button>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          <NavItem icon={<Home size={20} />} label="Estudio Principal" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<GraduationCap size={20} />} label="Ruta de Aprendizaje" active={activeTab === 'learning-path'} onClick={() => setActiveTab('learning-path')} />
          <NavItem icon={<Move3d size={20} />} label="Simulación 3D" active={activeTab === '3d'} onClick={() => setActiveTab('3d')} />
          <NavItem icon={<Layers size={20} />} label="Planoteca" active={activeTab === 'blueprints'} onClick={() => setActiveTab('blueprints')} />
          <NavItem icon={<Map size={20} />} label="Mapas Virtuales" active={activeTab === 'maps'} onClick={() => setActiveTab('maps')} />
          <NavItem icon={<Briefcase size={20} />} label="Investigaciones" active={activeTab === 'research'} onClick={() => setActiveTab('research')} />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full rounded-full bg-slate-900" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Arq. Felix M.</p>
              <p className="text-xs text-cyan-400">Nivel Senior</p>
            </div>
            <button className="ml-auto p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Settings size={18} className="text-slate-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto relative bg-slate-50/50">
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-600">
              <Menu />
            </button>
            <div className="hidden md:flex items-center gap-2 text-slate-400 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              <Search size={16} />
              <input type="text" placeholder="Buscar planos, texturas..." className="bg-transparent border-none focus:outline-none text-sm w-64 text-slate-700 placeholder-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 relative text-slate-500 hover:text-cyan-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-[1800px] mx-auto w-full space-y-8 pb-20">
          
          {/* VISTA: MAPA DIGITAL 3D */}
          {activeTab === 'maps' && (
            <Suspense fallback={<ComponentLoader text="CARGANDO MAPA DIGITAL..." />}>
              <div className="h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                <DigitalMap onBack={() => setActiveTab('dashboard')} />
              </div>
            </Suspense>
          )}
          
          {/* VISTA: RUTA DE APRENDIZAJE */}
          {activeTab === 'learning-path' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Semestre 1: Iniciación</h2>
                <p className="text-slate-500">Completa los encargos del arquitecto jefe para desbloquear nuevas herramientas.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Izquierda: El Mapa */}
                <div className="lg:col-span-2 space-y-6 relative">
                  {/* Línea conectora vertical */}
                  <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 z-0"></div>

                  {LEARNING_PATH.map((mission, index) => (
                    <div key={mission.id} className={`relative z-10 bg-white rounded-2xl p-6 border transition-all duration-300 flex gap-6 ${mission.status === 'active' ? 'border-cyan-500 shadow-lg shadow-cyan-100 scale-[1.02]' : 'border-slate-100 opacity-90'}`}>
                      {/* Icono de Estado */}
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${
                        mission.status === 'completed' ? 'bg-green-100 text-green-600' :
                        mission.status === 'active' ? 'bg-cyan-500 text-white' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {mission.status === 'completed' ? <CheckCircle2 size={28} /> :
                         mission.status === 'active' ? <PenTool size={28} /> :
                         <Lock size={28} />}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                            mission.status === 'active' ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            Misión {index + 1} • {mission.type}
                          </span>
                          <span className="text-xs font-bold text-slate-400">{mission.xp} XP</span>
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${mission.status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>{mission.title}</h3>
                        <p className="text-sm text-slate-500 mb-4">{mission.description}</p>
                        
                        {mission.status !== 'locked' && (
                          <div className="flex gap-3 mt-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors">
                              <FileDown size={16} /> Recursos ({mission.resources})
                            </button>
                            {mission.status === 'active' && (
                              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-xs font-bold transition-colors shadow-md shadow-cyan-200">
                                <PlayCircle size={16} /> Iniciar Evaluador
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Columna Derecha: Panel de Estado */}
                <div className="space-y-6">
                  <div className="bg-slate-900 text-white rounded-[2rem] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <h3 className="text-lg font-bold mb-1">Tu Nivel Actual</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-4">Junior I</div>
                    <div className="w-full bg-slate-700 h-2 rounded-full mb-2 overflow-hidden">
                      <div className="bg-cyan-400 h-full w-3/4 rounded-full"></div>
                    </div>
                    <p className="text-xs text-slate-400">1500 / 2000 XP para ascender</p>
                  </div>

                  <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-4">Próximas Recompensas</h4>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl opacity-50">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center"><Box size={20} /></div>
                      <div className="text-sm font-bold text-slate-600">Librería de Muebles 3D</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Welcome Section */}
          {activeTab === 'dashboard' && (
          <section className="flex flex-col md:flex-row justify-between items-end gap-6 animate-in slide-in-from-bottom-4 duration-700">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Panel de Control</h2>
              <p className="text-slate-500">Bienvenido al entorno de simulación arquitectónica.</p>
            </div>
            <div className="flex gap-3">
              {TOOLS.map((tool, idx) => (
                <button key={idx} className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white group`}>
                  <div className={`p-2 rounded-lg mb-1 ${tool.color} group-hover:scale-110 transition-transform`}>{tool.icon}</div>
                  <span className="text-[10px] font-bold text-slate-600">{tool.label}</span>
                </button>
              ))}
            </div>
          </section>
          )}

          {/* 3D Simulation & Projects Grid */}
          {activeTab === 'dashboard' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 3D Viewer Card (Interactive Placeholder) */}
            <div className="lg:col-span-2 h-[450px] bg-slate-900 rounded-[2rem] relative overflow-hidden shadow-2xl shadow-slate-300 group">
              {/* Background Grid Simulation */}
              <div className="absolute inset-0 opacity-20" 
                   style={{ 
                     backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)', 
                     backgroundSize: '40px 40px',
                     transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)'
                   }}>
              </div>
              
              {/* 3D Object Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 animate-[spin_20s_linear_infinite]">
                   <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-ping"></div>
                   <div className="absolute inset-4 border border-cyan-400/50 rounded-full"></div>
                   <Hexagon size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" strokeWidth={0.5} />
                </div>
              </div>

              {/* UI Overlay */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold backdrop-blur-md">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    LIVE RENDER
                  </span>
                  <h3 className="text-white text-2xl font-bold mt-2">Torre Central - Fase 2</h3>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/10 transition-colors">
                    <Maximize2 size={20} />
                  </button>
                  <button 
                    onClick={() => setIs3DMode(!is3DMode)}
                    className={`p-3 backdrop-blur-md rounded-xl border transition-colors ${is3DMode ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-white/10 text-white border-white/10 hover:bg-white/20'}`}
                  >
                    <Box size={20} />
                  </button>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex gap-6 text-xs font-mono text-slate-400">
                  <div>
                    <p className="text-slate-500">VÉRTICES</p>
                    <p className="text-white">1.2M</p>
                  </div>
                  <div>
                    <p className="text-slate-500">ILUMINACIÓN</p>
                    <p className="text-white">RAY TRACING</p>
                  </div>
                  <div>
                    <p className="text-slate-500">FPS</p>
                    <p className="text-cyan-400">60</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg text-sm transition-colors">
                  Editar Modelo
                </button>
              </div>
            </div>

            {/* Active Projects List */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-800">Proyectos Activos</h3>
                <button className="text-cyan-600 hover:text-cyan-700 text-sm font-bold">Ver Todo</button>
              </div>
              
              <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {PROJECTS.map(project => (
                  <div key={project.id} className="group p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                    <div className="relative h-32 mb-3 rounded-xl overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-white text-xs font-bold bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{project.title}</h4>
                      <p className="text-xs text-slate-500 mb-2">{project.type}</p>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          )}

          {/* Blueprints Carousel */}
          {activeTab === 'dashboard' && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                <Layers className="text-indigo-500" size={24} /> Planoteca Reciente
              </h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"><ChevronRight className="rotate-180" size={20} /></button>
                <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"><ChevronRight size={20} /></button>
              </div>
            </div>

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full pb-10"
            >
              {[1, 2, 3, 4].map((item) => (
                <SwiperSlide key={item}>
                  <div className="bg-slate-800 rounded-2xl p-1 shadow-lg group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-[url('https://www.transparenttextures.com/patterns/blueprint-grid.png')] bg-blue-900/20 p-6 rounded-xl border border-slate-700 relative overflow-hidden h-64 flex flex-col">
                      {/* Blueprint Lines Effect */}
                      <div className="absolute inset-0 opacity-30" 
                           style={{ 
                             backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                             backgroundSize: '20px 20px'
                           }}>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                          <FileText className="text-cyan-400" />
                          <span className="text-[10px] font-mono text-slate-400 border border-slate-600 px-2 py-0.5 rounded">DWG-00{item}</span>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-1">Planta Nivel {item}</h4>
                        <p className="text-slate-400 text-xs">Estructural • Escala 1:50</p>
                      </div>

                      <div className="mt-auto relative z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        <button className="flex-1 py-2 bg-cyan-500 text-slate-900 text-xs font-bold rounded-lg hover:bg-cyan-400">Abrir</button>
                        <button className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"><Eye size={16} /></button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          )}

          {/* Research & Maps Grid */}
          {activeTab === 'dashboard' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Virtual Maps */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Map size={120} className="text-slate-900" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                <Compass className="text-rose-500" /> Exploración de Sitio
              </h3>
              <p className="text-slate-500 mb-6 max-w-sm">Accede a mapas topográficos y análisis de entorno urbano en tiempo real.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mb-3">
                    <Map size={20} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Topografía</h4>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mb-3">
                    <Box size={20} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Catastro 3D</h4>
                </div>
              </div>
            </div>

            {/* Research */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Briefcase className="text-cyan-400" /> Investigaciones
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Sostenibilidad en Rascacielos", tag: "Tecnología" },
                    { title: "Urbanismo Post-Pandemia", tag: "Sociedad" },
                    { title: "Nuevos Materiales Compuestos", tag: "Innovación" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer">
                      <div>
                        <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                        <span className="text-[10px] text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/20">{item.tag}</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          )}

        </div>
      </main>
    </div>
  );
};

// Helper Component
const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-cyan-500 text-slate-900 font-bold shadow-lg shadow-cyan-500/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <span className={active ? 'text-slate-900' : 'text-slate-400 group-hover:text-white'}>{icon}</span>
    <span className="text-sm">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-900"></div>}
  </button>
);

export default ArquiwebDashboard;
