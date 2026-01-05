import React, { useState } from 'react';
import { ArrowLeft, Check, X, ArrowRight, CheckCircle2, Baby, MessagesSquare, Footprints } from 'lucide-react';

const MILESTONES = [
  {
    id: 1,
    media: { type: 'icon', component: <Baby size={96} strokeWidth={1.5} /> },
    question: 'Un bebé se sienta sin apoyo. ¿En qué rango de edad suele ocurrir este hito?',
    options: [
      { id: 'a', text: '2-4 meses' },
      { id: 'b', text: '5-7 meses', isCorrect: true },
      { id: 'c', text: '8-10 meses' },
    ],
    explanation: 'La mayoría de los bebés aprenden a sentarse sin apoyo entre los 5 y 7 meses, fortaleciendo los músculos de su espalda y cuello.'
  },
  {
    id: 2,
    media: { type: 'icon', component: <MessagesSquare size={96} strokeWidth={1.5} /> },
    question: 'Un niño pequeño empieza a usar frases de dos palabras como "más leche". ¿Cuál es la edad típica para este hito del lenguaje?',
    options: [
      { id: 'a', text: '12-17 meses' },
      { id: 'b', text: '18-24 meses', isCorrect: true },
      { id: 'c', text: '25-30 meses' },
    ],
    explanation: 'Alrededor de los 18 a 24 meses, los niños experimentan una explosión de vocabulario y comienzan a combinar palabras para formar frases simples.'
  },
  {
    id: 3,
    media: { type: 'icon', component: <Footprints size={96} strokeWidth={1.5} /> },
    question: 'Un niño es capaz de saltar y pararse en un pie por hasta 2 segundos. ¿Qué edad aproximada tiene?',
    options: [
      { id: 'a', text: '2 años' },
      { id: 'b', text: '3 años', isCorrect: true },
      { id: 'c', text: '4 años' },
    ],
    explanation: 'A los 3 años, la coordinación y el equilibrio mejoran significativamente, permitiendo habilidades motoras gruesas como saltar y pararse en un pie brevemente.'
  },
].sort(() => Math.random() - 0.5);

const DetectorDeHitos = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentMilestone = MILESTONES[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= MILESTONES.length;

  const handleOptionSelect = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    if (option.isCorrect) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const progress = (currentQuestionIndex / MILESTONES.length) * 100;

  if (isFinished) {
    return (
      <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in fade-in duration-500 items-center justify-center text-center p-6">
        <CheckCircle2 size={64} className="text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Juego Completado!</h1>
        <p className="text-gray-500 mb-6">Has demostrado tu conocimiento sobre el desarrollo infantil.</p>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <p className="text-sm font-bold text-gray-400 uppercase">Puntaje Final</p>
          <p className="text-5xl font-bold text-purple-600">{score}</p>
        </div>
        <button onClick={onBack} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800">
          Volver al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 fixed inset-0 z-40 animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-gray-800">Detector de Hitos</h2>
            <p className="text-xs text-gray-500">Observa y elige la edad correcta</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400">PUNTAJE</p>
            <p className="font-bold text-lg text-purple-600">{score}</p>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <div className="bg-green-500 h-2 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          {/* Media Display */}
          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl h-64 md:h-96 mb-8 shadow-2xl shadow-green-200 overflow-hidden relative flex items-center justify-center text-white">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            {currentMilestone.media.type === 'icon' && (
              <div className="opacity-30">{currentMilestone.media.component}</div>
            )}
            {currentMilestone.media.type === 'image' && (
              <img src={currentMilestone.media.src} alt="Hito del desarrollo" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <p className="absolute bottom-6 left-6 right-6 text-white text-lg md:text-xl font-bold text-center z-10">
              {currentMilestone.question}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {currentMilestone.options.map(option => {
              const isSelected = selectedOption?.id === option.id;
              let buttonClass = 'bg-white border-gray-200 hover:bg-gray-50';
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

          {/* Feedback and Next Button */}
          {showFeedback && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-in fade-in zoom-in-95 flex flex-col md:flex-row items-center gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedOption.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {selectedOption.isCorrect ? <Check size={24} /> : <X size={24} />}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-bold text-gray-800">{selectedOption.isCorrect ? '¡Correcto!' : '¡Casi!'}</h4>
                <p className="text-sm text-gray-600">{currentMilestone.explanation}</p>
              </div>
              <button onClick={handleNext} className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 flex items-center justify-center gap-2">
                Siguiente <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectorDeHitos;