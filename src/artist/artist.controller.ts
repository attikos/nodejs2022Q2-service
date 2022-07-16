import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { ArtistEntity } from 'src/artist/artist.interface';
import { ArtistService } from 'src/artist/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @HttpCode(200)
  getAll() {
    const artists = this.artistService.getAll();

    return artists.map((artist) => new ArtistEntity(artist));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':artistId')
  @HttpCode(200)
  getById(@Param() { artistId }) {
    const artists = this.artistService.getById(artistId);

    return new ArtistEntity(artists);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  create(@Param() params, @Body() createArtistDto: CreateArtistDto) {
    const artist = this.artistService.create(createArtistDto);

    return new ArtistEntity(artist);
  }

  @Put(':artistId')
  update(@Param() { artistId }, @Body() updateArtistDto: UpdateArtistDto) {
    const artist = this.artistService.update(artistId, updateArtistDto);

    return new ArtistEntity(artist);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  updateEmpty() {
    throw new BadRequestException('Id is not valid');
  }

  @Delete(':artistId')
  @HttpCode(204)
  delete(@Param() { artistId }) {
    return this.artistService.delete(artistId);
  }
}
