import React, { useState } from 'react';
import { X, Copy, Check, Share2, Download, Heart } from 'lucide-react';
import type { Animal } from '../types/index.js';

/**
 * Propriedades do Modal de Compartilhamento de Pet
 */
interface PropriedadesModalCompartilhar {
  pet: Animal | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SharePetModal: React.FC<PropriedadesModalCompartilhar> = ({ pet, isOpen, onClose }) => {
  const [copiado, setCopiado] = useState(false);

  if (!isOpen || !pet) return null;

  const urlAtual = window.location.origin + `/adotar?pet=${pet.id}`;
  const textoCompartilhamento = `Olha que amor! O(a) pet ${pet.name} (${pet.species === 'cachorro' ? 'Cachorro' : 'Gato'}, ${pet.age}) está disponível para adoção responsável na ONG APIA de Lagoa Vermelha - RS. Conheça e adote: ${urlAtual}`;

  const aoCopiar = () => {
    navigator.clipboard.writeText(textoCompartilhamento);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const compartilharWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(textoCompartilhamento)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-card max-w-md w-full overflow-hidden shadow-2xl border border-gray-100">
        <div className="bg-apia-dark text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-apia-orange" />
            <h3 className="font-bold text-base">Divulgar {pet.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Mockup Card Share Preview */}
          <div className="relative rounded-xl overflow-hidden border-2 border-apia-dark shadow-md bg-white">
            <img
              src={pet.photoUrl}
              alt={pet.name}
              className="w-full h-56 object-cover"
            />
            {/* Header Badge */}
            <div className="absolute top-2 left-2 bg-apia-dark/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
              <Heart className="w-3 h-3 text-apia-orange fill-apia-orange" />
              APIA Lagoa Vermelha - RS
            </div>

            {/* Bottom Overlay Frame */}
            <div className="p-3 bg-apia-dark text-white">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">{pet.name}</span>
                <span className="text-xs bg-apia-orange px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Adote-me!
                </span>
              </div>
              <p className="text-xs text-gray-200 mt-0.5">
                {pet.species === 'cachorro' ? 'Cão' : 'Gato'} • Porte {pet.size} • {pet.age} • {pet.temperament || 'Dócil e amoroso'}
              </p>
              <p className="text-[10px] text-emerald-300 font-semibold mt-1">
                WhatsApp: (54) 99654-6910
              </p>
            </div>
          </div>

          {/* Seção de Cópia Direta */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600">Texto para envio rápido:</label>
            <div className="p-2.5 bg-gray-50 border rounded-btn text-xs text-gray-700 max-h-20 overflow-y-auto">
              {textoCompartilhamento}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={aoCopiar}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-btn text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
            >
              {copiado ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Texto
                </>
              )}
            </button>

            <button
              onClick={compartilharWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-btn text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
