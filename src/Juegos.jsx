import React, { useState } from 'react';
import ClassificationGame from './ClassificationGame';
import DetectorDeHitos from './DetectorDeHitos';
import JuegoDePistas from './JuegoDePistas';
import MemoryGame from './MemoryGame';
import HiddenObjectsGame from './HiddenObjectsGame';
import QuizGame from './QuizGame';
import {
  ArrowLeft,
  Puzzle,
  Swords,
  ArrowRight,
  BrainCircuit,
  Baby,
  Lock,
  FileSearch
} from 'lucide-react';

const colorClasses = {
  blue: {
    gradient: 'from-blue-500 to-sky-500',
    text: 'text-blue-600',
  },
  green: {
    gradient: 'from-green-500 to-emerald-500',
    text: 'text-green-600',
  },
  yellow: {
    gradient: 'from-yellow-400 to-amber-500',
    text: 'text-yellow-600',
  },
  default: {
    gradient: 'from-gray-500 to-gray-600',
    text: 'text-gray-600',
  }
};

// Estos datos ahora se pasarían como props si fuera necesario,
// pero para este ejemplo, los definimos aquí para que el componente siga funcionando
// si se accede directamente.
const THEORISTS_DATA = {
  categories: [
    { id: 'piaget', name: 'Jean Piaget', color: 'blue' },
    { id: 'vygotsky', name: 'Lev Vygotsky', color: 'purple' },
    { id: 'montessori', name: 'Maria Montessori', color: 'pink' },
  ],
  items: [
    { id: 1, text: 'Zona de Desarrollo Próximo', categoryId: 'vygotsky' },
    { id: 2, text: 'Estadio Sensoriomotor', categoryId: 'piaget' },
    { id: 3, text: 'Mente Absorbente del Niño', categoryId: 'montessori' },
    { id: 4, text: 'Andamiaje', categoryId: 'vygotsky' },
    { id: 5, text: 'Permanencia del Objeto', categoryId: 'piaget' },
    { id: 6, text: 'Ambiente Preparado', categoryId: 'montessori' },
  ]
};

// DATOS DE EJEMPLO PARA LAS NUEVAS PLANTILLAS
const MEMORY_DATA = {
  cards: [
    { id: 1, content: "🧠", matchId: 1 },
    { id: 2, content: "Neuroplasticidad", matchId: 1 },
    { id: 3, content: "👶", matchId: 2 },
    { id: 4, content: "Primera Infancia", matchId: 2 },
    { id: 5, content: "💤", matchId: 3 },
    { id: 6, content: "Consolidación", matchId: 3 },
    { id: 7, content: "🎨", matchId: 4 },
    { id: 8, content: "Creatividad", matchId: 4 },
  ]
};

const HIDDEN_OBJECTS_DATA = {
  imageUrl: "https://img.freepik.com/free-vector/kindergarten-classroom-interior-with-toys-furniture_1308-61397.jpg", // Imagen de ejemplo
  targets: [
    { id: 1, x: 20, y: 60, name: "Enchufe sin protección", hint: "Busca cerca del suelo, es peligroso." },
    { id: 2, x: 80, y: 40, name: "Juguete roto", hint: "Podría cortar a alguien sobre la mesa." },
    { id: 3, x: 50, y: 80, name: "Suelo mojado", hint: "Cuidado al caminar por el centro." }
  ]
};

const QUIZ_DATA = {
  questions: [
    {
      id: 1,
      question: "¿Qué emoción básica ayuda a la supervivencia ante una amenaza?",
      options: ["Alegría", "Miedo", "Tristeza", "Sorpresa"],
      correctIndex: 1,
      feedback: "El miedo activa respuestas fisiológicas de lucha o huida."
    },
    {
      id: 2,
      question: "Capacidad de reconocer y gestionar las propias emociones:",
      options: ["Empatía", "Autoconciencia", "Motivación", "Habilidades Sociales"],
      correctIndex: 1,
      feedback: "La autoconciencia es el primer paso de la inteligencia emocional."
    }
  ]
};

