import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { printInfo } from './util';
import { HttpExceptionFilter } from './filters';
import { TransformInterceptor } from './interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin(__origin: string, callback: any) {
      callback(null, true);
    },
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap().then(() => printInfo());
