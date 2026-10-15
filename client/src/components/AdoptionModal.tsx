import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Heart, Home, AlertCircle, MessageCircle } from 'lucide-react';
import type { Animal } from '../types/index.js';

/**
 * Propriedades do Modal de Adoção Responsável
 */
interface PropriedadesModalAdocao {
  pet: Animal | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AdoptionModal: React.FC<PropriedadesModalAdocao> = ({ pet, isOpen, onClose }) => {
  const [concordou, setConcordou] = useState(false);

  if (!isOpen || !pet) return null;

  const telefone = '5554996546910';
  const mensagem = encodeURIComponent(
    `Olá equipe da APIA! Tenho muito interesse em adotar o(a) pet *${pet.name}* (${pet.species === 'cachorro' ? 'Cachorro' : 'Gato'}, porte ${pet.size}, ${pet.age}). Li os requisitos de pátio fechado, maioridade e termo de responsabilidade no site e gostaria de dar início ao processo de adoção!`
  );
  const urlWhatsApp = `https://wa.me/${telefone}?text=${mensagem}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-card max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        {/* Modal Header */}
        <div className="bg-apia-dark text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-apia-orange fill-apia-orange" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Processo de Adoção: {pet.name}</h3>
              <p className="text-xs text-gray-300">
                {pet.species === 'cachorro' ? 'Cão' : 'Gato'} • Porte {pet.size} • {pet.age}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Pet Mini Summary */}
          <div className="flex items-center gap-4 p-3 bg-apia-light rounded-btn border border-apia-border">
            <img
              src={pet.photoUrl}
              alt={pet.name}
              className="w-16 h-16 rounded-lg object-cover shadow-sm"
            />
            <div>
              <p className="text-sm font-bold text-apia-dark">{pet.name}</p>
              <p className="text-xs text-apia-textMuted line-clamp-2">
                {pet.temperament || pet.description || 'Esperando por uma família carinhosa.'}
              </p>
              <div className="flex gap-2 mt-1">
                {pet.isCastrated && (
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">
                    Castrado(a)
                  </span>
                )}
                {pet.isVaccinated && (
                  <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold">
                    Vacinado(a)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mandatory Requirements Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-apia-dark flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Requisitos Obrigatórios para Adoção Responsável:
            </h4>

            <ul className="space-y-2.5 text-xs text-apia-text">
              <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-btn">
                <Home className="w-4 h-4 text-apia-dark shrink-0 mt-0.5" />
                <span>
                  <strong>Pátio Seguro e Fechado:</strong> Para a segurança do pet contra atropelamentos e fugas, priorizamos residências sem rotas de fuga.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-btn">
                <CheckCircle className="w-4 h-4 text-apia-dark shrink-0 mt-0.5" />
                <span>
                  <strong>Maioridade Legal:</strong> O responsável pela adoção deve ser maior de 18 anos e apresentar documento de identificação.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-btn">
                <CheckCircle className="w-4 h-4 text-apia-dark shrink-0 mt-0.5" />
                <span>
                  <strong>Termo de Responsabilidade:</strong> Assinatura de termo formal concordando com cuidados veterinários, vacinação e carinho.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-btn">
                <AlertCircle className="w-4 h-4 text-apia-dark shrink-0 mt-0.5" />
                <span>
                  <strong>Acompanhamento APIA:</strong> Nossa equipe fará contato inicial após a adoção para checar a adaptação do pet.
                </span>
              </li>
            </ul>
          </div>

          {/* Checkbox de Concordância */}
          <label className="flex items-start gap-3 p-3 bg-amber-50 rounded-btn border border-amber-200 cursor-pointer">
            <input
              type="checkbox"
              checked={concordou}
              onChange={(e) => setConcordou(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-apia-orange focus:ring-apia-orange"
            />
            <span className="text-xs text-amber-900 leading-snug">
              Compreendo os requisitos da ONG APIA e afirmo possuir condições estruturais e financeiras para acolher o pet com responsabilidade.
            </span>
          </label>
        </div>

        {/* Ações do Modal */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-btn text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Voltar
          </button>
          <a
            href={concordou ? urlWhatsApp : '#'}
            target={concordou ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!concordou) {
                e.preventDefault();
                alert('Por favor, marque a caixa concordando com os requisitos de adoção responsável para continuar.');
              }
            }}
            className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-btn text-xs font-bold text-white transition-all shadow-md ${
              concordou
                ? 'bg-apia-orange hover:bg-apia-orangeHover cursor-pointer'
                : 'bg-gray-400 opacity-60 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Continuar no WhatsApp da ONG
          </a>
        </div>
      </div>
    </div>
  );
};
