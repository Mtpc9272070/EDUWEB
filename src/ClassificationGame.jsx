import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, CheckCircle2 } from 'lucide-react';

const ClassificationGame = ({ 
  onBack,
  gameTitle,
  gameSubtitle,
  categories, // formerly THEORISTS
  items, // formerly CONCEPTS
  completionTitle,
  completionMessage,
  backButtonText
}) => {
  // Create a shuffled copy on initial render to avoid mutating props
  const [unplacedItems, setUnplacedItems] = useState(() => [...items].sort(() => Math.random() - 0.5));

  // Tailwind CSS does not support dynamic class name generation.
  // We must use full class names. This mapping ensures that.
  const colorClasses = {
    blue: {
      border: 'border-blue-400',
      hoverBg: 'hover:bg-blue-50',
      bg: 'bg-blue-100',
      text: 'text-blue-800',
    },
    purple: {
      border: 'border-purple-400',
      hoverBg: 'hover:bg-purple-50',
      bg: 'bg-purple-100',
      text: 'text-purple-800',
    },
    pink: {
      border: 'border-pink-400',
      hoverBg: 'hover:bg-pink-50',
      bg: 'bg-pink-100',
      text: 'text-pink-800',
    },
  };
  
  // Initialize placements dynamically based on categories
  const initialPlacements = categories.reduce((acc, category) => {
    acc[category.id] = [];
    return acc;
  }, {});
  const [placements, setPlacements] = useState(initialPlacements);

  const [selectedItem, setSelectedItem] = useState(null);
  const [feedback, setFeedback] = useState({ status: null, categoryId: null, itemId: null });
  const [score, setScore] = useState(0);

  const handleSelectItem = (item) => {
    if (feedback.status) return;
    setSelectedItem(item);
  };

  const handleDropOnCategory = (categoryId) => {
    if (!selectedItem) return;

    const isCorrect = selectedItem.categoryId === categoryId;
    
    setFeedback({ status: isCorrect ? 'correct' : 'incorrect', categoryId, itemId: selectedItem.id });

    if (isCorrect) {
      setScore(score + 10);
      setPlacements(prev => ({
        ...prev,
        [categoryId]: [...prev[categoryId], selectedItem]
      }));
      setUnplacedItems(unplacedItems.filter(c => c.id !== selectedItem.id));
    }

    setSelectedItem(null);

    setTimeout(() => {
      setFeedback({ status: null, categoryId: null, itemId: null });
    }, 1200);
  };

  const progress = ((items.length - unplacedItems.length) / items.length) * 100;

  return (
    <div className="flex flex-col h-full bg-gray-100 fixed inset-0 z-40 animate-in fade-in duration-500 overflow-y-auto">
      {/* Header del Juego */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-gray-800">{gameTitle}</h2>
            <p className="text-xs text-gray-500">{gameSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400">PUNTAJE</p>
            <p className="font-bold text-lg text-purple-600">{score}</p>
          </div>
        </div>
      </header>

      {/* Barra de Progreso */}
      <div className="w-full bg-gray-200 h-2">
        <div className="bg-green-500 h-2 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex-1 flex flex-col p-4 md:p-8">
        {/* Drop Zones - Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map(category => (
            <div
              key={category.id}
              onClick={() => handleDropOnCategory(category.id)}
              className={`relative bg-white rounded-3xl p-6 border-2 transition-all duration-300 ${
                selectedItem ? `border-dashed ${colorClasses[category.color]?.border || 'border-gray-400'} cursor-pointer ${colorClasses[category.color]?.hoverBg || 'hover:bg-gray-50'}` : 'border-transparent'
              } ${
                feedback.categoryId === category.id && feedback.status === 'correct' ? 'animate-bounce border-green-500' : ''
              } ${
                feedback.categoryId === category.id && feedback.status === 'incorrect' ? 'animate-shake border-red-500' : ''
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${category.name}`} alt={category.name} className={`w-12 h-12 rounded-full ${colorClasses[category.color]?.bg || 'bg-gray-100'} p-1`} />
                <h3 className={`font-bold text-lg ${colorClasses[category.color]?.text || 'text-gray-800'}`}>{category.name}</h3>
              </div>
              <div className="space-y-2 min-h-[50px]">
                {placements[category.id].map(item => (
                  <div key={item.id} className="bg-green-50 text-green-700 text-xs font-bold p-2 rounded-lg flex items-center gap-2 animate-in fade-in zoom-in-95">
                    <Check size={14} /> {item.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Draggable Items */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-200/50 rounded-3xl p-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Conceptos para Clasificar</h3>
          {unplacedItems.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {unplacedItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`px-5 py-3 bg-white rounded-xl shadow-md font-bold text-gray-700 border-2 transition-all duration-200 ${
                    selectedItem?.id === item.id 
                      ? 'border-purple-500 scale-105 shadow-lg -translate-y-1' 
                      : 'border-transparent hover:scale-105 hover:shadow-lg'
                  } ${
                    feedback.itemId === item.id && feedback.status === 'incorrect' ? 'bg-red-50 text-red-600' : ''
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">{completionTitle}</h2>
              <p className="text-gray-500">{completionMessage}</p>
              <button onClick={onBack} className="mt-6 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800">
                {backButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassificationGame;