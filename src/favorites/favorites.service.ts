import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateFavoritesDto } from 'src/favorites/dto/create-favorites.dto';
import { v4, validate } from 'uuid';
import { favoritesDB } from 'src/favorites/favorites.db';
import { UpdateFavoritesDto } from 'src/favorites/dto/update-favorites.dto';
// import { TrackService } from 'src/track/track.service';

const checkValidation = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException('Id is not valid');
  }
};

@Injectable()
export class FavoritesService {
  // constructor() {} // private readonly trackService: TrackService, // @Inject(forwardRef(() => TrackService))

  create(data: CreateFavoritesDto) {
    const { id, type } = data || {};

    const newFavorites = {
      id,
      type,
    };

    favoritesDB.push(newFavorites);

    return newFavorites;
  }

  getById(id: string) {
    checkValidation(id);

    const favorites = favoritesDB.find((favorites) => favorites.id === id);

    if (favorites) {
      return favorites;
    }

    throw new NotFoundException('Favorites not found');
  }

  getAll() {
    return favoritesDB;
  }

  update(data: UpdateFavoritesDto) {
    const { id, type } = data || {};

    if (!id) {
      throw new BadRequestException('id is required');
    }

    if (!type) {
      throw new BadRequestException('type is required');
    }

    checkValidation(id);
    const currentFavorite = favoritesDB.find((favorite) => favorite.id === id);

    if (!currentFavorite) {
      throw new NotFoundException('Favorites not found');
    }

    currentFavorite.id = id;
    currentFavorite.type = type;

    return currentFavorite;
  }

  delete(id: string) {
    checkValidation(id);

    const favoritesIndex = favoritesDB.findIndex(
      (favorites) => favorites.id === id,
    );

    if (favoritesIndex === -1) {
      throw new NotFoundException('Favorites not found');
    }

    // new TrackService().delete(id);

    // this.trackService.delete(id);

    favoritesDB.splice(favoritesIndex, 1);
  }
}
