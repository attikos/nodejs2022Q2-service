import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @Allow()
  artistId?: string;
}
