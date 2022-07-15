import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10) || 4000;
  await app.listen(port);
  console.log('App listen:', `http://localhost:${port}`);
}
bootstrap();
