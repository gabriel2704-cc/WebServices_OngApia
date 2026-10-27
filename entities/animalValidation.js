const ESPECIES_PERMITIDAS = ['cachorro', 'gato'];
const PORTES_PERMITIDOS = ['pequeno', 'medio', 'grande'];
const SEXOS_PERMITIDOS = ['macho', 'femea'];
const STATUS_PERMITIDOS = ['disponivel', 'adotado'];

export class AnimalValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AnimalValidationError';
  }
}

export class AnimalNotFoundError extends Error {
  constructor(id) {
    super(`Animal com ID #${id} não encontrado.`);
    this.name = 'AnimalNotFoundError';
  }
}

function normalizarTexto(dados, normalizados, campo, { obrigatorio = false, maximo } = {}) {
  const valor = dados[campo];
  if (valor === undefined && !obrigatorio) return;
  if (typeof valor !== 'string') {
    throw new AnimalValidationError(`O campo "${campo}" deve ser um texto.`);
  }

  const texto = valor.trim();
  if (obrigatorio && texto === '') {
    throw new AnimalValidationError(`O campo "${campo}" é obrigatório.`);
  }
  if (maximo && texto.length > maximo) {
    throw new AnimalValidationError(`O campo "${campo}" deve ter no máximo ${maximo} caracteres.`);
  }
  normalizados[campo] = texto;
}

function normalizarOpcao(dados, normalizados, campo, permitidos, obrigatorio) {
  if (dados[campo] === undefined && !obrigatorio) return;
  normalizarTexto(dados, normalizados, campo, { obrigatorio: true });
  const valor = normalizados[campo].toLowerCase();
  if (!permitidos.includes(valor)) {
    throw new AnimalValidationError(
      `O campo "${campo}" deve ser um destes valores: ${permitidos.join(', ')}.`
    );
  }
  normalizados[campo] = valor;
}

export function normalizarBooleano(valor, campo) {
  if (valor === true || (typeof valor === 'string' && valor.trim().toLowerCase() === 'true')) {
    return true;
  }
  if (valor === false || (typeof valor === 'string' && valor.trim().toLowerCase() === 'false')) {
    return false;
  }
  throw new AnimalValidationError(`O campo "${campo}" deve ser verdadeiro ou falso.`);
}

export function validarDadosAnimal(dados, { parcial = false } = {}) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
    throw new AnimalValidationError('Os dados do animal são inválidos.');
  }

  const normalizados = {};
  const obrigatorio = !parcial;

  normalizarTexto(dados, normalizados, 'name', { obrigatorio, maximo: 100 });
  normalizarOpcao(dados, normalizados, 'species', ESPECIES_PERMITIDAS, obrigatorio);
  normalizarTexto(dados, normalizados, 'breed', { maximo: 50 });
  normalizarOpcao(dados, normalizados, 'size', PORTES_PERMITIDOS, obrigatorio);
  normalizarTexto(dados, normalizados, 'age', { obrigatorio, maximo: 50 });
  normalizarOpcao(dados, normalizados, 'gender', SEXOS_PERMITIDOS, obrigatorio);
  normalizarTexto(dados, normalizados, 'temperament');
  normalizarTexto(dados, normalizados, 'description');

  for (const campo of ['isCastrated', 'isVaccinated']) {
    if (dados[campo] !== undefined) {
      if (typeof dados[campo] !== 'boolean') {
        throw new AnimalValidationError(`O campo "${campo}" deve ser verdadeiro ou falso.`);
      }
      normalizados[campo] = dados[campo];
    }
  }

  if (dados.photoUrl !== undefined || obrigatorio) {
    normalizarTexto(dados, normalizados, 'photoUrl', { obrigatorio: true });
  }

  if (dados.status !== undefined || obrigatorio) {
    const status = dados.status === undefined ? 'disponivel' : dados.status;
    normalizarOpcao({ status }, normalizados, 'status', STATUS_PERMITIDOS, true);
  }

  if (parcial && Object.keys(normalizados).length === 0) {
    throw new AnimalValidationError('Informe ao menos um campo válido para atualizar.');
  }

  if (!parcial) {
    normalizados.breed = normalizados.breed || 'SRD';
    normalizados.temperament = normalizados.temperament || '';
    normalizados.description = normalizados.description || '';
    normalizados.isCastrated ??= false;
    normalizados.isVaccinated ??= false;
  }

  return normalizados;
}
