/**
 * Definições de Tipos e Modelos da Plataforma ONG APIA
 * (Associação de Protetores Incondicionais dos Animais - Lagoa Vermelha/RS)
 */

/**
 * Modelo de Animal para Adoção ou com Final Feliz
 */
export interface Animal {
  id: number;
  name: string;
  species: 'cachorro' | 'gato';
  breed?: string;
  size: 'pequeno' | 'medio' | 'grande';
  age: string;
  gender: 'macho' | 'femea';
  temperament?: string;
  description?: string;
  isCastrated: boolean;
  isVaccinated: boolean;
  photoUrl: string;
  status: 'disponivel' | 'adotado';
  createdAt?: string;
}

/**
 * Modelo de Notícia, Feira ou Evento da ONG
 */
export interface EventItem {
  id: number;
  title: string;
  description: string;
  date?: string;
  photoUrl?: string;
  isVisible: boolean;
  createdAt?: string;
}

/**
 * Modelo de Usuário Administrador
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Estado da Autenticação do Usuário
 */
export interface AuthState {
  user: User | null;
  token: string | null;
}

// Aliases em Português para facilitar a leitura no código
export type EventoItem = EventItem;
export type Usuario = User;
export type EstadoAutenticacao = AuthState;
