import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { usuarios } from '../schema.js';
import { JWT_SECRET } from '../jwtConfig.js';

const JWT_EXPIRES_IN = '7d';

export const usuarioUseCases = {
  async login({ email, password }) {
    const emailLimpo = email.toLowerCase().trim();

    const res = await db.select().from(usuarios).where(eq(usuarios.email, emailLimpo)).limit(1);
    if (res.length === 0) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const usuario = res[0];
    const senhaCorreta = await bcrypt.compare(password, usuario.passwordHash);
    if (!senhaCorreta) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, name: usuario.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      user: { id: usuario.id, name: usuario.name, email: usuario.email },
      token,
    };
  },

  async buscarPorId(id) {
    const res = await db.select().from(usuarios).where(eq(usuarios.id, id)).limit(1);
    if (res.length === 0) {
      throw new Error('Usuário não encontrado.');
    }
    const usuario = res[0];
    return {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
    };
  },
};
