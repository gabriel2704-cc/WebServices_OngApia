import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, LogIn, UserCheck, LogOut, Shield } from 'lucide-react';
import { api } from '../services/api.js';

export const Header: React.FC = () => {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [usuario, setUsuario] = useState(api.obterUsuarioAtual());
  const localizacao = useLocation();
  const navegar = useNavigate();

  useEffect(() => {
    setUsuario(api.obterUsuarioAtual());
  }, [localizacao]);

  const aoSair = () => {
    api.fazerLogout();
    setUsuario(null);
    navegar('/');
  };

  const linksNavegacao = [
    { rotulo: 'Início', caminho: '/' },
    { rotulo: 'Sobre', caminho: '/sobre' },
    { rotulo: 'Quero Adotar', caminho: '/adotar' },
    { rotulo: 'Como Ajudar', caminho: '/como-ajudar' },
    { rotulo: 'Notícias e Eventos', caminho: '/eventos' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo APIA */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-apia-dark flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              {/* Custom Dog + House SVG */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-apia-dark tracking-tight leading-none flex items-center gap-1.5">
                APIA
                <span className="inline-block w-2 h-2 rounded-full bg-apia-orange"></span>
              </span>
              <span className="text-[11px] text-gray-500 font-medium tracking-tight leading-tight max-w-[210px] hidden sm:block">
                Associação de Protetores Incondicionais dos Animais
              </span>
              <span className="text-[10px] text-apia-orange font-semibold sm:hidden">
                Lagoa Vermelha - RS
              </span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {linksNavegacao.map((link) => {
              const estaAtivo = localizacao.pathname === link.caminho;
              return (
                <Link
                  key={link.caminho}
                  to={link.caminho}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    estaAtivo
                      ? 'text-apia-dark bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.rotulo}
                </Link>
              );
            })}
          </nav>

          {/* Botão de Ação / Autenticação */}
          <div className="hidden md:flex items-center gap-3">
            {usuario ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-900 hover:bg-emerald-100/80 border border-emerald-200/60"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-800" />
                  Painel Admin
                </Link>
                <button
                  onClick={aoSair}
                  title="Sair da conta"
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-apia-orange hover:bg-apia-orangeHover shadow-sm active:scale-[0.98]"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </Link>
            )}
          </div>

          {/* Botão de Menu para Celular */}
          <div className="flex md:hidden items-center gap-2">
            {usuario && (
              <Link
                to="/admin"
                className="p-2 rounded-btn bg-apia-light text-apia-dark text-xs font-semibold"
              >
                <Shield className="w-4 h-4" />
              </Link>
            )}
            <button
              onClick={() => setMenuMobileAberto(!menuMobileAberto)}
              className="p-2 rounded-btn text-apia-dark hover:bg-gray-100"
              aria-label="Menu"
            >
              {menuMobileAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Gaveta Mobile */}
      {menuMobileAberto && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {linksNavegacao.map((link) => {
            const estaAtivo = localizacao.pathname === link.caminho;
            return (
              <Link
                key={link.caminho}
                to={link.caminho}
                onClick={() => setMenuMobileAberto(false)}
                className={`block px-4 py-2.5 rounded-btn text-base font-medium ${
                  estaAtivo
                    ? 'bg-apia-light text-apia-dark font-bold'
                    : 'text-apia-text hover:bg-gray-50'
                }`}
              >
                {link.rotulo}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-gray-100">
            {usuario ? (
              <div className="space-y-2">
                <Link
                  to="/admin"
                  onClick={() => setMenuMobileAberto(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-btn bg-apia-light text-apia-dark font-semibold text-sm"
                >
                  <Shield className="w-4 h-4" />
                  Painel Administrativo
                </Link>
                <button
                  onClick={() => {
                    aoSair();
                    setMenuMobileAberto(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-btn text-red-600 bg-red-50 font-semibold text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuMobileAberto(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-btn bg-apia-orange text-white font-semibold text-sm hover:bg-apia-orangeHover shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Acessar Painel / Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
