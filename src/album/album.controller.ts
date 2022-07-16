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
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { AlbumEntity } from 'src/album/album.interface';
import { AlbumService } from 'src/album/album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @HttpCode(200)
  getAll() {
    const albums = this.albumService.getAll();

    return albums.map((album) => new AlbumEntity(album));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':albumId')
  @HttpCode(200)
  getById(@Param() { albumId }) {
    const albums = this.albumService.getById(albumId);

    return new AlbumEntity(albums);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  create(@Param() params, @Body() createAlbumDto: CreateAlbumDto) {
    const album = this.albumService.create(createAlbumDto);

    return new AlbumEntity(album);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':albumId')
  update(@Param() { albumId }, @Body() updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumService.update(albumId, updateAlbumDto);

    return new AlbumEntity(album);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  @HttpCode(200)
  updateEmpty() {
    throw new BadRequestException('Id is not valid');
  }

  @Delete(':albumId')
  @HttpCode(204)
  delete(@Param() { albumId }) {
    this.albumService.delete(albumId);

    return;
  }
}
