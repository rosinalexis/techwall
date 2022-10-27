import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DurationInterceptor} from "./interceptors/duration.interceptor";
import * as dotenv from 'dotenv';
import {ConfigService} from "@nestjs/config";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    app.useGlobalInterceptors(new DurationInterceptor());
    await app.listen(process.env.APP_PORT);
}

bootstrap();
