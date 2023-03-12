import {Module} from "@nestjs/common";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';


@Module({
    controllers: [],
    imports: [
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles],
            autoLoadModels: true,
            logging:false
        }),
        RolesModule,
        AuthModule,
        NewsModule
    ],
})
export class AppModule {
}