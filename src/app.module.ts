import {Module} from "@nestjs/common";
import {databaseProviders} from "./database.providers";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";


@Module({
    controllers: [],
    providers: [...databaseProviders],
    imports: [
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        })
    ],
    exports: [...databaseProviders],
})
export class AppModule {
}