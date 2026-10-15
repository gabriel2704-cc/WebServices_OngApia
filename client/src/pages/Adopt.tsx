import React, { useEffect, useState } from 'react';
import { Search, RotateCcw, PawPrint, Sparkles, Filter } from 'lucide-react';
import { api } from '../services/api.js';
import type { Animal } from '../types/index.js';
import { PetCard } from '../components/PetCard.js';
import { AdoptionModal } from '../components/AdoptionModal.js';
import { SharePetModal } from '../components/SharePetModal.js';
import { HappyTailsCarousel } from '../components/HappyTailsCarousel.js';

export const Adopt: React.FC = () => {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [finaisFelizes, setFinaisFelizes] = useState<Animal[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Estados dos Filtros
  const [especie, setEspecie] = useState('todos');
  const [porte, setPorte] = useState('todos');
  const [sexo, setSexo] = useState('todos');
  const [termoBusca, setTermoBusca] = useState('');

  // Modais de Adoção e Compartilhamento
  const [petAdocao, setPetAdocao] = useState<Animal | null>(null);
  const [petCompartilhar, setPetCompartilhar] = useState<Animal | null>(null);

  const buscarAnimaisFiltro = async () => {
    try {
      setCarregando(true);
      const [disponiveis, adotados] = await Promise.all([
        api.buscarAnimais({
          species: especie,
          size: porte,
          gender: sexo,
          search: termoBusca,
          status: 'disponivel',
        }),
        api.buscarAnimais({ status: 'adotado' }),
      ]);
      setAnimais(disponiveis);
      setFinaisFelizes(adotados);
    } catch (erro) {
      console.error('Erro ao filtrar pets:', erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarAnimaisFiltro();
  }, []);

  const aoSubmeterBusca = (e: React.FormEvent) => {
    e.preventDefault();
    buscarAnimaisFiltro();
  };

  const aoLimparFiltros = () => {
    setEspecie('todos');
    setPorte('todos');
    setSexo('todos');
    setTermoBusca('');
    setTimeout(() => {
      buscarAnimaisFiltro();
    }, 50);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Banner - Clean & Simple */}
      <section className="bg-apia-dark text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-emerald-200">
              Adoção Responsável
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Quero Adotar
            </h1>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Encontre seu novo melhor amigo. Todos os nossos animais resgatados passam por avaliação, cuidados veterinários e estão ansiosos por uma família responsável em Lagoa Vermelha e região.
            </p>
          </div>

          <div className="hidden md:block shrink-0">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80"
              alt="Cão esperando adoção"
              className="w-40 h-40 rounded-2xl object-cover border border-white/20 shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 2. Barra de Filtros Minimalista */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-20 w-full">
        <form
          onSubmit={aoSubmeterBusca}
          className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
            {/* Espécie */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Espécie</label>
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                className="w-full bg-white rounded-xl px-3 py-2 text-xs font-medium text-gray-800 border border-gray-200 focus:border-apia-dark focus:ring-1 focus:ring-apia-dark outline-none"
              >
                <option value="todos">Todas</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
              </select>
            </div>

            {/* Porte */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Porte</label>
              <select
                value={porte}
                onChange={(e) => setPorte(e.target.value)}
                className="w-full bg-white rounded-xl px-3 py-2 text-xs font-medium text-gray-800 border border-gray-200 focus:border-apia-dark focus:ring-1 focus:ring-apia-dark outline-none"
              >
                <option value="todos">Todos</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>
            </div>

            {/* Sexo */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Sexo</label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className="w-full bg-white rounded-xl px-3 py-2 text-xs font-medium text-gray-800 border border-gray-200 focus:border-apia-dark focus:ring-1 focus:ring-apia-dark outline-none"
              >
                <option value="todos">Todos</option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>
            </div>

            {/* Ações */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-apia-orange hover:bg-apia-orangeHover transition-colors shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                Filtrar
              </button>

              <button
                type="button"
                onClick={aoLimparFiltros}
                title="Limpar filtros"
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* 3. Grid de Animais Disponíveis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Animais para Adoção
          </h2>
          <span className="text-xs text-gray-500 font-medium">
            {animais.length} {animais.length === 1 ? 'animal disponível' : 'animais disponíveis'}
          </span>
        </div>

        {carregando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : animais.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 max-w-md mx-auto space-y-3">
            <Filter className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="font-semibold text-base text-gray-900">Nenhum animal com estes filtros</h3>
            <p className="text-xs text-gray-500">
              Experimente alterar os critérios de busca ou redefinir os filtros.
            </p>
            <button
              onClick={aoLimparFiltros}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Ver todos os animais
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {animais.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onAdoptClick={(p) => setPetAdocao(p)}
                onShareClick={(p) => setPetCompartilhar(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. Carrossel de Finais Felizes */}
      <HappyTailsCarousel pets={finaisFelizes} />

      {/* Modais de Adoção e Compartilhamento */}
      <AdoptionModal
        pet={petAdocao}
        isOpen={!!petAdocao}
        onClose={() => setPetAdocao(null)}
      />
      <SharePetModal
        pet={petCompartilhar}
        isOpen={!!petCompartilhar}
        onClose={() => setPetCompartilhar(null)}
      />
    </div>
  );
};
