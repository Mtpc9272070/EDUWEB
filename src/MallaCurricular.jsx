import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  BrainCircuit, 
  Palette, 
  Calculator, 
  Users, 
  Music, 
  Plus, 
  Play, 
  CheckCircle2,
  GraduationCap,
  Lock
} from 'lucide-react';

const MallaCurricular = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('my-subjects'); // 'my-subjects', 'catalog'
  
  // Estado simulado de materias
  const [mySubjects, setMySubjects] = useState([
    {
      id: 1,
      title: "Psicología del Desarrollo",
      level: "Semestre I",
      progress: 75,
      totalModules: 12,
      completedModules: 9,
      icon: <BrainCircuit size={24} />,
      color: "bg-purple-100 text-purple-600",
      border: "border-purple-200"
    }
  ]);

  const [catalog, setCatalog] = useState([
    {
      id: 2,
      title: "Literatura Infantil",
      level: "Semestre II",
      description: "Narrativa y fomento lector en la primera infancia.",
      icon: <BookOpen size={24} />,
      color: "bg-orange-100 text-orange-600",
      border: "border-orange-200"
    },
    {
      id: 3,
      title: "Pensamiento Lógico",
      level: "Semestre II",
      description: "Didáctica de las matemáticas preescolares.",
      icon: <Calculator size={24} />,
      color: "bg-blue-100 text-blue-600",
      border: "border-blue-200"
    },
    {
      id: 4,
      title: "Expresión Artística",
      level: "Semestre III",
      description: "Técnicas plásticas y creatividad.",
      icon: <Palette size={24} />,
      color: "bg-pink-100 text-pink-600",
      border: "border-pink-200"
    },
    {
      id: 5,
      title: "Inclusión Educativa",
      level: "Semestre IV",
      description: "Estrategias para la diversidad en el aula.",
      icon: <Users size={24} />,
      color: "bg-teal-100 text-teal-600",
      border: "border-teal-200"
    },
    {
      id: 6,
      title: "Expresión Musical",
      level: "Semestre I",
      description: "Ritmo y melodía para el desarrollo.",
      icon: <Music size={24} />,
      color: "bg-yellow-100 text-yellow-600",
      border: "border-yellow-200"
    }
  ]);

  const handleEnroll = (subject) => {
    // Mover del catálogo a mis materias
    setCatalog(catalog.filter(s => s.id !== subject.id));
    setMySubjects([...mySubjects, { ...subject, progress: 0, totalModules: 10, completedModules: 0 }]);
    setActiveTab('my-subjects');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in slide-in-from-right-full fade-in duration-500 overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex-1">
            <h2 className="font-bold text-lg text-gray-800">Centro de Especialización</h2>
            <p className="text-xs text-gray-500">Gestiona tu malla curricular</p>
        </div>
      </header>

      <div className="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
        
        {/* Tabs de Navegación */}
        <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit mx-auto md:mx-0">
          <button 
            onClick={() => setActiveTab('my-subjects')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'my-subjects' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Mis Materias
          </button>
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'catalog' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Catálogo Disponible
          </button>
        </div>

        {activeTab === 'my-subjects' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <GraduationCap className="text-purple-600" /> En Curso ({mySubjects.length})
                </h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySubjects.map(subject => (
                  <div key={subject.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden">
                     <div className={`absolute top-0 right-0 w-32 h-32 ${subject.color.split(' ')[0]} rounded-full -mr-10 -mt-10 opacity-20 group-hover:scale-150 transition-transform duration-500`}></div>
                     
                     <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${subject.color}`}>
                              {subject.icon}
                           </div>
                           <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full border border-gray-100">
                              {subject.level}
                           </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{subject.title}</h4>
                        <p className="text-xs text-gray-500 mb-6 font-medium">
                           {subject.completedModules} de {subject.totalModules} módulos completados
                        </p>

                        <div className="space-y-2">
                           <div className="flex justify-between text-xs font-bold text-gray-400">
                              <span>Progreso</span>
                              <span>{subject.progress}%</span>
                           </div>
                           <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-1000 ${subject.color.replace('text-', 'bg-').split(' ')[1]}`} style={{ width: `${subject.progress}%` }}></div>
                           </div>
                        </div>

                        <button className="w-full mt-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-200 group-hover:translate-y-[-2px]">
                           <Play size={16} fill="currentColor" /> Continuar
                        </button>
                     </div>
                  </div>
                ))}
                
                {/* Card para agregar más */}
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="border-2 border-dashed border-gray-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 transition-all min-h-[280px]"
                >
                   <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white">
                      <Plus size={32} />
                   </div>
                   <span className="font-bold">Inscribir Nueva Materia</span>
                </button>
             </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <BookOpen className="text-blue-600" /> Catálogo de Materias
                </h3>
                <div className="relative hidden md:block w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Buscar materia..." 
                        className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catalog.map(subject => (
                   <div key={subject.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${subject.color} bg-opacity-20`}>
                            {subject.icon}
                         </div>
                         <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full border border-gray-100">
                            {subject.level}
                         </span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{subject.title}</h4>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-1">
                         {subject.description}
                      </p>

                      <button 
                        onClick={() => handleEnroll(subject)}
                        className={`w-full py-3 border-2 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${subject.border} ${subject.color.split(' ')[1]} hover:bg-gray-50`}
                      >
                         Inscribirse
                      </button>
                   </div>
                ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MallaCurricular;
