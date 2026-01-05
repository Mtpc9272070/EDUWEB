import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Sparkles,
  Menu,
  X,
  FileText,
  ListChecks,
  Languages,
  Image as ImageIcon
} from 'lucide-react';

const AsistenteIA = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '¡Hola! Soy tu asistente pedagógico virtual. ¿En qué puedo ayudarte hoy? Puedo ayudarte a planificar clases, crear rúbricas o resolver dudas sobre desarrollo infantil.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMsg = { id: Date.now(), type: 'user', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simular respuesta de IA
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: 'Entendido. Estoy procesando tu solicitud basándome en el currículo de Educación Infantil y las mejores prácticas pedagógicas...' 
      }]);
    }, 1500);
  };

  const tools = [
    { icon: <FileText size={20} />, label: "Generar Plan de Clase", color: "bg-blue-100 text-blue-600" },
    { icon: <ListChecks size={20} />, label: "Crear Rúbrica", color: "bg-green-100 text-green-600" },
    { icon: <Languages size={20} />, label: "Traducir Recurso", color: "bg-orange-100 text-orange-600" },
    { icon: <ImageIcon size={20} />, label: "Generar Imagen Didáctica", color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 fixed inset-0 z-40 animate-in slide-in-from-right-full fade-in duration-500">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 leading-tight">Asistente IA</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500 font-medium">En línea</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botón para abrir menú de herramientas */}
        <button 
          onClick={() => setIsToolsOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-gray-200' : 'bg-purple-100 text-purple-600'}`}>
              {msg.type === 'user' ? <User size={16} className="text-gray-500" /> : <Sparkles size={16} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.type === 'user' 
                ? 'bg-gray-900 text-white rounded-tr-none' 
                : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-300 transition-all">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu consulta pedagógica..."
            className="flex-1 bg-transparent border-none focus:outline-none px-2 text-sm text-gray-800 placeholder-gray-400"
          />
          <button 
            onClick={handleSend}
            className={`p-2 rounded-xl transition-all ${inputText.trim() ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Tools Sidebar (Menú de Herramientas) */}
      {isToolsOpen && (
        <div className="absolute inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-md animate-in fade-in" onClick={() => setIsToolsOpen(false)}></div>
          <div className="w-3/4 max-w-xs bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 relative z-10">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800">Herramientas IA</h3>
              <button onClick={() => setIsToolsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto">
              {tools.map((tool, idx) => (
                <button key={idx} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 text-left group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <span className="font-bold text-sm text-gray-700 group-hover:text-gray-900">{tool.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-auto p-4 border-t border-gray-100 bg-gray-50/30">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <h4 className="text-xs font-bold text-purple-800 mb-1 flex items-center gap-1"><Sparkles size={12} /> Consejo Pro</h4>
                <p className="text-[10px] text-purple-600 leading-relaxed">
                  Usa las herramientas para generar contenido base y luego personalízalo en el editor.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsistenteIA;
