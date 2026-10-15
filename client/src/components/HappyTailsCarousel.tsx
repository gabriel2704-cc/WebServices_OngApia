import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import type { Animal } from '../types/index.js';

interface PropriedadesCarrosselFinaisFelizes {
  pets: Animal[];
  title?: string;
  subtitle?: string;
}

/**
 * Componente de Carrossel de Slides dos Animais Adotados (Finais Felizes)
 * Possui transição contínua automática, controle de pausa por hover e suporte a deslize no celular.
 */
export const HappyTailsCarousel: React.FC<PropriedadesCarrosselFinaisFelizes> = ({
  pets,
  title = 'Finais Felizes 🐾',
  subtitle = 'Graças ao apoio da nossa comunidade, esses patudos foram adotados e hoje vivem com segurança e dignidade.',
}) => {
  // Estado para controle do slide atual e itens visíveis simultaneamente
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(4);
  const [pausadoPeloMouse, setPausadoPeloMouse] = useState(false);
  const toqueInicialX = useRef<number | null>(null);

  // Calcula a quantidade de cards visíveis de acordo com a largura da tela (Mobile, Tablet, Desktop)
  useEffect(() => {
    const ajustarItensPorTela = () => {
      const largura = window.innerWidth;
      if (largura < 640) {
        setItensPorPagina(1); // Celular: 1 card
      } else if (largura < 768) {
        setItensPorPagina(2); // Tablet pequeno: 2 cards
      } else if (largura < 1024) {
        setItensPorPagina(3); // Tablet normal: 3 cards
      } else {
        setItensPorPagina(4); // Desktop/Computador: 4 cards
      }
    };

    ajustarItensPorTela();
    window.addEventListener('resize', ajustarItensPorTela);
    return () => window.removeEventListener('resize', ajustarItensPorTela);
  }, []);

  // Índice máximo alcançável sem deixar espaços vazios no final da esteira
  const indiceMaximo = Math.max(0, pets.length - itensPorPagina);

  // Garante que o índice atual permaneça dentro dos limites caso a tela seja redimensionada
  useEffect(() => {
    setIndiceAtual((anterior) => Math.min(anterior, indiceMaximo));
  }, [indiceMaximo]);

  // Passagem automática de slides a cada 4 segundos (autoplay com pausa ao passar o mouse)
  useEffect(() => {
    if (pets.length <= itensPorPagina || pausadoPeloMouse) return;

    const temporizador = setInterval(() => {
      setIndiceAtual((anterior) => (anterior >= indiceMaximo ? 0 : anterior + 1));
    }, 4000);

    return () => clearInterval(temporizador);
  }, [pets.length, itensPorPagina, pausadoPeloMouse, indiceMaximo]);

  const voltarSlide = () => {
    setIndiceAtual((anterior) => (anterior <= 0 ? indiceMaximo : anterior - 1));
  };

  const avancarSlide = () => {
    setIndiceAtual((anterior) => (anterior >= indiceMaximo ? 0 : anterior + 1));
  };

  // Suporte a gestos touch (deslizar o dedo na tela do smartphone)
  const iniciarToque = (evento: React.TouchEvent) => {
    toqueInicialX.current = evento.touches[0].clientX;
  };

  const finalizarToque = (evento: React.TouchEvent) => {
    if (toqueInicialX.current === null) return;
    const toqueFinalX = evento.changedTouches[0].clientX;
    const diferencaX = toqueInicialX.current - toqueFinalX;

    // Se o movimento for maior que 40 pixels, aciona a troca de slide
    if (Math.abs(diferencaX) > 40) {
      if (diferencaX > 0) {
        avancarSlide();
      } else {
        voltarSlide();
      }
    }
    toqueInicialX.current = null;
  };

  if (!pets || pets.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-200/80 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção e Botões de Navegação */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Histórias Reais
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">{title}</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Botões de avançar e voltar (visíveis quando há mais animais que a tela comporta) */}
          {pets.length > itensPorPagina && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={voltarSlide}
                aria-label="Slide anterior"
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={avancarSlide}
                aria-label="Próximo slide"
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors shadow-sm active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Área de Visualização do Carrossel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPausadoPeloMouse(true)}
          onMouseLeave={() => setPausadoPeloMouse(false)}
          onTouchStart={iniciarToque}
          onTouchEnd={finalizarToque}
        >
          {/* Esteira Deslizante com Animação CSS */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${indiceAtual * (100 / itensPorPagina)}%)`,
            }}
          >
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itensPorPagina}%` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 flex flex-col h-full group hover:border-gray-300 transition-colors">
                  {/* Foto Quadrada 1:1 Padronizada */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={pet.photoUrl}
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-emerald-950/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[11px] font-medium text-center flex items-center justify-center gap-1 shadow-sm">
                      <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                      Adotado(a)! Final Feliz
                    </div>
                  </div>

                  {/* Informações do Animal Adotado */}
                  <div className="p-3.5 text-center">
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">
                      {pet.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {pet.species === 'cachorro' ? 'Cachorro' : 'Gato'}{pet.breed ? ` • ${pet.breed}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Paginação (Pontos) */}
        {indiceMaximo > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {Array.from({ length: indiceMaximo + 1 }).map((_, indice) => (
              <button
                key={indice}
                type="button"
                onClick={() => setIndiceAtual(indice)}
                aria-label={`Ir para slide ${indice + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  indiceAtual === indice
                    ? 'w-6 h-2 bg-apia-dark'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
