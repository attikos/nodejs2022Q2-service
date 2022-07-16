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
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { TrackEntity } from 'src/track/track.interface';
import { TrackService } from 'src/track/track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @HttpCode(200)
  getAll() {
    const tracks = this.trackService.getAll();

    return tracks.map((track) => new TrackEntity(track));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':trackId')
  @HttpCode(200)
  getById(@Param() { trackId }) {
    const tracks = this.trackService.getById(trackId);

    return new TrackEntity(tracks);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  create(@Param() params, @Body() createTrackDto: CreateTrackDto) {
    const track = this.trackService.create(createTrackDto);

    return new TrackEntity(track);
  }

  @Put(':trackId')
  update(@Param() { trackId }, @Body() updateTrackDto: UpdateTrackDto) {
    const track = this.trackService.update(trackId, updateTrackDto);

    return new TrackEntity(track);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  updateEmpty() {
    throw new BadRequestException('Id is not valid');
  }

  @Delete(':trackId')
  @HttpCode(204)
  delete(@Param() { trackId }) {
    this.trackService.delete(trackId);

    return;
  }
}
