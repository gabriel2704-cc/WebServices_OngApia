export class Evento {
  id: number | null;
  title: string;
  description: string;
  date: Date | null;
  photoUrl: string | null;
  isVisible: boolean;
  createdAt?: Date | null;

  constructor({
    id = null,
    title,
    description,
    date = null,
    photoUrl = null,
    isVisible = true,
    createdAt = null,
  }: {
    id?: number | null;
    title: string;
    description: string;
    date?: Date | string | null;
    photoUrl?: string | null;
    isVisible?: boolean;
    createdAt?: Date | null;
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
