import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './todo/todo.module';
import {FirstMiddleware} from "./middlewares/first.middleware";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

dotenv.config();


@Module({
    imports: [
        TodoModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            autoLoadEntities: true
        }),
        CvModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(FirstMiddleware).forRoutes('todo');
    }
}
