import assert from 'node:assert/strict';
import test from 'node:test';
import { eventoController } from '../controllers/eventoController.js';
import { eventoUseCases } from '../usecases/eventoUseCases.js';
import { rotasEventos } from '../routes/rotasEventos.js';

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

test('a listagem pública ignora ?all=true e solicita somente eventos visíveis', async () => {
  const listarOriginal = eventoUseCases.listar;
  let apenasVisiveisRecebido;
  eventoUseCases.listar = async (apenasVisiveis) => {
    apenasVisiveisRecebido = apenasVisiveis;
    return [];
  };

  try {
    const resposta = criarResposta();
    await eventoController.listar({ query: { all: 'true' } }, resposta);

    assert.equal(apenasVisiveisRecebido, true);
    assert.equal(resposta.statusCode, 200);
  } finally {
    eventoUseCases.listar = listarOriginal;
  }
});

test('a busca pública por ID limita a consulta aos eventos visíveis', async () => {
  const buscarOriginal = eventoUseCases.buscarPorId;
  let somenteVisiveisRecebido;
  eventoUseCases.buscarPorId = async (_id, apenasVisiveis) => {
    somenteVisiveisRecebido = apenasVisiveis;
    throw new Error('Evento não encontrado.');
  };

  try {
    const resposta = criarResposta();
    await eventoController.buscarPorId({ params: { id: '7' } }, resposta);

    assert.equal(somenteVisiveisRecebido, true);
    assert.equal(resposta.statusCode, 404);
  } finally {
    eventoUseCases.buscarPorId = buscarOriginal;
  }
});

test('a listagem completa de eventos exige autenticação JWT', () => {
  const camadaAdmin = rotasEventos.stack.find((camada) => camada.route?.path === '/admin');
  assert.ok(camadaAdmin);
  assert.equal(camadaAdmin.route.stack.length, 2);

  const resposta = criarResposta();
  let proximoMiddlewareChamado = false;
  camadaAdmin.route.stack[0].handle({ headers: {} }, resposta, () => {
    proximoMiddlewareChamado = true;
  });

  assert.equal(resposta.statusCode, 401);
  assert.equal(proximoMiddlewareChamado, false);
});
