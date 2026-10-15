import React from 'react';
import { Heart, Instagram, Facebook, Phone, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-apia-dark text-white border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Col 1: Institutional Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-apia-orange fill-apia-orange" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight">APIA</h3>
                <p className="text-[11px] text-gray-300">
                  Associação de Protetores Incondicionais dos Animais
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Trabalho voluntário e independente no resgate, abrigo temporário, cuidados veterinários e encaminhamento para adoção responsável em Lagoa Vermelha e região.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-300">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Lagoa Vermelha - RS</span>
            </div>
          </div>

          {/* Col 2: Social & Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider text-emerald-200 uppercase">
              Contatos e Redes Oficiais
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a
                  href="https://www.instagram.com/ongapiaoficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>@ongapiaoficial</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400" />
                  <span>APIA Lagoa Vermelha</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5554996546910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: (54) 99654-6910</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@apia-lv.org.br"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-300" />
                  <span>contato@apia-lv.org.br</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Motto & Extension Project */}
          <div className="flex flex-col md:items-end justify-between space-y-4">
            <div className="md:text-right space-y-1">
              <h4 className="font-bold text-base text-white">
                Juntos por mais vidas!
              </h4>
              <p className="text-xs text-gray-300 max-w-xs md:ml-auto leading-relaxed">
                Desenvolvido em parceria com o curso de Ciência da Computação do IFSUL (Práticas em Sociedade III).
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                to="/adotar"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
              >
                Quero Adotar
              </Link>
              <Link
                to="/como-ajudar"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
              >
                Como Ajudar
              </Link>
              <Link
                to="/sobre"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
              >
                Sobre
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} APIA Lagoa Vermelha - RS. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com carinho pela causa animal.
          </p>
        </div>
      </div>
    </footer>
  );
};
