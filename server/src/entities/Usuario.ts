export class Usuario {
  id: number | null;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: Date | null;

  constructor({
    id = null,
    name,
    email,
    passwordHash,
    createdAt = null,
  }: {
    id?: number | null;
    name: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | null;
  }) {
    this.id = id;
    this.name = name;
    this.email = email.toLowerCase().trim();
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
  }
}
