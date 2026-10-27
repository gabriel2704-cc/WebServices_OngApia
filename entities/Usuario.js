export class Usuario {
  constructor({
    id = null,
    name,
    email,
    passwordHash,
    createdAt = null,
  }) {
    this.id = id;
    this.name = name;
    this.email = email.toLowerCase().trim();
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
  }
}
