import React, { useState } from 'react';
import ChangePasswordModal from './ChangePasswordModal';
import {
  ArrowLeft,
  Settings,
  LogOut,
  Share2,
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Camera
} from 'lucide-react';

const Perfil = ({ onBack, studentProfile, onLogout }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Render a skeleton loader if the profile data is not yet available.
  if (!studentProfile) {
    return (
      <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in fade-in duration-500 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500"><ArrowLeft size={24} /></button>
          <h2 className="font-bold text-lg text-gray-800">Mi Perfil</h2>
        </header>
        <div className="p-6 md:p-10 max-w-3xl mx-auto w-full space-y-8 animate-pulse">
            <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full bg-gray-200 mb-4"></div>
                <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-5 w-32 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-200 h-20 rounded-2xl"></div>
                <div className="bg-gray-200 h-20 rounded-2xl"></div>
                <div className="bg-gray-200 h-20 rounded-2xl"></div>
            </div>
            <div className="space-y-6">
                <div className="bg-gray-200 h-40 rounded-3xl"></div>
                <div className="bg-gray-200 h-40 rounded-3xl"></div>
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
        <h2 className="font-bold text-lg text-gray-800">Mi Perfil</h2>
      </header>

      {isPasswordModalOpen && <ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} />}

      <div className="p-6 md:p-10 max-w-3xl mx-auto w-full space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4 group cursor-pointer">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-pink-500">
               <img
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${studentProfile.name}&backgroundColor=b6e3f4`}
                 alt="Profile"
                 className="w-full h-full rounded-full border-4 border-white bg-white"
               />
            </div>
            <div className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
              <Camera size={16} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{studentProfile.name}</h1>
          <p className="text-purple-600 font-medium">{studentProfile.title}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
             <span className="bg-gray-100 px-3 py-1 rounded-full">Nivel {studentProfile.level}</span>
             <span className="bg-gray-100 px-3 py-1 rounded-full">{studentProfile.xp} XP</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
           <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
              <span className="block text-2xl font-bold text-gray-900">{studentProfile.streak}</span>
              <span className="text-xs text-gray-500 font-bold uppercase">Racha Días</span>
           </div>
           <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
              <span className="block text-2xl font-bold text-gray-900">{studentProfile.coins}</span>
              <span className="text-xs text-gray-500 font-bold uppercase">Monedas</span>
           </div>
           <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
              <span className="block text-2xl font-bold text-gray-900">12</span>
              <span className="text-xs text-gray-500 font-bold uppercase">Logros</span>
           </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
           {/* Account Settings */}
           <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                 <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Configuración de Cuenta</h3>
              </div>
              <div className="divide-y divide-gray-50">
                 <MenuItem icon={<User size={20} />} label="Editar Perfil" desc="Nombre, avatar, biografía" />
                 <MenuItem icon={<Shield size={20} />} label="Seguridad" desc="Contraseña, autenticación" onClick={() => setIsPasswordModalOpen(true)} />
                 <MenuItem icon={<CreditCard size={20} />} label="Suscripción" desc="Plan Estudiante (Activo)" />
              </div>
           </div>

           {/* App Settings */}
           <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                 <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Aplicación</h3>
              </div>
              <div className="divide-y divide-gray-50">
                 <MenuItem icon={<Bell size={20} />} label="Notificaciones" desc="Push, correo electrónico" />
                 <MenuItem icon={<Settings size={20} />} label="Preferencias" desc="Idioma, tema oscuro" />
                 <MenuItem icon={<HelpCircle size={20} />} label="Ayuda y Soporte" desc="Centro de ayuda, contactar" />
              </div>
           </div>

           {/* Actions */}
           <div className="space-y-3">
              <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                 <Share2 size={20} /> Compartir Perfil Público
              </button>
              <button 
                onClick={onLogout}
                className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
              >
                 <LogOut size={20} /> Cerrar Sesión
              </button>
           </div>
           
           <p className="text-center text-xs text-gray-400 pt-4">Versión 1.0.5 (Build 2024)</p>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, desc, onClick }) => (
   <button onClick={onClick} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left group">
      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
         {icon}
      </div>
      <div className="flex-1">
         <h4 className="font-bold text-gray-800 text-sm">{label}</h4>
         <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-purple-400" />
   </button>
);

export default Perfil;