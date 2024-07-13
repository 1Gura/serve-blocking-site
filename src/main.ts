import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser'
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Block list')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('block')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
}

bootstrap();