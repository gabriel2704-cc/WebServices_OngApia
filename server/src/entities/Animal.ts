export class Animal {
  id: number | null;
  name: string;
  species: 'cachorro' | 'gato';
  breed: string;
  size: 'pequeno' | 'medio' | 'grande';
  age: string;
  gender: 'macho' | 'femea';
  temperament: string;
  description: string;
  isCastrated: boolean;
  isVaccinated: boolean;
  photoUrl: string;
  status: 'disponivel' | 'adotado';
  createdAt?: Date | null;

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
  }: {
    id?: number | null;
    name: string;
    species: string;
    breed?: string;
    size: string;
    age: string;
    gender: string;
    temperament?: string | null;
    description?: string | null;
    isCastrated?: boolean;
    isVaccinated?: boolean;
    photoUrl: string;
    status?: string;
    createdAt?: Date | null;
  }) {
    this.id = id;
    this.name = name;
    this.species = species.toLowerCase() as 'cachorro' | 'gato';
    this.breed = breed;
    this.size = size.toLowerCase() as 'pequeno' | 'medio' | 'grande';
    this.age = age;
    this.gender = gender.toLowerCase() as 'macho' | 'femea';
    this.temperament = temperament || '';
    this.description = description || '';
    this.isCastrated = Boolean(isCastrated);
    this.isVaccinated = Boolean(isVaccinated);
    this.photoUrl = photoUrl;
    this.status = (status?.toLowerCase() === 'adotado' ? 'adotado' : 'disponivel') as 'disponivel' | 'adotado';
    this.createdAt = createdAt;
  }
}
