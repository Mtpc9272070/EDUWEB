import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Video, 
  FileText, 
  Download, 
  Star, 
  Clock, 
  Headphones,
  X
} from 'lucide-react';

const Biblioteca = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const categories = ['Todos', 'Teoría', 'Didáctica', 'Legal', 'Multimedia', 'Casos'];

  const resources = [
    {
      id: 1,
      title: "Desarrollo Cognitivo en la Primera Infancia",
      author: "Jean Piaget",
      type: "PDF",
      category: "Teoría",
      rating: 4.8,
      reads: "1.2k",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "Estrategias de Motricidad Fina",
      author: "Banco de Recursos",
      type: "Video",
      category: "Didáctica",
      rating: 4.9,
      reads: "850",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "Ley de Infancia y Adolescencia",
      author: "Ministerio de Educación",
      type: "Documento",
      category: "Legal",
      rating: 4.5,
      reads: "2.1k",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 4,
      title: "El Juego como Herramienta Pedagógica",
      author: "Lev Vygotsky",
      type: "PDF",
      category: "Teoría",
      rating: 4.7,
      reads: "3.4k",
      image: "https://images.unsplash.com/photo-1587654780291-39c940483713?auto=format&fit=crop&q=80&w=1000",
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 5,
      title: "Canciones para la Rutina Diaria",
      author: "Aula Musical",
      type: "Audio",
      category: "Multimedia",
      rating: 4.6,
      reads: "920",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000",
      color: "bg-pink-100 text-pink-600"
    },
    {
      id: 6,
      title: "Estudio de Caso: Autismo Leve",
      author: "Clínica Pedagógica",
      type: "Caso",
      category: "Casos",
      rating: 4.9,
      reads: "1.5k",
      image: "https://images.unsplash.com/photo-1555445054-8488d05dc52e?auto=format&fit=crop&q=80&w=1000",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const filteredResources = resources.filter(r => {
    const matchesCategory = activeCategory === 'Todos' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in slide-in-from-right-full fade-in duration-500 overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
        {showMobileSearch ? (
           <div className="flex items-center gap-3 w-full md:hidden animate-in fade-in slide-in-from-top-2">
              <Search className="text-gray-400 shrink-0" size={20} />
              <input 
                  autoFocus
                  type="text" 
                  placeholder="Buscar..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-sm focus:outline-none text-gray-800 placeholder-gray-400"
              />
              <button onClick={() => { setShowMobileSearch(false); setSearchQuery(''); }} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <X size={20} />
              </button>
           </div>
        ) : (
           <>
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex-1">
                <h2 className="font-bold text-lg text-gray-800">Biblioteca Digital</h2>
                <p className="text-xs text-gray-500">Recursos curados para tu formación</p>
            </div>
            <div className="relative hidden md:block w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Buscar recurso..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
            </div>
            <button onClick={() => setShowMobileSearch(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-500">
                <Search size={20} />
            </button>
           </>
        )}
      </header>

      <div className="p-6 md:p-10 max-w-[1600px] mx-auto w-full space-y-8">
        
        {/* Featured Banner */}
        <div className="relative rounded-[2rem] overflow-hidden bg-gray-900 text-white shadow-xl shadow-indigo-200 min-h-[220px] flex items-center group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90 transition-opacity group-hover:opacity-100"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            
            {/* Imagen de fondo sutil */}
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000" alt="Banner" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 mask-image-linear-gradient" style={{maskImage: 'linear-gradient(to right, transparent, black)'}} />

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
                <div className="max-w-2xl">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/20 mb-3 inline-block uppercase tracking-wider">
                        Nuevo Lanzamiento
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">Neuroeducación Infantil: El Cerebro que Aprende</h1>
                    <p className="text-indigo-100 text-sm md:text-base">Descubre cómo funciona el cerebro del niño durante el juego y el aprendizaje con las últimas investigaciones.</p>
                </div>
                <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-colors flex items-center gap-2 shrink-0">
                    Leer Ahora <ArrowLeft className="rotate-180" size={18} />
                </button>
            </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                        activeCategory === cat 
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-200 scale-105' 
                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 hover:border-gray-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map(resource => (
                <div key={resource.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer">
                    <div className="h-44 bg-gray-100 relative overflow-hidden">
                        <img src={resource.image} alt={resource.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm">
                            {resource.type === 'Video' ? <Video size={16} className="text-gray-700" /> : 
                             resource.type === 'Audio' ? <Headphones size={16} className="text-gray-700" /> :
                             <FileText size={16} className="text-gray-700" />}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-bold flex items-center gap-1">
                                <Clock size={12} /> 5 min lectura
                            </span>
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide ${resource.color.replace('text-', 'bg-').replace('100', '50')} ${resource.color}`}>
                                {resource.category}
                            </span>
                            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-50 px-2 py-1 rounded-lg">
                                <Star size={12} fill="currentColor" /> {resource.rating}
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 text-lg group-hover:text-purple-600 transition-colors">{resource.title}</h3>
                        <p className="text-xs text-gray-500 mb-4 font-medium">{resource.author}</p>
                        
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                            <span className="text-xs text-gray-400 font-bold">{resource.reads} lecturas</span>
                            <button className="p-2 hover:bg-purple-50 rounded-xl text-gray-400 hover:text-purple-600 transition-colors">
                                <Download size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Biblioteca;