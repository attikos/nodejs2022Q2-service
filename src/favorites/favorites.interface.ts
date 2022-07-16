export class FavoritesEntity {
  id: string;
  type: string;

  constructor(partial: Partial<FavoritesEntity>) {
    Object.assign(this, partial);
  }
}
