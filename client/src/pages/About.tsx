import React from 'react';
import { Heart, GraduationCap, Users, Shield, Mail, Phone, Instagram, Facebook, MapPin, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-apia-dark text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-emerald-200">
              Quem Somos
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Sobre a APIA
            </h1>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              A <strong>APIA — Associação de Protetores Incondicionais dos Animais</strong> é uma entidade voluntária e sem fins lucrativos dedicada ao acolhimento, cuidado e proteção de animais abandonados em Lagoa Vermelha, Rio Grande do Sul.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80"
                alt="Animais resgatados"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. História e Missão - Grid Unificado */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base text-gray-900">Nossa Missão</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Resgatar animais abandonados ou em perigo imediato, prestar atendimento veterinário, promover a castração sistemática e encontrar lares responsáveis.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base text-gray-900">Nosso Trabalho</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Não possuímos canil municipal ou abrigo fixo. Funcionamos por meio de lares temporários voluntários, campanhas de vacinação e feirinhas de adoção.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base text-gray-900">Apoio Comunitário</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Cada vida salva depende do suporte dos cidadãos, dos pontos comerciais parceiros e de voluntários comprometidos com a causa animal.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Parceria de Extensão com o IFSUL */}
      <section className="py-12 border-t border-gray-200/80 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  IFSUL • Práticas em Sociedade III
                </span>
                <h2 className="text-2xl font-bold text-gray-900">
                  Projeto de Extensão Universitária
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Esta plataforma web integrada foi desenvolvida como atividade prática de extensão no curso de <strong>Bacharelado em Ciência da Computação</strong> do <strong>IFSUL (Campus Lagoa Vermelha)</strong>, unindo conhecimentos técnicos em prol do bem-estar animal.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Discentes:</strong> Daniel Cipriano da Silva e Gabriel de Oliveira</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Docente Orientadora:</strong> Prof. Carmem Vera Scorsatto</span>
                  </div>
                </div>
              </div>

              <div className="text-center shrink-0 p-6 bg-gray-50 rounded-2xl border border-gray-200/80">
                <GraduationCap className="w-12 h-12 text-apia-dark mx-auto mb-2" />
                <span className="text-sm font-bold text-gray-900 block">
                  Ciência da Computação
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  IFSUL • Lagoa Vermelha - RS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Canais de Contato Diretos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Canais de Contato
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Fale conosco para tirar dúvidas sobre adoção, apadrinhamento ou doações.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 flex flex-col items-center text-center">
            <Mail className="w-6 h-6 text-emerald-800 mb-2" />
            <span className="text-xs font-semibold text-gray-500">E-mail</span>
            <a
              href="mailto:contato@apia-lv.org.br"
              className="text-xs font-semibold text-gray-900 hover:text-apia-orange mt-1 break-all"
            >
              contato@apia-lv.org.br
            </a>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 flex flex-col items-center text-center">
            <Phone className="w-6 h-6 text-emerald-800 mb-2" />
            <span className="text-xs font-semibold text-gray-500">WhatsApp</span>
            <a
              href="https://wa.me/5554996546910"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-gray-900 hover:text-apia-orange mt-1"
            >
              (54) 99654-6910
            </a>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 flex flex-col items-center text-center">
            <Instagram className="w-6 h-6 text-emerald-800 mb-2" />
            <span className="text-xs font-semibold text-gray-500">Instagram</span>
            <a
              href="https://www.instagram.com/ongapiaoficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-gray-900 hover:text-apia-orange mt-1"
            >
              @ongapiaoficial
            </a>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 flex flex-col items-center text-center">
            <Facebook className="w-6 h-6 text-emerald-800 mb-2" />
            <span className="text-xs font-semibold text-gray-500">Facebook</span>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-gray-900 hover:text-apia-orange mt-1"
            >
              APIA Lagoa Vermelha
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
