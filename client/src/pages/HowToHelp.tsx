import React, { useState } from 'react';
import {
  Heart,
  Handshake,
  PawPrint,
  Share2,
  Gift,
  Star,
  Copy,
  Check,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export const HowToHelp: React.FC = () => {
  // Estado de cópia do PIX
  const [pixCopiado, setPixCopiado] = useState(false);
  const chavePix = 'contato@apia-lv.org.br';

  // Estado do formulário de voluntariado
  const [dadosFormulario, setDadosFormulario] = useState({
    name: '',
    phone: '',
    interests: {
      rescue: false,
      care: false,
      events: false,
      social: false,
      general: false,
      other: false,
    },
    availabilityDays: 'Finais de semana',
    availabilityShifts: 'Manhã',
    notes: '',
  });

  const alternarInteresse = (chave: keyof typeof dadosFormulario.interests) => {
    setDadosFormulario((anterior) => ({
      ...anterior,
      interests: {
        ...anterior.interests,
        [chave]: !anterior.interests[chave],
      },
    }));
  };

  const copiarChavePix = () => {
    navigator.clipboard.writeText(chavePix);
    setPixCopiado(true);
    setTimeout(() => setPixCopiado(false), 2500);
  };

  const aoSubmeterVoluntariado = (e: React.FormEvent) => {
    e.preventDefault();

    const areasSelecionadas: string[] = [];
    if (dadosFormulario.interests.rescue) areasSelecionadas.push('Resgate e Transporte');
    if (dadosFormulario.interests.care) areasSelecionadas.push('Cuidados e Alimentação');
    if (dadosFormulario.interests.events) areasSelecionadas.push('Eventos e Feiras');
    if (dadosFormulario.interests.social) areasSelecionadas.push('Redes Sociais e Divulgação');
    if (dadosFormulario.interests.general) areasSelecionadas.push('Apoio Geral e Manutenção');
    if (dadosFormulario.interests.other) areasSelecionadas.push('Outras Habilidades');

    if (areasSelecionadas.length === 0) {
      alert('Por favor, selecione ao menos uma área de interesse para atuar como voluntário(a).');
      return;
    }

    const mensagem = `🐾 *CADASTRO DE VOLUNTARIADO - APIA*\n\n` +
      `*Nome:* ${dadosFormulario.name}\n` +
      `*WhatsApp:* ${dadosFormulario.phone}\n` +
      `*Áreas de interesse:* ${areasSelecionadas.join(', ')}\n` +
      `*Disponibilidade de dias:* ${dadosFormulario.availabilityDays}\n` +
      `*Disponibilidade de turnos:* ${dadosFormulario.availabilityShifts}\n` +
      (dadosFormulario.notes ? `*Observações:* ${dadosFormulario.notes}\n\n` : '\n') +
      `Olá equipe da APIA! Gostaria muito de me voluntariar e ajudar na causa animal em Lagoa Vermelha!`;

    const url = `https://wa.me/5554996546910?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Clean & Minimalist */}
      <section className="bg-apia-dark text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-emerald-200">
              Solidariedade
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Como Ajudar a APIA
            </h1>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Existem várias formas de contribuir para que possamos continuar acolhendo, tratando e dando uma vida digna aos animais em Lagoa Vermelha e região.
            </p>
          </div>

          <div className="hidden md:block shrink-0">
            <img
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80"
              alt="Cão e gato juntos"
              className="w-40 h-40 rounded-2xl object-cover border border-white/20 shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 2. Seção PIX Institucional - Limpa e Clara */}
      <section id="pix-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="bg-apia-dark text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              Doação Instantânea
            </span>
            <h3 className="text-2xl font-bold">Chave PIX Oficial da APIA</h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
              Toda contribuição é revertida diretamente para o tratamento clínico, vacinação e alimentação dos animais resgatados.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <div className="px-4 py-2 bg-white/10 rounded-xl font-mono text-xs border border-white/15 select-all">
                {chavePix}
              </div>
              <button
                type="button"
                onClick={copiarChavePix}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-apia-orange hover:bg-apia-orangeHover text-white transition-colors"
              >
                {pixCopiado ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    Chave Copiada!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar Chave
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl shrink-0 text-center">
            <div className="w-28 h-28 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-2 border border-gray-100">
              <PawPrint className="w-8 h-8 text-apia-dark mb-1" />
              <span className="text-[10px] text-gray-500 font-medium">PIX APIA</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5">Lagoa Vermelha - RS</p>
          </div>
        </div>
      </section>

      {/* 3. Pontos Físicos de Coleta */}
      <section id="pontos-coleta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full border-t border-gray-200/80">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Pontos de Coleta de Ração e Materiais
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Você pode entregar ração, remédios e cobertores diretamente nestes estabelecimentos parceiros em Lagoa Vermelha:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Ponto 1: Miagro Agrícola */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 space-y-2">
            <h3 className="font-semibold text-base text-gray-900">Miagro Agrícola</h3>
            <p className="text-xs text-gray-600">Rua Lauro Júlio Garcez, 327 • Alto Pedregal</p>
            <p className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg">
              Recebe: Ração para cães e gatos, vermífugos e medicamentos.
            </p>
          </div>

          {/* Ponto 2: Mercado de Bone */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 space-y-2">
            <h3 className="font-semibold text-base text-gray-900">Mercado de Bone</h3>
            <p className="text-xs text-gray-600">Avenida Afonso Pena, 223 • Centro</p>
            <p className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg">
              Recebe: Ração e produtos de limpeza e desinfecção.
            </p>
          </div>

          {/* Ponto 3: Agropecuária Amor a Terra */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 space-y-2">
            <h3 className="font-semibold text-base text-gray-900">Agropecuária Amor a Terra</h3>
            <p className="text-xs text-gray-600">Avenida Benjamin Constant, 2291 • Centro</p>
            <p className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg">
              Recebe: Ração premium/filhote, comedouros, caminhas e cobertores.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Formas de Colaborar - Antes do Cadastro de Voluntários */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full border-t border-gray-200/80">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Formas de Colaborar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* 1. Doar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-gray-900">Doação Financeira</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Contribua para custear atendimentos veterinários, castrações, remédios e ração para os resgatados.
              </p>
            </div>
            <a
              href="#pix-section"
              className="mt-4 text-xs font-semibold text-apia-orange hover:text-apia-orangeHover inline-flex items-center gap-1"
            >
              Ver chave PIX &rarr;
            </a>
          </div>

          {/* 2. Ser voluntário */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Handshake className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-gray-900">Ser Voluntário</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Doe parte do seu tempo e carinho em ações de resgate, feiras de adoção, divulgação ou transporte.
              </p>
            </div>
            <a
              href="#voluntario-section"
              className="mt-4 text-xs font-semibold text-apia-orange hover:text-apia-orangeHover inline-flex items-center gap-1"
            >
              Preencher cadastro &rarr;
            </a>
          </div>

          {/* 3. Doar ração e materiais */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <PawPrint className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-gray-900">Doar Ração e Suprimentos</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Sacos de ração para cães e gatos, caminhas, cobertores e produtos de limpeza são sempre bem-vindos.
              </p>
            </div>
            <a
              href="#pontos-coleta-section"
              className="mt-4 text-xs font-semibold text-apia-orange hover:text-apia-orangeHover inline-flex items-center gap-1"
            >
              Pontos de coleta &rarr;
            </a>
          </div>

          {/* 4. Compartilhar a causa */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-gray-900">Divulgar nas Redes</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Compartilhe as fotos dos nossos animais e ajude a encontrar novos lares responsáveis em Lagoa Vermelha.
              </p>
            </div>
            <a
              href="https://www.instagram.com/ongapiaoficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-semibold text-apia-orange hover:text-apia-orangeHover inline-flex items-center gap-1"
            >
              Instagram oficial &rarr;
            </a>
          </div>

          {/* 5. Apadrinhar um animal */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-gray-900">Apadrinhamento</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Ajude a manter os custos de um animal específico em lar temporário até a adoção definitiva.
              </p>
            </div>
            <a
              href="https://wa.me/5554996546910?text=Ol%C3%A1%20APIA!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Apadrinhamento%20de%20um%20pet."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-semibold text-apia-orange hover:text-apia-orangeHover inline-flex items-center gap-1"
            >
              Apadrinhar no WhatsApp &rarr;
            </a>
          </div>

          {/* 6. Outras formas */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-gray-900">Parcerias e Eventos</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Sua empresa ou comércio pode ser um ponto de arrecadação ou apoiar nossos eventos e bazares beneficentes.
              </p>
            </div>
            <a
              href="https://wa.me/5554996546910"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-semibold text-apia-orange hover:text-apia-orangeHover inline-flex items-center gap-1"
            >
              Falar no WhatsApp &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 5. Formulário de Voluntariado */}
      <section id="voluntario-section" className="py-12 border-t border-gray-200/80 bg-gray-50/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-emerald-800">
              Faça a diferença
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              Cadastro de Voluntários
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Preencha os dados abaixo para ser encaminhado ao WhatsApp da APIA.
            </p>
          </div>

          <form
            onSubmit={aoSubmeterVoluntariado}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 space-y-5"
          >
            {/* Nome e Telefone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={dadosFormulario.name}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, name: e.target.value })}
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs text-gray-800 border border-gray-200 focus:border-apia-dark focus:ring-1 focus:ring-apia-dark outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">WhatsApp / Telefone *</label>
                <input
                  type="tel"
                  required
                  placeholder="(54) 99999-9999"
                  value={dadosFormulario.phone}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, phone: e.target.value })}
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs text-gray-800 border border-gray-200 focus:border-apia-dark focus:ring-1 focus:ring-apia-dark outline-none"
                />
              </div>
            </div>

            {/* Áreas de Interesse (Checkboxes) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">
                Áreas de interesse para atuar *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={dadosFormulario.interests.rescue}
                    onChange={() => alternarInteresse('rescue')}
                    className="rounded text-apia-orange focus:ring-apia-orange"
                  />
                  <span>Resgate e Transporte</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={dadosFormulario.interests.care}
                    onChange={() => alternarInteresse('care')}
                    className="rounded text-apia-orange focus:ring-apia-orange"
                  />
                  <span>Cuidados e Alimentação</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={dadosFormulario.interests.events}
                    onChange={() => alternarInteresse('events')}
                    className="rounded text-apia-orange focus:ring-apia-orange"
                  />
                  <span>Feiras e Bazares</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={dadosFormulario.interests.social}
                    onChange={() => alternarInteresse('social')}
                    className="rounded text-apia-orange focus:ring-apia-orange"
                  />
                  <span>Redes Sociais e Divulgação</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={dadosFormulario.interests.general}
                    onChange={() => alternarInteresse('general')}
                    className="rounded text-apia-orange focus:ring-apia-orange"
                  />
                  <span>Apoio Geral e Manutenção</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={dadosFormulario.interests.other}
                    onChange={() => alternarInteresse('other')}
                    className="rounded text-apia-orange focus:ring-apia-orange"
                  />
                  <span>Outras Habilidades</span>
                </label>
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Disponibilidade (Dias)</label>
                <select
                  value={dadosFormulario.availabilityDays}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, availabilityDays: e.target.value })}
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs text-gray-800 border border-gray-200 focus:border-apia-dark focus:ring-1 focus:ring-apia-dark outline-none"
                >
                  <option value="Finais de semana">Apenas finais de semana</option>
                  <option value="Dias de semana">Durante a semana (segunda a sexta)</option>
                  <option value="Qualquer dia">Qualquer dia da semana</option>
                  <option value="Escala flexível">Escala flexível / sob demanda</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Turno Preferencial</label>
                <select
                  value={dadosFormulario.availabilityShifts}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, availabilityShifts: e.target.value })}
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs text-gray-800 border border-gray-200 focus:border-apia-dark focus:ring-1 focus:ring-apia-dark outline-none"
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                  <option value="Qualquer turno">Qualquer turno</option>
                </select>
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Observações ou Experiências Prévias</label>
              <textarea
                rows={3}
                placeholder="Conte-nos se já teve animais, se possui veículo próprio ou outras informações..."
                value={dadosFormulario.notes}
                onChange={(e) => setDadosFormulario({ ...dadosFormulario, notes: e.target.value })}
                className="w-full bg-white rounded-xl p-3 text-xs text-gray-800 border border-gray-200 focus:border-apia-dark focus:ring-1 focus:ring-apia-dark outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-semibold text-white bg-apia-orange hover:bg-apia-orangeHover transition-colors shadow-sm active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar Cadastro pelo WhatsApp
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
