export class ArtistEntity {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
