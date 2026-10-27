export class Evento {
  constructor({
    id = null,
    title,
    description,
    date = null,
    photoUrl = null,
    isVisible = true,
    createdAt = null,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date ? (typeof date === 'string' ? new Date(date) : date) : null;
    this.photoUrl = photoUrl;
    this.isVisible = Boolean(isVisible);
    this.createdAt = createdAt;
  }
}
