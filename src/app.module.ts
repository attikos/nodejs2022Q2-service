import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
