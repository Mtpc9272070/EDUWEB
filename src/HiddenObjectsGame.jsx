import React, { useState } from 'react';
import { ArrowLeft, Search, AlertCircle } from 'lucide-react';

const HiddenObjectsGame = ({ onBack, title = "Objetos Ocultos", data }) => {
  const [found, setFound] = useState([]);
  const [showHint, setShowHint] = useState(null);

  const handleImageClick = (e) => {
    // En una implementación real, calcularíamos las coordenadas relativas al clic
    // Para esta plantilla simplificada, usaremos botones invisibles sobre la imagen
    // para asegurar la accesibilidad y facilidad de edición.
  };

  const handleTargetClick = (id) => {
    if (!found.includes(id)) {
      setFound([...found, id]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack}><ArrowLeft /></button>
          <h2 className="font-bold">{title}</h2>
        </div>
        <div className="bg-gray-700 px-4 py-1 rounded-full text-sm">
          Encontrados: {found.length} / {data.targets.length}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
        <div className="relative max-w-4xl w-full aspect-video">
          <img 
            src={data.imageUrl} 
            alt="Escenario de juego" 
            className="w-full h-full object-cover rounded-lg opacity-90 hover:opacity-100 transition-opacity"
          />
          
          {/* Renderizar áreas interactivas */}
          {data.targets.map(target => (
            <button
              key={target.id}
              onClick={() => handleTargetClick(target.id)}
              style={{ 
                left: `${target.x}%`, 
                top: `${target.y}%`,
                width: '60px',
                height: '60px'
              }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 group ${
                found.includes(target.id) 
                  ? 'bg-green-500/50 border-green-400 scale-100' 
                  : 'bg-transparent border-transparent hover:bg-white/10'
              }`}
            >
              {found.includes(target.id) && <Search className="text-white mx-auto" size={24} />}
              
              {/* Tooltip/Hint al pasar el mouse si no se ha encontrado */}
              {!found.includes(target.id) && (
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                  ???
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Panel inferior de objetivos */}
      <div className="bg-gray-800 p-4 h-32 overflow-y-auto">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Objetivos a encontrar:</h3>
        <div className="flex flex-wrap gap-3">
          {data.targets.map(target => (
            <div 
              key={target.id} 
              className={`px-3 py-2 rounded-lg border flex items-center gap-2 ${
                found.includes(target.id) 
                  ? 'bg-green-900/30 border-green-700 text-green-400 line-through' 
                  : 'bg-gray-700 border-gray-600 text-gray-300'
              }`}
            >
              {found.includes(target.id) ? <Search size={14} /> : <AlertCircle size={14} />}
              <span className="text-sm">{target.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HiddenObjectsGame;
