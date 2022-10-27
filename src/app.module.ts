import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './todo/todo.module';
import {FirstMiddleware} from "./middlewares/first.middleware";

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(FirstMiddleware).forRoutes('todo');
    }
}
