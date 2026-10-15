import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PawPrint,
  Calendar,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  Camera,
  Crop,
  Search,
  Filter,
  LogOut,
  AlertCircle,
  Check,
  Shield,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api.js';
import type { Animal, EventItem } from '../types/index.js';
import { ImageCropperModal } from '../components/ImageCropperModal.js';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<'animals' | 'events'>('animals');

  // Estados dos Animais (Pets)
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [filtroAnimais, setFiltroAnimais] = useState<'todos' | 'disponivel' | 'adotado'>('todos');
  const [buscaAnimais, setBuscaAnimais] = useState('');
  const [carregandoAnimais, setCarregandoAnimais] = useState(false);

  // Estados dos Eventos
  const [eventos, setEventos] = useState<EventItem[]>([]);
  const [carregandoEventos, setCarregandoEventos] = useState(false);

  // Banner de Notificações / Feedback
  const [notificacao, setNotificacao] = useState<{ mensagem: string; tipo: 'success' | 'error' } | null>(null);

  // Modal: Formulário do Pet
  const [modalPetAberto, setModalPetAberto] = useState(false);
  const [idPetEdicao, setIdPetEdicao] = useState<number | null>(null);
  const [formularioPet, setFormularioPet] = useState({
    name: '',
    species: 'cachorro' as 'cachorro' | 'gato',
    breed: 'SRD',
    size: 'medio' as 'pequeno' | 'medio' | 'grande',
    age: '1 ano',
    gender: 'femea' as 'macho' | 'femea',
    temperament: '',
    description: '',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: '',
    status: 'disponivel' as 'disponivel' | 'adotado',
  });

  // Estados para Corte e Upload de Imagem
  const [alvoCorte, setAlvoCorte] = useState<'animal' | 'event'>('animal');
  const [imagemOriginalUrl, setImagemOriginalUrl] = useState<string | null>(null);
  const [blobAnimalCortado, setBlobAnimalCortado] = useState<Blob | null>(null);
  const [blobEventoCortado, setBlobEventoCortado] = useState<Blob | null>(null);
  const [modalCorteAberto, setModalCorteAberto] = useState(false);
  const refInputArquivoAnimal = useRef<HTMLInputElement>(null);
  const refInputArquivoEvento = useRef<HTMLInputElement>(null);

  // Modal: Formulário do Evento
  const [modalEventoAberto, setModalEventoAberto] = useState(false);
  const [idEventoEdicao, setIdEventoEdicao] = useState<number | null>(null);
  const [formularioEvento, setFormularioEvento] = useState({
    title: '',
    description: '',
    date: '',
    photoUrl: '',
    isVisible: true,
  });

  // Verificação de autenticação do usuário
  useEffect(() => {
    if (!api.estaAutenticado()) {
      navigate('/login');
    }
  }, [navigate]);

  // Carregar dados dos animais
  const carregarAnimais = async () => {
    try {
      setCarregandoAnimais(true);
      const dados = await api.buscarAnimais({ status: filtroAnimais === 'todos' ? undefined : filtroAnimais });
      setAnimais(dados);
    } catch (erro: any) {
      console.error(erro);
    } finally {
      setCarregandoAnimais(false);
    }
  };

  // Carregar dados dos eventos
  const carregarEventos = async () => {
    try {
      setCarregandoEventos(true);
      const dados = await api.buscarEventos(true);
      setEventos(dados);
    } catch (erro: any) {
      console.error(erro);
    } finally {
      setCarregandoEventos(false);
    }
  };

  useEffect(() => {
    carregarAnimais();
  }, [filtroAnimais]);

  useEffect(() => {
    if (abaAtiva === 'events') {
      carregarEventos();
    }
  }, [abaAtiva]);

  const exibirNotificacao = (mensagem: string, tipo: 'success' | 'error' = 'success') => {
    setNotificacao({ mensagem, tipo });
    setTimeout(() => setNotificacao(null), 4000);
  };

  // Manipulador de seleção de arquivo para Pet ou Evento
  const aoSelecionarArquivo = (alvo: 'animal' | 'event', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const arquivo = e.target.files[0];
      const leitor = new FileReader();
      leitor.onload = () => {
        setImagemOriginalUrl(leitor.result as string);
        setAlvoCorte(alvo);
        setModalCorteAberto(true);
      };
      leitor.readAsDataURL(arquivo);
      e.target.value = ''; // Reseta input para permitir selecionar o mesmo arquivo novamente se desejar
    }
  };

  // Conclusão do corte da imagem
  const aoConcluirCorte = (blob: Blob, urlPrevia: string) => {
    if (alvoCorte === 'animal') {
      setBlobAnimalCortado(blob);
      setFormularioPet((anterior) => ({ ...anterior, photoUrl: urlPrevia }));
    } else {
      setBlobEventoCortado(blob);
      setFormularioEvento((anterior) => ({ ...anterior, photoUrl: urlPrevia }));
    }
  };

  // Abrir Modal de Pet (Criar ou Editar)
  const abrirModalPet = (pet?: Animal) => {
    if (pet) {
      setIdPetEdicao(pet.id);
      setFormularioPet({
        name: pet.name,
        species: pet.species,
        breed: pet.breed || 'SRD',
        size: pet.size,
        age: pet.age,
        gender: pet.gender,
        temperament: pet.temperament || '',
        description: pet.description || '',
        isCastrated: pet.isCastrated,
        isVaccinated: pet.isVaccinated,
        photoUrl: pet.photoUrl,
        status: pet.status,
      });
    } else {
      setIdPetEdicao(null);
      setFormularioPet({
        name: '',
        species: 'cachorro',
        breed: 'SRD',
        size: 'medio',
        age: '1 ano',
        gender: 'femea',
        temperament: '',
        description: '',
        isCastrated: true,
        isVaccinated: true,
        photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
        status: 'disponivel',
      });
    }
    setBlobAnimalCortado(null);
    setImagemOriginalUrl(null);
    setModalPetAberto(true);
  };

  // Submeter / Salvar Pet
  const salvarAnimal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dadosFormulario = new FormData();
      dadosFormulario.append('name', formularioPet.name);
      dadosFormulario.append('species', formularioPet.species);
      dadosFormulario.append('breed', formularioPet.breed);
      dadosFormulario.append('size', formularioPet.size);
      dadosFormulario.append('age', formularioPet.age);
      dadosFormulario.append('gender', formularioPet.gender);
      dadosFormulario.append('temperament', formularioPet.temperament);
      dadosFormulario.append('description', formularioPet.description);
      dadosFormulario.append('isCastrated', String(formularioPet.isCastrated));
      dadosFormulario.append('isVaccinated', String(formularioPet.isVaccinated));
      dadosFormulario.append('status', formularioPet.status);

      if (blobAnimalCortado) {
        dadosFormulario.append('photo', blobAnimalCortado, `${formularioPet.name.toLowerCase()}-cropped.jpg`);
      } else {
        dadosFormulario.append('photoUrl', formularioPet.photoUrl);
      }

      if (idPetEdicao) {
        await api.atualizarAnimal(idPetEdicao, dadosFormulario);
        exibirNotificacao(`Pet "${formularioPet.name}" atualizado com sucesso!`);
      } else {
        await api.cadastrarAnimal(dadosFormulario);
        exibirNotificacao(`Pet "${formularioPet.name}" cadastrado com sucesso!`);
      }

      setModalPetAberto(false);
      carregarAnimais();
    } catch (erro: any) {
      exibirNotificacao(erro.message || 'Erro ao salvar pet', 'error');
    }
  };

  // Ação Rápida: Alternar Status (Marcar como Adotado com Confetes)
  const alternarStatusAnimal = async (pet: Animal) => {
    try {
      if (pet.status === 'disponivel') {
        await api.marcarComoAdotado(pet.id);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
        exibirNotificacao(`🎉 Parabéns! ${pet.name} agora está nos Finais Felizes! 🐾`);
      } else {
        await api.marcarComoDisponivel(pet.id);
        exibirNotificacao(`${pet.name} foi retornado para a lista de animais disponíveis.`);
      }
      carregarAnimais();
    } catch (erro: any) {
      exibirNotificacao(erro.message || 'Erro ao alterar status', 'error');
    }
  };

  // Excluir Cadastro de Pet
  const excluirAnimal = async (pet: Animal) => {
    if (confirm(`Tem certeza que deseja excluir o cadastro de ${pet.name}?`)) {
      try {
        await api.excluirAnimal(pet.id);
        exibirNotificacao(`Pet ${pet.name} removido com sucesso.`);
        carregarAnimais();
      } catch (erro: any) {
        exibirNotificacao(erro.message || 'Erro ao remover pet', 'error');
      }
    }
  };

  // Manipuladores de Eventos
  const abrirModalEvento = (evento?: EventItem) => {
    setBlobEventoCortado(null);
    setImagemOriginalUrl(null);
    if (evento) {
      setIdEventoEdicao(evento.id);
      setFormularioEvento({
        title: evento.title,
        description: evento.description,
        date: evento.date ? new Date(evento.date).toISOString().split('T')[0] : '',
        photoUrl: evento.photoUrl || '',
        isVisible: evento.isVisible,
      });
    } else {
      setIdEventoEdicao(null);
      setFormularioEvento({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        photoUrl: '', // Opcional, inicia sem foto
        isVisible: true,
      });
    }
    setModalEventoAberto(true);
  };

  const salvarEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dadosFormulario = new FormData();
      dadosFormulario.append('title', formularioEvento.title);
      dadosFormulario.append('description', formularioEvento.description);
      if (formularioEvento.date) dadosFormulario.append('date', formularioEvento.date);
      dadosFormulario.append('isVisible', String(formularioEvento.isVisible));

      if (blobEventoCortado) {
        dadosFormulario.append('photo', blobEventoCortado, 'event-photo.jpg');
      } else {
        dadosFormulario.append('photoUrl', formularioEvento.photoUrl || '');
      }

      if (idEventoEdicao) {
        await api.atualizarEvento(idEventoEdicao, dadosFormulario);
        exibirNotificacao('Evento atualizado com sucesso!');
      } else {
        await api.cadastrarEvento(dadosFormulario);
        exibirNotificacao('Novo evento criado com sucesso!');
      }
      setModalEventoAberto(false);
      carregarEventos();
    } catch (erro: any) {
      exibirNotificacao(erro.message || 'Erro ao salvar evento', 'error');
    }
  };

  const alternarVisibilidadeEvento = async (evento: EventItem) => {
    try {
      await api.alternarVisibilidadeEvento(evento.id);
      exibirNotificacao(`Visibilidade de "${evento.title}" atualizada.`);
      carregarEventos();
    } catch (erro: any) {
      exibirNotificacao(erro.message || 'Erro ao alterar visibilidade', 'error');
    }
  };

  const excluirEvento = async (evento: EventItem) => {
    if (confirm(`Deseja realmente excluir o evento "${evento.title}"?`)) {
      try {
        await api.excluirEvento(evento.id);
        exibirNotificacao('Evento removido com sucesso.');
        carregarEventos();
      } catch (erro: any) {
        exibirNotificacao(erro.message || 'Erro ao excluir evento', 'error');
      }
    }
  };

  const animaisFiltrados = animais.filter((a) => {
    if (!buscaAnimais) return true;
    const q = buscaAnimais.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.breed?.toLowerCase().includes(q);
  });

  const totalDisponiveis = animais.filter((a) => a.status === 'disponivel').length;
  const totalAdotados = animais.filter((a) => a.status === 'adotado').length;

  return (
    <div className="flex-grow bg-apia-bg py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header / Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-card shadow-card border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-apia-dark text-white flex items-center justify-center shadow">
              <Shield className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-apia-dark">
                Painel Administrativo da APIA
              </h1>
              <p className="text-xs text-apia-textMuted">
                Gerencie animais para adoção, finais felizes e eventos (otimizado para celular).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                api.logout();
                navigate('/');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-btn text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors ml-auto sm:ml-0"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>

        {/* Banner de Feedback / Alerta */}
        {notificacao && (
          <div
            className={`p-3.5 rounded-btn text-xs font-semibold flex items-center gap-2 transition-all ${
              notificacao.tipo === 'success'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-red-100 text-red-900 border border-red-300'
            }`}
          >
            {notificacao.tipo === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            )}
            <span>{notificacao.mensagem}</span>
          </div>
        )}

        {/* Grade de Estatísticas Rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-card shadow-card border border-gray-100">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Total de Pets</span>
            <p className="text-2xl font-black text-apia-dark mt-1">{animais.length}</p>
          </div>
          <div className="bg-white p-4 rounded-card shadow-card border border-gray-100">
            <span className="text-[11px] font-bold text-amber-600 uppercase">Para Adoção</span>
            <p className="text-2xl font-black text-amber-700 mt-1">{totalDisponiveis}</p>
          </div>
          <div className="bg-white p-4 rounded-card shadow-card border border-gray-100">
            <span className="text-[11px] font-bold text-emerald-600 uppercase">Finais Felizes ❤️</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">{totalAdotados}</p>
          </div>
          <div className="bg-white p-4 rounded-card shadow-card border border-gray-100">
            <span className="text-[11px] font-bold text-blue-600 uppercase">Eventos Ativos</span>
            <p className="text-2xl font-black text-blue-700 mt-1">{eventos.length}</p>
          </div>
        </div>

        {/* Seletor de Abas */}
        <div className="flex border-b border-gray-200 gap-2">
          <button
            onClick={() => setAbaAtiva('animals')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              abaAtiva === 'animals'
                ? 'border-apia-orange text-apia-orange'
                : 'border-transparent text-gray-500 hover:text-apia-dark'
            }`}
          >
            <PawPrint className="w-4 h-4" />
            Gerenciar Animais ({animais.length})
          </button>
          <button
            onClick={() => setAbaAtiva('events')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              abaAtiva === 'events'
                ? 'border-apia-orange text-apia-orange'
                : 'border-transparent text-gray-500 hover:text-apia-dark'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Gerenciar Eventos e Notícias ({eventos.length})
          </button>
        </div>

        {/* ABA 1: GERENCIAR ANIMAIS */}
        {abaAtiva === 'animals' && (
          <div className="space-y-4">
            {/* Barra de Filtros e Cadastro */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex bg-white rounded-btn p-1 border border-gray-200 text-xs font-semibold">
                  <button
                    onClick={() => setFiltroAnimais('todos')}
                    className={`px-3 py-1.5 rounded ${
                      filtroAnimais === 'todos' ? 'bg-apia-dark text-white' : 'text-gray-600'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFiltroAnimais('disponivel')}
                    className={`px-3 py-1.5 rounded ${
                      filtroAnimais === 'disponivel' ? 'bg-apia-dark text-white' : 'text-gray-600'
                    }`}
                  >
                    Disponíveis
                  </button>
                  <button
                    onClick={() => setFiltroAnimais('adotado')}
                    className={`px-3 py-1.5 rounded ${
                      filtroAnimais === 'adotado' ? 'bg-emerald-700 text-white' : 'text-gray-600'
                    }`}
                  >
                    Finais Felizes ❤️
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={buscaAnimais}
                    onChange={(e) => setBuscaAnimais(e.target.value)}
                    className="pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-btn text-apia-text focus:border-apia-dark"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => abrirModalPet()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-btn text-xs font-bold text-white bg-apia-orange hover:bg-apia-orangeHover shadow transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Cadastrar Novo Pet
              </button>
            </div>

            {/* Lista e Cards de Animais */}
            <div className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden">
              {carregandoAnimais ? (
                <div className="p-8 text-center text-xs text-gray-500">Carregando lista de patudos...</div>
              ) : animaisFiltrados.length === 0 ? (
                <div className="p-12 text-center text-gray-500 space-y-2">
                  <PawPrint className="w-8 h-8 mx-auto text-gray-300" />
                  <p className="text-sm font-semibold">Nenhum animal cadastrado nesta visualização.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {animaisFiltrados.map((pet) => (
                    <div
                      key={pet.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={pet.photoUrl}
                          alt={pet.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 shadow-sm border border-gray-200"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-apia-dark">{pet.name}</h3>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                pet.status === 'adotado'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {pet.status === 'adotado' ? 'Adotado (Final Feliz)' : 'Disponível'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {pet.species === 'cachorro' ? 'Cão' : 'Gato'} • Porte {pet.size} • {pet.age} • {pet.gender === 'macho' ? 'Macho' : 'Fêmea'}
                          </p>
                          <div className="flex gap-2 text-[10px] text-gray-600">
                            {pet.isCastrated && <span>✓ Castrado</span>}
                            {pet.isVaccinated && <span>✓ Vacinado</span>}
                          </div>
                        </div>
                      </div>

                      {/* Botões de Ação para Celular e Desktop */}
                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        {/* Ação rápida: Alternar Adotado */}
                        <button
                          type="button"
                          onClick={() => alternarStatusAnimal(pet)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-bold transition-all shadow-sm ${
                            pet.status === 'disponivel'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                          title="Alternar entre disponível e final feliz"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {pet.status === 'disponivel' ? 'Marcar como Adotado' : 'Voltar para Disponível'}
                        </button>

                        <button
                          type="button"
                          onClick={() => abrirModalPet(pet)}
                          className="p-2 rounded-btn text-gray-600 hover:bg-gray-100 border border-gray-200"
                          title="Editar cadastro"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => excluirAnimal(pet)}
                          className="p-2 rounded-btn text-red-600 hover:bg-red-50 border border-red-200"
                          title="Excluir cadastro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABA 2: GERENCIAR EVENTOS */}
        {abaAtiva === 'events' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Adicione feirinhas, campanhas e avisos exibidos no mural público.
              </p>
              <button
                type="button"
                onClick={() => abrirModalEvento()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn text-xs font-bold text-white bg-apia-orange hover:bg-apia-orangeHover shadow"
              >
                <Plus className="w-4 h-4" />
                Novo Evento / Notícia
              </button>
            </div>

            <div className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {carregandoEventos ? (
                <div className="p-8 text-center text-xs text-gray-500">Carregando eventos...</div>
              ) : eventos.length === 0 ? (
                <div className="p-12 text-center text-gray-500 space-y-2">
                  <Calendar className="w-8 h-8 mx-auto text-gray-300" />
                  <p className="text-sm font-semibold">Nenhum evento registrado ainda.</p>
                </div>
              ) : (
                eventos.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-apia-dark">{ev.title}</h3>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            ev.isVisible
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {ev.isVisible ? 'Visível' : 'Oculto'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 max-w-xl">
                        {ev.description}
                      </p>
                      {ev.date && (
                        <span className="text-[11px] text-gray-400">
                          Data prevista: {new Date(ev.date).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alternarVisibilidadeEvento(ev)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-btn text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        {ev.isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {ev.isVisible ? 'Ocultar' : 'Exibir'}
                      </button>

                      <button
                        type="button"
                        onClick={() => abrirModalEvento(ev)}
                        className="p-2 rounded-btn text-gray-600 hover:bg-gray-100 border border-gray-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => excluirEvento(ev)}
                        className="p-2 rounded-btn text-red-600 hover:bg-red-50 border border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MODAL: PET (CADASTRAR / EDITAR) COM FERRAMENTA DE CORTE */}
        {modalPetAberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-card max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
              <div className="bg-apia-dark text-white p-5 flex items-center justify-between sticky top-0 z-10">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <PawPrint className="w-5 h-5 text-apia-orange" />
                  {idPetEdicao ? 'Editar Dados do Pet' : 'Cadastrar Novo Pet para Adoção'}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalPetAberto(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={salvarAnimal} className="p-6 space-y-4 text-xs">
                {/* Upload e Prévia da Foto do Pet (Obrigatório Quadrado 1:1) */}
                <div className="space-y-2 p-3 bg-gray-50 rounded-btn border border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-apia-dark block">
                      Foto do Pet <span className="text-apia-orange">*</span>{' '}
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded ml-1">
                        Formato Fixo: Quadrado (1:1)
                      </span>
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative aspect-square w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-gray-300 shadow-sm bg-gray-100 shrink-0">
                      <img
                        src={formularioPet.photoUrl}
                        alt="Prévia do Pet"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                        1:1
                      </div>
                    </div>
                    <div className="space-y-1.5 w-full">
                      <input
                        type="file"
                        ref={refInputArquivoAnimal}
                        accept="image/*"
                        onChange={(e) => aoSelecionarArquivo('animal', e)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => refInputArquivoAnimal.current?.click()}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-btn bg-white text-apia-dark font-bold hover:bg-gray-100 border border-gray-300 shadow-sm w-full sm:w-auto text-xs"
                      >
                        <Camera className="w-4 h-4 text-apia-orange" />
                        {formularioPet.photoUrl ? 'Alterar / Ajustar no Quadrado' : 'Escolher Foto do Aparelho'}
                      </button>
                      <p className="text-[10px] text-gray-500">
                        O tamanho é fixo e quadrado para que todos os animais fiquem perfeitamente padronizados no site.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nome e Espécie */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-apia-dark block mb-1">Nome do Pet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Luna, Thor"
                      value={formularioPet.name}
                      onChange={(e) => setFormularioPet({ ...formularioPet, name: e.target.value })}
                      className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-apia-dark block mb-1">Espécie *</label>
                    <select
                      value={formularioPet.species}
                      onChange={(e) => setFormularioPet({ ...formularioPet, species: e.target.value as any })}
                      className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                    >
                      <option value="cachorro">Cachorro</option>
                      <option value="gato">Gato</option>
                    </select>
                  </div>
                </div>

                {/* Porte, Idade e Sexo */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-apia-dark block mb-1">Porte *</label>
                    <select
                      value={formularioPet.size}
                      onChange={(e) => setFormularioPet({ ...formularioPet, size: e.target.value as any })}
                      className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                    >
                      <option value="pequeno">Pequeno</option>
                      <option value="medio">Médio</option>
                      <option value="grande">Grande</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-apia-dark block mb-1">Idade *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 2 anos, Filhote"
                      value={formularioPet.age}
                      onChange={(e) => setFormularioPet({ ...formularioPet, age: e.target.value })}
                      className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-apia-dark block mb-1">Sexo *</label>
                    <select
                      value={formularioPet.gender}
                      onChange={(e) => setFormularioPet({ ...formularioPet, gender: e.target.value as any })}
                      className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                    >
                      <option value="macho">Macho</option>
                      <option value="femea">Fêmea</option>
                    </select>
                  </div>
                </div>

                {/* Raça e Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-apia-dark block mb-1">Raça</label>
                    <input
                      type="text"
                      placeholder="SRD (Sem Raça Definida)"
                      value={formularioPet.breed}
                      onChange={(e) => setFormularioPet({ ...formularioPet, breed: e.target.value })}
                      className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-apia-dark block mb-1">Status na Plataforma</label>
                    <select
                      value={formularioPet.status}
                      onChange={(e) => setFormularioPet({ ...formularioPet, status: e.target.value as any })}
                      className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                    >
                      <option value="disponivel">Disponível para Adoção</option>
                      <option value="adotado">Adotado (Final Feliz ❤️)</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes de Saúde */}
                <div className="flex gap-4 p-3 bg-gray-50 rounded-btn">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formularioPet.isCastrated}
                      onChange={(e) => setFormularioPet({ ...formularioPet, isCastrated: e.target.checked })}
                      className="rounded text-apia-orange focus:ring-apia-orange"
                    />
                    <span className="font-bold text-apia-dark">Animal Castrado</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formularioPet.isVaccinated}
                      onChange={(e) => setFormularioPet({ ...formularioPet, isVaccinated: e.target.checked })}
                      className="rounded text-apia-orange focus:ring-apia-orange"
                    />
                    <span className="font-bold text-apia-dark">Animal Vacinado</span>
                  </label>
                </div>

                {/* Temperamento */}
                <div>
                  <label className="font-bold text-apia-dark block mb-1">Temperamento (Frase Curta)</label>
                  <input
                    type="text"
                    placeholder="Ex: Dócil, carinhosa e brincalhona"
                    value={formularioPet.temperament}
                    onChange={(e) => setFormularioPet({ ...formularioPet, temperament: e.target.value })}
                    className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                  />
                </div>

                {/* Descrição Longa */}
                <div>
                  <label className="font-bold text-apia-dark block mb-1">História / Descrição Completa</label>
                  <textarea
                    rows={3}
                    placeholder="Conte como foi o resgate, hábitos do pet ou detalhes para a família adotante..."
                    value={formularioPet.description}
                    onChange={(e) => setFormularioPet({ ...formularioPet, description: e.target.value })}
                    className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                  />
                </div>

                {/* Botões do Modal */}
                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalPetAberto(false)}
                    className="px-4 py-2.5 rounded-btn font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-btn font-bold text-white bg-apia-orange hover:bg-apia-orangeHover shadow"
                  >
                    Salvar Animal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EVENTO (CADASTRAR / EDITAR) */}
        {modalEventoAberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-card max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
              <div className="bg-apia-dark text-white p-5 flex items-center justify-between sticky top-0 z-10">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-apia-orange" />
                  {idEventoEdicao ? 'Editar Evento / Notícia' : 'Cadastrar Novo Evento'}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalEventoAberto(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={salvarEvento} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-apia-dark block mb-1">Título do Evento *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Feirinha de Adoção na Praça Central"
                    value={formularioEvento.title}
                    onChange={(e) => setFormularioEvento({ ...formularioEvento, title: e.target.value })}
                    className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                  />
                </div>

                <div>
                  <label className="font-bold text-apia-dark block mb-1">Data Prevista</label>
                  <input
                    type="date"
                    value={formularioEvento.date}
                    onChange={(e) => setFormularioEvento({ ...formularioEvento, date: e.target.value })}
                    className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                  />
                </div>

                {/* Foto do Evento (Opcional) com Upload e Cropper */}
                <div className="space-y-2 p-3 bg-gray-50 rounded-btn border border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-apia-dark block">
                      Foto do Evento / Notícia <span className="font-normal text-gray-500">(Opcional)</span>
                    </label>
                    {formularioEvento.photoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormularioEvento((prev) => ({ ...prev, photoUrl: '' }));
                          setBlobEventoCortado(null);
                        }}
                        className="text-[11px] font-semibold text-red-600 hover:underline"
                      >
                        Remover Foto
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {formularioEvento.photoUrl ? (
                      <div className="relative aspect-[16/9] w-full sm:w-48 rounded-lg overflow-hidden border border-gray-300 shadow-sm bg-gray-100 shrink-0">
                        <img
                          src={formularioEvento.photoUrl}
                          alt="Prévia do Evento"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                          Prévia
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[16/9] w-full sm:w-48 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-white shrink-0">
                        <Camera className="w-6 h-6 mb-1 text-gray-400" />
                        <span className="text-[10px]">Sem foto anexada</span>
                      </div>
                    )}

                    <div className="space-y-1.5 w-full">
                      <input
                        type="file"
                        ref={refInputArquivoEvento}
                        accept="image/*"
                        onChange={(e) => aoSelecionarArquivo('event', e)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => refInputArquivoEvento.current?.click()}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-btn bg-white text-apia-dark font-bold hover:bg-gray-100 border border-gray-300 shadow-sm w-full sm:w-auto text-xs"
                      >
                        <Camera className="w-4 h-4 text-apia-orange" />
                        {formularioEvento.photoUrl ? 'Substituir / Ajustar Foto' : 'Escolher Foto do Aparelho'}
                      </button>
                      <p className="text-[10px] text-gray-500">
                        Formato paisagem (16:9). Você pode arrastar, mover para os lados e ampliar à vontade.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-apia-dark block mb-1">Descrição / Informações do Evento *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detalhes de horário, local, como doar ou o que encontrar..."
                    value={formularioEvento.description}
                    onChange={(e) => setFormularioEvento({ ...formularioEvento, description: e.target.value })}
                    className="w-full bg-apia-light rounded-btn p-2.5 border-transparent focus:bg-white focus:border-apia-dark"
                  />
                </div>

                <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-btn cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formularioEvento.isVisible}
                    onChange={(e) => setFormularioEvento({ ...formularioEvento, isVisible: e.target.checked })}
                    className="rounded text-apia-orange focus:ring-apia-orange"
                  />
                  <span className="font-bold text-apia-dark">Publicar e exibir no mural público imediatamente</span>
                </label>

                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalEventoAberto(false)}
                    className="px-4 py-2.5 rounded-btn font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-btn font-bold text-white bg-apia-orange hover:bg-apia-orangeHover shadow"
                  >
                    Salvar Evento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DE CORTE DE IMAGEM COM ARRASTAR, ZOOM E FORMATOS */}
        <ImageCropperModal
          title={
            alvoCorte === 'animal'
              ? 'Ajustar Foto do Pet (Tamanho Fixo Obrigatório: Quadrado 1:1)'
              : 'Ajustar Foto do Evento / Notícia (Escolha o Formato do Card)'
          }
          imageSrc={imagemOriginalUrl || ''}
          initialAspectRatio={alvoCorte === 'animal' ? '1:1' : '16:9'}
          lockAspectRatio={alvoCorte === 'animal'}
          isOpen={modalCorteAberto}
          onClose={() => setModalCorteAberto(false)}
          onCropComplete={aoConcluirCorte}
        />
      </div>
    </div>
  );
};
