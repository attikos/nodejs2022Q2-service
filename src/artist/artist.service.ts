import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { v4, validate } from 'uuid';
import { artistDB } from 'src/artist/artist.db';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
// import { TrackService } from 'src/track/track.service';

const checkValidation = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException('Id is not valid');
  }
};

@Injectable()
export class ArtistService {
  // constructor() {} // private readonly trackService: TrackService, // @Inject(forwardRef(() => TrackService))

  create(data: CreateArtistDto) {
    const { name, grammy } = data || {};

    const newArtist = {
      id: v4(),
      name,
      grammy,
    };

    if (!name) {
      throw new BadRequestException('name is required');
    }

    if (typeof grammy !== 'boolean') {
      throw new BadRequestException('grammy is required');
    }

    artistDB.push(newArtist);

    return newArtist;
  }

  getById(id: string) {
    checkValidation(id);

    const artist = artistDB.find((artist) => artist.id === id);

    if (artist) {
      return artist;
    }

    throw new NotFoundException('Artist not found');
  }

  getAll() {
    return artistDB;
  }

  update(id: string, data: UpdateArtistDto) {
    const { name, grammy } = data || {};

    if (!name) {
      throw new BadRequestException('name is required');
    }

    if (typeof grammy !== 'boolean') {
      throw new BadRequestException('grammy is required');
    }

    checkValidation(id);
    const currentArtist = artistDB.find((artist) => artist.id === id);

    if (!currentArtist) {
      throw new NotFoundException('Artist not found');
    }

    currentArtist.name = name;
    currentArtist.grammy = grammy;

    return currentArtist;
  }

  delete(id: string) {
    checkValidation(id);

    const artistIndex = artistDB.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }

    // new TrackService().delete(id);

    // this.trackService.delete(id);

    artistDB.splice(artistIndex, 1);
  }
}
