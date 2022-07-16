import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { v4, validate } from 'uuid';
import { albumDB } from 'src/album/album.db';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';

const checkValidation = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException('Id is not valid');
  }
};

@Injectable()
export class AlbumService {
  create(data: CreateAlbumDto) {
    const { name, year, artistId } = data || {};

    const newAlbum = {
      id: v4(),
      name,
      year,
      artistId,
    };

    if (!name) {
      throw new BadRequestException('name is required');
    }

    if (!year) {
      throw new BadRequestException('year is required');
    }

    albumDB.push(newAlbum);

    return newAlbum;
  }

  getById(id: string) {
    checkValidation(id);

    const album = albumDB.find((album) => album.id === id);

    if (album) {
      return album;
    }

    throw new NotFoundException('Album not found');
  }

  getAll() {
    return albumDB;
  }

  update(id: string, data: UpdateAlbumDto) {
    const { name, year, artistId } = data || {};

    const newAlbum = {
      id: v4(),
      name,
      year,
      artistId,
    };

    if (!name) {
      throw new BadRequestException('name is required');
    }

    if (!year) {
      throw new BadRequestException('year is required');
    }

    const currentArtistId = false; // TODO find artist by artistId

    if (artistId && !currentArtistId) {
      throw new BadRequestException('artistId is required');
    }

    checkValidation(id);
    const currentAlbum = albumDB.find((album) => album.id === id);

    if (!currentAlbum) {
      throw new NotFoundException('Album not found');
    }

    currentAlbum.name = newAlbum.name;
    currentAlbum.year = newAlbum.year;
    currentAlbum.artistId = newAlbum.artistId;

    return currentAlbum;
  }

  delete(id: string) {
    checkValidation(id);

    const albumIndex = albumDB.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }

    albumDB.splice(albumIndex, 1);
  }
}
