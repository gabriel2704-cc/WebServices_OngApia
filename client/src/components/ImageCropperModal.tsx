import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Crop,
  Check,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  RotateCcw,
  Maximize2,
  Lock,
} from 'lucide-react';

export type TipoProporcao = '4:3' | '16:9' | '1:1';
export type AspectRatioType = TipoProporcao;

interface PropriedadesModalCorteImagem {
  title?: string;
  imageSrc: string;
  isOpen: boolean;
  initialAspectRatio?: TipoProporcao;
  lockAspectRatio?: boolean;
  onClose: () => void;
  onCropComplete: (croppedBlob: Blob, previewUrl: string) => void;
}

/**
 * Modal Interativo de Corte e Ajuste de Imagem
 * Permite recortar, rotacionar, ampliar e mover a imagem com trava de bordas (sem deixar faixas vazias).
 */
export const ImageCropperModal: React.FC<PropriedadesModalCorteImagem> = ({
  title = 'Ajustar e Recortar Imagem',
  imageSrc,
  isOpen,
  initialAspectRatio = '4:3',
  lockAspectRatio = false,
  onClose,
  onCropComplete,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotacao, setRotacao] = useState(0);
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });
  const [proporcao, setProporcao] = useState<TipoProporcao>(initialAspectRatio);
  const [estaArrastando, setEstaArrastando] = useState(false);
  const [inicioArrasto, setInicioArrasto] = useState({ x: 0, y: 0 });
  const [tamanhoNatural, setTamanhoNatural] = useState({ width: 1, height: 1 });

  const refImagem = useRef<HTMLImageElement>(null);
  const refConteiner = useRef<HTMLDivElement>(null);

  // Redefine parâmetros quando o modal é aberto com uma nova imagem
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotacao(0);
      setPosicao({ x: 0, y: 0 });
      setProporcao(initialAspectRatio);
    }
  }, [isOpen, imageSrc, initialAspectRatio]);

  if (!isOpen || !imageSrc) return null;

  // Dimensões do quadro de visualização de acordo com a proporção escolhida
  const obterDimensoesQuadro = () => {
    switch (proporcao) {
      case '16:9':
        return { larguraQuadro: 384, alturaQuadro: 216, larguraFinal: 1280, alturaFinal: 720 };
      case '1:1':
        return { larguraQuadro: 320, alturaQuadro: 320, larguraFinal: 1000, alturaFinal: 1000 };
      case '4:3':
      default:
        return { larguraQuadro: 360, alturaQuadro: 270, larguraFinal: 1200, alturaFinal: 900 };
    }
  };

  const { larguraQuadro, alturaQuadro, larguraFinal, alturaFinal } = obterDimensoesQuadro();

  // Carrega as dimensões originais do arquivo de imagem
  const carregarDimensoesNaturais = (evento: React.SyntheticEvent<HTMLImageElement>) => {
    const img = evento.currentTarget;
    setTamanhoNatural({ width: img.naturalWidth, height: img.naturalHeight });
  };

  // Verifica se a imagem está rotacionada em 90 ou 270 graus
  const estaRotacionado = rotacao % 180 !== 0;

  // Dimensões efetivas considerando rotação
  const larguraEfetiva = estaRotacionado ? tamanhoNatural.height : tamanhoNatural.width;
  const alturaEfetiva = estaRotacionado ? tamanhoNatural.width : tamanhoNatural.height;

  // Escala inicial de ajuste para preencher todo o quadro sem sobrar espaços pretos
  const escalaEncaixe = Math.max(larguraQuadro / (larguraEfetiva || 1), alturaQuadro / (alturaEfetiva || 1)) || 1;
  const larguraBase = tamanhoNatural.width * escalaEncaixe;
  const alturaBase = tamanhoNatural.height * escalaEncaixe;

  // Função delimitadora: garante matematicamente que a imagem NUNCA ultrapasse as bordas do quadro
  const obterPosicaoLimitada = (
    xBruto: number,
    yBruto: number,
    zoomAlvo: number = zoom,
    rotacaoAlvo: number = rotacao
  ) => {
    const estaRot = rotacaoAlvo % 180 !== 0;
    const largNatEfetiva = estaRot ? tamanhoNatural.height : tamanhoNatural.width;
    const altNatEfetiva = estaRot ? tamanhoNatural.width : tamanhoNatural.height;
    const escalaAlvo = Math.max(larguraQuadro / (largNatEfetiva || 1), alturaQuadro / (altNatEfetiva || 1)) || 1;
    const baseW = tamanhoNatural.width * escalaAlvo;
    const baseH = tamanhoNatural.height * escalaAlvo;

    // Largura e altura visíveis desenhadas
    const larguraRenderizada = estaRot ? baseH * zoomAlvo : baseW * zoomAlvo;
    const alturaRenderizada = estaRot ? baseW * zoomAlvo : baseH * zoomAlvo;

    // Distância máxima do centro antes de revelar a borda vazia
    const deslocamentoMaximoX = Math.max(0, (larguraRenderizada - larguraQuadro) / 2);
    const deslocamentoMaximoY = Math.max(0, (alturaRenderizada - alturaQuadro) / 2);

    return {
      x: Math.max(-deslocamentoMaximoX, Math.min(deslocamentoMaximoX, xBruto)),
      y: Math.max(-deslocamentoMaximoY, Math.min(deslocamentoMaximoY, yBruto)),
    };
  };

  // Alteração de zoom com limite mínimo estrito de 1.0 (nunca menor que o quadro)
  const alterarZoom = (novoZoom: number) => {
    const zoomLimitado = Math.min(3.5, Math.max(1.0, Number(novoZoom.toFixed(2))));
    setZoom(zoomLimitado);
    setPosicao((pos) => obterPosicaoLimitada(pos.x, pos.y, zoomLimitado, rotacao));
  };

  // Girar imagem em 90 graus
  const rotacionarImagem = () => {
    const novaRotacao = (rotacao + 90) % 360;
    setRotacao(novaRotacao);
    setPosicao((pos) => obterPosicaoLimitada(pos.x, pos.y, zoom, novaRotacao));
  };

  // Resetar zoom e posicionamento centralizado
  const redefinirAjustes = () => {
    setZoom(1.0);
    setPosicao({ x: 0, y: 0 });
    setRotacao(0);
  };

  // Alterar proporção do corte
  const alterarProporcao = (novaProporcao: TipoProporcao) => {
    setProporcao(novaProporcao);
    setPosicao({ x: 0, y: 0 });
    setZoom(1.0);
  };

  // Manipulação de arrasto pelo mouse com bordas travadas
  const iniciarArrastoMouse = (e: React.MouseEvent) => {
    e.preventDefault();
    setEstaArrastando(true);
    setInicioArrasto({ x: e.clientX - posicao.x, y: e.clientY - posicao.y });
  };

  const moverArrastoMouse = (e: React.MouseEvent) => {
    if (!estaArrastando) return;
    const xBruto = e.clientX - inicioArrasto.x;
    const yBruto = e.clientY - inicioArrasto.y;
    setPosicao(obterPosicaoLimitada(xBruto, yBruto));
  };

  const finalizarArrastoMouse = () => {
    setEstaArrastando(false);
  };

  // Manipulação de arrasto por toque no celular com bordas travadas
  const iniciarArrastoToque = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const toque = e.touches[0];
      setEstaArrastando(true);
      setInicioArrasto({ x: toque.clientX - posicao.x, y: toque.clientY - posicao.y });
    }
  };

  const moverArrastoToque = (e: React.TouchEvent) => {
    if (!estaArrastando || e.touches.length !== 1) return;
    const toque = e.touches[0];
    const xBruto = toque.clientX - inicioArrasto.x;
    const yBruto = toque.clientY - inicioArrasto.y;
    setPosicao(obterPosicaoLimitada(xBruto, yBruto));
  };

  const finalizarArrastoToque = () => {
    setEstaArrastando(false);
  };

  // Zoom pela roda do mouse (Scroll Wheel)
  const zoomPelaRodaMouse = (e: React.WheelEvent) => {
    e.preventDefault();
    const variacao = e.deltaY > 0 ? -0.1 : 0.1;
    alterarZoom(zoom + variacao);
  };

  // Aplica o recorte no Canvas gerando o arquivo final de alta resolução
  const aplicarCorte = () => {
    const img = refImagem.current;
    if (!img) return;

    const canvas = document.createElement('canvas');
    canvas.width = larguraFinal;
    canvas.height = alturaFinal;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fundo preto de segurança
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, larguraFinal, alturaFinal);

    // Multiplicador da escala da tela para a resolução final
    const multiplicador = larguraFinal / larguraQuadro;

    ctx.save();
    ctx.translate(
      larguraFinal / 2 + posicao.x * multiplicador,
      alturaFinal / 2 + posicao.y * multiplicador
    );
    ctx.rotate((rotacao * Math.PI) / 180);

    const larguraDesenho = larguraBase * zoom * multiplicador;
    const alturaDesenho = alturaBase * zoom * multiplicador;

    ctx.drawImage(img, -larguraDesenho / 2, -alturaDesenho / 2, larguraDesenho, alturaDesenho);
    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const urlPrevia = URL.createObjectURL(blob);
          onCropComplete(blob, urlPrevia);
          onClose();
        }
      },
      'image/jpeg',
      0.92
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-card max-w-xl w-full overflow-hidden shadow-2xl flex flex-col border border-gray-100 max-h-[95vh]">
        {/* Cabeçalho do Modal */}
        <div className="bg-apia-dark text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-apia-orange" />
            <h3 className="font-bold text-sm sm:text-base">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Seletor de Formato ou Aviso de Tamanho Fixo Obrigatório */}
        {lockAspectRatio ? (
          <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200 flex items-center justify-between text-xs shrink-0">
            <span className="font-bold text-amber-950 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-700" />
              Tamanho Fixo Obrigatório: Quadrado (1:1 Padronizado)
            </span>
            <span className="text-[11px] text-amber-800 font-medium hidden sm:inline">
              Mova e amplie para ajustar o pet perfeitamente dentro do quadrado
            </span>
          </div>
        ) : (
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between text-xs shrink-0">
            <span className="font-semibold text-gray-600 flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-apia-dark" />
              Formato da Foto:
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => alterarProporcao('16:9')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  proporcao === '16:9'
                    ? 'bg-apia-dark text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                16:9 (Banner)
              </button>
              <button
                type="button"
                onClick={() => alterarProporcao('4:3')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  proporcao === '4:3'
                    ? 'bg-apia-dark text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                4:3 (Paisagem)
              </button>
              <button
                type="button"
                onClick={() => alterarProporcao('1:1')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  proporcao === '1:1'
                    ? 'bg-apia-dark text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                1:1 (Quadrado)
              </button>
            </div>
          </div>
        )}

        {/* Área Interativa de Enquadramento */}
        <div
          ref={refConteiner}
          onMouseMove={moverArrastoMouse}
          onMouseUp={finalizarArrastoMouse}
          onMouseLeave={finalizarArrastoMouse}
          onTouchMove={moverArrastoToque}
          onTouchEnd={finalizarArrastoToque}
          onWheel={zoomPelaRodaMouse}
          className="relative bg-neutral-900 h-80 sm:h-96 flex items-center justify-center overflow-hidden select-none p-4 cursor-grab active:cursor-grabbing"
        >
          {/* Quadro de Recorte Ativo */}
          <div
            style={{ width: `${larguraQuadro}px`, height: `${alturaQuadro}px` }}
            onMouseDown={iniciarArrastoMouse}
            onTouchStart={iniciarArrastoToque}
            className="relative border-2 border-apia-orange shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] rounded-lg overflow-hidden flex items-center justify-center shrink-0"
          >
            {/* Elemento de Imagem com Transformações */}
            <img
              ref={refImagem}
              src={imageSrc}
              alt="Ajuste"
              onLoad={carregarDimensoesNaturais}
              draggable={false}
              style={{
                width: `${larguraBase * zoom}px`,
                height: `${alturaBase * zoom}px`,
                maxWidth: 'none',
                maxHeight: 'none',
                transform: `translate(${posicao.x}px, ${posicao.y}px) rotate(${rotacao}deg)`,
                transition: estaArrastando ? 'none' : 'transform 0.05s ease-out',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              className="absolute"
            />

            {/* Linhas-Guia da Regra dos Terços */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
              <div className="border-r border-b border-white/25"></div>
              <div className="border-r border-b border-white/25"></div>
              <div className="border-b border-white/25"></div>
              <div className="border-r border-b border-white/25"></div>
              <div className="border-r border-b border-white/25"></div>
              <div className="border-b border-white/25"></div>
              <div className="border-r border-b border-white/25"></div>
              <div className="border-r border-b border-white/25"></div>
              <div></div>
            </div>

            {/* Dica de arrasto com bordas travadas */}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] px-2.5 py-0.5 rounded-full pointer-events-none flex items-center gap-1 shadow">
              <Move className="w-3 h-3 text-amber-300" />
              <span>Arraste para enquadrar (bordas travadas)</span>
            </div>
          </div>
        </div>

        {/* Barra de Ferramentas e Controles */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3 shrink-0">
          {/* Controle Deslizante de Zoom (Mínimo de 100% para não sobrar borda preta) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => alterarZoom(zoom - 0.1)}
                className="p-1.5 rounded-btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                title="Reduzir (mínimo 100%)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <input
                type="range"
                min="1.0"
                max="3.5"
                step="0.05"
                value={zoom}
                onChange={(e) => alterarZoom(parseFloat(e.target.value))}
                className="w-full sm:w-44 accent-apia-orange cursor-pointer"
              />

              <button
                type="button"
                onClick={() => alterarZoom(zoom + 0.1)}
                className="p-1.5 rounded-btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                title="Ampliar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono text-gray-500 w-10 text-right">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={rotacionarImagem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 shadow-sm"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Girar 90°
              </button>

              <button
                type="button"
                onClick={redefinirAjustes}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-btn bg-white border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-100"
                title="Centralizar e resetar zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resetar
              </button>
            </div>
          </div>

          {/* Botões de Ação do Modal */}
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-btn text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={aplicarCorte}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-btn text-xs font-bold text-white bg-apia-orange hover:bg-apia-orangeHover shadow-md active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              Confirmar e Salvar Ajustes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
