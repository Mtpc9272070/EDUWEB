import React, { useState, useEffect } from 'react';
import RutaAprendizaje from './RutaAprendizaje';
import Biblioteca from './Biblioteca';
import Simulador from './Simulador';
import Perfil from './Perfil';
import MallaCurricular from './MallaCurricular';
import AsistenteIA from './AsistenteIA';
import Guia from './Guia';
import Juegos from './Juegos';
import Login from './Login';
import Register from './Register';
import { Swiper, SwiperSlide } from 'swiper/react';
import TopBar from './TopBar';
import NavigationContent from './NavigationContent';
import BottomNav from './BottomNav';
import ActionMenu from './ActionMenu';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
// Import Swiper bundle which includes all modules styles
import 'swiper/css/bundle';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { 
  BookOpen, 
  Gamepad2, 
  BarChart3, 
  Award, 
  Search, 
  BrainCircuit, 
  Baby, 
  ArrowRight,
  Clock,
  Layout,
  FileText,
  MessageCircle,
  Info,
  Menu,
  X,
  Lock,
  ChevronRight,
  Sparkles,
  Plus,
  WifiOff,
  Wifi,
  Bot,
  HelpCircle,
  Flame,
  Puzzle,
  FileSearch,
  Trophy,
  Users,
  FilePlus,
  Zap
} from 'lucide-react';

// --- DATOS ESTÁTICOS (Movidos fuera del componente para estabilidad) ---
const DIDACTIC_GAMES_CATALOG = [
  {
    id: 'constructor-de-teorias',
    title: 'Constructor de Teorías',
    description: 'Asocia conceptos clave con sus autores (Piaget, Vygotsky).',
    icon: <BrainCircuit size={32} />,
    color: 'blue',
    gradient: 'from-blue-500 to-sky-500',
  },
  {
    id: 'detector-hitos',
    title: 'Detector de Hitos',
    description: '¿A qué edad camina un niño? ¡Pon a prueba tu conocimiento!',
    icon: <Baby size={32} />,
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'juego-de-pistas',
    title: 'Investigador Junior',
    description: 'Resuelve casos pedagógicos usando pistas ocultas.',
    icon: <FileSearch size={32} />,
    color: 'yellow',
    gradient: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'neuro-challenge',
    title: 'Neuro-Desafío',
    description: 'Memory card game con conceptos de neuroeducación.',
    icon: <Zap size={32} />,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'aula-segura',
    title: 'Aula 360°',
    description: 'Identifica riesgos y oportunidades en un aula virtual.',
    icon: <Search size={32} />,
    color: 'rose',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 'emocionario',
    title: 'Emocionario',
    description: 'Herramientas para trabajar la inteligencia emocional.',
    icon: <Trophy size={32} />,
    color: 'orange',
    gradient: 'from-orange-400 to-red-500',
  }
];

const LIBRARY_RESOURCES = [
  { id: 1, category: "Teoría", title: "Desarrollo Cognitivo", author: "Jean Piaget", type: "PDF Interactivo", color: "bg-blue-50 text-blue-600" },
  { id: 2, category: "Didáctica", title: "Motricidad Fina", author: "Banco de Actividades", type: "Video 5 min", color: "bg-green-50 text-green-600" },
  { id: 3, category: "Legal", title: "Ley de Infancia", author: "Normativa Vigente", type: "Documento Base", color: "bg-purple-50 text-purple-600" },
  { id: 4, category: "Plantillas", title: "Planeación Semanal", author: "Recurso Docente", type: "Excel", color: "bg-orange-50 text-orange-600" },
  { id: 5, category: "Caso", title: "El niño que muerde", author: "Estudio de Caso", type: "Lectura 10m", color: "bg-red-50 text-red-600" }
];

