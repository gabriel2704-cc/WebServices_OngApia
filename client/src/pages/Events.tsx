import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { api } from '../services/api.js';
import type { EventItem } from '../types/index.js';

export const Events: React.FC = () => {
  const [eventos, setEventos] = useState<EventItem[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarEventos() {
      try {
        setCarregando(true);
        const dados = await api.buscarEventos(false);
        setEventos(dados);
      } catch (erro) {
        console.error('Erro ao buscar eventos:', erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarEventos();
  }, []);

  const formatarData = (dataStr?: string) => {
    if (!dataStr) return 'Data a confirmar';
    try {
      const dataObj = new Date(dataStr);
      return dataObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dataStr;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-apia-dark text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-emerald-200">
            Agenda e Comunicados
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Notícias e Eventos da APIA
          </h1>
          <p className="text-gray-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            Acompanhe nossas feirinhas de adoção, bazares beneficentes, campanhas de castração e ações voluntárias em Lagoa Vermelha.
          </p>
        </div>
      </section>

      {/* 2. Lista de Eventos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow">
        {carregando ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : eventos.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 max-w-md mx-auto space-y-3">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="font-semibold text-base text-gray-900">Nenhum evento ativo no momento</h3>
            <p className="text-xs text-gray-500">
              Acompanhe novidades e comunicados no nosso Instagram oficial @ongapiaoficial.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 flex flex-col h-full group"
              >
                {/* Foto do Evento */}
                {evento.photoUrl ? (
                  <div className="w-full bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                    <img
                      src={evento.photoUrl}
                      alt={evento.title}
                      className="w-full max-h-[440px] object-contain"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="bg-apia-dark p-6 text-white flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-emerald-200" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
                         Comunicado Oficial
                      </span>
                      <h4 className="font-semibold text-sm text-white">APIA Lagoa Vermelha</h4>
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div>
                    {evento.date && (
                      <span className="inline-block text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg mb-2">
                        {formatarData(evento.date)}
                      </span>
                    )}
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 leading-snug">
                      {evento.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-line">
                      {evento.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1 font-medium text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-apia-orange" />
                      Lagoa Vermelha - RS
                    </span>
                    <a
                      href="https://wa.me/5554996546910"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-apia-orange hover:text-apia-orangeHover"
                    >
                      Dúvidas no WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
