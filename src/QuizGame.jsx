import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const QuizGame = ({ onBack, title = "Quiz", data }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQ = data.questions[currentQIndex];

  const handleSelect = (index) => {
    if (isConfirmed) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < data.questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setIsConfirmed(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-orange-50 p-8 text-center">
        <h2 className="text-3xl font-bold text-orange-900 mb-2">¡Quiz Completado!</h2>
        <div className="text-6xl font-black text-orange-500 mb-4">{score}/{data.questions.length}</div>
        <p className="text-orange-800 mb-8">Puntuación Final</p>
        <button onClick={onBack} className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg hover:bg-orange-700">
          Volver al Menú
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-4 border-b border-gray-200">
        <button onClick={onBack}><ArrowLeft /></button>
        <div className="flex-1">
          <h2 className="font-bold text-gray-800">{title}</h2>
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
            <div 
              className="bg-orange-500 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQIndex + 1) / data.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 max-w-2xl mx-auto w-full flex flex-col justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isConfirmed}
                className={`w-full p-4 rounded-xl text-left font-medium border-2 transition-all flex justify-between items-center ${
                  isConfirmed
                    ? idx === currentQ.correctIndex
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : idx === selectedOption
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-100 text-gray-400'
                    : idx === selectedOption
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-100 hover:border-orange-200 hover:bg-gray-50'
                }`}
              >
                {opt}
                {isConfirmed && idx === currentQ.correctIndex && <CheckCircle size={20} />}
                {isConfirmed && idx === selectedOption && idx !== currentQ.correctIndex && <XCircle size={20} />}
              </button>
            ))}
          </div>
        </div>

        {/* Área de Feedback y Botón Siguiente */}
        <div className="h-24">
          {isConfirmed ? (
            <div className="animate-in slide-in-from-bottom-4 fade-in">
              <div className={`p-4 rounded-xl mb-4 text-sm ${selectedOption === currentQ.correctIndex ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="font-bold">{selectedOption === currentQ.correctIndex ? '¡Correcto! ' : 'Incorrecto. '}</span>
                {currentQ.feedback}
              </div>
              <button onClick={handleNext} className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                Siguiente <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleConfirm} 
              disabled={selectedOption === null}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
            >
              Confirmar Respuesta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
