import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './ormconfig';

import { UserModule } from './user/user.module';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

import { AlbumModule } from './album/album.module';
import { AlbumController } from 'src/album/album.controller';
import { AlbumService } from 'src/album/album.service';

import { ArtistModule } from './artist/artist.module';
import { ArtistController } from 'src/artist/artist.controller';
import { ArtistService } from 'src/artist/artist.service';

import { TrackModule } from './track/track.module';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(configService),
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
  ],
  controllers: [
    AppController,
    // UserController,
    AlbumController,
    ArtistController,
    TrackController,
  ],
  providers: [
    AppService,
    // UserService,
    AlbumService,
    ArtistService,
    TrackService,
  ],
})
export class AppModule {}
