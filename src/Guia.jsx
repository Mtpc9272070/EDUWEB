import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

const Guia = ({ steps, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const targetId = steps[currentStep].target;
      const element = document.getElementById(targetId);
      
      if (element) {
        // Scroll suave hacia el elemento
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Calcular posición después de un breve delay para asegurar que el scroll terminó
        setTimeout(() => {
            const rect = element.getBoundingClientRect();
            setPosition({
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
              height: rect.height,
              bottom: rect.bottom + window.scrollY,
              right: rect.right + window.scrollX
            });
        }, 100);
      }
    }
  }, [isOpen, currentStep, steps]);

  if (!isOpen || !position) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Efecto de Foco (Spotlight) usando box-shadow gigante */}
      <div 
        className="absolute transition-all duration-500 ease-in-out border-4 border-purple-500 rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.85)] pointer-events-none"
        style={{
          top: position.top - 8,
          left: position.left - 8,
          width: position.width + 16,
          height: position.height + 16,
        }}
      />

      {/* Tarjeta de Explicación */}
      <div 
        className="absolute transition-all duration-500 ease-in-out flex flex-col max-w-xs w-full z-[101]"
        style={{
          top: position.bottom + 20 > window.innerHeight + window.scrollY - 200 ? position.top - 220 : position.bottom + 20,
          left: Math.max(20, Math.min(position.left, window.innerWidth - 340)),
        }}
      >
        <div className="bg-white p-6 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative border border-gray-100 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
          
          <div className="mb-4 flex flex-col items-center">
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-1 rounded-full">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-2">{step.title}</h3>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{step.content}</p>

          <div className="flex items-center justify-between">
            <button onClick={handlePrev} disabled={currentStep === 0} className={`p-2 rounded-lg transition-colors ${currentStep === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
            >
              {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              {currentStep < steps.length - 1 && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guia;