import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { v4, validate } from 'uuid';
import { trackDB } from 'src/track/track.db';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

const checkValidation = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException('Id is not valid');
  }
};

@Injectable()
export class TrackService {
  create(data: CreateTrackDto) {
    const { name, artistId, albumId, duration } = data || {};

    const newTrack = {
      id: v4(),
      name,
      artistId,
      albumId,
      duration,
    };

    if (!name) {
      throw new BadRequestException('name is required');
    }

    if (!duration) {
      throw new BadRequestException('duration is required');
    }

    trackDB.push(newTrack);

    return newTrack;
  }

  getById(id: string) {
    checkValidation(id);

    const track = trackDB.find((track) => track.id === id);

    if (track) {
      return track;
    }

    throw new NotFoundException('Track not found');
  }

  getAll() {
    return trackDB;
  }

  update(id: string, data: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = data || {};

    if (!name) {
      throw new BadRequestException('name is required');
    }

    if (!duration) {
      throw new BadRequestException('duration is required');
    }

    checkValidation(id);
    const currentTrack = trackDB.find((track) => track.id === id);

    if (!currentTrack) {
      throw new NotFoundException('Track not found');
    }

    currentTrack.name = name;
    currentTrack.artistId = artistId;
    currentTrack.albumId = albumId;
    currentTrack.duration = duration;

    return currentTrack;
  }

  delete(id: string) {
    checkValidation(id);

    const trackIndex = trackDB.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    trackDB.splice(trackIndex, 1);
  }
}
