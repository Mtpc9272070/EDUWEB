import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const MemoryGame = ({ onBack, title = "Juego de Memoria", data }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [data]);

  const initializeGame = () => {
    // Duplicar y mezclar si los datos no vienen ya como pares únicos
    // Asumimos que data.cards ya viene listo o lo mezclamos aquí
    const shuffled = [...data.cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
  };

  const handleClick = (id) => {
    if (disabled || solved.includes(id) || flipped.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      setFlipped([...flipped, id]);
      checkForMatch(flipped[0], id);
    }
  };

  const checkForMatch = (id1, id2) => {
    const card1 = cards.find(c => c.id === id1);
    const card2 = cards.find(c => c.id === id2);

    if (card1.matchId === card2.matchId) {
      setSolved(prev => [...prev, id1, id2]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const isWon = solved.length === cards.length && cards.length > 0;

  return (
    <div className="flex flex-col h-full bg-indigo-50">
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack}><ArrowLeft /></button>
          <h2 className="font-bold text-indigo-900">{title}</h2>
        </div>
        <button onClick={initializeGame} className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:rotate-180 transition-transform">
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {isWon ? (
          <div className="h-full flex flex-col items-center justify-center animate-in zoom-in">
            <h2 className="text-4xl font-bold text-indigo-600 mb-4">¡Excelente!</h2>
            <p className="text-gray-600 mb-8">Has ejercitado tu memoria correctamente.</p>
            <button onClick={initializeGame} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">Jugar de Nuevo</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleClick(card.id)}
                className={`aspect-square rounded-xl cursor-pointer transition-all duration-500 transform preserve-3d relative ${
                  flipped.includes(card.id) || solved.includes(card.id) ? 'rotate-y-180' : ''
                }`}
              >
                {/* Parte trasera (Tapada) */}
                <div className={`absolute inset-0 bg-indigo-200 rounded-xl flex items-center justify-center backface-hidden ${flipped.includes(card.id) || solved.includes(card.id) ? 'opacity-0' : 'opacity-100'}`}>
                  <span className="text-indigo-400 font-bold text-2xl">?</span>
                </div>
                
                {/* Parte frontal (Destapada) */}
                <div className={`absolute inset-0 bg-white border-2 border-indigo-200 rounded-xl flex items-center justify-center text-center p-2 shadow-lg backface-hidden ${flipped.includes(card.id) || solved.includes(card.id) ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="text-lg font-bold text-gray-800">{card.content}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
