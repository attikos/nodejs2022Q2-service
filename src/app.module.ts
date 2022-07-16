import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

import { AlbumModule } from './album/album.module';
import { AlbumController } from 'src/album/album.controller';
import { AlbumService } from 'src/album/album.service';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AlbumModule],
  controllers: [AppController, UserController, AlbumController],
  providers: [AppService, UserService, AlbumService],
})
export class AppModule {}
