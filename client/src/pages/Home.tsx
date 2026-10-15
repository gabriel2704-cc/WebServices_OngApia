import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Home as HomeIcon, BookOpen, ArrowRight, Sparkles, PawPrint, GraduationCap } from 'lucide-react';
import { api } from '../services/api.js';
import type { Animal } from '../types/index.js';
import { PetCard } from '../components/PetCard.js';
import { AdoptionModal } from '../components/AdoptionModal.js';
import { SharePetModal } from '../components/SharePetModal.js';
import { HappyTailsCarousel } from '../components/HappyTailsCarousel.js';

export const Home: React.FC = () => {
  const [animaisDisponiveis, setAnimaisDisponiveis] = useState<Animal[]>([]);
  const [animaisAdotados, setAnimaisAdotados] = useState<Animal[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Estados dos Modais
  const [petSelecionadoAdocao, setPetSelecionadoAdocao] = useState<Animal | null>(null);
  const [petSelecionadoCompartilhar, setPetSelecionadoCompartilhar] = useState<Animal | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        const [disponiveis, adotados] = await Promise.all([
          api.buscarAnimais({ status: 'disponivel' }),
          api.buscarAnimais({ status: 'adotado' }),
        ]);
        setAnimaisDisponiveis(disponiveis.slice(0, 3)); // Exibe os 3 primeiros destaques
        setAnimaisAdotados(adotados);
      } catch (erro) {
        console.error('Erro ao carregar dados da página inicial:', erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Clean & Minimalist */}
      <section className="bg-apia-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text & CTAs */}
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-emerald-200">
                Lagoa Vermelha - RS
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Juntos por <br />
                mais vidas!
              </h1>
              <p className="text-base sm:text-lg text-gray-200 max-w-lg leading-relaxed font-normal">
                A APIA é uma associação voluntária dedicada ao acolhimento, proteção e encaminhamento para adoção de animais em situação de abandono em Lagoa Vermelha e região.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/adotar"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-apia-orange hover:bg-apia-orangeHover transition-colors shadow-sm active:scale-[0.98]"
                >
                  <PawPrint className="w-4 h-4" />
                  Quero Adotar
                </Link>
                <Link
                  to="/como-ajudar"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors active:scale-[0.98]"
                >
                  Como Ajudar
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
                  alt="Cachorro e Gato da APIA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Destaques / Pilares (Grid 4 colunas unificado e minimalista) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
              <PawPrint className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Resgate e proteção</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Acolhimento de animais em perigo imediato e situação de abandono.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Adoção responsável</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Encaminhamento criterioso com termo e acompanhamento.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
              <HomeIcon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Apoio comunitário</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Rede de lares temporários voluntários e doações essenciais.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Conscientização</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Incentivo contínuo à castração e respeito à causa animal.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Projeto de Extensão Universitária IFSUL Banner - Simples e Elegante */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 w-full">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-apia-dark text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                IFSUL • Ciência da Computação
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                Projeto de Extensão Universitária
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
                Esta plataforma foi concebida na disciplina de Práticas em Sociedade III, unindo tecnologia e solidariedade para apoiar o trabalho voluntário da ONG APIA e impulsionar a adoção responsável em Lagoa Vermelha.
              </p>
            </div>
          </div>

          <Link
            to="/sobre"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-apia-dark bg-apia-light hover:bg-apia-lightAlt transition-colors"
          >
            Conhecer o projeto <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 4. Destaques para Adoção */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Esperando por uma Família
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Conheça alguns dos nossos resgatados à procura de um lar amoroso.
            </p>
          </div>
          <Link
            to="/adotar"
            className="inline-flex items-center gap-1 text-xs font-semibold text-apia-orange hover:text-apia-orangeHover"
          >
            Ver todos os animais <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {carregando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {animaisDisponiveis.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onAdoptClick={(p) => setPetSelecionadoAdocao(p)}
                onShareClick={(p) => setPetSelecionadoCompartilhar(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. Carrossel de Finais Felizes (Animais Adotados) */}
      <HappyTailsCarousel pets={animaisAdotados} />

      {/* Modais de Adoção e Compartilhamento */}
      <AdoptionModal
        pet={petSelecionadoAdocao}
        isOpen={!!petSelecionadoAdocao}
        onClose={() => setPetSelecionadoAdocao(null)}
      />
      <SharePetModal
        pet={petSelecionadoCompartilhar}
        isOpen={!!petSelecionadoCompartilhar}
        onClose={() => setPetSelecionadoCompartilhar(null)}
      />
    </div>
  );
};