const EduwebDashboard = () => {
  // Estado de navegación principal
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'simulator', 'learning-path', 'library', 'curriculum', 'ai-assistant', 'games'
  const [user, setUser] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' o 'register'
  const [authLoading, setAuthLoading] = useState(true);
  
  const [showTutorial, setShowTutorial] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [simulatorInitialMode, setSimulatorInitialMode] = useState('lobby');
  const [notifications, setNotifications] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  // Estado de conexión a internet
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineToast, setShowOnlineToast] = useState(false);

  // Listener de estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Usuario está logueado, buscar su perfil en Firestore.
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setStudentProfile({ uid: currentUser.uid, ...userDocSnap.data() });
        } else {
          console.error("No se encontró el perfil del usuario en Firestore. Forzando cierre de sesión.");
          signOut(auth); // Forzar logout si el perfil no existe para evitar un estado inconsistente.
        }
      } else {
        setStudentProfile(null);
      }
      setAuthLoading(false);
    });
    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineToast(true);
      setTimeout(() => setShowOnlineToast(false), 4000);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Estado para menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar cambio de tamaño para resetear menú
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- EFECTO: SIMULADOR DE NOTIFICACIONES EN VIVO ---
  useEffect(() => {
    // Sonido de notificación (Pop suave)
    const notificationSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bubble-pop-slide-2363.mp3');
    notificationSound.volume = 0.5;

    // Simula eventos que ocurren en la plataforma para dar sensación de "vida"
    const interval = setInterval(() => {
      const types = [
        { icon: <Users size={16} />, title: "Comunidad", msg: "Ana M. ha comentado en el foro.", color: "bg-blue-500" },
        { icon: <FilePlus size={16} />, title: "Biblioteca", msg: "Nuevo recurso: 'Guía de Apego'.", color: "bg-emerald-500" },
        { icon: <Trophy size={16} />, title: "Ranking", msg: "¡Carlos subió al nivel 5!", color: "bg-amber-500" },
        { icon: <Zap size={16} />, title: "En Vivo", msg: "Webinar de Neuroeducación en 10 min.", color: "bg-purple-500" }
      ];
      
      const randomNotif = types[Math.floor(Math.random() * types.length)];
      const newNotif = { id: Date.now(), ...randomNotif };

      // Reproducir sonido
      notificationSound.currentTime = 0;
      notificationSound.play().catch(e => console.log("Audio play prevented:", e));
      
      setNotifications(prev => [newNotif, ...prev].slice(0, 3)); // Mantiene máximo 3 visibles
      
      // Auto eliminar después de 5 segundos
      setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== newNotif.id)), 5000);
    }, 12000); // Genera una notificación cada 12 segundos

    return () => clearInterval(interval);
  }, []);

  // Datos del Caso Activo
  const currentCase = {
    id: 101,
    title: "Caso: El silencio de Matías",
    subject: "Desarrollo Infantil (0-3)",
    age: "2 años y 4 meses",
    description: "Matías ha ingresado al jardín. La madre reporta que 'casi no habla'.",
    difficulty: "Intermedio",
    color: "from-violet-600 to-indigo-600"
  };

  // Datos del Módulo de Aprendizaje (Agrupa las fases)
  const currentModule = {
    id: 1,
    title: "Intervención Pedagógica Temprana",
    level: "Semestre III",
    progress: 35,
    phases: [
      { 
        id: 1, 
        title: "Diagnóstico Inicial", 
        desc: "Identifica patrones de conducta.",
        status: "completed", 
        icon: <Gamepad2 size={18} />,
        color: "text-emerald-600",
        bg: "bg-emerald-100"
      },
      { 
        id: 2, 
        title: "Diseño Didáctico", 
        desc: "Estrategias adaptadas.",
        status: "active", 
        icon: <BookOpen size={18} />,
        color: "text-amber-600",
        bg: "bg-amber-100"
      },
      { 
        id: 3, 
        title: "Simulación Aula", 
        desc: "Práctica en vivo.",
        status: "locked", 
        icon: <Gamepad2 size={18} />,
        color: "text-indigo-600",
        bg: "bg-indigo-100"
      },
      { 
        id: 4, 
        title: "Evaluación Impacto", 
        desc: "Medición de resultados.",
        status: "locked", 
        icon: <BarChart3 size={18} />,
        color: "text-rose-600",
        bg: "bg-rose-100"
      }
    ]
  };

  // Manejador de click en módulos
  const handleModuleClick = (moduleId) => {
    if (moduleId === 2) {
      // Lógica para ir al simulador específico de la fase
      setActiveTab('simulator');
    }
  };

  const handleGameSelect = (gameId) => {
    setSelectedGameId(gameId);
    setActiveTab('games');
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  };

  // --- PASOS DEL TUTORIAL ---
  const tutorialSteps = [
    {
      target: 'topbar-profile',
      title: 'Tu Perfil de Estudiante',
      content: 'Aquí puedes ver tu nivel, racha y gestionar tu cuenta. ¡Haz clic en tu avatar para ver más detalles!'
    },
    {
      target: 'simulator-card',
      title: 'Simulador SIPU',
      content: 'El corazón de la app. Resuelve casos clínicos interactivos o crea tus propias actividades pedagógicas.'
    },
    {
      target: 'learning-path-section',
      title: 'Ruta de Aprendizaje',
      content: 'Sigue tu progreso académico paso a paso. Completa las fases para desbloquear nuevos módulos.'
    },
    {
      target: 'library-section',
      title: 'Biblioteca Digital',
      content: 'Accede rápidamente a recursos teóricos, videos y documentos legales curados para ti.'
    }
  ];

  // --- COMPONENTE: SKELETON LOADER ---
  const DashboardSkeleton = () => (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto w-full space-y-8 pb-20 animate-pulse">
      {/* Welcome Skeleton */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
          <div>
            <div className="h-10 bg-gray-200 rounded-lg w-64 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded-lg w-80"></div>
          </div>
          <div className="w-full md:w-64 mt-4 md:mt-0">
            <div className="h-4 bg-gray-200 rounded-lg w-24 mb-2 ml-auto"></div>
            <div className="h-4 bg-gray-200 rounded-full w-full"></div>
          </div>
        </div>
      </section>
  
      {/* Hero & Badges Skeleton */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 h-[320px] bg-gray-200 rounded-[2rem]"></div>
        <div className="bg-gray-200 rounded-[2rem] p-8 flex flex-col gap-6">
          <div className="h-8 w-48 bg-gray-300 rounded-lg"></div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-300/50">
            <div className="w-12 h-12 rounded-xl bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-300 rounded-lg"></div>
              <div className="h-4 w-24 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-300/50">
            <div className="w-12 h-12 rounded-xl bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-300 rounded-lg"></div>
              <div className="h-4 w-24 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
          <div className="h-12 mt-auto bg-gray-300 rounded-xl"></div>
        </div>
      </section>
  
      {/* Learning Path Skeleton */}
      <section className="bg-gray-200 rounded-[2rem] p-8">
        <div className="h-8 w-64 bg-gray-300 rounded-lg mb-6"></div>
        <div className="h-6 w-48 bg-gray-300 rounded-lg mb-2"></div>
        <div className="h-5 w-72 bg-gray-300 rounded-lg mb-6"></div>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-48 h-12 bg-gray-300 rounded-xl"></div>
        </div>
      </section>
  
      {/* Resources Skeleton */}
      <section className="bg-gray-200 rounded-[2rem] p-8">
         <div className="h-8 w-56 bg-gray-300 rounded-lg mb-6"></div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-28"></div>
      </section>
    </div>
  );

  // --- COMPONENTE: MODAL SIN CONEXIÓN ---
  const NoConnectionModal = () => (
    <div className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff size={32} className="text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">¡Sin Conexión!</h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Parece que has perdido la conexión a internet. Verifica tu red para continuar navegando.
        </p>
        <button 
          onClick={() => {
            if (navigator.onLine) {
              setIsOnline(true);
              setShowOnlineToast(true);
            }
          }}
          className="w-full py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
        >
          Reintentar
        </button>
      </div>
    </div>
  );

  // --- COMPONENTE: TOAST CONEXIÓN RESTABLECIDA ---
  const OnlineToast = () => (
    <div className="fixed top-6 right-6 z-[70] bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-xl shadow-emerald-200 flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="bg-white/20 p-2 rounded-full">
        <Wifi size={18} className="text-white" />
      </div>
      <div>
        <h4 className="text-sm font-bold">¡Conexión Restablecida!</h4>
        <p className="text-[10px] text-emerald-100 font-medium">Ya estás en línea de nuevo.</p>
      </div>
      <button onClick={() => setShowOnlineToast(false)} className="ml-2 text-white/60 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </div>
  );

  // --- RENDERIZADO PRINCIPAL ---
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    if (authScreen === 'login') {
      return <Login onSwitchToRegister={() => setAuthScreen('register')} />;
    }
    if (authScreen === 'register') {
      return <Register onSwitchToLogin={() => setAuthScreen('login')} />;
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden relative">
      
      {/* Modal de Sin Conexión */}
      {!isOnline && <NoConnectionModal />}
      
      {/* Toast de Conexión */}
      {showOnlineToast && <OnlineToast />}
      
      {/* Notificaciones Flotantes (Simultáneas) */}
      <div className="fixed bottom-24 md:bottom-10 right-6 z-[80] flex flex-col gap-3 pointer-events-none">
        {notifications.map(notif => (
          <div key={notif.id} className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 flex items-center gap-3 animate-in slide-in-from-right fade-in duration-500 pointer-events-auto max-w-xs hover:scale-105 transition-transform cursor-pointer">
            <div className={`p-2 rounded-full text-white shadow-sm ${notif.color}`}>
              {notif.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800">{notif.title}</h4>
              <p className="text-[10px] text-gray-500 leading-tight">{notif.msg}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Menú de Acciones Rápidas */}
      {isActionMenuOpen && <ActionMenu 
        setIsActionMenuOpen={setIsActionMenuOpen} 
        setSimulatorInitialMode={setSimulatorInitialMode} 
        setActiveTab={setActiveTab} 
      />}

      {/* Guía Interactiva */}
      <Guia 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
        steps={tutorialSteps} 
      />

      {/* Sidebar Navigation (Desktop) */}
      {activeTab === 'dashboard' && (
        <aside className="w-72 bg-white border-r border-gray-100 flex-col z-10 hidden md:flex">
          <NavigationContent 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
            setSimulatorInitialMode={setSimulatorInitialMode} 
          />
        </aside>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800/50 backdrop-blur-sm md:hidden flex">
          <div className="w-3/4 max-w-xs bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <NavigationContent 
              mobile={true} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
              setSimulatorInitialMode={setSimulatorInitialMode} 
            />
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area Switcher */}
      <main className="flex-1 flex flex-col overflow-y-auto relative w-full">
        
        {activeTab === 'simulator' ? (
          <Simulador 
            onBack={() => setActiveTab('dashboard')}
            initialCase={currentCase}
            initialMode={simulatorInitialMode}
          />
        ) : activeTab === 'learning-path' ? (
          <RutaAprendizaje 
            moduleData={currentModule} 
            onBack={() => setActiveTab('dashboard')}
            onNavigateToSimulator={handleModuleClick}
          />
        ) : activeTab === 'library' ? (
          <Biblioteca 
            onBack={() => setActiveTab('dashboard')}
          />
        ) : activeTab === 'profile' ? (
          <Perfil 
            onBack={() => setActiveTab('dashboard')}
            studentProfile={studentProfile}
            onLogout={handleLogout}
          />
        ) : activeTab === 'curriculum' ? (
          <MallaCurricular 
            onBack={() => setActiveTab('dashboard')}
          />
        ) : activeTab === 'ai-assistant' ? (
          <AsistenteIA 
            onBack={() => setActiveTab('dashboard')}
          />
        ) : activeTab === 'games' ? (
          <Juegos 
            onBack={() => {
              setActiveTab('dashboard');
              setSelectedGameId(null);
            }}
            games={DIDACTIC_GAMES_CATALOG}
            initialGameId={selectedGameId}
          />
        ) : (
          /* VISTA DASHBOARD ORIGINAL */
          <div className="flex flex-col min-h-full animate-in fade-in slide-in-from-left-8 duration-500">
            <TopBar 
              studentProfile={studentProfile} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
              setShowTutorial={setShowTutorial} 
              setActiveTab={setActiveTab} 
            />

            {/* Dashboard Content */}
            {!studentProfile ? (
              <DashboardSkeleton />
            ) : (
              <div className="p-6 md:p-10 max-w-[1600px] mx-auto w-full space-y-8 pb-20">
                
                {/* Welcome */}
                <section>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
                    <div className="w-full md:w-auto">
                      <div className="flex items-center justify-between md:justify-start gap-3">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">¡Hola, {studentProfile.name}! ✨</h2>
                        <button 
                          onClick={() => setShowTutorial(true)}
                          className="md:hidden p-2 text-purple-600 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors"
                        >
                          <HelpCircle size={20} />
                        </button>
                      </div>
                      <p className="text-base text-gray-500 mt-2">¿Lista para continuar tu formación en <span className="text-purple-600 font-bold">Educación Infantil</span>?</p>
                    </div>
                    <div className="text-left md:text-right w-full md:w-auto">
                      <p className="text-xs md:text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Próximo Nivel</p>
                      <div className="w-full md:w-64 h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full relative transition-all duration-1000 ease-out" 
                          style={{ width: `${(studentProfile.xp / studentProfile.nextLevelXp) * 100}%` }}
                        >
                           <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-gray-600 mt-2 text-right">{studentProfile.xp} / {studentProfile.nextLevelXp} XP</p>
                    </div>
                  </div>
                </section>
  
                {/* Hero Card y Badges (Mantiene diseño anterior) */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  {/* Games Carousel */}
                  <div id="games-carousel" className="lg:col-span-2 relative h-[380px]">
                    <Swiper
                      modules={[Pagination, Autoplay, EffectCoverflow]}
                      effect="coverflow"
                      coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                      }}
                      loop={true}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      pagination={{ clickable: true }}
                      grabCursor={true}
                      centeredSlides={true}
                      slidesPerView={1}
                      observer={true}
                      observeParents={true}
                      className="h-full w-full rounded-[2rem]"
                    >
                      {DIDACTIC_GAMES_CATALOG.map((game) => (
                        <SwiperSlide key={game.id} onClick={() => handleGameSelect(game.id)} className={`bg-gradient-to-br ${game.gradient} cursor-pointer`}>
                          <div className="h-full w-full p-8 flex flex-col justify-between text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gplay.png')] opacity-10"></div>
                            <div className="absolute -bottom-10 -right-10 opacity-20 text-white">
                              {React.cloneElement(game.icon, { size: 128, strokeWidth: 1 })}
                            </div>
                            
                            <div className="relative z-10">
                              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/20 mb-3 inline-block uppercase">
                                Juego Didáctico
                              </span>
                              <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{game.title}</h3>
                              <p className="text-indigo-100 text-base font-medium">{game.description}</p>
                            </div>

                            <div className="relative z-10 mt-auto">
                              <span className="inline-flex items-center gap-2 font-bold bg-white text-gray-800 px-6 py-3 rounded-xl shadow-lg">Jugar Ahora <ArrowRight size={18} /></span>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
  
                  <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100 border border-gray-100 flex flex-col gap-6">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      <Award className="text-yellow-500" size={24} /> Logros Recientes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 flex-1">
                      {[{ icon: "🧠", name: "Neuro-Detective", date: "Hace 2 días" }, { icon: "🎨", name: "Maestra del Color", date: "Hace 1 semana" }].map((badge, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-yellow-50 hover:border-yellow-100 transition-colors group">
                          <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{badge.icon}</span>
                          <div>
                            <p className="font-bold text-base text-gray-800">{badge.name}</p>
                            <p className="text-xs text-gray-400">{badge.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-3 text-sm font-bold text-gray-500 hover:text-purple-600 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors">
                      Ver Colección Completa
                    </button>
                  </div>
                </section>
  
                {/* Learning Path (NUEVA SECCIÓN RESTAURADA) */}
                <section id="learning-path-section" className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100 border border-gray-100 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                      <Layout className="text-purple-600" size={24} /> Tu Ruta de Aprendizaje
                    </h3>
                  </div>
  
                  {/* Summary Card (Versión Compacta para Dashboard) */}
                  <div className="relative z-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    
                    <span className="inline-block px-3 py-1 rounded-lg bg-purple-50 text-purple-600 text-xs font-bold mb-3 border border-purple-100">
                      {currentModule.level}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentModule.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-1"><BookOpen size={16} /> {currentModule.phases.length} Fases</span>
                      <span className="flex items-center gap-1"><Clock size={16} /> 12h estimadas</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                       <div className="flex-1 w-full">
                          <div className="flex justify-between text-xs font-bold mb-2 text-gray-500">
                            <span>Progreso General</span>
                            <span>{currentModule.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${currentModule.progress}%` }}></div>
                          </div>
                       </div>
                       <button 
                          onClick={() => setActiveTab('learning-path')}
                          className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                       >
                          Continuar Ruta <ArrowRight size={16} />
                       </button>
                    </div>
                  </div>
                </section>
  
                {/* Resources */}
                <section id="library-section" className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-gray-100 border border-gray-100">
                  <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="text-blue-500" /> Biblioteca Rápida
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {LIBRARY_RESOURCES.slice(0, 6).map((res) => (
                      <ResourceCard key={res.id} {...res} />
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('library')}
                    className="w-full mt-6 py-3 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-colors border border-gray-100 flex items-center justify-center gap-2"
                  >
                    Explorar toda la Biblioteca <ArrowRight size={16} />
                  </button>
                </section>
  
              </div>
            )}
            <BottomNav 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isActionMenuOpen={isActionMenuOpen} 
              setIsActionMenuOpen={setIsActionMenuOpen} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

// Subcomponentes
const ResourceCard = ({ category, title, author, type, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-start gap-4 group">
    <div className={`p-3.5 rounded-2xl ${color} shrink-0 group-hover:scale-110 transition-transform`}><FileText size={22} /></div>
    <div>
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{category}</span>
      <h4 className="font-bold text-gray-900 mb-1 text-base">{title}</h4>
      <p className="text-sm text-gray-500 mb-2">{author}</p>
      <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-600 uppercase tracking-wide">{type}</span>
    </div>
  </div>
);

export default EduwebDashboard;