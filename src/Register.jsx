import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from './firebase';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    setError(''); // Limpiar errores previos
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // 1. Actualizar el perfil de autenticación de Firebase (opcional pero bueno para tener)
        await updateProfile(userCredential.user, {
          displayName: name,
        });

        // 2. Crear un documento para el usuario en Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: name,
          email: email,
          createdAt: serverTimestamp(),
          level: 1,
          xp: 0,
          nextLevelXp: 1000,
          streak: 0,
          coins: 50,
          title: "Pedagogo Novato"
        });
        // El listener onAuthStateChanged en App.jsx se encargará del resto.
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('Este correo electrónico ya está registrado.');
        } else {
          setError('Ocurrió un error al crear la cuenta.');
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-in fade-in duration-500 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-in fade-in">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="mt-4 font-bold text-gray-600">Creando tu cuenta...</p>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple-100 w-full max-w-5xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="font-bold text-3xl text-gray-900 mb-2">Crea tu Cuenta ✨</h1>
            <p className="text-gray-500">Únete a la comunidad y empieza a transformar la educación.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  placeholder="Ana María"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  placeholder="ejemplo@eduweb.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'}`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && <p className="text-xs font-bold text-red-500 mt-2 ml-1">{error}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Crear Cuenta <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes una cuenta? <button type="button" onClick={onSwitchToLogin} className="font-bold text-purple-600 hover:text-purple-700">Inicia sesión</button>
            </p>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden md:flex w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -ml-20 -mb-20"></div>

          <div className="relative z-10 text-white max-w-md">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-wide">PLATAFORMA DOCENTE V2.0</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">Formando el futuro de la educación.</h2>
            <p className="text-indigo-100 text-lg leading-relaxed mb-8">
              Accede a simuladores clínicos, biblioteca digital y herramientas de IA diseñadas para potenciar tu carrera pedagógica.
            </p>
            
            <div className="flex items-center gap-4">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-200">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e0e7ff`} alt="User" className="w-full h-full rounded-full" />
                    </div>
                  ))}
               </div>
               <div className="text-sm font-medium">
                  <span className="font-bold block">+2.5k Estudiantes</span>
                  <span className="text-indigo-200">conectados ahora</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;