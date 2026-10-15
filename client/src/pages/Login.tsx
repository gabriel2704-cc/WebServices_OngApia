import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle, Home, Heart } from 'lucide-react';
import { api } from '../services/api.js';

export const Login: React.FC = () => {
  const [estaCadastrando, setEstaCadastrando] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const aoSubmeter = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setMensagemSucesso(null);
    setCarregando(true);

    try {
      if (estaCadastrando) {
        if (!nome.trim()) throw new Error('Por favor, informe seu nome completo.');
        const resposta = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nome, email, password: senha }),
        });
        const dados = await resposta.json();
        if (!resposta.ok) throw new Error(dados.message || 'Falha ao registrar administrador');

        // Armazena credenciais
        localStorage.setItem('ong_apia_token', dados.data.token);
        localStorage.setItem('ong_apia_user', JSON.stringify(dados.data.user));
        setMensagemSucesso('Cadastro realizado com sucesso! Redirecionando...');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        await api.fazerLogin(email, senha);
        setMensagemSucesso('Login realizado com sucesso! Redirecionando...');
        setTimeout(() => navigate('/admin'), 600);
      }
    } catch (err: any) {
      setErro(err.message || 'Ocorreu um erro. Verifique seus dados.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-apia-bg">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Col: APIA Brand Illustration matching Mockup */}
        <div className="flex flex-col items-center text-center p-6 space-y-4">
          <div className="w-40 h-40 rounded-3xl bg-apia-dark flex items-center justify-center text-white shadow-xl relative overflow-hidden group">
            {/* House + Pet Stylized Illustration */}
            <svg
              viewBox="0 0 24 24"
              className="w-24 h-24 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-apia-orange text-white shadow">
              <Heart className="w-4 h-4 fill-white" />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-apia-dark tracking-tight">
              APIA
            </h2>
            <p className="text-xs font-semibold text-apia-textMuted max-w-xs">
              Associação de Protetores Incondicionais dos Animais
            </p>
            <span className="inline-block text-xs font-bold text-apia-orange">
              Lagoa Vermelha - RS
            </span>
          </div>

          <div className="p-3 bg-apia-light rounded-btn border border-apia-border text-left text-xs text-apia-text max-w-xs">
            <p className="font-bold text-apia-dark mb-1">🔐 Acesso Administrativo:</p>
            <p>E-mail padrão: <code>admin@apia.org.br</code></p>
            <p>Senha padrão: <code>admin123</code></p>
          </div>
        </div>

        {/* Right Col: Clean Form Card matching Mockup */}
        <div className="bg-white rounded-card p-6 sm:p-8 shadow-soft border border-gray-100">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-apia-dark">
              {estaCadastrando ? 'Criar conta de Administrador' : 'Acesse sua conta'}
            </h3>
            <p className="text-xs text-apia-textMuted mt-1">
              {estaCadastrando
                ? 'Cadastre um novo membro da equipe autorizada.'
                : 'Entre com seu e-mail e senha para continuar.'}
            </p>
          </div>

          {erro && (
            <div className="mb-4 p-3 rounded-btn bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          {mensagemSucesso && (
            <div className="mb-4 p-3 rounded-btn bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 border border-emerald-200">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{mensagemSucesso}</span>
            </div>
          )}

          <form onSubmit={aoSubmeter} className="space-y-4">
            {estaCadastrando && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-apia-dark">Nome Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-apia-light rounded-btn text-xs text-apia-text border border-transparent focus:border-apia-dark focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-apia-dark">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-apia-light rounded-btn text-xs text-apia-text border border-transparent focus:border-apia-dark focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-apia-dark">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-apia-light rounded-btn text-xs text-apia-text border border-transparent focus:border-apia-dark focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full py-3 px-4 rounded-btn text-xs font-bold text-white bg-apia-orange hover:bg-apia-orangeHover shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {carregando ? 'Processando...' : estaCadastrando ? 'Cadastrar' : 'Entrar'}
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-3 text-xs text-gray-400">ou</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button
              type="button"
              onClick={() => {
                setEstaCadastrando(!estaCadastrando);
                setErro(null);
                setMensagemSucesso(null);
              }}
              className="w-full py-2.5 px-4 rounded-btn text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {estaCadastrando ? 'Já possui conta? Faça Login' : 'Criar conta de Administrador'}
            </button>

            <div className="text-center pt-2">
              <a
                href="https://wa.me/5554996546910?text=Ol%C3%A1,%20preciso%20de%20ajuda%20para%20recuperar%20meu%20acesso%20ao%20painel%20da%20APIA."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
