export class Animal {
  constructor({
    id = null,
    name,
    species,
    breed = 'SRD (Sem Raça Definida)',
    size,
    age,
    gender,
    temperament = '',
    description = '',
    isCastrated = false,
    isVaccinated = false,
    photoUrl,
    status = 'disponivel',
    createdAt = null,
  }) {
    this.id = id;
    this.name = name;
    this.species = species.toLowerCase();
    this.breed = breed;
    this.size = size.toLowerCase();
    this.age = age;
    this.gender = gender.toLowerCase();
    this.temperament = temperament || '';
    this.description = description || '';
    this.isCastrated = Boolean(isCastrated);
    this.isVaccinated = Boolean(isVaccinated);
    this.photoUrl = photoUrl;
    this.status = status?.toLowerCase() === 'adotado' ? 'adotado' : 'disponivel';
    this.createdAt = createdAt;
  }
}
