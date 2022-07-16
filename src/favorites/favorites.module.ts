import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
// import { TrackService } from 'src/track/track.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  // imports: [TrackService],
})
export class FavoritesModule {}
