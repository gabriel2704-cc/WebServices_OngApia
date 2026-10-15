import React from 'react';
import { Share2, Sparkles, Check } from 'lucide-react';
import type { Animal } from '../types/index.js';

interface PropriedadesCardPet {
  pet: Animal;
  onAdoptClick: (pet: Animal) => void;
  onShareClick: (pet: Animal) => void;
}

/**
 * Card padronizado de exibição de animal para adoção
 * Foto com proporção fixa quadrada (1:1), tipografia limpa e sem excesso de selos coloridos.
 */
export const PetCard: React.FC<PropriedadesCardPet> = ({ pet, onAdoptClick, onShareClick }) => {
  const estaAdotado = pet.status === 'adotado';

  const rotuloEspecie = pet.species === 'cachorro' ? 'Cachorro' : 'Gato';
  const mapaPorte: Record<string, string> = {
    pequeno: 'Porte pequeno',
    medio: 'Porte médio',
    grande: 'Porte grande',
  };
  const rotuloPorte = mapaPorte[pet.size] || pet.size;
  const rotuloSexo = pet.gender === 'macho' ? 'Macho' : 'Fêmea';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-gray-300 transition-all duration-200 flex flex-col h-full group">
      {/* Contêiner da Foto (Quadrado 1:1 Fixo) */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <img
          src={pet.photoUrl}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Selo minimalista caso já tenha sido adotado */}
        {estaAdotado && (
          <div className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-emerald-200" />
            Adotado
          </div>
        )}
      </div>

      {/* Conteúdo do Card - Limpo e Minimalista */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Nome do Pet e Espécie/Sexo */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">{pet.name}</h3>
            <span className="text-xs text-gray-500 font-medium">
              {rotuloEspecie} • {rotuloSexo}
            </span>
          </div>

          {/* Porte e Idade */}
          <p className="text-xs text-gray-500 mt-0.5">
            {rotuloPorte} • {pet.age}
          </p>

          {/* Informações veterinárias essenciais */}
          <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-700 font-medium">
            {pet.isCastrated && (
              <span className="inline-flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Castrado
              </span>
            )}
            {pet.isCastrated && pet.isVaccinated && <span>•</span>}
            {pet.isVaccinated && (
              <span className="inline-flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Vacinado
              </span>
            )}
            {pet.breed && pet.breed !== 'SRD' && pet.breed !== 'SRD (Sem Raça Definida)' && (
              <>
                <span>•</span>
                <span className="text-gray-500">{pet.breed}</span>
              </>
            )}
          </div>

          {/* Descrição e temperamento breve */}
          <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
            {pet.temperament || pet.description || 'Amoroso, sociável e à espera de um lar com carinho.'}
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="pt-2 flex items-center gap-2">
          {estaAdotado ? (
            <div className="w-full text-center py-2 rounded-xl bg-gray-50 text-gray-500 text-xs font-medium border border-gray-100">
              🐾 Final Feliz! Já tem um lar
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onAdoptClick(pet)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-apia-dark hover:bg-apia-darker transition-colors shadow-sm active:scale-[0.98]"
              >
                Quero adotar
              </button>

              <button
                type="button"
                onClick={() => onShareClick(pet)}
                title="Compartilhar"
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
