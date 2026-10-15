import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DIRETORIO_UPLOADS = path.resolve(__dirname, '../../uploads');
export const UPLOADS_DIR = DIRETORIO_UPLOADS;

if (!fs.existsSync(DIRETORIO_UPLOADS)) {
  fs.mkdirSync(DIRETORIO_UPLOADS, { recursive: true });
}

const armazenamentoEmDisco = multer.diskStorage({
  destination: (_req, _arquivo, retornoChamada) => {
    retornoChamada(null, DIRETORIO_UPLOADS);
  },
  filename: (_req, arquivo, retornoChamada) => {
    const sufixoUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extensao = path.extname(arquivo.originalname).toLowerCase();
    retornoChamada(null, `foto-${sufixoUnico}${extensao}`);
  },
});

export const upload = multer({
  storage: armazenamentoEmDisco,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite máximo de 10MB
  },
  fileFilter: (_req, arquivo, retornoChamada) => {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (tiposPermitidos.includes(arquivo.mimetype)) {
      retornoChamada(null, true);
    } else {
      retornoChamada(new Error('Apenas imagens nos formatos JPEG, PNG e WEBP são permitidas.'));
    }
  },
});

/**
 * Middleware para Upload de Fotos de Animais e Eventos
 */
export const uploadFoto = (requisicao: Request, resposta: Response, proximo: NextFunction) => {
  const manipulador = upload.single('photo');

  manipulador(requisicao, resposta, (erro) => {
    if (erro instanceof multer.MulterError) {
      if (erro.code === 'LIMIT_FILE_SIZE') {
        return resposta.status(400).json({
          success: false,
          mensagem: 'O tamanho da imagem excede o limite máximo permitido de 10MB.',
          message: 'O tamanho da imagem excede o limite máximo permitido de 10MB.',
        });
      }
      return resposta.status(400).json({
        success: false,
        mensagem: `Erro no upload da imagem: ${erro.message}`,
        message: `Erro no upload da imagem: ${erro.message}`,
      });
    } else if (erro) {
      return resposta.status(400).json({
        success: false,
        mensagem: erro.message || 'Erro ao processar imagem.',
        message: erro.message || 'Erro ao processar imagem.',
      });
    }
    proximo();
  });
};

export const uploadPetPhoto = uploadFoto;
