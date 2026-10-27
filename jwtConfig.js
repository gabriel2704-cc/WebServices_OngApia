const jwtSecret = process.env.JWT_SECRET;

if (process.env.NODE_ENV === 'production' && (!jwtSecret || jwtSecret.length < 32)) {
  throw new Error('Defina JWT_SECRET com pelo menos 32 caracteres em produção.');
}

export const JWT_SECRET =
  jwtSecret || 'ong_apia_jwt_secret_dev_chave_segura_2026';
