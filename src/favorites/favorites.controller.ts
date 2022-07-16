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
import { CreateFavoritesDto } from 'src/favorites/dto/create-favorites.dto';
import { UpdateFavoritesDto } from 'src/favorites/dto/update-favorites.dto';
import { FavoritesEntity } from 'src/favorites/favorites.interface';
import { FavoritesService } from 'src/favorites/favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @HttpCode(200)
  getAll() {
    const favoritess = this.favoritesService.getAll();

    return favoritess.map((favorites) => new FavoritesEntity(favorites));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':favoritesId')
  @HttpCode(200)
  getById(@Param() { favoritesId }) {
    const favoritess = this.favoritesService.getById(favoritesId);

    return new FavoritesEntity(favoritess);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  create(@Body() createFavoritesDto: CreateFavoritesDto) {
    const favorites = this.favoritesService.create(createFavoritesDto);

    return new FavoritesEntity(favorites);
  }

  @Put(':favoritesId')
  update(@Body() updateFavoritesDto: UpdateFavoritesDto) {
    const favorites = this.favoritesService.update(updateFavoritesDto);

    return new FavoritesEntity(favorites);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  updateEmpty() {
    throw new BadRequestException('Id is not valid');
  }

  @Delete(':favoritesId')
  @HttpCode(204)
  delete(@Param() { favoritesId }) {
    return this.favoritesService.delete(favoritesId);
  }
}
