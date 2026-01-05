import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Por razones de seguridad, no se debe verificar primero si el correo existe en la base de datos,
    // ya que esto podría permitir a un atacante descubrir qué correos están registrados (enumeración de usuarios).
    // La práctica recomendada es intentar enviar siempre el correo. Firebase Authentication se encarga
    // de no hacer nada si el correo no existe, sin notificar al cliente para no dar pistas.
    // Por lo tanto, siempre mostraremos un mensaje de éxito al usuario para no revelar información.

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      // Aunque ocurra un error (ej. formato de email inválido), no se lo revelamos al usuario.
      // Solo lo registramos en la consola para depuración.
      console.error("Error al intentar enviar correo de restablecimiento:", error);
    } finally {
      // Siempre mostramos el mensaje de éxito.
      setSuccess('Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña en breve.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Restablecer Contraseña</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="text-center">
            <p className="text-sm text-green-600 font-medium">{success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-sm text-gray-500">Ingresa tu correo electrónico y te enviaremos un enlace para que puedas restablecer tu contraseña.</p>
            <div>
              <label className="text-sm font-bold text-gray-700 ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              </div>
            </div>

            {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}

            <button type="submit" disabled={isLoading} className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70">{isLoading ? (<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>) : ('Enviar Enlace')}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;