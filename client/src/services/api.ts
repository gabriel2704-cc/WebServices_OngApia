import type { Animal, EventItem, User, EventoItem, Usuario } from '../types/index.js';

const API_BASE_URL = '/api';

/**
 * Retorna os headers de autorização com o token JWT se o usuário estiver logado
 */
function obterCabecalhoAutenticacao(): Record<string, string> {
  const token = localStorage.getItem('ong_apia_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Dados iniciais de fallback (caso o servidor backend esteja desconectado temporariamente)
const ANIMAIS_INICIAIS: Animal[] = [
  {
    id: 1,
    name: 'Luna',
    species: 'cachorro',
    breed: 'SRD Caramelo',
    size: 'medio',
    age: '2 anos',
    gender: 'femea',
    temperament: 'Dócil, carinhosa e brincalhona',
    description: 'Luna foi resgatada ainda jovem e hoje é cheia de energia e afeto. Adora passeios e se dá bem com outros cães.',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    status: 'disponivel',
  },
  {
    id: 2,
    name: 'Thor',
    species: 'cachorro',
    breed: 'Golden / SRD',
    size: 'grande',
    age: '1 ano',
    gender: 'macho',
    temperament: 'Brincalhão e muito companheiro',
    description: 'Thor é um gigante gentil. Muito alegre, precisa de espaço para correr e brincar bastante.',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    status: 'disponivel',
  },
  {
    id: 3,
    name: 'Mel',
    species: 'gato',
    breed: 'SRD Rajada',
    size: 'medio',
    age: '1 ano',
    gender: 'femea',
    temperament: 'Carinhosa e tranquila',
    description: 'Mel é uma gatinha calma que adora um colo quentinho e ronronar enquanto recebe carinho.',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    status: 'disponivel',
  },
  {
    id: 4,
    name: 'Nina',
    species: 'gato',
    breed: 'SRD Tricolor',
    size: 'pequeno',
    age: '3 anos',
    gender: 'femea',
    temperament: 'Dócil e independente',
    description: 'Nina é elegante, silenciosa e observadora. Perfeita para quem procura uma companhia suave.',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
    status: 'disponivel',
  },
  {
    id: 5,
    name: 'Bento',
    species: 'cachorro',
    breed: 'SRD Porte Médio',
    size: 'medio',
    age: '4 anos',
    gender: 'macho',
    temperament: 'Calmo e afetuoso',
    description: 'Bento é muito equilibrado, adora receber afeto nas orelhas e fica feliz só de estar perto de humanos.',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    status: 'disponivel',
  },
  {
    id: 6,
    name: 'Lara',
    species: 'gato',
    breed: 'SRD Cinza',
    size: 'medio',
    age: '2 anos',
    gender: 'femea',
    temperament: 'Brincalhona e curiosa',
    description: 'Lara adora caçar brinquedos e subir em arranhadores. Curiosa com tudo e super saudável.',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
    status: 'disponivel',
  },
  {
    id: 7,
    name: 'Pipoca',
    species: 'cachorro',
    breed: 'SRD Pequeno',
    size: 'pequeno',
    age: '6 meses',
    gender: 'femea',
    temperament: 'Alegre e dengosa',
    description: '',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
    status: 'adotado',
  },
  {
    id: 8,
    name: 'Simba',
    species: 'gato',
    breed: 'Laranja SRD',
    size: 'medio',
    age: '2 anos',
    gender: 'macho',
    temperament: 'Carinhoso e brincalhão',
    description: '',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
    status: 'adotado',
  },
  {
    id: 9,
    name: 'Bob',
    species: 'cachorro',
    breed: 'Labrador SRD',
    size: 'grande',
    age: '2 anos',
    gender: 'macho',
    temperament: 'Dócil e brincalhão',
    description: '',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    status: 'adotado',
  },
  {
    id: 10,
    name: 'Belinha',
    species: 'cachorro',
    breed: 'Poodle SRD',
    size: 'pequeno',
    age: '3 anos',
    gender: 'femea',
    temperament: 'Meiga e carinhosa',
    description: '',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    status: 'adotado',
  },
  {
    id: 11,
    name: 'Chico',
    species: 'gato',
    breed: 'Siamês SRD',
    size: 'pequeno',
    age: '1 ano',
    gender: 'macho',
    temperament: 'Curioso e dengoso',
    description: '',
    isCastrated: true,
    isVaccinated: true,
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    status: 'adotado',
  },
];

const EVENTOS_INICIAIS: EventItem[] = [
  {
    id: 1,
    title: 'Feirinha de Adoção de Lagoa Vermelha',
    description: 'Venha conhecer nossos patudos resgatados na Praça Frei Mateus Dolzan! Teremos cães e gatos castrados e vacinados aguardando um lar.',
    date: new Date(Date.now() + 7 * 86400000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80',
    isVisible: true,
  },
  {
    id: 2,
    title: 'Bazar Solidário APIA',
    description: 'Roupas, calçados e utensílios em ótimo estado para arrecadar fundos para castrações emergenciais e alimentação dos resgatados.',
    date: new Date(Date.now() + 14 * 86400000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    isVisible: true,
  },
];

/**
 * Cliente de Integração com a API HTTP (com suporte a métodos em Português e Inglês)
 */
export const api = {
  // ==========================================
  // MÉTODOS DE ANIMAIS
  // ==========================================
  async getAnimals(filters?: {
    species?: string;
    size?: string;
    age?: string;
    gender?: string;
    status?: string;
    search?: string;
  }): Promise<Animal[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([k, v]) => {
          if (v && v !== 'todos') params.append(k, v);
        });
      }

      const res = await fetch(`${API_BASE_URL}/animals?${params.toString()}`);
      if (!res.ok) throw new Error('Falha ao buscar animais do servidor');
      const data = await res.json();
      return data.data;
    } catch {
      // Retorna fallback local filtrado caso o servidor esteja desconectado
      let resultado = [...ANIMAIS_INICIAIS];
      if (filters?.species && filters.species !== 'todos') {
        resultado = resultado.filter((p) => p.species === filters.species);
      }
      if (filters?.size && filters.size !== 'todos') {
        resultado = resultado.filter((p) => p.size === filters.size);
      }
      if (filters?.gender && filters.gender !== 'todos') {
        resultado = resultado.filter((p) => p.gender === filters.gender);
      }
      if (filters?.status && filters.status !== 'todos') {
        resultado = resultado.filter((p) => p.status === filters.status);
      }
      if (filters?.search) {
        const termo = filters.search.toLowerCase();
        resultado = resultado.filter(
          (p) =>
            p.name.toLowerCase().includes(termo) ||
            p.breed?.toLowerCase().includes(termo) ||
            p.temperament?.toLowerCase().includes(termo)
        );
      }
      return resultado;
    }
  },

  async buscarAnimais(filtros?: any): Promise<Animal[]> {
    return this.getAnimals(filtros);
  },

  async getAnimal(id: number): Promise<Animal> {
    try {
      const res = await fetch(`${API_BASE_URL}/animals/${id}`);
      if (!res.ok) throw new Error('Animal não encontrado');
      const data = await res.json();
      return data.data;
    } catch {
      const encontrado = ANIMAIS_INICIAIS.find((p) => p.id === id);
      if (!encontrado) throw new Error('Animal não encontrado');
      return encontrado;
    }
  },

  async buscarAnimal(id: number): Promise<Animal> {
    return this.getAnimal(id);
  },

  async createAnimal(formData: FormData): Promise<Animal> {
    const res = await fetch(`${API_BASE_URL}/animals`, {
      method: 'POST',
      headers: { ...obterCabecalhoAutenticacao() },
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao cadastrar animal');
    }
    const data = await res.json();
    return data.data;
  },

  async cadastrarAnimal(formData: FormData): Promise<Animal> {
    return this.createAnimal(formData);
  },

  async updateAnimal(id: number, formData: FormData): Promise<Animal> {
    const res = await fetch(`${API_BASE_URL}/animals/${id}`, {
      method: 'PUT',
      headers: { ...obterCabecalhoAutenticacao() },
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao atualizar animal');
    }
    const data = await res.json();
    return data.data;
  },

  async atualizarAnimal(id: number, formData: FormData): Promise<Animal> {
    return this.updateAnimal(id, formData);
  },

  async markAsAdopted(id: number): Promise<Animal> {
    const res = await fetch(`${API_BASE_URL}/animals/${id}/adopt`, {
      method: 'PATCH',
      headers: { ...obterCabecalhoAutenticacao(), 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao marcar animal como adotado');
    }
    const data = await res.json();
    return data.data;
  },

  async marcarComoAdotado(id: number): Promise<Animal> {
    return this.markAsAdopted(id);
  },

  async markAsAvailable(id: number): Promise<Animal> {
    const res = await fetch(`${API_BASE_URL}/animals/${id}/available`, {
      method: 'PATCH',
      headers: { ...obterCabecalhoAutenticacao(), 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao marcar animal como disponível');
    }
    const data = await res.json();
    return data.data;
  },

  async marcarComoDisponivel(id: number): Promise<Animal> {
    return this.markAsAvailable(id);
  },

  async deleteAnimal(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/animals/${id}`, {
      method: 'DELETE',
      headers: { ...obterCabecalhoAutenticacao() },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao excluir animal');
    }
  },

  async excluirAnimal(id: number): Promise<void> {
    return this.deleteAnimal(id);
  },

  // ==========================================
  // MÉTODOS DE EVENTOS E NOTÍCIAS
  // ==========================================
  async getEvents(all = false): Promise<EventItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/events${all ? '?all=true' : ''}`);
      if (!res.ok) throw new Error('Falha ao buscar eventos');
      const data = await res.json();
      return data.data;
    } catch {
      return all ? EVENTOS_INICIAIS : EVENTOS_INICIAIS.filter((e) => e.isVisible);
    }
  },

  async buscarEventos(todos = false): Promise<EventoItem[]> {
    return this.getEvents(todos);
  },

  async createEvent(formData: FormData): Promise<EventItem> {
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: { ...obterCabecalhoAutenticacao() },
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao criar evento');
    }
    const data = await res.json();
    return data.data;
  },

  async cadastrarEvento(formData: FormData): Promise<EventoItem> {
    return this.createEvent(formData);
  },

  async updateEvent(id: number, formData: FormData): Promise<EventItem> {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: { ...obterCabecalhoAutenticacao() },
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao atualizar evento');
    }
    const data = await res.json();
    return data.data;
  },

  async atualizarEvento(id: number, formData: FormData): Promise<EventoItem> {
    return this.updateEvent(id, formData);
  },

  async toggleEventVisibility(id: number): Promise<EventItem> {
    const res = await fetch(`${API_BASE_URL}/events/${id}/toggle`, {
      method: 'PATCH',
      headers: { ...obterCabecalhoAutenticacao(), 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao alterar visibilidade');
    }
    const data = await res.json();
    return data.data;
  },

  async alternarVisibilidadeEvento(id: number): Promise<EventoItem> {
    return this.toggleEventVisibility(id);
  },

  async deleteEvent(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: { ...obterCabecalhoAutenticacao() },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao excluir evento');
    }
  },

  async excluirEvento(id: number): Promise<void> {
    return this.deleteEvent(id);
  },

  // ==========================================
  // MÉTODOS DE AUTENTICAÇÃO
  // ==========================================
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'E-mail ou senha incorretos.');
    }

    const json = await res.json();
    const { user, token } = json.data;
    localStorage.setItem('ong_apia_token', token);
    localStorage.setItem('ong_apia_user', JSON.stringify(user));
    return { user, token };
  },

  async fazerLogin(email: string, senha: string): Promise<{ user: User; token: string }> {
    return this.login(email, senha);
  },

  logout(): void {
    localStorage.removeItem('ong_apia_token');
    localStorage.removeItem('ong_apia_user');
  },

  fazerLogout(): void {
    this.logout();
  },

  getCurrentUser(): User | null {
    const armazenado = localStorage.getItem('ong_apia_user');
    if (!armazenado) return null;
    try {
      return JSON.parse(armazenado);
    } catch {
      return null;
    }
  },

  obterUsuarioAtual(): Usuario | null {
    return this.getCurrentUser();
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('ong_apia_token');
  },

  estaAutenticado(): boolean {
    return this.isAuthenticated();
  },
};
