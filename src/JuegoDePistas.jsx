import React, { useState } from 'react';
import { ArrowLeft, Search, Check, X, ArrowRight } from 'lucide-react';

const PISTAS_GAME_DATA = {
  id: 1,
  caseTitle: "La Edad del Habla",
  caseQuestion: "Según los estudios recopilados, ¿cuál es la edad promedio en la que un niño dice sus primeras palabras con intención?",
  clues: [
    { id: 'c1', source: "Fuente: 'Desarrollo del Lenguaje' - Biblioteca Digital", text: "El balbuceo es una etapa pre-lingüística que comienza alrededor de los 6 meses, pero no se considera habla intencional." },
    { id: 'c2', source: "Fuente: 'Hitos Infantiles Vol. II' - Biblioteca Digital", text: "Estudios longitudinales muestran que la mayoría de los infantes producen su primera palabra reconocible, como 'mamá' o 'papá', cerca de su primer cumpleaños." },
    { id: 'c3', source: "Fuente: 'Análisis de la RAE sobre el habla temprana'", text: "La Real Academia Española observa que, si bien hay variabilidad, el léxico productivo emerge consistentemente entre los 10 y 14 meses." }
  ],
  options: [
    { id: 'a', text: '6-8 meses' },
    { id: 'b', text: '9-10 meses' },
    { id: 'c', text: 'Alrededor de los 12 meses', isCorrect: true },
  ]
};

const JuegoDePistas = ({ onBack }) => {
  const [revealedClues, setRevealedClues] = useState([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const gameData = PISTAS_GAME_DATA;

  const handleRevealClue = () => {
    if (revealedClues.length < gameData.clues.length) {
      setRevealedClues(prev => [...prev, gameData.clues[revealedClues.length]]);
    }
  };

  const handleOptionSelect = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    if (option.isCorrect) {
      setScore(100); // Puntuación fija para este ejemplo
    }
  };

  const allCluesRevealed = revealedClues.length === gameData.clues.length;

  return (
    <div className="flex flex-col h-full bg-gray-100 fixed inset-0 z-40 animate-in fade-in duration-500 overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-gray-800">Juego de Pistas: Investigación</h2>
            <p className="text-xs text-gray-500">{gameData.caseTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400">PUNTAJE</p>
            <p className="font-bold text-lg text-purple-600">{score}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          {/* Main Question */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{gameData.caseQuestion}</h1>
            <p className="text-gray-500">Usa las pistas de la biblioteca para encontrar la respuesta correcta.</p>
          </div>

          {/* Clues Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 min-h-[150px]">
            {revealedClues.map((clue, index) => (
              <div key={clue.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm animate-in fade-in slide-in-from-bottom-4" style={{animationDelay: `${index * 100}ms`}}>
                <p className="text-sm text-gray-700 italic">"{clue.text}"</p>
                <p className="text-right text-xs font-bold text-yellow-700 mt-2">- {clue.source}</p>
              </div>
            ))}
          </div>

          {/* Answering Section */}
          {isAnswering ? (
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 animate-in fade-in zoom-in-95">
              <h3 className="text-center font-bold text-gray-800 mb-6">Selecciona tu conclusión final:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gameData.options.map(option => {
                  const isSelected = selectedOption?.id === option.id;
                  let buttonClass = 'bg-gray-100 border-gray-200 hover:bg-gray-200';
                  if (showFeedback) {
                    if (option.isCorrect) {
                      buttonClass = 'bg-green-100 border-green-300 text-green-800 animate-bounce';
                    } else if (isSelected) {
                      buttonClass = 'bg-red-100 border-red-300 text-red-800 animate-shake';
                    } else {
                      buttonClass = 'bg-gray-100 border-gray-200 opacity-50';
                    }
                  }
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      disabled={showFeedback}
                      className={`p-6 rounded-2xl border-2 text-center font-bold text-lg transition-all duration-300 ${buttonClass}`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // Action Buttons
            <div className="flex justify-center gap-4">
              {!allCluesRevealed && (
                <button onClick={handleRevealClue} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 flex items-center gap-2">
                  <Search size={18} /> Buscar Pista ({revealedClues.length + 1}/{gameData.clues.length})
                </button>
              )}
              {revealedClues.length > 0 && (
                <button onClick={() => setIsAnswering(true)} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 flex items-center gap-2">
                  <Check size={18} /> Responder
                </button>
              )}
            </div>
          )}

          {/* Feedback and Next Button */}
          {showFeedback && isAnswering && (
            <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-in fade-in zoom-in-95 flex flex-col md:flex-row items-center gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedOption.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {selectedOption.isCorrect ? <Check size={24} /> : <X size={24} />}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-bold text-gray-800">{selectedOption.isCorrect ? '¡Conclusión Correcta!' : 'Hipótesis Incorrecta'}</h4>
                <p className="text-sm text-gray-600">
                  {selectedOption.isCorrect 
                    ? `¡Exacto! La evidencia apunta a que las primeras palabras aparecen alrededor de los 12 meses.`
                    : `No exactamente. Revisa las pistas de nuevo para ver por qué la respuesta correcta es otra.`
                  }
                </p>
              </div>
              <button onClick={onBack} className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 flex items-center justify-center gap-2">
                Finalizar Investigación <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JuegoDePistas;