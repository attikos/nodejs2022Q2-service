export class AlbumEntity {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
