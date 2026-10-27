import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DIRETORIO_UPLOADS = path.resolve(__dirname, '../uploads');
export const UPLOADS_DIR = DIRETORIO_UPLOADS;

if (!fs.existsSync(DIRETORIO_UPLOADS)) {
  fs.mkdirSync(DIRETORIO_UPLOADS, { recursive: true });
}

const armazenamentoEmMemoria = multer.memoryStorage();

export function arquivoParaDataUrl(arquivo) {
  if (!arquivo || !arquivo.buffer) return null;
  const mime = arquivo.mimetype || 'image/jpeg';
  const base64 = arquivo.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

export const upload = multer({
  storage: armazenamentoEmMemoria,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, arquivo, cb) => {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (tiposPermitidos.includes(arquivo.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens nos formatos JPEG, PNG e WEBP são permitidas.'));
    }
  },
});

export const uploadFoto = (req, res, next) => {
  const manipulador = upload.single('photo');

  manipulador(req, res, (erro) => {
    if (erro instanceof multer.MulterError) {
      if (erro.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          mensagem: 'O tamanho da imagem excede o limite máximo permitido de 10MB.',
          message: 'O tamanho da imagem excede o limite máximo permitido de 10MB.',
        });
      }
      return res.status(400).json({
        success: false,
        mensagem: `Erro no upload da imagem: ${erro.message}`,
        message: `Erro no upload da imagem: ${erro.message}`,
      });
    } else if (erro) {
      return res.status(400).json({
        success: false,
        mensagem: erro.message || 'Erro ao processar imagem.',
        message: erro.message || 'Erro ao processar imagem.',
      });
    }

    if (req.file) {
      req.file.dataUrl = arquivoParaDataUrl(req.file);
    }

    next();
  });
};

export const uploadPetPhoto = uploadFoto;
