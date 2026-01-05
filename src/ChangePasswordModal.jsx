import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock } from 'lucide-react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las nuevas contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError('No se ha podido verificar el usuario. Por favor, inicia sesión de nuevo.');
      setIsLoading(false);
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setSuccess('¡Contraseña actualizada con éxito!');
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setError('La contraseña actual es incorrecta.');
      } else {
        setError('Ocurrió un error al actualizar la contraseña.');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Cambiar Contraseña</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Contraseña Actual</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type={showCurrent ? "text" : "password"} required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">{showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Nueva Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type={showNew ? "text" : "password"} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">{showNew ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Confirmar Nueva Contraseña</label>
            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
          </div>

          {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}
          {success && <p className="text-xs font-bold text-green-500 text-center">{success}</p>}

          <button type="submit" disabled={isLoading} className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70">{isLoading ? (<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>) : ('Actualizar Contraseña')}</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;