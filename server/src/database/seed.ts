import bcrypt from 'bcryptjs';
import { db, pool } from '../db.js';
import { users, animals, events } from '../schema.js';

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados da ONG APIA...');

  try {
    // 1. Criar usuário administrador padrão
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    const [adminUser] = await db
      .insert(users)
      .values({
        name: 'Administração APIA',
        email: 'admin@apia.org.br',
        passwordHash,
      })
      .onConflictDoNothing()
      .returning();

    if (adminUser) {
      console.log('✅ Usuário administrador criado: admin@apia.org.br (senha: admin123)');
    } else {
      console.log('ℹ️ Usuário admin já existente ou ignorado.');
    }
    

    console.log('🎉 Seed finalizado com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
  } finally {
    await pool.end();
  }
}

seed();
