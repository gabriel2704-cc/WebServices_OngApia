import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { usuarios } from '../schema.js';
import { Usuario } from '../entities/Usuario.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ong_apia_jwt_secret_dev_chave_segura_2026';
const JWT_EXPIRES_IN = '7d';

export const usuarioUseCases = {
  async registrar({ name, email, password }) {
    const emailLimpo = email.toLowerCase().trim();

    const existente = await db.select().from(usuarios).where(eq(usuarios.email, emailLimpo)).limit(1);
    if (existente.length > 0) {
      throw new Error('Já existe um usuário cadastrado com este e-mail.');
    }

    if (password.length < 6) {
      throw new Error('A senha deve conter no mínimo 6 caracteres.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const entidade = new Usuario({
      name: name.trim(),
      email: emailLimpo,
      passwordHash,
    });

    const [novo] = await db
      .insert(usuarios)
      .values({
        name: entidade.name,
        email: entidade.email,
        passwordHash: entidade.passwordHash,
      })
      .returning();

    const token = jwt.sign(
      { id: novo.id, email: novo.email, name: novo.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      user: { id: novo.id, name: novo.name, email: novo.email },
      token,
    };
  },

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
