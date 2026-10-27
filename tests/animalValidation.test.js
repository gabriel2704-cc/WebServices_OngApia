import assert from 'node:assert/strict';
import test from 'node:test';
import {
  AnimalValidationError,
  normalizarBooleano,
  validarDadosAnimal,
} from '../entities/animalValidation.js';

const animalValido = {
  name: '  Luna  ',
  species: 'CACHORRO',
  breed: '  SRD  ',
  size: 'Medio',
  age: '1 ano',
  gender: 'Femea',
  photoUrl: 'data:image/jpeg;base64,abc',
  status: 'Disponivel',
};

test('normaliza textos enumerados ao cadastrar animal', () => {
  const dados = validarDadosAnimal(animalValido);

  assert.equal(dados.name, 'Luna');
  assert.equal(dados.species, 'cachorro');
  assert.equal(dados.breed, 'SRD');
  assert.equal(dados.size, 'medio');
  assert.equal(dados.gender, 'femea');
  assert.equal(dados.status, 'disponivel');
  assert.equal(dados.isCastrated, false);
  assert.equal(dados.isVaccinated, false);
});

test('exige todos os campos obrigatórios no cadastro', () => {
  for (const campo of ['name', 'species', 'size', 'age', 'gender', 'photoUrl']) {
    const dados = { ...animalValido };
    delete dados[campo];
    assert.throws(() => validarDadosAnimal(dados), AnimalValidationError, campo);
  }
});

test('rejeita valores de enumeração inválidos no cadastro e na atualização', () => {
  for (const [campo, valor] of [
    ['species', 'coelho'],
    ['size', 'gigante'],
    ['gender', 'desconhecido'],
    ['status', 'em tratamento'],
  ]) {
    assert.throws(
      () => validarDadosAnimal({ ...animalValido, [campo]: valor }),
      AnimalValidationError,
      campo
    );
    assert.throws(
      () => validarDadosAnimal({ [campo]: valor }, { parcial: true }),
      AnimalValidationError,
      campo
    );
  }
});

test('permite atualização parcial válida e normaliza os campos', () => {
  assert.deepEqual(validarDadosAnimal({ name: '  Nina  ', status: 'ADOTADO' }, { parcial: true }), {
    name: 'Nina',
    status: 'adotado',
  });
});

test('rejeita atualização vazia e booleanos ambíguos', () => {
  assert.throws(() => validarDadosAnimal({}, { parcial: true }), AnimalValidationError);
  assert.throws(
    () => validarDadosAnimal({ photoUrl: '  ' }, { parcial: true }),
    AnimalValidationError
  );
  assert.throws(
    () => validarDadosAnimal({ isCastrated: 'sim' }, { parcial: true }),
    AnimalValidationError
  );
  assert.equal(normalizarBooleano(' false ', 'isVaccinated'), false);
  assert.throws(() => normalizarBooleano('sim', 'isVaccinated'), AnimalValidationError);
});

test('respeita o limite de tamanho definido para nome e raça', () => {
  assert.throws(
    () => validarDadosAnimal({ ...animalValido, name: 'a'.repeat(101) }),
    AnimalValidationError
  );
  assert.throws(
    () => validarDadosAnimal({ ...animalValido, breed: 'a'.repeat(51) }),
    AnimalValidationError
  );
});
