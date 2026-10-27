import { animalUseCases } from '../usecases/animalUseCases.js';
import { arquivoParaDataUrl } from '../middlewares/uploadMiddleware.js';

export const animalController = {
  async listar(req, res) {
    try {
      const { species, size, age, gender, status, search } = req.query;

      const dados = await animalUseCases.listar({
        species: species ? String(species) : undefined,
        size: size ? String(size) : undefined,
        age: age ? String(age) : undefined,
        gender: gender ? String(gender) : undefined,
        status: status ? String(status) : undefined,
        search: search ? String(search) : undefined,
      });

      return res.status(200).json({
        success: true,
        count: dados.length,
        data: dados,
      });
    } catch (err) {
      return res.status(500).json({ success: false, erro: err.message, message: err.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, mensagem: 'ID inválido.' });
      }

      const animal = await animalUseCases.buscarPorId(id);
      return res.status(200).json({ success: true, data: animal });
    } catch (err) {
      return res.status(404).json({ success: false, mensagem: err.message });
    }
  },

  async cadastrar(req, res) {
    try {
      const corpo = req.body;

      let photoUrl = corpo.photoUrl || corpo.photo_url;
      if (req.file) {
        photoUrl = req.file.dataUrl || arquivoParaDataUrl(req.file);
      }

      if (!photoUrl) {
        return res.status(400).json({ success: false, mensagem: 'A foto do animal é obrigatória.' });
      }

      const isCastrated =
        corpo.isCastrated === true ||
        corpo.isCastrated === 'true' ||
        corpo.is_castrated === true ||
        corpo.is_castrated === 'true';

      const isVaccinated =
        corpo.isVaccinated === true ||
        corpo.isVaccinated === 'true' ||
        corpo.is_vaccinated === true ||
        corpo.is_vaccinated === 'true';

      const animal = await animalUseCases.cadastrar({
        name: corpo.name,
        species: corpo.species,
        breed: corpo.breed || 'SRD',
        size: corpo.size,
        age: corpo.age,
        gender: corpo.gender,
        temperament: corpo.temperament || '',
        description: corpo.description || '',
        isCastrated,
        isVaccinated,
        photoUrl,
        status: corpo.status || 'disponivel',
      });

      return res.status(201).json({
        success: true,
        mensagem: 'Animal cadastrado com sucesso!',
        message: 'Animal cadastrado com sucesso!',
        data: animal,
      });
    } catch (err) {
      return res.status(400).json({ success: false, mensagem: err.message, message: err.message });
    }
  },

  async uploadFoto(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, mensagem: 'Nenhum arquivo enviado.' });
      }
      const urlFoto = req.file.dataUrl || arquivoParaDataUrl(req.file);
      return res.status(200).json({
        success: true,
        mensagem: 'Foto enviada com sucesso!',
        url: urlFoto,
        photoUrl: urlFoto,
      });
    } catch (err) {
      return res.status(500).json({ success: false, erro: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, mensagem: 'ID inválido.' });
      }

      const corpo = req.body;
      const dadosAtualizados = {};

      if (corpo.name !== undefined) dadosAtualizados.name = corpo.name;
      if (corpo.species !== undefined) dadosAtualizados.species = corpo.species;
      if (corpo.breed !== undefined) dadosAtualizados.breed = corpo.breed;
      if (corpo.size !== undefined) dadosAtualizados.size = corpo.size;
      if (corpo.age !== undefined) dadosAtualizados.age = corpo.age;
      if (corpo.gender !== undefined) dadosAtualizados.gender = corpo.gender;
      if (corpo.temperament !== undefined) dadosAtualizados.temperament = corpo.temperament;
      if (corpo.description !== undefined) dadosAtualizados.description = corpo.description;
      if (corpo.status !== undefined) dadosAtualizados.status = corpo.status;

      if (corpo.isCastrated !== undefined || corpo.is_castrated !== undefined) {
        dadosAtualizados.isCastrated =
          corpo.isCastrated === true ||
          corpo.isCastrated === 'true' ||
          corpo.is_castrated === true ||
          corpo.is_castrated === 'true';
      }

      if (corpo.isVaccinated !== undefined || corpo.is_vaccinated !== undefined) {
        dadosAtualizados.isVaccinated =
          corpo.isVaccinated === true ||
          corpo.isVaccinated === 'true' ||
          corpo.is_vaccinated === true ||
          corpo.is_vaccinated === 'true';
      }

      if (req.file) {
        dadosAtualizados.photoUrl = req.file.dataUrl || arquivoParaDataUrl(req.file);
      } else if (corpo.photoUrl || corpo.photo_url) {
        dadosAtualizados.photoUrl = corpo.photoUrl || corpo.photo_url;
      }

      const animal = await animalUseCases.atualizar(id, dadosAtualizados);
      return res.status(200).json({
        success: true,
        mensagem: 'Animal atualizado com sucesso!',
        message: 'Animal atualizado com sucesso!',
        data: animal,
      });
    } catch (err) {
      return res.status(400).json({ success: false, mensagem: err.message, message: err.message });
    }
  },

  async marcarComoAdotado(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const animal = await animalUseCases.marcarComoAdotado(id);
      return res.status(200).json({
        success: true,
        mensagem: `${animal.name} agora faz parte dos Finais Felizes!`,
        message: `${animal.name} agora faz parte dos Finais Felizes!`,
        data: animal,
      });
    } catch (err) {
      return res.status(400).json({ success: false, mensagem: err.message });
    }
  },

  async marcarComoDisponivel(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const animal = await animalUseCases.marcarComoDisponivel(id);
      return res.status(200).json({
        success: true,
        mensagem: `${animal.name} voltou a ficar disponível para adoção.`,
        message: `${animal.name} voltou a ficar disponível para adoção.`,
        data: animal,
      });
    } catch (err) {
      return res.status(400).json({ success: false, mensagem: err.message });
    }
  },

  async remover(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      await animalUseCases.remover(id);
      return res.status(200).json({
        success: true,
        mensagem: 'Animal removido com sucesso.',
        message: 'Animal removido com sucesso.',
      });
    } catch (err) {
      return res.status(400).json({ success: false, mensagem: err.message });
    }
  },
};

export const controladorAnimal = animalController;