const Juegos = ({ onBack, games = [], initialGameId }) => {
  const [view, setView] = useState(initialGameId || 'lobby'); // 'lobby', 'didactic-catalog', 'constructor-de-teorias', 'detector-hitos', 'juego-de-pistas'

  if (view === 'constructor-de-teorias') {
    return <ClassificationGame 
      onBack={() => setView('didactic-catalog')}
      // PLANTILLA: CLASIFICACIÓN
      gameTitle="Constructor de Teorías"
      gameSubtitle="Arrastra el concepto al autor correcto"
      categories={THEORISTS_DATA.categories}
      items={THEORISTS_DATA.items}
      completionTitle="¡Excelente Trabajo!"
      completionMessage="Has clasificado todos los conceptos correctamente."
      backButtonText="Volver al Catálogo"
    />;
  }

  if (view === 'detector-hitos') {
    // PLANTILLA: ORDENAMIENTO / SELECCIÓN
    return <DetectorDeHitos 
      onBack={() => setView('didactic-catalog')} 
      title="Detector de Hitos"
    />;
  }

  if (view === 'juego-de-pistas') {
    // PLANTILLA: BÚSQUEDA DE PISTAS
    return <JuegoDePistas 
      onBack={() => setView('didactic-catalog')} 
      title="Investigador Junior"
    />;
  }

  if (view === 'neuro-challenge') {
    // PLANTILLA: MEMORIA
    return <MemoryGame 
      onBack={() => setView('didactic-catalog')}
      title="Neuro-Desafío"
      data={MEMORY_DATA}
    />;
  }

  if (view === 'aula-segura') {
    // PLANTILLA: OBJETOS OCULTOS
    return <HiddenObjectsGame 
      onBack={() => setView('didactic-catalog')}
      title="Aula 360°: Detecta el Riesgo"
      data={HIDDEN_OBJECTS_DATA}
    />;
  }

  if (view === 'emocionario') {
    // PLANTILLA: QUIZ / TRIVIA
    return <QuizGame 
      onBack={() => setView('didactic-catalog')}
      title="Emocionario: Trivia Emocional"
      data={QUIZ_DATA}
    />;
  }

  if (view === 'didactic-catalog') {
    return (
      <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in fade-in duration-500 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setView('lobby')}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex-1">
              <h2 className="font-bold text-lg text-gray-800">Álbum de Juegos Didácticos</h2>
              <p className="text-xs text-gray-500">Selecciona un juego para empezar</p>
          </div>
        </header>
        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map(game => (
              <div 
                key={game.id}
                onClick={() => !game.locked && setView(game.id)}
                className={`bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col relative overflow-hidden ${
                  game.locked ? 'grayscale opacity-60 cursor-not-allowed' : 'group cursor-pointer'
                }`}
              >
                {game.locked && (
                  <div className="absolute top-4 right-4 bg-gray-200 text-gray-500 p-2 rounded-full">
                    <Lock size={16} />
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${game.color}-100 text-${game.color}-600 mb-4`}>
                  {game.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider text-${game.color}-600 mb-1`}>{game.type}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{game.title}</h3>
                <p className="text-sm text-gray-500 flex-1 mb-6">{game.description}</p>
                <button 
                  disabled={game.locked}
                  className="w-full py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {game.locked ? 'Próximamente' : 'Jugar Ahora'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <h2 className="font-bold text-lg text-gray-800">Centro de Juegos</h2>
            <p className="text-xs text-gray-500">Aprende, compite y diviértete</p>
        </div>
      </header>

      <div className="p-6 md:p-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Elige tu Aventura</h1>
          <p className="text-gray-500 text-lg">Selecciona un modo de juego para empezar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Card Juegos Didácticos */}
          <div
            onClick={() => setView('didactic-catalog')}
            className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl shadow-green-100 border border-green-50 cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200 group-hover:rotate-6 transition-transform">
                <Puzzle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Juegos Didácticos</h3>
              <p className="text-gray-500 mb-6">Desafía tu conocimiento con puzzles y actividades interactivas para reforzar tu aprendizaje.</p>
              <span className="inline-flex items-center gap-2 text-green-600 font-bold group-hover:gap-3 transition-all">
                Explorar Juegos <ArrowRight size={20} />
              </span>
            </div>
          </div>

          {/* Card Competitivo en Línea */}
          <div
            className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl shadow-red-100 border border-red-50 cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-200 group-hover:-rotate-6 transition-transform">
                <Swords size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Competitivo en Línea</h3>
              <p className="text-gray-500 mb-6">Mide tus habilidades contra otros estudiantes en tiempo real y sube en la clasificación.</p>
              <span className="inline-flex items-center gap-2 text-red-600 font-bold group-hover:gap-3 transition-all">
                Ir a la Arena <ArrowRight size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Juegos;