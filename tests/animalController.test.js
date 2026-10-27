import assert from 'node:assert/strict';
import test from 'node:test';
import { animalController } from '../controllers/animalController.js';
import { animalUseCases } from '../usecases/animalUseCases.js';
import {
  AnimalNotFoundError,
  AnimalValidationError,
} from '../entities/animalValidation.js';

function criarResposta() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test('cadastro inválido retorna 400 sem converter erros de entrada em sucesso', async () => {
  const cadastrarOriginal = animalUseCases.cadastrar;
  animalUseCases.cadastrar = async () => {
    throw new AnimalValidationError('O campo "age" é obrigatório.');
  };

  try {
    const resposta = criarResposta();
    await animalController.cadastrar(
      { body: { photoUrl: 'data:image/jpeg;base64,abc' } },
      resposta
    );

    assert.equal(resposta.statusCode, 400);
    assert.equal(resposta.body.success, false);
    assert.match(resposta.body.message, /age/);
  } finally {
    animalUseCases.cadastrar = cadastrarOriginal;
  }
});

test('falha de persistência retorna 500, não erro de validação 400', async () => {
  const cadastrarOriginal = animalUseCases.cadastrar;
  animalUseCases.cadastrar = async () => {
    throw new Error('Falha simulada no banco.');
  };

  try {
    const resposta = criarResposta();
    const erroOriginal = console.error;
    console.error = () => {};
    try {
      await animalController.cadastrar(
        { body: { photoUrl: 'data:image/jpeg;base64,abc' } },
        resposta
      );
    } finally {
      console.error = erroOriginal;
    }

    assert.equal(resposta.statusCode, 500);
    assert.equal(resposta.body.success, false);
    assert.doesNotMatch(resposta.body.message, /banco/i);
  } finally {
    animalUseCases.cadastrar = cadastrarOriginal;
  }
});

test('animal inexistente durante atualização retorna 404', async () => {
  const atualizarOriginal = animalUseCases.atualizar;
  animalUseCases.atualizar = async () => {
    throw new AnimalNotFoundError(123);
  };

  try {
    const resposta = criarResposta();
    await animalController.atualizar(
      { params: { id: '123' }, body: { name: 'Luna' } },
      resposta
    );

    assert.equal(resposta.statusCode, 404);
    assert.match(resposta.body.message, /123/);
  } finally {
    animalUseCases.atualizar = atualizarOriginal;
  }
});
