import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 3306,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            bigNumberStrings: false,
            logging: true,
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
